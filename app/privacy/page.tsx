import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { PRIVACY_POLICY } from '@/lib/legal-content'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read DevLink’s Privacy Policy explaining our data collection, itemised notices, lawful basis of consent, and your statutory data principal rights.',
  alternates: {
    canonical: absoluteUrl('/privacy'),
  },
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      'Read DevLink’s Privacy Policy explaining our data collection, itemised notices, lawful basis of consent, and your statutory data principal rights.',
    url: absoluteUrl('/privacy'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Privacy Policy — ${SITE_NAME}`,
    description:
      'Read DevLink’s Privacy Policy explaining our data collection, itemised notices, lawful basis of consent, and your statutory data principal rights.',
  },
}

export default function PrivacyPage() {
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <LegalLayout doc={PRIVACY_POLICY} currentPath="/privacy" />
    </>
  )
}
