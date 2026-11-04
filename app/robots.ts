import type { MetadataRoute } from 'next'
import { absoluteUrl, getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/discover',
          '/sparkforge',
          '/privacy',
          '/terms',
          '/auth/signin',
        ],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/pin',
          '/auth/error',
        ],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: getSiteUrl(),
  }
}
