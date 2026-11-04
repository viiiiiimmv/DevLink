'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { buttonInteraction } from '@/lib/animations'

export function Nav() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-none text-foreground">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-tight text-foreground" />
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground sm:flex" aria-label="Main Navigation">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[2px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[2px]"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-[2px]"
          >
            Sign in
          </Link>
          <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
            <Link
              href="/auth/signin"
              className="inline-flex h-8 items-center justify-center rounded-[4px] bg-foreground px-3.5 text-xs font-medium text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Create portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
