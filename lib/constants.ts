/**
 * Site-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: "Maria D'Angelo",
  title: "Maria D'Angelo - Developer & Artist",
  description:
    'Personal portfolio showcasing development projects, artwork, and adventures.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: "Maria D'Angelo",
  social: {
    // Public social profiles - these are meant to be discoverable
    github: process.env.NEXT_PUBLIC_GITHUB_URL || '',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
    // For contact: implement a contact form instead of exposing email
    // See app/api/contact route for secure email handling
  },
} as const;

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Development', href: '/development' },
  { label: 'Art', href: '/art' },
  { label: 'Adventures', href: '/adventures' },
] as const;

// Supabase storage bucket names
export const STORAGE_BUCKETS = {
  images: 'portfolio-images',
  pdfs: 'pdfs',
} as const;
