import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please check your environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper function to get public URL for a file in Supabase Storage
 * @param bucket - The storage bucket name
 * @param path - The file path within the bucket
 * @returns The public URL for the file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Helper function to get optimized image URL with transformations
 * @param bucket - The storage bucket name
 * @param path - The file path within the bucket
 * @param options - Transformation options (width, height, quality)
 * @returns The transformed image URL
 */
export function getOptimizedImageUrl(
  bucket: string,
  path: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string {
  const baseUrl = getPublicUrl(bucket, path);

  if (!options) return baseUrl;

  const params = new URLSearchParams();
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}
