import React from 'react'
import type { Metadata } from 'next'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { FeatureShowcase } from '@/components/landing/FeatureShowcase'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { CollaborationSection } from '@/components/landing/CollaborationSection'
import { FooterCTA } from '@/components/landing/FooterCTA'

export const metadata: Metadata = {
  title: 'DevLink — Create a public developer portfolio from your GitHub repositories',
  description:
    'DevLink imports your projects, formats your tech stack and experience into a clean portfolio at your custom link, and connects you with other developers.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
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
