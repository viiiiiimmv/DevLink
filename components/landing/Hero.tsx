'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { heroContainerVariants, heroItemVariants, buttonInteraction } from '@/lib/animations'
import { InteractiveDemo } from '@/components/landing/InteractiveDemo'

export function Hero() {
  const router = useRouter()
  const [handle, setHandle] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = handle.trim().replace(/^@/, '')
    if (clean) {
      router.push(`/auth/signin?from=${encodeURIComponent(`/${clean}`)}`)
    } else {
      router.push('/auth/signin')
    }
  }

  return (
    <section className="relative w-full border-b border-border bg-background text-foreground pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={shouldReduceMotion ? undefined : heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Top Label */}
          <motion.div variants={heroItemVariants} className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              Developer Portfolio Builder and Collaboration Platform
            </span>
          </motion.div>

          {/* Asymmetric 12-Column Grid: Headline & Action on Left (7 cols), Centerpiece on Right (5 cols) or Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <motion.h1
                variants={heroItemVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.12]"
              >
                Create a public developer portfolio from your GitHub repositories.
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl"
              >
                DevLink imports your projects, formats your tech stack and experience into a clean portfolio at your custom link, and connects you with other developers.
              </motion.p>

              {/* CTAs and Handle Claim */}
              <motion.div variants={heroItemVariants} className="space-y-4 pt-2">
                <form onSubmit={handleClaim} className="flex max-w-md items-center gap-2">
                  <div className="relative flex items-center flex-1 border border-border rounded-[4px] bg-card px-3 py-2 focus-within:border-foreground transition-colors">
                    <span className="font-mono text-xs text-muted-foreground select-none">
                      devlink.me/
                    </span>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="username"
                      aria-label="Choose your DevLink portfolio username"
                      className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none ml-0.5"
                    />
                  </div>

                  <motion.div {...(shouldReduceMotion ? {} : buttonInteraction)}>
                    <button
                      type="submit"
                      className="inline-flex h-9 items-center justify-center rounded-[4px] bg-foreground px-4 text-xs font-semibold text-background transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      Claim URL
                    </button>
                  </motion.div>
                </form>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                  <Link
                    href="/auth/signin"
                    className="text-foreground hover:underline font-semibold"
                  >
                    Create your portfolio →
                  </Link>
                  <span className="text-border">/</span>
                  <Link
                    href="/auth/signin"
                    className="hover:text-foreground transition-colors"
                  >
                    Sign in to your account
                  </Link>
                </div>
              </motion.div>

              {/* Verified Features Checklist */}
              <motion.div variants={heroItemVariants} className="pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="text-foreground">✓</span>
                  <span>GitHub repository import</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">✓</span>
                  <span>Custom URL and QR code</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">✓</span>
                  <span>Bento, Minimal, Modern layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-foreground">✓</span>
                  <span>Direct visitor inbox</span>
                </div>
              </motion.div>
            </div>

            {/* Interactive Slice on the Right (6 cols) */}
            <motion.div variants={heroItemVariants} className="lg:col-span-6">
              <InteractiveDemo />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
