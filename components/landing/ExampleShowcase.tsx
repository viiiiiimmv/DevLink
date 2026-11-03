'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PortfolioExample {
  id: string
  name: string
  handle: string
  role: string
  archetype: string
  bio: string
  location: string
  stats: { label: string; value: string }[]
  highlights: { title: string; subtitle: string; tag: string; metric: string }[]
  stack: string[]
  noteTitle: string
  noteSnippet: string
}

const EXAMPLES: PortfolioExample[] = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    handle: 'elena-rostova',
    role: 'Staff Distributed Systems Engineer',
    archetype: 'Systems & Infrastructure',
    bio: 'Append-only storage engines, Raft-based consensus primitives, and Linux io_uring kernel async execution. Ex-CockroachDB.',
    location: 'San Francisco, CA',
    stats: [
      { label: 'Commits (1y)', value: '2,418' },
      { label: 'PRs Merged', value: '142' },
      { label: 'Crates Published', value: '4' },
      { label: 'Open Source Stars', value: '2.9k' },
    ],
    highlights: [
      {
        title: 'distributed-wal',
        subtitle: 'Zero-copy write-ahead log with pipelined group commit and Raft heartbeats.',
        tag: 'Rust / C++',
        metric: '1.2M msg/sec',
      },
      {
        title: 'vortex-cache',
        subtitle: 'Lockless shared-memory ring buffer cache with zero user/kernel boundary copying.',
        tag: 'C++20 / Linux',
        metric: 'p99 < 380ns',
      },
      {
        title: 'tracing-flame',
        subtitle: 'Continuous eBPF profiling daemon for distributed cluster tail latency anomalies.',
        tag: 'eBPF / Go',
        metric: '< 1% CPU overhead',
      },
    ],
    stack: ['Rust', 'C++20', 'Linux eBPF', 'RocksDB', 'Go', 'io_uring'],
    noteTitle: 'Designing high-throughput write-ahead logs in Rust',
    noteSnippet: 'Benchmarking fsync strategies across NVMe drives and mitigating p99 tail latency spikes during Raft log compaction.',
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    handle: 'mchen',
    role: 'Staff Frontend & Developer Experience Engineer',
    archetype: 'Developer Tooling & UI Systems',
    bio: 'Building accessible design token pipelines, terminal-based layout engines, and real-time multiplayer code review tools.',
    location: 'Brooklyn, NY',
    stats: [
      { label: 'Commits (1y)', value: '1,894' },
      { label: 'RFCs Authored', value: '18' },
      { label: 'npm Downloads/mo', value: '420k' },
      { label: 'Open Source Stars', value: '4.1k' },
    ],
    highlights: [
      {
        title: 'token-forge',
        subtitle: 'Deterministic multi-platform design token compiler with type-safe CSS and Swift bindings.',
        tag: 'TypeScript / Rust',
        metric: '420k dl/mo',
      },
      {
        title: 'term-canvas',
        subtitle: 'Immediate-mode terminal GUI toolkit supporting flexible flexbox layouts and cursor rendering.',
        tag: 'TypeScript / Node',
        metric: '1.8k stars',
      },
      {
        title: 'diff-stream',
        subtitle: 'Incremental AST syntax difference highlighting engine for collaborative web editors.',
        tag: 'WebAssembly',
        metric: '60fps diffs',
      },
    ],
    stack: ['TypeScript', 'React', 'Rust/Wasm', 'Node.js', 'Tailwind', 'GraphQL'],
    noteTitle: 'Why design tokens should be compiled, not interpreted',
    noteSnippet: 'Lessons from migrating a 400-engineer design system to strict zero-runtime token artifacts.',
  },
  {
    id: 'aria',
    name: 'Aria Lindqvist',
    handle: 'lindqvist',
    role: 'Compiler & Graphics Research Engineer',
    archetype: 'Compilers & WebGPU',
    bio: 'Shader compilers, WGSL optimization passes, and hardware-accelerated volumetric rendering for scientific simulation in the browser.',
    location: 'Stockholm, Sweden',
    stats: [
      { label: 'Commits (1y)', value: '1,620' },
      { label: 'Papers Published', value: '3' },
      { label: 'WGSL Shaders', value: '86' },
      { label: 'Open Source Stars', value: '1.7k' },
    ],
    highlights: [
      {
        title: 'flux-wgsl',
        subtitle: 'Ahead-of-time WGSL shader optimizer and dead code eliminator with SPIR-V translation.',
        tag: 'Rust / WebGPU',
        metric: '2.4x smaller bytecode',
      },
      {
        title: 'volumetric-smoke',
        subtitle: 'Sparse voxel octree fluid simulation rendering 100M particles in real-time in Chromium.',
        tag: 'WGSL / C++',
        metric: '120fps @ 4K',
      },
      {
        title: 'ast-tracer',
        subtitle: 'Visual compiler intermediate-representation pipeline debugger and control flow graph viewer.',
        tag: 'Rust / Canvas',
        metric: 'Used by 12 labs',
      },
    ],
    stack: ['Rust', 'WebGPU', 'WGSL', 'LLVM', 'C++', 'OpenGL'],
    noteTitle: 'Real-time sparse voxel octrees on mobile WebGPU runtimes',
    noteSnippet: 'Exploiting compute workgroup memory hierarchies to eliminate GPU memory bandwidth bottlenecks.',
  },
]

