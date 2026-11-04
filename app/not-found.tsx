'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, LogIn, Terminal } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { SimpleThemeToggle } from '@/components/ui/theme-toggle'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-border bg-background/95 sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-tight text-foreground" />
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground border border-border px-2 py-0.5 rounded-[4px] bg-muted/30">
              <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent animate-pulse" />
              STATUS: 404_NOT_FOUND
            </span>
            <SimpleThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl mx-auto text-center space-y-6">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground border border-border px-2.5 py-1 rounded-[4px] bg-card">
            <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent" />
            <span>Routing Error // 404</span>
          </div>

          {/* Heading and Description */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Route does not resolve.
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              The requested path does not exist, was moved, or requires an active developer session to access.
            </p>
          </div>

          {/* Diagnostic Slice */}
          <div className="rounded-[4px] border border-border bg-card p-4 text-left font-mono text-xs shadow-none">
            <div className="flex items-center justify-between border-b border-border pb-2.5 mb-3 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" />
                <span className="text-[11px]">devlink.tracer</span>
              </div>
              <span className="text-[10px] text-muted-foreground/60">HTTP/2 404</span>
            </div>

            <div className="space-y-1.5 text-muted-foreground text-[11px] leading-relaxed">
              <div className="flex gap-2">
                <span className="text-foreground select-none">$</span>
                <span className="text-foreground">devlink resolve --target requested_route</span>
              </div>
              <div className="pl-3.5 text-muted-foreground/80">
                <p>→ gateway: edge_router_01</p>
                <p>→ match: [none] (target node unreachable or private)</p>
                <p>→ policy: default-deny access control active</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex h-9 items-center justify-center gap-2 rounded-[4px] bg-foreground px-4 text-xs font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return Home
            </Link>

            <Link
              href="/auth/signin"
              className="w-full sm:w-auto inline-flex h-9 items-center justify-center gap-2 rounded-[4px] border border-border bg-card px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <LogIn className="h-3.5 w-3.5 text-muted-foreground" />
              Sign in to Workspace
            </Link>
          </div>

          {/* Secondary Links */}
          <p className="text-xs text-muted-foreground/80 pt-2">
            Looking for legal info? Review our{' '}
            <Link href="/privacy" className="underline hover:text-foreground underline-offset-4">
              Privacy Policy
            </Link>{' '}
            or{' '}
            <Link href="/terms" className="underline hover:text-foreground underline-offset-4">
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-border py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-muted-foreground">
          <span>DevLink © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
