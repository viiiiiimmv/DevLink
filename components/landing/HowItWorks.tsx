'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { sectionRevealVariants } from '@/lib/animations'

interface WorkflowStep {
  step: string
  title: string
  lead: string
  detail: string
  fileRef: string
}

const STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Authenticate and import projects',
    lead: 'Sign in with GitHub to load your public repositories.',
    detail:
      'DevLink queries your public repositories using read-only API scopes. You choose which repositories appear on your portfolio without sharing access to your private code or organization secrets.',
    fileRef: 'Implemented in app/api/import/github',
  },
  {
    step: '02',
    title: 'Select template and configure details',
    lead: 'Choose your presentation style and add professional context.',
    detail:
      'Pick between Bento, Minimal, and Modern layouts. Add your professional summary, technical competencies, work history, and availability status (e.g., Open to work or Freelance).',
    fileRef: 'Implemented in app/dashboard/customise',
  },
  {
    step: '03',
    title: 'Publish to your personal URL',
    lead: 'Share your link, generate a QR code, and get discovered.',
    detail:
      'Your portfolio is published to devlink.me/yourname with instant QR code generation for mobile networking. Published profiles automatically appear in the Discover directory.',
    fileRef: 'Implemented in app/[username]/page.tsx',
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Scroll-linked progress bar width (0% to 100%)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="w-full border-b border-border bg-background text-foreground py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          variants={shouldReduceMotion ? undefined : sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Setup Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              How it works: from repository to live link in three steps
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            No complex configuration or website maintenance. Everything is generated directly from your GitHub data.
          </p>
        </motion.div>

        {/* Scroll-Linked Progress Track */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>WORKFLOW PROGRESS</span>
            <span>STEPS 01 TO 03</span>
          </div>
          <div className="h-1 w-full bg-muted rounded-[2px] overflow-hidden">
            <motion.div
              style={{ width: shouldReduceMotion ? '100%' : progressWidth }}
              className="h-full bg-foreground transition-all duration-75"
            />
          </div>
        </div>

        {/* 3 Editorial Steps (No icons in colored circles) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-[4px] bg-card overflow-hidden">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="p-6 sm:p-8 flex flex-col justify-between space-y-8 bg-background hover:bg-card/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="font-mono text-3xl font-bold text-muted-foreground/30">
                    {s.step}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    STEP {s.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-xs font-medium text-foreground/90 leading-snug">
                    {s.lead}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {s.detail}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
                {s.fileRef}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
