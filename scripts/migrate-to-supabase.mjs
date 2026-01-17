#!/usr/bin/env node

/**
 * Migrates images and PDFs to Supabase Storage
 * Generates manifest.json and TypeScript types
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import sharp from 'sharp';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Configuration
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  sourceDirs: {
    images: path.join(__dirname, '..', 'source', 'images'),
    pdfs: path.join(__dirname, '..', 'source', 'pdfs'),
  },
  buckets: {
    images: 'portfolio-images',
    pdfs: 'pdfs',
  },
  outputDir: path.join(__dirname, '..', 'lib'),
  // Image optimization settings
  imageOptimization: {
    maxWidth: 2400,           // Max width in pixels
    maxHeight: 2400,          // Max height in pixels
    quality: 85,              // JPEG/WebP quality (1-100)
    targetMaxSize: 4.5 * 1024 * 1024, // Target max file size: 4.5MB (leave room under 5MB limit)
  },
};

// Initialize Supabase client
const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'bright');
  console.log('='.repeat(60) + '\n');
}

/**
 * Create storage buckets if they don't exist
 */
async function ensureBucketsExist() {
  logSection('📦 Setting up Storage Buckets');

  for (const [type, bucketName] of Object.entries(CONFIG.buckets)) {
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucketName);

      if (!bucketExists) {
        log(`Creating bucket: ${bucketName}`, 'yellow');
        
        // Check if we are using the service role key
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
          log('⚠ Warning: SUPABASE_SERVICE_ROLE_KEY is missing. Creating buckets might fail with RLS error.', 'yellow');
          log('  Add SUPABASE_SERVICE_ROLE_KEY to your .env.local file to fix this.', 'yellow');
        }

        const { data, error } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: type === 'pdfs' ? 10485760 : 5242880, // 10MB for PDFs, 5MB for images
        });

        if (error) throw error;
        log(`✓ Created bucket: ${bucketName}`, 'green');
      } else {
        log(`✓ Bucket already exists: ${bucketName}`, 'green');
      }
    } catch (error) {
      log(`✗ Error with bucket ${bucketName}: ${error.message}`, 'red');
      throw error;
    }
  }
}

/**
 * Get all files from a directory recursively
 */
function getFilesRecursively(dir, fileList = [], baseDir = dir) {
  if (!fs.existsSync(dir)) {
    log(`⚠ Directory not found: ${dir}`, 'yellow');
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList, baseDir);
    } else {
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({
        fullPath: filePath,
        relativePath: relativePath,
        name: file,
        size: stat.size,
      });
    }
  });

  return fileList;
}

/**
 * Optimize an image before uploading
 */
async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const isImage = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);

  if (!isImage) {
    // Not an image, return original buffer
    return fs.readFileSync(filePath);
  }

  const originalSize = fs.statSync(filePath).size;
  const { maxWidth, maxHeight, quality, targetMaxSize } = CONFIG.imageOptimization;

  // If file is already under target size, check if it needs resizing
  let image = sharp(filePath);
  const metadata = await image.metadata();

  // Check if resizing is needed
  const needsResize = metadata.width > maxWidth || metadata.height > maxHeight;
  const needsCompression = originalSize > targetMaxSize;

  if (!needsResize && !needsCompression) {
    // Image is fine as-is
    return fs.readFileSync(filePath);
  }

  // Resize if needed
  if (needsResize) {
    image = image.resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert to appropriate format with compression
  let optimizedBuffer;
  if (ext === '.png') {
    // For PNG, convert to WebP for better compression
    optimizedBuffer = await image
      .webp({ quality })
      .toBuffer();
  } else {
    // For JPEG/JPG, optimize as JPEG
    optimizedBuffer = await image
      .jpeg({ quality, progressive: true })
      .toBuffer();
  }

  const optimizedSize = optimizedBuffer.length;
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

  log(`  → Optimized: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`, 'cyan');

  return optimizedBuffer;
}

/**
 * Upload a file to Supabase Storage
 */
async function uploadFile(bucket, filePath, storagePath, optimize = true) {
  let fileBuffer;
  let contentType = getContentType(filePath);

  // Optimize images if enabled
  if (optimize && bucket === CONFIG.buckets.images) {
    try {
      fileBuffer = await optimizeImage(filePath);
      
      // Update content type if converted to WebP
      const ext = path.extname(filePath).toLowerCase();
      if (ext === '.png' && fileBuffer.length < fs.statSync(filePath).size) {
        // Successfully optimized PNG to WebP
        contentType = 'image/webp';
        // Update storage path to reflect new format
        storagePath = storagePath.replace(/\.png$/i, '.webp');
      }
    } catch (error) {
      log(`  ⚠ Optimization failed, using original: ${error.message}`, 'yellow');
      fileBuffer = fs.readFileSync(filePath);
    }
  } else {
    fileBuffer = fs.readFileSync(filePath);
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
      cacheControl: '31536000', // 1 year cache
    });

  if (error) throw error;
  return data;
}

