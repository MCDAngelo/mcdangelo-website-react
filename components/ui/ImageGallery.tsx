'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


export interface GalleryItem {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
  }

interface ImageGalleryProps {
    items: GalleryItem[];
    layout?: 'grid' | 'masonry';
}

export function ImageGallery({ items, layout = 'grid' }: ImageGalleryProps) {
    const [index, setIndex] = useState(-1);

    return (
        <>
        {/* Thumnail Grid */}
        <div className={
            layout === 'masonry'
            ? "columns-1 md:columns-3 gap-4 space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        }>
            {items.map((item, i) => (
                <div key={item.src}
                className={`relative cursor-zoom-in overflow-hidden rounded-lg bg-gray-100 ${
                    layout === 'masonry' ? 'mb-4 break-inside-avoid' : 'aspect-video'
                }`}
                onClick={() => setIndex(i)}
                >
                    <Image 
                        src={item.src} 
                        alt={item.alt} 
                        fill={layout === "grid"}
                        width={layout === "masonry" ? 800 : undefined}
                        height={layout === "masonry" ? 600 : undefined}
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                </div>
            ))}
        </div>
        {/* Lightbox Modal */}
        <Lightbox
            plugins={[Captions]}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={items.map((item) => ({
                src: item.src,
                alt: item.alt,
                title: item.title,
                description: item.description,
            }))}
            captions={{ showToggle: true, descriptionTextAlign: 'start' }}
        />
        </>
    );
}
