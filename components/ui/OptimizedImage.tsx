'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from './Skeleton';

interface OptimizedImageProps extends ImageProps {
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`}>
      {isLoading && (
        <Skeleton className={`absolute inset-0 h-full w-full z-10 ${className || ''}`} />
      )}
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className || ''}`}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        {...props}
      />
    </div>
  );
}

