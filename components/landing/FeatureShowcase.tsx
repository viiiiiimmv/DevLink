'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { sectionRevealVariants, tabContentVariants } from '@/lib/animations'

interface FeatureTab {
  id: string
  title: string
  shortLabel: string
  sourceFile: string
  description: string
  items: string[]
}

const FEATURES: FeatureTab[] = [
  {
    id: 'github-sync',
    title: 'Import repositories directly from GitHub',
    shortLabel: 'GitHub Import',
    sourceFile: 'app/api/import/github/route.ts',
    description:
      'Connect your GitHub account to load your public repositories. DevLink pulls repo titles, descriptions, primary languages, and star counts so you never have to re-enter project details by hand.',
    items: [
      'Read-only OAuth scope (no write permissions to your code)',
      'Automatically identifies primary languages and tags',
      'Select which repositories are pinned to your portfolio',
    ],
  },
  {
    id: 'templates',
    title: 'Switch between Bento, Minimal, and Modern layouts',
    shortLabel: 'Templates & Themes',
    sourceFile: 'lib/themes.ts',
    description:
      'Your content is decoupled from your presentation. Switch between high-density Bento grids, editorial Minimal lists, and product-style Modern layouts at any time without rebuilding your data.',
    items: [
      'Bento layout for visual project cards and quick stack tags',
      'Minimal layout for clean typographic resumes',
      'Instant color scheme customization (modern, minimal, lavender, dark)',
    ],
  },
  {
    id: 'inbox',
    title: 'Receive inquiries directly in your dashboard',
    shortLabel: 'Inquiries & Messages',
    sourceFile: 'app/contact/[username]/page.tsx',
    description:
      'Every published portfolio includes an optional contact form. Potential employers, freelance clients, or collaborators can write to you directly, with messages delivered to your centralized dashboard inbox.',
    items: [
      'Bot-protected contact form on your public URL',
      'Centralized dashboard inbox for tracking inbound inquiries',
      'Email notifications when a visitor contacts you',
    ],
  },
]

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(FEATURES[0].id)
  const active = FEATURES.find((f) => f.id === activeTab) || FEATURES[0]
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="w-full border-b border-border bg-background text-foreground py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          variants={shouldReduceMotion ? undefined : sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Built on real features, not placeholders.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Everything shown on DevLink corresponds to production handlers and database models in the application.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex border-b border-border overflow-x-auto gap-0" role="tablist">
          {FEATURES.map((feat) => {
            const isSelected = feat.id === activeTab
            return (
              <button
                key={feat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(feat.id)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'border-foreground text-foreground font-semibold bg-card'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }`}
              >
                <span>{feat.shortLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Feature Detail Split View */}
        <div className="border border-border rounded-[4px] bg-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={shouldReduceMotion ? undefined : tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border"
            >
              {/* Left Explanation (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-background">
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                    Source: {active.sourceFile}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {active.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {active.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-border pt-4">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                    Key Details
                  </span>
                  <ul className="space-y-1.5 text-xs text-foreground/90">
                    {active.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-mono">0{idx + 1}.</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Live Interactive Component View (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-card flex flex-col justify-center">
                {active.id === 'github-sync' && (
                  <div className="border border-border rounded-[4px] p-4 bg-background space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] text-muted-foreground">
                      <span>GITHUB API RESPONSE SAMPLE</span>
                      <span>STATUS: 200 OK</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 border border-border rounded-[3px] bg-card flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-foreground">raft-consensus-engine</div>
                          <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                            Distributed leader election and log replication module for Go.
                          </p>
                          <div className="flex gap-2 text-[10px] text-muted-foreground mt-2">
                            <span>Go</span>
                            <span>·</span>
                            <span>★ 412</span>
                            <span>·</span>
                            <span>Updated 2 days ago</span>
                          </div>
                        </div>
                        <span className="text-[10px] border border-border px-1.5 py-0.5 rounded-[2px] text-emerald-500">
                          Selected
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {active.id === 'templates' && (
                  <div className="border border-border rounded-[4px] p-4 bg-background space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] text-muted-foreground">
                      <span>ACTIVE THEME MANIFEST</span>
                      <span>RUNTIME SWITCHABLE</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                      <div className="border border-border p-3 rounded-[3px] bg-card">
                        <div className="font-semibold text-foreground">Bento</div>
                        <div className="text-[10px] text-muted-foreground mt-1">Multi-box grid</div>
                      </div>
                      <div className="border border-border p-3 rounded-[3px] bg-card">
                        <div className="font-semibold text-foreground">Minimal</div>
                        <div className="text-[10px] text-muted-foreground mt-1">Editorial list</div>
                      </div>
                      <div className="border border-border p-3 rounded-[3px] bg-card">
                        <div className="font-semibold text-foreground">Modern</div>
                        <div className="text-[10px] text-muted-foreground mt-1">Product cards</div>
                      </div>
                    </div>
                  </div>
                )}

                {active.id === 'inbox' && (
                  <div className="border border-border rounded-[4px] p-4 bg-background space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] text-muted-foreground">
                      <span>INBOUND INQUIRY RECORD</span>
                      <span>ENCRYPTED IN TRANSIT</span>
                    </div>
                    <div className="p-3 border border-border rounded-[3px] bg-card space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-foreground">From: Marcus Vance</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">Subject: Contract opportunity: Go backend</div>
                      <p className="text-xs text-foreground/80 font-sans leading-relaxed pt-1">
                        Saw your portfolio and distributed-cache project. Would love to discuss a 3-month consulting project.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

