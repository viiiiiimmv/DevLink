'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  Check,
  Zap,
  UsersRound,
  MessageSquare,
  Globe,
  Github,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Flame,
  Search,
  CheckCircle2,
  Share2
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SimpleThemeToggle } from '@/components/ui/theme-toggle'

type TabType = 'portfolio' | 'terminal' | 'sparkforge'

export default function Home() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('portfolio')
  const [handleInput, setHandleInput] = useState('')
  const [sparkClicked, setSparkClicked] = useState(false)
  const [sparkCount, setSparkCount] = useState(142)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleSparkToggle = () => {
    if (!sparkClicked) {
      setSparkClicked(true)
      setSparkCount((prev) => prev + 1)
    } else {
      setSparkClicked(false)
      setSparkCount((prev) => prev - 1)
    }
  }

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = handleInput.trim().replace(/^@/, '')
    if (clean) {
      router.push(`/auth/signin?from=${encodeURIComponent('/dashboard/setup')}`)
    } else {
      router.push('/auth/signin')
    }
  }

  const handleCopyDemo = () => {
    navigator.clipboard?.writeText('https://devlink.to/alex')
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-200">
      {/* Background Matrix & Halos */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent dark:from-indigo-600/15" />
        <div className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 to-cyan-400/10 blur-3xl dark:from-indigo-600/20 dark:to-cyan-400/15" />
        <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/15" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-600/15" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl transition-colors duration-200">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo href="/" iconSize={30} />

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <Link href="/discover" className="transition-colors hover:text-foreground">
              Discover Talent
            </Link>
            <Link href="/sparkforge" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <span>SparkForge</span>
              <span className="rounded-full bg-[#6366F1]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#6366F1] dark:bg-[#6366F1]/20 dark:text-[#818CF8]">
                LIVE
              </span>
            </Link>
            <a href="#features" className="transition-colors hover:text-foreground">
              Architecture
            </a>
            <a href="#feed" className="transition-colors hover:text-foreground">
              Network
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <SimpleThemeToggle />
            <Link href="/auth/signin" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm" className="bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-md shadow-indigo-500/20">
                <span>Start Free</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto w-full max-w-7xl space-y-20 px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Protocol Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-50/70 dark:border-indigo-500/30 dark:bg-indigo-950/40 px-3.5 py-1 text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>DEV PROTOCOL v2.4</span>
            <span className="text-muted-foreground">/</span>
            <span>1,420+ SHIPPERS CONNECTED</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl leading-[1.08]">
            The Developer Identity Protocol for{' '}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#06B6D4] bg-clip-text text-transparent">
              Engineers Who Ship.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Turn your GitHub repos, commit velocity, and technology stacks into a living, verified presence. Exchange Link Sparks, build your Code Circle, and co-build on SparkForge.
          </p>

          {/* Interactive Claim Handle Bar */}
          <form onSubmit={handleClaim} className="mx-auto max-w-md pt-2">
            <div className="relative flex items-center rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-1.5 shadow-xl transition-all focus-within:border-[#6366F1] focus-within:ring-2 focus-within:ring-[#6366F1]/20">
              <span className="pl-3.5 font-mono text-sm text-slate-400 dark:text-[#94A3B8] select-none">
                devlink.to/
              </span>
              <input
                type="text"
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                placeholder="yourname"
                className="w-full bg-transparent px-2 py-1.5 font-mono text-sm text-foreground placeholder:text-slate-400 dark:placeholder:text-[#475569] focus:outline-none"
              />
              <Button type="submit" size="sm" className="bg-[#6366F1] text-white hover:bg-[#4F46E5] shrink-0 font-medium">
                <span>Claim</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="mt-2 text-xs font-mono text-muted-foreground">
              {handleInput ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ devlink.to/{handleInput} is available to reserve
                </span>
              ) : (
                'Free forever · Auto-syncs GitHub · Zero recruiter spam'
              )}
            </p>
          </form>
        </section>

        {/* The Interactive DevLab Sandbox */}
        <section className="space-y-4">
          {/* Sandbox Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Interactive DevLab Sandbox:
              </span>
            </div>

            <div className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'portfolio'
                    ? 'bg-white dark:bg-[#1E293B] text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-[#06B6D4]" />
                <span>Live Portfolio View</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-white dark:bg-[#1E293B] text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Terminal className="h-3.5 w-3.5 text-[#6366F1]" />
                <span>Git Sync Terminal</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sparkforge')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'sparkforge'
                    ? 'bg-white dark:bg-[#1E293B] text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-amber-500" />
                <span>SparkForge Matchmaker</span>
              </button>
            </div>
          </div>

          {/* Sandbox Canvas */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#0B0F19] shadow-2xl transition-colors duration-200">
            {/* Top Window Bar */}
            <div className="flex h-10 items-center justify-between border-b border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0F172A] px-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 hidden sm:inline font-mono text-[11px] text-muted-foreground">
                  devlink-client // {activeTab}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#06B6D4] bg-[#06B6D4]/10 dark:bg-[#06B6D4]/15 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
                  ● LIVE SYNC ACTIVE
                </span>
              </div>
            </div>

            {/* Sandbox Content Area */}
            <div className="p-6 sm:p-8 min-h-[420px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeTab === 'portfolio' && (
                  <motion.div
                    key="tab-portfolio"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-3xl space-y-6"
                  >
                    {/* Header Card */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#0F172A]/80 backdrop-blur">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#6366F1] to-[#06B6D4] p-0.5 shadow-md">
                            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-900 text-white font-bold text-lg">
                              AR
                            </div>
                          </div>
                          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-[#0F172A] bg-emerald-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-foreground">Alex Rivers</h3>
                            <Badge variant="tech" className="text-[11px]">@alex</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Staff Systems Engineer · Rust, Distributed Cache & WebAssembly
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          onClick={handleSparkToggle}
                          className={`gap-1.5 transition-all ${
                            sparkClicked
                              ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20'
                              : 'bg-[#6366F1] hover:bg-[#4F46E5] text-white'
                          }`}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{sparkClicked ? 'Spark Sent' : 'Send Spark'}</span>
                          <span className="ml-1 rounded-full bg-black/20 px-1.5 py-0.2 text-[10px] font-mono">
                            {sparkCount}
                          </span>
                        </Button>
                        <Button size="sm" variant="secondary" onClick={handleCopyDemo}>
                          {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2">
                      {['Rust', 'Distributed Systems', 'TypeScript', 'Next.js', 'PostgreSQL', 'WebSockets'].map((tech) => (
                        <Badge key={tech} variant="tech" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Verified Project Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/50 dark:bg-[#1E293B]/40 space-y-2.5 transition-colors hover:border-[#6366F1]">
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            <Github className="h-4 w-4 text-[#6366F1]" />
                            <span>turbo-cache-rs</span>
                          </p>
                          <span className="font-mono text-xs text-muted-foreground">⭐ 1,280</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Zero-allocation LRU cache for memory-constrained distributed environments in Rust.
                        </p>
                        <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#06B6D4]">
                          <span>● Rust 98.4%</span>
                          <span>· MIT License</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/50 dark:bg-[#1E293B]/40 space-y-2.5 transition-colors hover:border-[#6366F1]">
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            <Github className="h-4 w-4 text-[#06B6D4]" />
                            <span>wasm-socket-pulse</span>
                          </p>
                          <span className="font-mono text-xs text-muted-foreground">⭐ 640</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          High-throughput binary protocol engine running in Web Workers over WebSockets.
                        </p>
                        <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#06B6D4]">
                          <span>● TypeScript 84%</span>
                          <span>· Apache-2.0</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'terminal' && (
                  <motion.div
                    key="tab-terminal"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-2xl font-mono text-xs space-y-3 p-6 rounded-xl border border-slate-800 bg-[#070B14] text-slate-200 shadow-inner"
                  >
                    <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800 text-[11px]">
                      <span>sh - devlink protocol sync daemon</span>
                      <span>ACTIVE WORKSPACE: ~devlink/pipeline</span>
                    </div>

                    <p className="text-cyan-400 font-semibold">$ devlink sync --from github/alexrivers</p>
                    <p className="text-slate-400">↳ Authenticating token with GitHub OAuth protocol... <span className="text-emerald-400">[200 OK]</span></p>
                    <p className="text-slate-400">↳ Discovered 42 public repositories across 4 organizations</p>
                    <p className="text-slate-400">↳ Analyzing linguistic footprint: Rust (62%), TS (28%), Go (10%)</p>
                    <p className="text-slate-400">↳ Extracted commit velocity: 840 contributions this year</p>
                    <p className="text-slate-400">↳ Generating cryptographic proof-of-work badges...</p>
                    <p className="text-emerald-400 font-semibold">✓ Profile successfully compiled in 420ms</p>
                    <p className="text-slate-400">↳ Deployed to CDN edge: <span className="text-[#06B6D4] underline">https://devlink.to/alex</span></p>
                    
                    <div className="pt-3 flex items-center gap-2 text-indigo-400 animate-pulse">
                      <span>● LISTENING FOR INCOMING WEBHOOKS & LINK SPARKS...</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'sparkforge' && (
                  <motion.div
                    key="tab-sparkforge"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-3xl space-y-4"
                  >
                    <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#0F172A] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">Autonomous Code Agent for Next.js 15</span>
                            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-mono text-[10px]">
                              OPEN
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Building a local LLM companion that auto-fixes hydration bugs and validates server actions.
                          </p>
                        </div>
                        <Button size="sm" className="bg-[#6366F1] text-white hover:bg-[#4F46E5] text-xs">
                          Send Spark
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <Badge variant="tech" className="text-[10px]">#Co-Founder</Badge>
                        <Badge variant="secondary" className="text-[10px]">Next.js</Badge>
                        <Badge variant="secondary" className="text-[10px]">PyTorch</Badge>
                        <Badge variant="secondary" className="text-[10px]">Rust</Badge>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#0F172A] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">High-Speed Vector Database for Edge Devices</span>
                            <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20 font-mono text-[10px]">
                              IN PROGRESS
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Embedded search index with HNSW indexing compiled directly to WebAssembly.
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          View Concept
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <Badge variant="tech" className="text-[10px]">#Open Source</Badge>
                        <Badge variant="secondary" className="text-[10px]">WASM</Badge>
                        <Badge variant="secondary" className="text-[10px]">C++</Badge>
                        <Badge variant="secondary" className="text-[10px]">Algorithms</Badge>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* The 4 Architectural Pillars */}
        <section id="features" className="space-y-10 pt-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Engineered from the ground up for software builders.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              Everything you need to showcase real work, connect without recruiters, and launch collaborative ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 space-y-4 hover:border-[#6366F1] transition-all duration-200 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
                <Github className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Universal Ingestion</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Connect GitHub in one click. DevLink automatically synchronizes repos, stars, commit history, and technologies into a unified portfolio.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:border-[#06B6D4] transition-all duration-200 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Link Sparks Protocol</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send lightweight sparks to connect with peers. Grow your verified Code Circle and collaborate directly with builders around the world.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:border-amber-500 transition-all duration-200 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">SparkForge Incubator</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Post projects and hackathon concepts. Match with co-founders, open-source contributors, and engineers with complementary tech stacks.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:border-emerald-500 transition-all duration-200 hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">Real-Time Pulse Chat</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Built-in low-latency WebSocket messaging. Receive inquiries from founders and message your Code Circle directly inside your dashboard.
              </p>
            </Card>
          </div>
        </section>

        {/* Live Network Metrics Strip */}
        <section className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-slate-50/70 dark:bg-[#0F172A] p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">100%</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Developer-Owned</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#6366F1] font-mono">&lt; 60s</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">To Go Live</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#06B6D4] font-mono">0</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Recruiter Noise</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-500 font-mono">12+</p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Tailored Themes</p>
            </div>
          </div>
        </section>

        {/* Final Launch Call to Action */}
        <section className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 dark:from-[#0F172A] dark:via-[#090D16] dark:to-[#1E293B] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <Badge className="bg-[#6366F1] text-white">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Claim Your Space
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to ship your developer link?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Join thousands of engineers showcasing real work, connecting with peers, and building the future.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-xl shadow-indigo-500/25 px-8">
                <span>Claim Your Handle Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="secondary">
                <span>Explore Live Developers</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-background/95 py-12 transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <Logo href="/" iconSize={26} />

          <p className="text-xs text-muted-foreground font-mono">
            DevLink Protocol · Built for software engineers
          </p>

          <div className="flex items-center gap-5 text-xs text-muted-foreground font-medium">
            <Link href="/discover" className="hover:text-foreground transition-colors">
              Discover
            </Link>
            <Link href="/sparkforge" className="hover:text-foreground transition-colors">
              SparkForge
            </Link>
            <Link href="/auth/signin" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
