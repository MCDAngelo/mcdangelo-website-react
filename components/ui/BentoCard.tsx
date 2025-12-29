'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

/**
 * Props for the BentoCard component
 * ? indicates optional
 * image: background image URL
 * size: Grid column span
 */
interface BentoCardProps {
    title?: string;
    description?: string;
    image?: string;
    href?: string;
    icon?: ReactNode
    className?: string;
    size?: '1x' | '2x' | '3x';
    children?: ReactNode;
}

export function BentoCard({
    title,
    description,
    image,
    href,
    icon,
    className = '',
    size = '1x',
    children,
}: BentoCardProps) {
    const sizeClasses = {
        '1x': 'col-span-1',
        '2x': 'col-span-1 md:col-span-2',
        '3x': 'col-span-1 md:col-span-2 lg:col-span-3',
    };

    const cardContent = (
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className={`glass-card group relative overflow-hidden rounded-2xl p-6 ${sizeClasses[size]} ${className}`}
        >
          {/* Background Image (if provided) */}
          {image && (
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={title || ''}
                fill
                className="object-cover opacity-40 transition-opacity group-hover:opacity-60"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          )}
    
          {/* Content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Icon */}
            {icon && (
              <div className="mb-4 text-teal-500">
                {icon}
              </div>
            )}
    
            {/* Title and Description */}
            {title && (
              <h3 className="mb-2 text-2xl font-semibold tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="mb-4 text-sm text-foreground/70">
                {description}
              </p>
            )}
    
            {/* Custom children content */}
            {children}
    
            {/* Link indicator */}
            {href && (
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center text-sm font-medium text-teal-500 transition-colors group-hover:text-blue-500">
                  View more
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      );
    
      // Wrap in Link if href provided, otherwise return as-is
      if (href) {
        return (
          <Link href={href} className="block">
            {cardContent}
          </Link>
        );
      }
    
      return cardContent;
    }