import React from 'react'

const SYNC_LOGS = [
  {
    event: 'push: main',
    commit: '9f4b12a',
    repo: 'distributed-wal',
    action: 'Bump raft-consensus to v2.4.1 and update benchmarks',
    latency: '42ms',
    status: 'SYNCHRONIZED',
  },
  {
    event: 'release: create',
    commit: 'c810d4e',
    repo: 'vortex-cache',
    action: 'Cut release v1.0.8: zero-copy ring buffer IPC support',
    latency: '18ms',
    status: 'SYNCHRONIZED',
  },
  {
    event: 'push: writing',
    commit: '3a5f78b',
    repo: 'erostova/notes',
    action: 'Publish post: Designing high-throughput WALs in Rust',
    latency: '31ms',
    status: 'SYNCHRONIZED',
  },
  {
    event: 'stats: edge-tick',
    commit: 'ledger-sync',
    repo: 'all repos',
    action: 'Revalidate GitHub stars, contributors, and commit graphs',
    latency: '65ms',
    status: 'SYNCHRONIZED',
  },
]

export function SyncEngine() {
  return (
    <section id="sync-engine" className="w-full border-b border-editorial-border bg-editorial-bg text-editorial-text py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The Problem & Differentiator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
                {'// 04 The Engine'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-editorial-text mt-1 leading-tight">
                No more stale portfolios.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed">
              Every engineer has built a portfolio that they stopped updating six months later. Dead links to old side-projects, obsolete tech stacks, and outdated job titles.
            </p>

            <p className="text-xs sm:text-sm text-editorial-muted leading-relaxed">
              DevLink replaces manual site maintenance with a passive ledger. When you push commits or publish release tags to GitHub, DevLink reconciles metrics, updates dependencies, and redeploys your portfolio to the global edge within milliseconds.
            </p>

            {/* Differentiator Bullet Points */}
            <div className="space-y-3 border-t border-editorial-border pt-6 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-editorial-accent">01.</span>
                <div>
                  <span className="text-editorial-text font-semibold">Event-driven reconciliation:</span>
                  <span className="text-editorial-muted ml-1">
                    Lightweight GitHub webhooks trigger delta re-indexes on every merge.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-editorial-accent">02.</span>
                <div>
                  <span className="text-editorial-text font-semibold">Zero write access required:</span>
                  <span className="text-editorial-muted ml-1">
                    Public metadata only. DevLink cannot touch your codebase or secrets.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-editorial-accent">03.</span>
                <div>
                  <span className="text-editorial-text font-semibold">Sub-50ms edge delivery:</span>
                  <span className="text-editorial-muted ml-1">
                    Generated HTML is cached globally with stale-while-revalidate headers.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mechanical Sync Ledger (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-editorial-border rounded-[4px] bg-editorial-surface overflow-hidden">
              {/* Ledger Header */}
              <div className="flex items-center justify-between border-b border-editorial-border bg-editorial-bg px-4 py-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-editorial-accent animate-pulse" />
                  <span className="text-editorial-text font-medium">RECONCILIATION LEDGER</span>
                </div>
                <span className="text-editorial-muted text-[11px]">ACTIVE LISTENER</span>
              </div>

              {/* Ledger Rows */}
              <div className="divide-y divide-editorial-border bg-editorial-surface/40">
                {SYNC_LOGS.map((log) => (
                  <div
                    key={log.commit}
                    className="p-4 space-y-2 hover:bg-editorial-surface transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="border border-editorial-border px-1.5 py-0.5 rounded-[2px] bg-editorial-bg text-editorial-text text-[11px]">
                          {log.event}
                        </span>
                        <span className="text-editorial-muted text-[11px]">
                          sha: <span className="text-editorial-text">{log.commit}</span>
                        </span>
                        <span className="text-editorial-border">/</span>
                        <span className="text-editorial-muted text-[11px]">
                          repo: <span className="text-editorial-text">{log.repo}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-editorial-muted">{log.latency}</span>
                        <span className="text-editorial-accent font-semibold">{log.status}</span>
                      </div>
                    </div>

                    <p className="text-xs text-editorial-muted font-sans leading-normal">
                      {log.action}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ledger Footer */}
              <div className="border-t border-editorial-border bg-editorial-bg p-3 flex items-center justify-between font-mono text-[11px] text-editorial-muted">
                <span>ALL EVENTS CRYPTOGRAPHICALLY VERIFIED</span>
                <span>GITHUB WEBHOOK INTEGRATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
