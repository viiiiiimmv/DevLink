'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface BuilderBlock {
  id: 'projects' | 'stack' | 'writing' | 'activity'
  title: string
  label: string
  countLabel: string
  enabled: boolean
}

const INITIAL_BLOCKS: BuilderBlock[] = [
  {
    id: 'projects',
    title: 'Pinned Projects',
    label: 'Verified code & metrics',
    countLabel: '3 REPOS',
    enabled: true,
  },
  {
    id: 'stack',
    title: 'Stack & Tooling',
    label: 'Derived from repo manifests',
    countLabel: '6 SYSTEMS',
    enabled: true,
  },
  {
    id: 'writing',
    title: 'Engineering Notes',
    label: 'Markdown from /writing branch',
    countLabel: '2 POSTS',
    enabled: true,
  },
  {
    id: 'activity',
    title: 'Activity Ledger',
    label: 'Commit history & release tags',
    countLabel: '2,418 COMMITS',
    enabled: true,
  },
]

export function BuilderPreview() {
  const [blocks, setBlocks] = useState<BuilderBlock[]>(INITIAL_BLOCKS)
  const [activePreset, setActivePreset] = useState<'default' | 'minimal' | 'full'>('default')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)

  const toggleBlock = (id: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b))
    )
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= blocks.length) return
    const updated = [...blocks]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setBlocks(updated)
  }

  const applyPreset = (preset: 'default' | 'minimal' | 'full') => {
    setActivePreset(preset)
    if (preset === 'minimal') {
      setBlocks([
        { id: 'projects', title: 'Pinned Projects', label: 'Verified code & metrics', countLabel: '3 REPOS', enabled: true },
        { id: 'stack', title: 'Stack & Tooling', label: 'Derived from repo manifests', countLabel: '6 SYSTEMS', enabled: false },
        { id: 'writing', title: 'Engineering Notes', label: 'Markdown from /writing branch', countLabel: '2 POSTS', enabled: false },
        { id: 'activity', title: 'Activity Ledger', label: 'Commit history & release tags', countLabel: '2,418 COMMITS', enabled: true },
      ])
    } else if (preset === 'full') {
      setBlocks(INITIAL_BLOCKS.map((b) => ({ ...b, enabled: true })))
    } else {
      setBlocks(INITIAL_BLOCKS)
    }
  }

  const copyUrl = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://devlink.me/elena-rostova')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full border border-editorial-border bg-editorial-surface rounded-[4px] overflow-hidden text-editorial-text shadow-none">
      {/* Chrome Top Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-editorial-border bg-editorial-bg px-4 py-2.5 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent animate-pulse" />
          </span>
          <span className="font-mono text-[11px] text-editorial-muted tracking-tight">
            LIVE COMPOSER · SYNCED TO HEAD: <span className="text-editorial-text">9f4b12a</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 border border-editorial-border rounded-[4px] p-0.5 bg-editorial-surface">
            <button
              type="button"
              onClick={() => applyPreset('default')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                activePreset === 'default'
                  ? 'bg-editorial-elevated text-editorial-text'
                  : 'text-editorial-muted hover:text-editorial-text'
              }`}
            >
              Preset: Systems
            </button>
            <button
              type="button"
              onClick={() => applyPreset('minimal')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                activePreset === 'minimal'
                  ? 'bg-editorial-elevated text-editorial-text'
                  : 'text-editorial-muted hover:text-editorial-text'
              }`}
            >
              Minimal
            </button>
            <button
              type="button"
              onClick={() => applyPreset('full')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                activePreset === 'full'
                  ? 'bg-editorial-elevated text-editorial-text'
                  : 'text-editorial-muted hover:text-editorial-text'
              }`}
            >
              All Blocks
            </button>
          </div>

          <div className="flex items-center gap-1 border border-editorial-border rounded-[4px] p-0.5 bg-editorial-surface">
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-editorial-elevated text-editorial-text'
                  : 'text-editorial-muted hover:text-editorial-text'
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`px-2 py-0.5 text-[11px] font-mono rounded-[2px] transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-editorial-elevated text-editorial-text'
                  : 'text-editorial-muted hover:text-editorial-text'
              }`}
            >
              375px
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Grid (12-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-editorial-border">
        {/* Left Pane: Block Arrangement (4 cols on lg) */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-editorial-bg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-editorial-border pb-3">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-editorial-muted">
                  Layout Blocks
                </h3>
                <p className="text-[13px] text-editorial-text font-medium mt-0.5">
                  Toggle or reorder blocks to restructure
                </p>
              </div>
              <span className="font-mono text-[11px] text-editorial-accent">
                {blocks.filter((b) => b.enabled).length}/{blocks.length} active
              </span>
            </div>

            {/* Block Items */}
            <div className="space-y-2">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`group relative flex items-center justify-between p-3 rounded-[4px] border transition-all ${
                    block.enabled
                      ? 'border-editorial-border bg-editorial-surface hover:border-editorial-rule'
                      : 'border-editorial-border/40 bg-editorial-bg/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Order controls */}
                    <div className="flex flex-col gap-0.5 text-editorial-muted">
                      <button
                        type="button"
                        aria-label={`Move ${block.title} up`}
                        disabled={index === 0}
                        onClick={() => moveBlock(index, 'up')}
                        className="text-[10px] leading-none hover:text-editorial-text disabled:opacity-20 px-0.5"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${block.title} down`}
                        disabled={index === blocks.length - 1}
                        onClick={() => moveBlock(index, 'down')}
                        className="text-[10px] leading-none hover:text-editorial-text disabled:opacity-20 px-0.5"
                      >
                        ▼
                      </button>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-editorial-text truncate">
                          {block.title}
                        </span>
                        <span className="font-mono text-[10px] text-editorial-muted">
                          {block.countLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-editorial-muted truncate">
                        {block.label}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={block.enabled}
                    onClick={() => toggleBlock(block.id)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-accent ${
                      block.enabled ? 'bg-editorial-text' : 'bg-editorial-border'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-editorial-bg shadow transition duration-200 ease-in-out ${
                        block.enabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Persona Metadata card */}
          <div className="border border-editorial-border rounded-[4px] p-3 bg-editorial-surface/60 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-editorial-muted">
              <span>GITHUB HOOK</span>
              <span className="text-editorial-accent font-medium">CONNECTED</span>
            </div>
            <div className="font-mono text-[11px] text-editorial-text space-y-0.5">
              <div className="flex justify-between">
                <span className="text-editorial-muted">Source:</span>
                <span>github.com/erostova</span>
              </div>
              <div className="flex justify-between">
                <span className="text-editorial-muted">Deployment:</span>
                <span>devlink.me/elena-rostova</span>
              </div>
              <div className="flex justify-between">
                <span className="text-editorial-muted">Build ID:</span>
                <span>sha256-4b8c9a10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Live Rendered Output (8 cols on lg) */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-editorial-surface flex flex-col items-center justify-start overflow-hidden">
          {/* Target Browser Frame */}
          <div
            className={`w-full transition-all duration-300 border border-editorial-border rounded-[4px] bg-editorial-bg text-editorial-text ${
              viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-full'
            }`}
          >
            {/* Viewport header */}
            <div className="flex items-center justify-between border-b border-editorial-border px-3 py-2 bg-editorial-bg text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-editorial-border" />
                <span className="h-2 w-2 rounded-full bg-editorial-border" />
                <span className="h-2 w-2 rounded-full bg-editorial-border" />
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px] text-editorial-muted bg-editorial-surface border border-editorial-border px-2.5 py-0.5 rounded-[3px]">
                <span className="text-editorial-accent">https://</span>
                <span className="text-editorial-text font-medium">devlink.me/elena-rostova</span>
                <button
                  type="button"
                  onClick={copyUrl}
                  className="ml-1 text-[10px] text-editorial-muted hover:text-editorial-text"
                  title="Copy portfolio URL"
                >
                  {copied ? '✓' : '⧉'}
                </button>
              </div>

              <div className="text-[10px] font-mono text-editorial-muted">
                {viewMode === 'mobile' ? '375w' : '100%'}
              </div>
            </div>

            {/* Inner Live Portfolio Content */}
            <div className="p-5 sm:p-7 space-y-7 max-h-[520px] overflow-y-auto font-sans">
              {/* Profile Header */}
              <div className="space-y-3 border-b border-editorial-border pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold tracking-tight text-editorial-text">
                      Elena Rostova
                    </h4>
                    <p className="text-xs font-mono text-editorial-muted mt-0.5">
                      @erostova · Staff Systems Engineer
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block border border-editorial-border px-2 py-0.5 font-mono text-[10px] text-editorial-muted rounded-[2px]">
                      SAN FRANCISCO, CA
                    </span>
                  </div>
                </div>

                <p className="text-xs text-editorial-text/80 leading-relaxed max-w-xl">
                  Focusing on low-latency append-only storage engines, Raft consensus validation, and Linux kernel tracing. Previously infrastructure at CockroachDB.
                </p>

                <div className="flex flex-wrap gap-4 text-[11px] font-mono text-editorial-muted pt-1">
                  <div>
                    <span className="text-editorial-text font-semibold">2,418</span> commits
                  </div>
                  <div>
                    <span className="text-editorial-text font-semibold">3</span> core crates
                  </div>
                  <div>
                    <span className="text-editorial-text font-semibold">14</span> releases shipped
                  </div>
                </div>
              </div>

              {/* Dynamic Rendered Blocks in Active Order */}
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {blocks.map((block) => {
                    if (!block.enabled) return null

                    if (block.id === 'projects') {
                      return (
                        <motion.section
                          key="projects"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-1.5">
                            <span className="font-mono text-[11px] tracking-wider uppercase text-editorial-muted">
                              {'// 01 Pinned Systems'}
                            </span>
                            <span className="font-mono text-[10px] text-editorial-muted">
                              3 REPOSITORIES
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {/* Project 1 */}
                            <div className="p-3 border border-editorial-border rounded-[4px] bg-editorial-surface/40 hover:bg-editorial-surface transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-semibold text-editorial-text">
                                      distributed-wal
                                    </span>
                                    <span className="font-mono text-[9px] px-1 py-0.5 border border-editorial-border rounded-[2px] text-editorial-accent">
                                      v2.4.1
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-editorial-muted leading-normal">
                                    Zero-copy write-ahead log with Raft group commit pipelining and io_uring backpressure.
                                  </p>
                                </div>
                                <div className="font-mono text-[11px] text-editorial-muted text-right">
                                  ★ 1,420
                                </div>
                              </div>
                              <div className="mt-2.5 flex items-center gap-4 text-[10px] font-mono text-editorial-muted">
                                <span>Rust · 94%</span>
                                <span>Throughput: 1.2M msg/s</span>
                                <span>Tests: 182 passed</span>
                              </div>
                            </div>

                            {/* Project 2 */}
                            <div className="p-3 border border-editorial-border rounded-[4px] bg-editorial-surface/40 hover:bg-editorial-surface transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-semibold text-editorial-text">
                                      vortex-cache
                                    </span>
                                    <span className="font-mono text-[9px] px-1 py-0.5 border border-editorial-border rounded-[2px] text-editorial-muted">
                                      v1.0.8
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-editorial-muted leading-normal">
                                    Shared-memory lockless ring buffer cache for Linux IPC with zero kernel boundary hops.
                                  </p>
                                </div>
                                <div className="font-mono text-[11px] text-editorial-muted text-right">
                                  ★ 890
                                </div>
                              </div>
                              <div className="mt-2.5 flex items-center gap-4 text-[10px] font-mono text-editorial-muted">
                                <span>C++20 · 88%</span>
                                <span>Latency: p99 &lt; 400ns</span>
                              </div>
                            </div>
                          </div>
                        </motion.section>
                      )
                    }

                    if (block.id === 'stack') {
                      return (
                        <motion.section
                          key="stack"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-1.5">
                            <span className="font-mono text-[11px] tracking-wider uppercase text-editorial-muted">
                              {'// 02 Core Stack & Primitives'}
                            </span>
                            <span className="font-mono text-[10px] text-editorial-muted">
                              VERIFIED FROM COMMITS
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                              { name: 'Rust', metric: '64k LOC' },
                              { name: 'C++20', metric: '38k LOC' },
                              { name: 'Linux eBPF', metric: '14 probes' },
                              { name: 'RocksDB', metric: 'Engine internals' },
                              { name: 'Go', metric: '22k LOC' },
                              { name: 'io_uring', metric: 'Async kernel IO' },
                            ].map((item) => (
                              <div
                                key={item.name}
                                className="border border-editorial-border rounded-[3px] p-2 bg-editorial-surface/30"
                              >
                                <div className="text-xs font-mono font-medium text-editorial-text">
                                  {item.name}
                                </div>
                                <div className="text-[10px] font-mono text-editorial-muted">
                                  {item.metric}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.section>
                      )
                    }

                    if (block.id === 'writing') {
                      return (
                        <motion.section
                          key="writing"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-1.5">
                            <span className="font-mono text-[11px] tracking-wider uppercase text-editorial-muted">
                              {'// 03 Engineering Notes'}
                            </span>
                            <span className="font-mono text-[10px] text-editorial-muted">
                              SYNCED FROM /BLOG
                            </span>
                          </div>

                          <div className="space-y-2">
                            <div className="border border-editorial-border rounded-[3px] p-2.5 flex items-center justify-between hover:border-editorial-rule transition-colors">
                              <div>
                                <h5 className="text-xs font-medium text-editorial-text">
                                  Designing high-throughput write-ahead logs in Rust
                                </h5>
                                <span className="font-mono text-[10px] text-editorial-muted">
                                  12 MIN READ · 24 BENCHMARKS
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-editorial-muted">
                                2026.08
                              </span>
                            </div>

                            <div className="border border-editorial-border rounded-[3px] p-2.5 flex items-center justify-between hover:border-editorial-rule transition-colors">
                              <div>
                                <h5 className="text-xs font-medium text-editorial-text">
                                  Compaction heuristics under heavy write-amplification
                                </h5>
                                <span className="font-mono text-[10px] text-editorial-muted">
                                  8 MIN READ · PRODUCTION TRACES
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-editorial-muted">
                                2026.04
                              </span>
                            </div>
                          </div>
                        </motion.section>
                      )
                    }

                    if (block.id === 'activity') {
                      return (
                        <motion.section
                          key="activity"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div className="flex items-center justify-between border-b border-editorial-border/60 pb-1.5">
                            <span className="font-mono text-[11px] tracking-wider uppercase text-editorial-muted">
                              {'// 04 Recent Activity'}
                            </span>
                            <span className="font-mono text-[10px] text-editorial-muted">
                              PAST 30 DAYS
                            </span>
                          </div>

                          <div className="border border-editorial-border rounded-[3px] p-3 space-y-2 bg-editorial-surface/30">
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="text-editorial-text font-medium">
                                distributed-wal: release v2.4.1
                              </span>
                              <span className="text-editorial-muted">3h ago</span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="text-editorial-text font-medium">
                                fix(consensus): resolve term mismatch in quorum election
                              </span>
                              <span className="text-editorial-muted">1d ago</span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="text-editorial-text font-medium">
                                perf(ringbuffer): batch tail cache eviction
                              </span>
                              <span className="text-editorial-muted">3d ago</span>
                            </div>
                          </div>
                        </motion.section>
                      )
                    }

                    return null
                  })}
                </AnimatePresence>
              </div>

              {/* Portfolio Footer inside preview */}
              <div className="pt-4 border-t border-editorial-border flex items-center justify-between text-[10px] font-mono text-editorial-muted">
                <span>devlink.me/elena-rostova</span>
                <span>GENERATED BY DEVLINK ENGINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
