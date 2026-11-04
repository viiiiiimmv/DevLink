import type { Metadata } from 'next'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { TERMS_AND_CONDITIONS } from '@/lib/legal-content'
import { absoluteUrl, SITE_NAME } from '@/lib/seo'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Review the Terms & Conditions governing access, user conduct, intellectual property, and acceptable use on the DevLink platform.',
  alternates: {
    canonical: absoluteUrl('/terms'),
  },
  openGraph: {
    title: `Terms & Conditions — ${SITE_NAME}`,
    description:
      'Review the Terms & Conditions governing access, user conduct, intellectual property, and acceptable use on the DevLink platform.',
    url: absoluteUrl('/terms'),
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Terms & Conditions — ${SITE_NAME}`,
    description:
      'Review the Terms & Conditions governing access, user conduct, intellectual property, and acceptable use on the DevLink platform.',
  },
}

export default function TermsPage() {
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms & Conditions', path: '/terms' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <LegalLayout doc={TERMS_AND_CONDITIONS} currentPath="/terms" />
    </>
  )
}
