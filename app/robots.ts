import type { MetadataRoute } from 'next';
import { DOMAIN, INDEXIEREN } from '@/lib/routen';

export default function robots(): MetadataRoute.Robots {
  if (!INDEXIEREN) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${DOMAIN}/sitemap.xml`, host: DOMAIN };
}