/**
 * Get content type based on file extension
 */
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

/**
 * Upload all images
 */
async function uploadImages() {
  logSection('🖼️  Uploading Images');

  const imageFiles = getFilesRecursively(CONFIG.sourceDirs.images);
  const manifest = [];

  if (imageFiles.length === 0) {
    log('No images found to upload', 'yellow');
    return manifest;
  }

  log(`Found ${imageFiles.length} images to upload\n`, 'cyan');

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    let storagePath = file.relativePath.replace(/\\/g, '/'); // Normalize path for cross-platform

    try {
      log(`[${i + 1}/${imageFiles.length}] Processing ${file.name}...`, 'cyan');
      await uploadFile(CONFIG.buckets.images, file.fullPath, storagePath);

      // Check if file was converted to WebP
      if (storagePath.endsWith('.png')) {
        const webpPath = storagePath.replace(/\.png$/i, '.webp');
        const { data: webpData } = supabase.storage
          .from(CONFIG.buckets.images)
          .getPublicUrl(webpPath);
        
        // Check if WebP version exists
        try {
          const response = await fetch(webpData.publicUrl, { method: 'HEAD' });
          if (response.ok) {
            storagePath = webpPath;
          }
        } catch (e) {
          console.log('Error occurred while checking WebP version:', e);
          // WebP doesn't exist, use original path
        }
      }

      const { data } = supabase.storage
        .from(CONFIG.buckets.images)
        .getPublicUrl(storagePath);

      manifest.push({
        originalPath: file.relativePath,
        storagePath: storagePath,
        publicUrl: data.publicUrl,
        type: 'image',
        size: file.size,
      });

      log(`✓ Uploaded successfully`, 'green');
    } catch (error) {
      log(`✗ Failed to upload ${file.name}: ${error.message}`, 'red');
    }
  }

  return manifest;
}

/**
 * Upload all PDFs
 */
async function uploadPDFs() {
  logSection('📄 Uploading PDFs');

  const pdfFiles = getFilesRecursively(CONFIG.sourceDirs.pdfs);
  const manifest = [];

  if (pdfFiles.length === 0) {
    log('No PDFs found to upload', 'yellow');
    return manifest;
  }

  log(`Found ${pdfFiles.length} PDFs to upload\n`, 'cyan');

  for (let i = 0; i < pdfFiles.length; i++) {
    const file = pdfFiles[i];
    const storagePath = file.relativePath.replace(/\\/g, '/');

    try {
      await uploadFile(CONFIG.buckets.pdfs, file.fullPath, storagePath, false); // Don't optimize PDFs

      const { data } = supabase.storage
        .from(CONFIG.buckets.pdfs)
        .getPublicUrl(storagePath);

      manifest.push({
        originalPath: file.relativePath,
        storagePath: storagePath,
        publicUrl: data.publicUrl,
        type: 'pdf',
        size: file.size,
      });

      log(`✓ [${i + 1}/${pdfFiles.length}] ${file.name}`, 'green');
    } catch (error) {
      log(`✗ Failed to upload ${file.name}: ${error.message}`, 'red');
    }
  }

  return manifest;
}

/**
 * Generate manifest.json
 */
