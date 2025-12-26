# Migration Scripts

This directory contains scripts for migrating your website data to Supabase.

## Prerequisites

1. **Install dependencies** (if not already done):
   ```bash
   npm install --save-dev dotenv sharp
   ```
   
   - `dotenv`: For loading environment variables
   - `sharp`: For automatic image optimization and compression

2. **Set up your Supabase project**:
   - Go to [https://app.supabase.com](https://app.supabase.com)
   - Create a new project or use existing one
   - Get your project URL and keys from Settings > API

3. **Configure environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials

4. **Prepare your source files**:
   - Create a `source` directory in the project root
   - Add subdirectories: `source/images/` and `source/pdfs/`
   - Place your images and PDFs in these directories

## Directory Structure

```
source/
├── images/
│   ├── projects/
│   │   ├── project1.jpg
│   │   └── project2.png
│   ├── art/
│   │   └── artwork1.jpg
│   └── adventures/
│       └── photo1.jpg
└── pdfs/
    ├── resume.pdf
    └── portfolio.pdf
```

## Running the Migration

1. **Make the script executable** (Unix/Mac):
   ```bash
   chmod +x scripts/migrate-to-supabase.mjs
   ```

2. **Run the migration**:
   ```bash
   node scripts/migrate-to-supabase.mjs
   ```

   Or add it to your package.json scripts:
   ```json
   {
     "scripts": {
       "migrate": "node scripts/migrate-to-supabase.js"
     }
   }
   ```

   Then run:
   ```bash
   npm run migrate
   ```

## What the Script Does

1. **Creates Storage Buckets**: Sets up `portfolio-images` and `pdfs` buckets in Supabase
2. **Optimizes Images**: Automatically compresses and resizes images that are too large
   - Resizes images larger than 2400x2400px
   - Compresses images over 4.5MB
   - Converts large PNGs to WebP format for better compression
   - Maintains quality at 85% (adjustable)
3. **Uploads Files**: Uploads all images and PDFs while preserving directory structure
4. **Generates Manifest**: Creates `lib/migration-manifest.json` with all file URLs
5. **Creates TypeScript Types**: Generates `lib/assets.ts` with types and helper functions
6. **Creates Example Content**: Generates `lib/content.example.ts` as a template

## After Migration

### 1. Review Generated Files

Check the `lib/` directory for:
- `migration-manifest.json` - Complete list of uploaded files with URLs
- `assets.ts` - TypeScript types and helper functions
- `content.example.ts` - Template for your content structure

### 2. Create Your Content File

Rename or copy `content.example.ts` to `content.ts` and customize with your actual content:

```typescript
import { getAssetUrl } from './assets';

export const projects = [
  {
    id: 'my-project',
    title: 'My Awesome Project',
    description: 'A detailed description...',
    imageUrl: getAssetUrl('projects/my-project.jpg'),
    githubUrl: 'https://github.com/username/repo',
    tags: ['React', 'TypeScript'],
  },
];
```

### 3. Use in Your Components

```typescript
import { projects } from '@/lib/content';
import Image from 'next/image';

export default function ProjectsPage() {
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <Image 
            src={project.imageUrl} 
            alt={project.title}
            width={800}
            height={600}
          />
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Error: Missing Supabase credentials
- Make sure `.env.local` exists and has the correct values
- Check that you're using `SUPABASE_SERVICE_ROLE_KEY` for the migration (not just anon key)

### Error: Bucket already exists
- This is normal and won't affect the migration
- The script will use existing buckets

### Files not uploading
- The script automatically optimizes images over 4.5MB
- If optimization fails, check that `sharp` is installed: `npm install sharp`
- For PDFs, max size is 10MB (adjust in script if needed)
- Verify the `source/` directory structure
- Check Supabase Storage policies (should allow public access)

### Module not found: dotenv
- Install it: `npm install dotenv`

## Storage Policies

If you encounter permission errors, set up these policies in Supabase:

1. Go to Storage > Policies in your Supabase dashboard
2. For both `portfolio-images` and `pdfs` buckets, add:
   - **SELECT policy**: Allow public read access
   - **INSERT policy**: Allow authenticated uploads (or public if needed)

## Image Optimization Configuration

You can customize image optimization settings by editing the `CONFIG` object in `migrate-to-supabase.mjs`:

```javascript
imageOptimization: {
  maxWidth: 2400,           // Max width in pixels
  maxHeight: 2400,          // Max height in pixels
  quality: 85,              // JPEG/WebP quality (1-100)
  targetMaxSize: 4.5 * 1024 * 1024, // Target max file size in bytes
}
```

**What happens during optimization:**
- Images larger than `maxWidth` x `maxHeight` are resized (maintains aspect ratio)
- Images over `targetMaxSize` are compressed
- Large PNGs are automatically converted to WebP format
- JPEGs are optimized with progressive encoding
- Original files remain unchanged in your `source/` directory

## Re-running the Migration

The script uses `upsert: true`, so you can safely re-run it to:
- Update existing files
- Add new files
- Regenerate manifest and types

Files with the same path will be overwritten.

