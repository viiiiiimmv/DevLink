'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { tabContentVariants } from '@/lib/animations'

type TemplateType = 'bento' | 'minimal' | 'modern'
type TabMode = 'preview' | 'import'

interface SampleProject {
  id: string
  name: string
  description: string
  language: string
  stars: number
  selected: boolean
}

const SAMPLE_REPOS: SampleProject[] = [
  {
    id: 'repo-1',
    name: 'distributed-cache',
    description: 'In-memory cache cluster with Raft consensus and async replication.',
    language: 'Go',
    stars: 342,
    selected: true,
  },
  {
    id: 'repo-2',
    name: 'sql-query-engine',
    description: 'Vectorized SQL execution engine compiled to WebAssembly.',
    language: 'Rust',
    stars: 820,
    selected: true,
  },
  {
    id: 'repo-3',
    name: 'tailwind-tokens',
    description: 'Type-safe design token compiler for modern frontend design systems.',
    language: 'TypeScript',
    stars: 195,
    selected: true,
  },
]

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<TabMode>('preview')
  const [template, setTemplate] = useState<TemplateType>('bento')
  const [availability, setAvailability] = useState<'open_to_work' | 'freelance'>('open_to_work')
  const [repos, setRepos] = useState<SampleProject[]>(SAMPLE_REPOS)
  const shouldReduceMotion = useReducedMotion()

  const toggleRepo = (id: string) => {
    setRepos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    )
  }

  const selectedRepos = repos.filter((r) => r.selected)

  return (
    <div className="w-full border border-border bg-card rounded-[4px] overflow-hidden text-foreground">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/40 px-3 sm:px-4 py-2.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded-[3px] transition-colors ${
              activeTab === 'preview'
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Portfolio Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`px-2.5 py-1 rounded-[3px] transition-colors ${
              activeTab === 'import'
                ? 'bg-foreground text-background font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            GitHub Import Demo
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="flex items-center gap-1 border border-border rounded-[3px] p-0.5 bg-background">
            {(['bento', 'minimal', 'modern'] as TemplateType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTemplate(t)}
                className={`px-2 py-0.5 text-[10px] uppercase rounded-[2px] transition-colors ${
                  template === t
                    ? 'bg-foreground text-background font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Screen */}
      <div className="p-4 sm:p-6 bg-background min-h-[380px]">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key={`preview-${template}`}
              variants={shouldReduceMotion ? undefined : tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              {/* Profile Header Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      Priya Sharma
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      /priya
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Full-Stack Engineer building distributed systems and developer tools.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setAvailability((prev) =>
                        prev === 'open_to_work' ? 'freelance' : 'open_to_work'
                      )
                    }
                    className="inline-flex items-center gap-1.5 border border-border px-2 py-0.5 rounded-[3px] font-mono text-[10px] text-foreground bg-muted/40 hover:bg-muted transition-colors"
                    title="Click to toggle availability badge"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>
                      {availability === 'open_to_work'
                        ? 'Open to full-time'
                        : 'Available for freelance'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Layout Representation based on real templates */}
              {template === 'bento' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 border border-border rounded-[4px] p-3.5 bg-card space-y-2">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      Featured Project
                    </span>
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-semibold text-foreground">
                        {selectedRepos[0]?.name || 'distributed-cache'}
                      </h4>
                      <span className="font-mono text-[11px] text-amber-500">
                        ★ {selectedRepos[0]?.stars || 342}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedRepos[0]?.description ||
                        'In-memory cache cluster with Raft consensus.'}
                    </p>
                    <div className="flex gap-1.5 pt-1 font-mono text-[10px] text-muted-foreground">
                      <span className="border border-border px-1.5 py-0.5 rounded-[2px]">
                        {selectedRepos[0]?.language || 'Go'}
                      </span>
                      <span className="border border-border px-1.5 py-0.5 rounded-[2px]">
                        Raft
                      </span>
                    </div>
                  </div>

                  <div className="border border-border rounded-[4px] p-3.5 bg-card flex flex-col justify-between space-y-2">
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                        Primary Stack
                      </span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {['TypeScript', 'Go', 'Rust', 'PostgreSQL', 'Docker'].map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[10px] border border-border px-1.5 py-0.5 rounded-[2px] bg-muted/30"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground border-t border-border pt-2">
                      devlink.me/priya
                    </div>
                  </div>

                  {selectedRepos.slice(1).map((r) => (
                    <div
                      key={r.id}
                      className="border border-border rounded-[4px] p-3 bg-card space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground truncate">
                          {r.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          ★ {r.stars}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {r.description}
                      </p>
                      <span className="inline-block font-mono text-[10px] text-muted-foreground">
                        {r.language}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {template === 'minimal' && (
                <div className="border border-border rounded-[4px] p-4 bg-card divide-y divide-border">
                  <div className="pb-3 space-y-1">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      Selected Projects Index
                    </span>
                  </div>
                  {selectedRepos.map((r) => (
                    <div
                      key={r.id}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{r.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          [{r.language}]
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground font-mono text-[11px]">
                        <span className="truncate max-w-xs">{r.description}</span>
                        <span className="text-foreground">★ {r.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {template === 'modern' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedRepos.map((r) => (
                      <div
                        key={r.id}
                        className="border border-border rounded-[4px] p-3.5 bg-card space-y-2 hover:border-foreground/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground">
                            {r.name}
                          </span>
                          <span className="font-mono text-[10px] border border-border px-1.5 py-0.5 rounded-[2px]">
                            {r.language}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {r.description}
                        </p>
                        <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground pt-1 border-t border-border">
                          <span>Verified commit sync</span>
                          <span>★ {r.stars}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="import-tab"
              variants={shouldReduceMotion ? undefined : tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <div className="border-b border-border pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                    GitHub Repository Picker
                  </h4>
                  <p className="text-xs text-foreground mt-0.5">
                    Select which public repositories to include in your portfolio projects.
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {selectedRepos.length} of {repos.length} selected
                </span>
              </div>

              <div className="space-y-2">
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    onClick={() => toggleRepo(repo.id)}
                    className={`flex items-start justify-between p-3 rounded-[4px] border cursor-pointer transition-colors ${
                      repo.selected
                        ? 'border-foreground/40 bg-card'
                        : 'border-border bg-muted/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={repo.selected}
                        onChange={() => toggleRepo(repo.id)}
                        className="mt-0.5 h-3.5 w-3.5 rounded-[2px] border border-border"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-foreground font-mono">
                            {repo.name}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {repo.language}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {repo.description}
                        </p>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-muted-foreground shrink-0 ml-2">
                      ★ {repo.stars}
                    </div>
                  </div>
                ))}
              </div>

              <div className="font-mono text-[11px] text-muted-foreground border-t border-border pt-3 flex items-center justify-between">
                <span>API ROUTE: /api/import/github</span>
                <span>READ-ONLY OAUTH PERMISSIONS</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Frame Footer */}
      <div className="border-t border-border bg-card px-4 py-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>INTERACTIVE PORTFOLIO SLICE</span>
        <span>SWITCH TEMPLATES ABOVE TO TEST</span>
      </div>
    </div>
  )
}

