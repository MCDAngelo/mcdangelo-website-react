'use client';

import { useState } from 'react';
import { adventures, getAdventuresByCategory } from '@/lib/content';
import { ImageGallery } from '@/components/ui/ImageGallery';

const CATEGORIES = [
  { id: 'all', label: 'All Adventures' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'scuba', label: 'Scuba Diving' },
] as const;

export default function AdventuresPage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredAdventures = filter === 'all' 
    ? adventures 
    : getAdventuresByCategory(filter as any);

  // Transform to GalleryItem format
  const galleryItems = filteredAdventures.map(adventure => ({
    src: adventure.imageUrl,
    alt: adventure.title,
    title: adventure.title,
    description: `${adventure.description || ''} - ${adventure.location} (${adventure.date})`,
  }));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-20 md:py-32">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          Adventures
        </h1>
        <p className="max-w-2xl text-lg text-foreground/60">
          From the tops of mountains to the depths of the ocean.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              filter === category.id
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'bg-white/5 text-foreground/60 hover:bg-white/10 hover:text-foreground'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <ImageGallery items={galleryItems} layout="masonry" />
    </div>
  );
}

