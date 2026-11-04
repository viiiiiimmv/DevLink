'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { buttonInteraction } from '@/lib/animations'

export function FooterCTA() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="w-full bg-background text-foreground">
      {/* Closing Call to Action Section */}
      <div className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Ready to publish your portfolio?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect your GitHub account, choose your template, and publish your profile to a custom URL in less than two minutes. Free for all developers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
                <Link
                  href="/auth/signin"
                  className="inline-flex h-10 items-center justify-center rounded-[4px] bg-foreground px-5 text-xs font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Create your portfolio
                </Link>
              </motion.div>
              <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
                <Link
                  href="/discover"
                  className="inline-flex h-10 items-center justify-center rounded-[4px] border border-border bg-card px-4 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Browse portfolios
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border pb-8">
            <div className="space-y-1">
              <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-tight text-foreground" />
              <p className="text-xs text-muted-foreground font-mono">
                Developer portfolios and collaboration platform.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground" aria-label="Footer Navigation">
              <Link href="/discover" className="hover:text-foreground transition-colors">
                Discover
              </Link>
              <Link href="/sparkforge" className="hover:text-foreground transition-colors">
                SparkForge
              </Link>
              <Link href="/auth/signin" className="hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms &amp; Conditions
              </Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <div>
              © {new Date().getFullYear()} DevLink Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
