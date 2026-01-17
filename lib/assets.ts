/**
 * Auto-generated from migration script
 * Generated at: 2026-01-16T19:40:08.716Z
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
export const assetManifest: AssetManifest = {
  "generatedAt": "2026-01-16T19:40:08.700Z",
  "images": [
    {
      "originalPath": "adventures/akumal-fish.png",
      "storagePath": "adventures/akumal-fish.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/akumal-fish.webp",
      "type": "image",
      "size": 21449949
    },
    {
      "originalPath": "adventures/banff-winter.png",
      "storagePath": "adventures/banff-winter.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/banff-winter.webp",
      "type": "image",
      "size": 12717956
    },
    {
      "originalPath": "adventures/canmore-engine-bridge-summer-2.png",
      "storagePath": "adventures/canmore-engine-bridge-summer-2.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/canmore-engine-bridge-summer-2.webp",
      "type": "image",
      "size": 13387808
    },
    {
      "originalPath": "adventures/ha-ling-summit.png",
      "storagePath": "adventures/ha-ling-summit.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/ha-ling-summit.webp",
      "type": "image",
      "size": 10437322
    },
    {
      "originalPath": "adventures/hawaii-dive-boat.png",
      "storagePath": "adventures/hawaii-dive-boat.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/hawaii-dive-boat.png",
      "type": "image",
      "size": 4129621
    },
    {
      "originalPath": "adventures/torres-del-paine-end.png",
      "storagePath": "adventures/torres-del-paine-end.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/torres-del-paine-end.webp",
      "type": "image",
      "size": 16656312
    },
    {
      "originalPath": "adventures/tronador-evening.png",
      "storagePath": "adventures/tronador-evening.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/adventures/tronador-evening.webp",
      "type": "image",
      "size": 4955474
    },
    {
      "originalPath": "art/animal-patchwork-quilt.png",
      "storagePath": "art/animal-patchwork-quilt.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/animal-patchwork-quilt.webp",
      "type": "image",
      "size": 14289986
    },
    {
      "originalPath": "art/baby-sweater-yellow.png",
      "storagePath": "art/baby-sweater-yellow.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/baby-sweater-yellow.webp",
      "type": "image",
      "size": 14647567
    },
    {
      "originalPath": "art/bird-costume.png",
      "storagePath": "art/bird-costume.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/bird-costume.webp",
      "type": "image",
      "size": 11226857
    },
    {
      "originalPath": "art/first-quilt.png",
      "storagePath": "art/first-quilt.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/first-quilt.webp",
      "type": "image",
      "size": 21061438
    },
    {
      "originalPath": "art/geometric-quilt.png",
      "storagePath": "art/geometric-quilt.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/geometric-quilt.webp",
      "type": "image",
      "size": 17644571
    },
    {
      "originalPath": "art/geometric-shawl.png",
      "storagePath": "art/geometric-shawl.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/geometric-shawl.webp",
      "type": "image",
      "size": 17120605
    },
    {
      "originalPath": "art/knit-baby-blanket.png",
      "storagePath": "art/knit-baby-blanket.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/knit-baby-blanket.webp",
      "type": "image",
      "size": 16024775
    },
    {
      "originalPath": "art/transition-sweater.png",
      "storagePath": "art/transition-sweater.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/transition-sweater.webp",
      "type": "image",
      "size": 9571509
    },
    {
      "originalPath": "art/yoda-costume.png",
      "storagePath": "art/yoda-costume.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/art/yoda-costume.webp",
      "type": "image",
      "size": 13984222
    },
    {
      "originalPath": "avatar.jpg",
      "storagePath": "avatar.jpg",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/avatar.jpg",
      "type": "image",
      "size": 1524
    },
    {
      "originalPath": "maria-nyc-sq.png",
      "storagePath": "maria-nyc-sq.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/maria-nyc-sq.png",
      "type": "image",
      "size": 3090608
    },
    {
      "originalPath": "projects/breakout-game.png",
      "storagePath": "projects/breakout-game.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/breakout-game.png",
      "type": "image",
      "size": 28247
    },
    {
      "originalPath": "projects/checkitoff-multiple_images.png",
      "storagePath": "projects/checkitoff-multiple_images.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/checkitoff-multiple_images.png",
      "type": "image",
      "size": 60664
    },
    {
      "originalPath": "projects/morse-code-converter.png",
      "storagePath": "projects/morse-code-converter.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/morse-code-converter.png",
      "type": "image",
      "size": 112641
    },
    {
      "originalPath": "projects/quiltspiration.png",
      "storagePath": "projects/quiltspiration.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/quiltspiration.webp",
      "type": "image",
      "size": 1689689
    },
    {
      "originalPath": "projects/remote_work_cafes-homepage.png",
      "storagePath": "projects/remote_work_cafes-homepage.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/remote_work_cafes-homepage.webp",
      "type": "image",
      "size": 428592
    },
    {
      "originalPath": "projects/tic-tac-toe-home.png",
      "storagePath": "projects/tic-tac-toe-home.png",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/tic-tac-toe-home.png",
      "type": "image",
      "size": 70568
    },
    {
      "originalPath": "projects/typing-test-in-progress.png",
      "storagePath": "projects/typing-test-in-progress.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/typing-test-in-progress.webp",
      "type": "image",
      "size": 1246835
    },
    {
      "originalPath": "projects/watermark-app.png",
      "storagePath": "projects/watermark-app.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/watermark-app.webp",
      "type": "image",
      "size": 1334222
    },
    {
      "originalPath": "projects/write_it_or_lose_it.png",
      "storagePath": "projects/write_it_or_lose_it.webp",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/portfolio-images/projects/write_it_or_lose_it.webp",
      "type": "image",
      "size": 952356
    }
  ],
  "pdfs": [
    {
      "originalPath": "MCDAngelo-AcademicCV-Oct2024.pdf",
      "storagePath": "MCDAngelo-AcademicCV-Oct2024.pdf",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/pdfs/MCDAngelo-AcademicCV-Oct2024.pdf",
      "type": "pdf",
      "size": 119085
    },
    {
      "originalPath": "MCDAngelo-ArtsCV-Oct2024.pdf",
      "storagePath": "MCDAngelo-ArtsCV-Oct2024.pdf",
      "publicUrl": "https://atttwonnfrzpopehpqyn.supabase.co/storage/v1/object/public/pdfs/MCDAngelo-ArtsCV-Oct2024.pdf",
      "type": "pdf",
      "size": 73782
    }
  ],
  "stats": {
    "totalImages": 27,
    "totalPDFs": 2,
    "totalFiles": 29
  }
};

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
