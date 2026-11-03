'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-editorial-border bg-editorial-bg text-editorial-text">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-[-0.01em] text-editorial-text" />
          <nav className="hidden items-center gap-6 text-xs text-editorial-muted md:flex" aria-label="Main Navigation">
            <a
              href="#showcase"
              className="transition-colors hover:text-editorial-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
            >
              Showcase
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-editorial-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
            >
              How it works
            </a>
            <a
              href="#sync-engine"
              className="transition-colors hover:text-editorial-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
            >
              Sync engine
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="hidden text-xs text-editorial-muted transition-colors hover:text-editorial-text sm:inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex h-8 items-center justify-center rounded-[4px] bg-editorial-text px-3 text-xs font-medium text-editorial-bg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-accent focus-visible:ring-offset-2 focus-visible:ring-offset-editorial-bg"
          >
            Connect GitHub
          </Link>
        </div>
      </div>
    </header>
  )
}

