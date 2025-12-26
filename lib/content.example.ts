/**
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
