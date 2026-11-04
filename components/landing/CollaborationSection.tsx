'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { sectionRevealVariants, buttonInteraction } from '@/lib/animations'

export function CollaborationSection() {
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
              Developer Discovery and Collaboration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Find other developers and build together.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            DevLink is more than a static portfolio. It includes a public discovery feed and a collaborative project idea board called SparkForge.
          </p>
        </motion.div>

        {/* 2-Column Split: Discover vs SparkForge */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Card 1: Discover Directory */}
          <div className="border border-border rounded-[4px] p-6 sm:p-8 bg-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-xs">
                <span className="text-muted-foreground uppercase tracking-wider">
                  DISCOVERY DIRECTORY
                </span>
                <span className="text-foreground">/discover</span>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Browse developer portfolios by skill and stack
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Search published portfolios across the community. Filter by engineering competencies, review featured open-source repositories, and reach out directly through portfolio contact forms.
              </p>

              <div className="space-y-2 border border-border p-3.5 rounded-[4px] bg-background font-mono text-xs">
                <div className="text-[11px] text-muted-foreground">SAMPLE DIRECTORY QUERY:</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="border border-border px-2 py-0.5 rounded-[2px] bg-card">
                    Go
                  </span>
                  <span className="border border-border px-2 py-0.5 rounded-[2px] bg-card">
                    Rust
                  </span>
                  <span className="border border-border px-2 py-0.5 rounded-[2px] bg-card">
                    Distributed Systems
                  </span>
                  <span className="border border-border px-2 py-0.5 rounded-[2px] bg-card">
                    Available for freelance
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
                <Link
                  href="/auth/signin"
                  className="inline-flex h-9 items-center justify-center rounded-[4px] border border-border bg-background px-4 text-xs font-mono text-foreground hover:bg-muted/50 transition-colors"
                >
                  Sign in to browse directory →
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Card 2: SparkForge Collaboration Board */}
          <div className="border border-border rounded-[4px] p-6 sm:p-8 bg-card space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-xs">
                <span className="text-muted-foreground uppercase tracking-wider">
                  COLLABORATION BOARD
                </span>
                <span className="text-foreground">/sparkforge</span>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground">
                SparkForge: post project ideas and find teammates
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Have a side project concept or open-source initiative? Post your idea, tag the required tech stack, and specify the collaboration type (Cofounder, Open Source, Freelance, or Hackathon).
              </p>

              <div className="space-y-2 border border-border p-3.5 rounded-[4px] bg-background font-mono text-xs">
                <div className="text-[11px] text-muted-foreground">COLLABORATION CATEGORIES:</div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="border border-border p-2 rounded-[2px] bg-card">
                    <span className="text-foreground font-semibold">Cofounder</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Early stage startup</p>
                  </div>
                  <div className="border border-border p-2 rounded-[2px] bg-card">
                    <span className="text-foreground font-semibold">Open Source</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Community tooling</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
                <Link
                  href="/auth/signin"
                  className="inline-flex h-9 items-center justify-center rounded-[4px] border border-border bg-background px-4 text-xs font-mono text-foreground hover:bg-muted/50 transition-colors"
                >
                  Sign in to join SparkForge →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

