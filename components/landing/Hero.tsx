'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BuilderPreview } from '@/components/landing/BuilderPreview'

export function Hero() {
  const router = useRouter()
  const [handle, setHandle] = useState('')

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = handle.trim().replace(/^@/, '')
    if (clean) {
      router.push(`/auth/signin?handle=${encodeURIComponent(clean)}`)
    } else {
      router.push('/auth/signin')
    }
  }

  return (
    <section className="relative w-full border-b border-editorial-border bg-editorial-bg text-editorial-text pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Metadata Line */}
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] text-editorial-muted tracking-tight">
          <span className="inline-flex items-center gap-1.5 border border-editorial-border bg-editorial-surface px-2.5 py-1 rounded-[3px] text-editorial-text">
            <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent" />
            DEVLINK ENGINE v3.2
          </span>
          <span className="hidden sm:inline-block text-editorial-border">/</span>
          <span className="hidden sm:inline-block">GITHUB REPOSITORY SYNC</span>
          <span className="hidden sm:inline-block text-editorial-border">/</span>
          <span className="hidden sm:inline-block">ZERO MAINTENANCE OVERHEAD</span>
        </div>

        {/* Headline + Subhead on Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-editorial-text leading-[1.08] text-left">
              A portfolio that updates itself when you ship code.
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-sm sm:text-base text-editorial-muted leading-relaxed text-left">
              Connect your GitHub, arrange your project and writing blocks, and publish to a custom domain in seconds.
            </p>

            {/* CTAs and quick handle claim */}
            <div className="space-y-3">
              <form onSubmit={handleClaim} className="flex items-center gap-1.5">
                <div className="relative flex items-center flex-1 border border-editorial-border rounded-[4px] bg-editorial-surface px-3 py-1.5 focus-within:border-editorial-text transition-colors">
                  <span className="font-mono text-xs text-editorial-muted select-none">
                    devlink.me/
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="yourhandle"
                    aria-label="Your desired DevLink username"
                    className="w-full bg-transparent font-mono text-xs text-editorial-text placeholder:text-editorial-subtle focus:outline-none ml-0.5"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-[4px] bg-editorial-text px-4 text-xs font-semibold text-editorial-bg transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-accent"
                >
                  Claim
                </button>
              </form>

              <div className="flex items-center justify-between text-xs font-mono text-editorial-muted">
                <Link
                  href="/auth/signin"
                  className="text-editorial-text hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-muted"
                >
                  Connect with GitHub →
                </Link>
                <a
                  href="#showcase"
                  className="text-editorial-muted hover:text-editorial-text transition-colors"
                >
                  See example portfolios ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Centerpiece: Real Product Slice */}
        <div className="w-full">
          <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-editorial-muted">
            <span>FIGURE 1.0 — INTERACTIVE BLOCK COMPOSER</span>
            <span className="hidden sm:inline">TRY TOGGLING AND REORDERING BLOCKS</span>
          </div>
          <BuilderPreview />
        </div>
      </div>
    </section>
  )
}