function generateManifest(images, pdfs) {
  logSection('📝 Generating Manifest');

  const manifest = {
    generatedAt: new Date().toISOString(),
    images: images,
    pdfs: pdfs,
    stats: {
      totalImages: images.length,
      totalPDFs: pdfs.length,
      totalFiles: images.length + pdfs.length,
    },
  };

  const manifestPath = path.join(CONFIG.outputDir, 'migration-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  log(`✓ Manifest saved to: ${manifestPath}`, 'green');
  log(`  - Total images: ${manifest.stats.totalImages}`, 'cyan');
  log(`  - Total PDFs: ${manifest.stats.totalPDFs}`, 'cyan');

  return manifest;
}

/**
 * Generate TypeScript types and content file
 */
function generateTypeScriptTypes(manifest) {
  logSection('🔤 Generating TypeScript Types');

  const typesContent = `/**
 * Auto-generated from migration script
 * Generated at: ${new Date().toISOString()}
 */

export interface Asset {
  originalPath: string;
  storagePath: string;
  publicUrl: string;
  type: 'image' | 'pdf';
  size: number;
}

export interface AssetManifest {
  generatedAt: string;
  images: Asset[];
  pdfs: Asset[];
  stats: {
    totalImages: number;
    totalPDFs: number;
    totalFiles: number;
  };
}

// Asset manifest
export const assetManifest: AssetManifest = ${JSON.stringify(manifest, null, 2)};

/**
 * Helper function to get asset by original path
 */
export function getAssetByPath(path: string): Asset | undefined {
  return [...assetManifest.images, ...assetManifest.pdfs].find(
    asset => asset.originalPath === path || asset.storagePath === path
  );
}

/**
 * Helper function to get asset URL by path
 */
export function getAssetUrl(path: string): string | undefined {
  const asset = getAssetByPath(path);
  return asset?.publicUrl;
}
`;

  const typesPath = path.join(CONFIG.outputDir, 'assets.ts');
  fs.writeFileSync(typesPath, typesContent);

  log(`✓ TypeScript types saved to: ${typesPath}`, 'green');
}

/**
 * Generate example content structure
 */
function generateExampleContent() {
  logSection('📚 Generating Example Content Structure');

  const exampleContent = `/**
 * Example content structure for your website
 * Replace with your actual content
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface ArtPiece {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  year?: number;
  medium?: string;
}

export interface Adventure {
  id: string;
  title: string;
  location: string;
  date: string;
  imageUrl: string;
  description?: string;
}

// Example projects - replace with your actual content
export const projects: Project[] = [
  {
    id: 'example-project',
    title: 'Example Project',
    description: 'This is an example project description',
    imageUrl: '', // Use getAssetUrl() from assets.ts
    githubUrl: 'https://github.com/username/repo',
    liveUrl: 'https://example.com',
    tags: ['React', 'TypeScript', 'Next.js'],
    featured: true,
  },
  // Add more projects...
];

// Example art pieces - replace with your actual content
export const artPieces: ArtPiece[] = [
  {
    id: 'example-art',
    title: 'Example Art Piece',
    imageUrl: '', // Use getAssetUrl() from assets.ts
    year: 2024,
    medium: 'Digital',
  },
  // Add more art pieces...
];

// Example adventures - replace with your actual content
export const adventures: Adventure[] = [
  {
    id: 'example-adventure',
    title: 'Example Adventure',
    location: 'Example Location',
    date: '2024-12-25',
    imageUrl: '', // Use getAssetUrl() from assets.ts
  },
  // Add more adventures...
];
`;

  const contentPath = path.join(CONFIG.outputDir, 'content.example.ts');
  fs.writeFileSync(contentPath, exampleContent);

  log(`✓ Example content saved to: ${contentPath}`, 'green');
  log(`  You can rename this to content.ts and customize it`, 'cyan');
}

/**
 * Main migration function
 */
async function main() {
  try {
    log('\n🚀 Starting Data Migration to Supabase', 'bright');
    log('='.repeat(60) + '\n', 'bright');

    // Validate environment
    if (!CONFIG.supabaseUrl || !CONFIG.supabaseKey) {
      throw new Error(
        'Missing Supabase credentials. Please check your .env.local file.'
      );
    }

    log('Configuration:', 'cyan');
    log(`  - Supabase URL: ${CONFIG.supabaseUrl}`, 'cyan');
    log(`  - Images source: ${CONFIG.sourceDirs.images}`, 'cyan');
    log(`  - PDFs source: ${CONFIG.sourceDirs.pdfs}`, 'cyan');
    log(`  - Output directory: ${CONFIG.outputDir}`, 'cyan');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    // Step 1: Ensure buckets exist
    await ensureBucketsExist();

    // Step 2: Upload images
    const imageManifest = await uploadImages();

    // Step 3: Upload PDFs
    const pdfManifest = await uploadPDFs();

    // Step 4: Generate manifest
    const manifest = generateManifest(imageManifest, pdfManifest);

    // Step 5: Generate TypeScript types
    generateTypeScriptTypes(manifest);

    // Step 6: Generate example content structure
    generateExampleContent();

    // Summary
    logSection('✅ Migration Complete!');
    log('Summary:', 'green');
    log(`  ✓ Uploaded ${imageManifest.length} images`, 'green');
    log(`  ✓ Uploaded ${pdfManifest.length} PDFs`, 'green');
    log(`  ✓ Generated manifest and TypeScript types`, 'green');
    log('\nNext steps:', 'cyan');
    log('  1. Review the generated files in lib/', 'cyan');
    log('  2. Customize lib/content.example.ts with your actual content', 'cyan');
    log('  3. Import and use assets in your Next.js components', 'cyan');
    log('\nExample usage:', 'cyan');
    log('  import { getAssetUrl } from "@/lib/assets";', 'cyan');
    log('  const imageUrl = getAssetUrl("projects/my-image.jpg");', 'cyan');

  } catch (error) {
    log('\n❌ Migration failed:', 'red');
    log(error.message, 'red');
    if (error.stack) {
      log('\nStack trace:', 'yellow');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the migration
main();