export function ExampleShowcase() {
  const [activeId, setActiveId] = useState('elena')
  const active = EXAMPLES.find((e) => e.id === activeId) || EXAMPLES[0]

  return (
    <section id="showcase" className="w-full border-b border-editorial-border bg-editorial-bg text-editorial-text py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-editorial-border pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
              {'// 02 Proof of Output'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-editorial-text mt-1">
              Live portfolios. Honest engineering proof.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-editorial-muted max-w-md">
            Different specialties require different emphasis. Switch personas to inspect how DevLink shapes output for systems engineers, UI architects, and compiler researchers.
          </p>
        </div>

        {/* Persona Selector Tabs (Monochromatic & Clean) */}
        <div className="flex border-b border-editorial-border overflow-x-auto gap-0 mb-8" role="tablist">
          {EXAMPLES.map((ex) => {
            const isSelected = ex.id === activeId
            return (
              <button
                key={ex.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveId(ex.id)}
                className={`flex items-center gap-3 px-5 py-3 text-xs font-mono border-b-2 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'border-editorial-text text-editorial-text font-semibold bg-editorial-surface'
                    : 'border-transparent text-editorial-muted hover:text-editorial-text hover:bg-editorial-surface/40'
                }`}
              >
                <span>{ex.name}</span>
                <span className="text-[10px] text-editorial-subtle font-normal">
                  [{ex.archetype}]
                </span>
              </button>
            )
          })}
        </div>

        {/* Large Single Display (NOT A CARD GRID) */}
        <div className="border border-editorial-border rounded-[4px] bg-editorial-surface overflow-hidden">
          {/* Top Dossier Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-editorial-border bg-editorial-bg px-4 py-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-editorial-muted">ARCHETYPE:</span>
              <span className="text-editorial-text font-semibold">{active.archetype}</span>
              <span className="text-editorial-border">/</span>
              <span className="text-editorial-muted">URL:</span>
              <span className="text-editorial-accent">devlink.me/{active.handle}</span>
            </div>

            <div className="flex items-center gap-3 text-editorial-muted text-[11px]">
              <span>UPDATED VIA GITHUB HOOK</span>
              <span>·</span>
              <span>100% LIGHTHOUSE PERFORMANCE</span>
            </div>
          </div>

          {/* Large Editorial Layout: 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-editorial-border">
            {/* Left Bio Column (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 space-y-6 bg-editorial-bg">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-editorial-text">
                  {active.name}
                </h3>
                <div className="text-xs font-mono text-editorial-muted mt-1">
                  {active.role}
                </div>
                <div className="text-[11px] font-mono text-editorial-subtle mt-0.5">
                  {active.location}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-editorial-text/80 leading-relaxed">
                {active.bio}
              </p>

              {/* Quantified Stats */}
              <div className="space-y-2 border-t border-editorial-border pt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-editorial-muted">
                  Verified GitHub Ledger
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {active.stats.map((st) => (
                    <div
                      key={st.label}
                      className="border border-editorial-border p-2.5 rounded-[3px] bg-editorial-surface/40"
                    >
                      <div className="text-base font-bold font-mono text-editorial-text">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-mono text-editorial-muted">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2 border-t border-editorial-border pt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-editorial-muted">
                  Tooling &amp; Runtime Manifest
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.stack.map((item) => (
                    <span
                      key={item}
                      className="border border-editorial-border px-2 py-0.5 font-mono text-[11px] text-editorial-text rounded-[2px] bg-editorial-surface/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Work Presentation (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 space-y-8 bg-editorial-surface/40">
              {/* Highlight Projects Block */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-editorial-border pb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
                    {'// Indexed Repositories & Crates'}
                  </span>
                  <span className="font-mono text-[11px] text-editorial-muted">
                    AUTOMATICALLY PARSED
                  </span>
                </div>

                <div className="space-y-3">
                  {active.highlights.map((proj) => (
                    <div
                      key={proj.title}
                      className="border border-editorial-border p-4 rounded-[4px] bg-editorial-bg hover:border-editorial-rule transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-bold text-editorial-text">
                            {proj.title}
                          </span>
                          <span className="font-mono text-[10px] border border-editorial-border px-1.5 py-0.5 rounded-[2px] text-editorial-muted">
                            {proj.tag}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-editorial-accent">
                          {proj.metric}
                        </span>
                      </div>
                      <p className="text-xs text-editorial-muted mt-2 leading-relaxed">
                        {proj.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Writing Block */}
              <div className="space-y-3 border-t border-editorial-border pt-6">
                <div className="flex items-center justify-between border-b border-editorial-border pb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
                    {'// Technical Writing Block'}
                  </span>
                  <span className="font-mono text-[11px] text-editorial-muted">
                    SYNCED MARKDOWN
                  </span>
                </div>

                <div className="border border-editorial-border p-4 rounded-[4px] bg-editorial-bg">
                  <h4 className="text-sm font-semibold text-editorial-text">
                    {active.noteTitle}
                  </h4>
                  <p className="text-xs text-editorial-muted mt-1 leading-relaxed">
                    {active.noteSnippet}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
