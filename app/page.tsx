import React from 'react'
import type { Metadata } from 'next'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { FeatureShowcase } from '@/components/landing/FeatureShowcase'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { CollaborationSection } from '@/components/landing/CollaborationSection'
import { FooterCTA } from '@/components/landing/FooterCTA'
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
  generateWebApplicationSchema,
} from '@/lib/schema'

export const metadata: Metadata = {
  title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
  description:
    'DevLink imports your projects, formats your tech stack and experience into a clean portfolio at your custom link, and connects you with other developers.',
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
    description:
      'DevLink imports your projects, formats your tech stack and experience into a clean portfolio at your custom link, and connects you with other developers.',
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Developer Portfolio Builder preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
    description:
      'DevLink imports your projects, formats your tech stack and experience into a clean portfolio at your custom link, and connects you with other developers.',
    images: [absoluteUrl('/opengraph-image')],
  },
}

export default function Home() {
  const structuredData = [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateWebApplicationSchema(),
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Nav />
      <main id="main-content">
        <Hero />
        <FeatureShowcase />
        <HowItWorks />
        <CollaborationSection />
      </main>
      <FooterCTA />
    </div>
  )
}
