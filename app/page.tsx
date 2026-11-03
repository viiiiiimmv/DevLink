import React from 'react'
import type { Metadata } from 'next'
import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { ExampleShowcase } from '@/components/landing/ExampleShowcase'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { SyncEngine } from '@/components/landing/SyncEngine'
import { FooterCTA } from '@/components/landing/FooterCTA'

export const metadata: Metadata = {
  title: 'DevLink — A portfolio that updates itself when you ship code',
  description:
    'Connect your GitHub, arrange your project and writing blocks, and publish a living portfolio to a custom domain with zero maintenance overhead.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text selection:bg-editorial-text selection:text-editorial-bg">
      <Nav />
      <main id="main-content">
        <Hero />
        <ExampleShowcase />
        <HowItWorks />
        <SyncEngine />
      </main>
      <FooterCTA />
    </div>
  )
}
