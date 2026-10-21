'use client'

import React from 'react'

interface LivePreviewWrapperProps {
  children: React.ReactNode
  urlSlug?: string
  className?: string
  headerExtra?: React.ReactNode
}

/**
 * Section 4.D Live Preview Pane Wrapper
 * - Visually isolates user-created themes from the DevLink editor UI
 * - Outer Bezel / Window Frame: #0B0F19 with border 1px solid #1E293B
 * - Top Header Bar: Background #0F172A, Height 40px, Border bottom 1px solid #1E293B
 * - Live Status Badge:
 *     Background: rgba(16, 185, 129, 0.12)
 *     Text: #10B981
 *     Border: 1px solid rgba(16, 185, 129, 0.25)
 *     Text String: "● LIVE SYNC ACTIVE" (Mono, 11px)
 */
export default function LivePreviewWrapper({
  children,
  urlSlug = 'devlink.run/preview',
  className = '',
  headerExtra,
}: LivePreviewWrapperProps) {
  return (
    <div
      className={`flex flex-col rounded-xl border border-[#1E293B] bg-[#0B0F19] overflow-hidden shadow-2xl transition-all ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex h-10 w-full items-center justify-between border-b border-[#1E293B] bg-[#0F172A] px-4 select-none shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Subtle Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]/60" />
          </div>

          {/* Technical Slug / URL Badge */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-[#1E293B]/70 border border-[#334155]/60 text-[12px] font-mono text-[#06B6D4]">
            <span className="opacity-50">https://</span>
            <span className="font-medium">{urlSlug}</span>
          </div>
        </div>

        {/* Right side controls & Live Status Badge */}
        <div className="flex items-center gap-2.5">
          {headerExtra}

          {/* Live Status Badge per Specification */}
          <div
            className="flex items-center gap-1.5 rounded-full border border-[#10B981]/25 bg-[#10B981]/[0.12] px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-[#10B981] shadow-xs"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]" />
            </span>
            <span>LIVE SYNC ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Pane Content Window */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#0B0F19]">
        {children}
      </div>
    </div>
  )
}
