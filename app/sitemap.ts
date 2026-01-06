import { MetadataRoute } from 'next';
import { SITE_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const routes = NAVIGATION_ITEMS.map((item) => ({
    url: `${baseUrl}${item.href === '/' ? '' : item.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: item.href === '/' ? 1 : 0.8,
  }));

  return routes;
}

