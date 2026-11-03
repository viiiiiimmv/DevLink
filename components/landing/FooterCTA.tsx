'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function FooterCTA() {
  return (
    <footer className="w-full bg-editorial-bg text-editorial-text">
      {/* Final Pre-Footer Action Section */}
      <div className="border-b border-editorial-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
              {'// 05 Deploy'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-editorial-text leading-tight">
              Start with your GitHub handle.
            </h2>
            <p className="text-sm text-editorial-muted leading-relaxed max-w-xl">
              Connect your repositories, arrange your engineering blocks, and publish your live portfolio. Free for public repositories, with custom domain support included.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/auth/signin"
                className="inline-flex h-10 items-center justify-center rounded-[4px] bg-editorial-text px-5 text-xs font-semibold text-editorial-bg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-accent"
              >
                Connect GitHub
              </Link>
              <a
                href="#showcase"
                className="inline-flex h-10 items-center justify-center rounded-[4px] border border-editorial-border bg-editorial-surface px-4 text-xs font-mono text-editorial-muted transition-colors hover:text-editorial-text hover:border-editorial-rule focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
              >
                Explore example portfolios
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-editorial-border pb-8">
            <div className="space-y-1">
              <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-[-0.01em] text-editorial-text" />
              <p className="text-xs text-editorial-muted font-mono">
                An index for engineers who ship. Zero maintenance overhead.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-6 text-xs font-mono text-editorial-muted" aria-label="Footer Navigation">
              <a href="#showcase" className="hover:text-editorial-text transition-colors">
                Showcase
              </a>
              <a href="#how-it-works" className="hover:text-editorial-text transition-colors">
                Workflow
              </a>
              <a href="#sync-engine" className="hover:text-editorial-text transition-colors">
                Sync Engine
              </a>
              <Link href="/auth/signin" className="hover:text-editorial-text transition-colors">
                Sign in
              </Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-editorial-subtle">
            <div>
              © {new Date().getFullYear()} DevLink. Public metadata only. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent" />
              <span className="text-editorial-muted">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
