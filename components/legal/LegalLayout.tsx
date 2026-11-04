'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import type { LegalDocument } from '@/lib/legal-content'

interface LegalLayoutProps {
  doc: LegalDocument
  currentPath: '/privacy' | '/terms'
}

export function LegalLayout({ doc, currentPath }: LegalLayoutProps) {
  const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    doc.sections.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [doc.sections])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-none">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Logo href="/" iconSize={20} textClassName="text-sm font-semibold tracking-tight" />
            <span className="text-border">/</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Legal &amp; Policy
            </span>
          </div>

          <nav className="flex items-center gap-4 text-xs font-mono" aria-label="Legal document switcher">
            <Link
              href="/privacy"
              className={`transition-colors ${
                currentPath === '/privacy'
                  ? 'text-foreground font-semibold underline underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`transition-colors ${
                currentPath === '/terms'
                  ? 'text-foreground font-semibold underline underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="hidden sm:inline-block border border-border px-2.5 py-1 rounded-[3px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home →
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Container: 12-column Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Sticky Table of Contents (Desktop Sidebar - 4 cols) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="border border-border rounded-[4px] p-5 bg-card space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="border-b border-border pb-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Table of Contents
                </span>
                <div className="text-sm font-semibold text-foreground mt-0.5">
                  {doc.title}
                </div>
              </div>

              <nav className="space-y-1 text-xs" aria-label="Table of contents">
                {doc.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`block py-1 px-2 rounded-[2px] transition-colors truncate ${
                      activeId === sec.id
                        ? 'bg-foreground/10 text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="border-t border-border pt-3 text-[11px] font-mono text-muted-foreground">
                Last updated: {doc.lastUpdated}
              </div>
            </div>
          </aside>

          {/* Main Long-Form Legal Content (8 cols) */}
          <main className="lg:col-span-8 max-w-3xl space-y-10">
            {/* Title & Metadata */}
            <div className="border-b border-border pb-6 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                DOCUMENT IDENTIFIER // {currentPath.toUpperCase().replace('/', '')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {doc.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                <span>Last updated: {doc.lastUpdated}</span>
                <span>·</span>
                <span>Jurisdiction: Republic of India</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pt-2">
                {doc.intro}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {doc.sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-24 space-y-4 border-b border-border/60 pb-8 last:border-b-0"
                >
                  <h2 className="text-lg font-bold tracking-tight text-foreground flex items-center justify-between">
                    <span>{sec.title}</span>
                    <a
                      href={`#${sec.id}`}
                      className="text-xs font-mono text-muted-foreground/60 hover:text-foreground opacity-0 hover:opacity-100 transition-opacity"
                      aria-label={`Link to ${sec.title}`}
                    >
                      #
                    </a>
                  </h2>

                  <div className="space-y-3 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    {sec.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="space-y-4 pt-3 pl-3 border-l border-border/60">
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                            {sub.title}
                          </h3>
                          <div className="space-y-2 text-xs text-foreground/80 leading-relaxed">
                            {sub.content.map((subP, pIdx) => (
                              <p key={pIdx}>{subP}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Language Note */}
            <div className="border border-border rounded-[4px] p-5 bg-card space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Eighth Schedule Language Request
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In compliance with statutory requirements, this document is available in English and can be provided on request in any language specified in the Eighth Schedule to the Constitution of India. To request an alternate language version, please contact [privacy@devlink.me].
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Legal Footer */}
      <footer className="border-t border-border py-8 bg-card text-muted-foreground text-xs font-mono">
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            © {new Date().getFullYear()} DevLink Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

