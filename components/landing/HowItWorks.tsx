import React from 'react'

interface Step {
  num: string
  title: string
  lead: string
  detail: string
  specs: string[]
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Connect GitHub',
    lead: 'Read-only repository indexing with zero write scopes.',
    detail:
      'DevLink connects to your GitHub account using minimal read-only OAuth scopes. It indexes public repositories, release milestones, commits, and language distributions without requesting access to private code or team secrets.',
    specs: ['Read-only OAuth', 'Public repos & tags', 'Zero code modifications'],
  },
  {
    num: '02',
    title: 'Arrange Your Blocks',
    lead: 'Curate your narrative through modular engineering blocks.',
    detail:
      'Select which repositories, technical domains, and architecture documents represent your strongest work. Toggle blocks on or off, adjust ordering, and view the live compilation preview instantly.',
    specs: ['Pinned systems', 'Auto-derived stack', 'Markdown /writing sync'],
  },
  {
    num: '03',
    title: 'Publish & Never Touch It',
    lead: 'Continuous webhook sync keeps your work permanently fresh.',
    detail:
      'Deploy to devlink.me/yourname or your own custom domain with automated SSL. When you merge PRs or cut GitHub releases, DevLink recalculates metrics and updates your portfolio quietly in the background.',
    specs: ['Custom apex domains', 'Automated edge SSL', 'Webhook-triggered sync'],
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full border-b border-editorial-border bg-editorial-bg text-editorial-text py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-editorial-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-editorial-muted">
              {'// 03 Workflow'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-editorial-text mt-1">
              How DevLink operates
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-editorial-muted max-w-md">
            Built to eliminate the recurring chore of updating personal developer websites. Three deliberate steps from repository to live URL.
          </p>
        </div>

        {/* 3 Editorial Steps (No icons in tinted circles!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-editorial-border border border-editorial-border rounded-[4px] bg-editorial-surface overflow-hidden">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="p-6 sm:p-8 flex flex-col justify-between space-y-8 bg-editorial-bg hover:bg-editorial-surface/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-editorial-border pb-3">
                  <span className="font-mono text-3xl font-bold text-editorial-muted/40">
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] text-editorial-muted uppercase tracking-wider">
                    PHASE {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-editorial-text">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-editorial-text/90 leading-snug">
                    {step.lead}
                  </p>
                  <p className="text-xs text-editorial-muted leading-relaxed pt-1">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Step Specs */}
              <div className="space-y-1.5 border-t border-editorial-border pt-4">
                {step.specs.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2 font-mono text-[11px] text-editorial-muted"
                  >
                    <span className="text-editorial-accent">―</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
