"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Compass, MessageCircle, BarChart4, Map as MapIcon, Bell, ArrowRight, ShieldCheck, Sparkles, Activity } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Full-screen background image that covers everything */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Deep ocean background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.9)] via-[oklch(0.18_0.07_230_/_0.7)] to-[oklch(0.22_0.08_210_/_0.6)]" />
      </div>

      {/* Hero */}
      <section className="relative isolate min-h-screen flex items-center" aria-labelledby="hero-heading">
        {/* Decorative frame - now positioned relative to viewport */}
        <div className="pointer-events-none absolute inset-x-4 top-6 -z-0 h-[calc(100vh-6rem)] rounded-xl border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />

        {/* Subtle sonar rings */}
        <div className="pointer-events-none absolute right-10 top-24 -z-0 h-64 w-64 -translate-y-10 opacity-40">
          <div className="absolute inset-0 rounded-full border border-white/20 motion-safe:animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-white/20 motion-safe:animate-ping" />
          <div className="absolute inset-0 scale-150 rounded-full border border-white/10" />
        </div>

        {/* Scientific grid overlay */}
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-6 py-28 sm:px-8 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            THE MARINE AND AQUATIC SPECIALIST
          </div>
          <h1 id="hero-heading" className="max-w-2xl text-pretty text-6xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-xl sm:text-7xl">
            Varuna — bridging science and simplicity in ocean exploration
          </h1>
          <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_200)] to-[oklch(0.7_0.18_200_/_0.4)] shadow-lg" />
          <p className="max-w-xl text-balance text-lg text-white/90 sm:text-xl">
            Ask questions. See the ocean. Get insights. A conversational UI for ARGO float data with dashboards, maps, alerts, and trends.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button asChild size="lg" className="bg-[oklch(0.78_0.16_200)] text-[oklch(0.2_0.05_235)] hover:bg-[oklch(0.74_0.16_200)] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <Link href="/chat" className="inline-flex items-center gap-2" aria-label="Ask Varuna in chat">
                Ask Varuna
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <Link href="/dashboard">Build Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <Link href="/map" className="inline-flex items-center gap-2">
                Explore Map
                <MapIcon className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Chat over ARGO</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Smart Alerts</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Ocean Map</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Dashboards</span>
          </div>
          {/* Scroll cue */}
          <div className="mt-6">
            <Link href="#features" className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white">
              Learn more
              <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight stats strip - flows naturally with no gap */}
      <section className="w-full px-6 sm:px-8" aria-labelledby="stats-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="stats-heading" className="sr-only">Platform highlights</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/15 bg-white/10 p-6 text-white/90 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl">
              <div className="text-xs uppercase tracking-wide text-white/60">Floats Tracked</div>
              <div className="mt-1 text-2xl font-semibold">3,241</div>
              {/* sparkline */}
              <svg className="mt-2 h-8 w-full text-emerald-300/80" viewBox="0 0 120 24" fill="none">
                <polyline points="0,18 15,16 30,17 45,14 60,12 75,9 90,11 105,6 120,8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              {/* delta chip */}
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-300/20">
                <span aria-hidden>▲</span>
                2.4% this week
              </span>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-6 text-white/90 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl">
              <div className="text-xs uppercase tracking-wide text-white/60">Active Regions</div>
              <div className="mt-1 text-2xl font-semibold">27</div>
              {/* sparkline */}
              <svg className="mt-2 h-8 w-full text-emerald-300/80" viewBox="0 0 120 24" fill="none">
                <polyline points="0,20 20,18 40,16 60,14 80,12 100,10 120,9" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              {/* delta chip */}
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-300/20">
                <span aria-hidden>▲</span>
                +1 region
              </span>
            </div>
            <div className="col-span-2 rounded-xl border border-white/15 bg-white/10 p-6 text-white/90 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl sm:col-span-1">
              <div className="text-xs uppercase tracking-wide text-white/60">Daily Observations</div>
              <div className="mt-1 text-2xl font-semibold">1.2M+</div>
              {/* sparkline */}
              <svg className="mt-2 h-8 w-full text-emerald-300/80" viewBox="0 0 120 24" fill="none">
                <polyline points="0,14 12,15 24,13 36,12 48,10 60,11 72,9 84,7 96,9 108,6 120,7" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              {/* delta chip */}
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-300/20">
                <span aria-hidden>▲</span>
                +18k vs yesterday
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick entry cards */}
      <section id="features" className="w-full px-6 sm:px-8 mt-14 scroll-mt-24" aria-labelledby="features-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="features-heading" className="sr-only">Explore features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
              <Card className="h-full border-white/15 bg-white/10 backdrop-blur-lg shadow-md transition duration-300 motion-safe:hover:-translate-y-1 hover:border-white/30 hover:ring-2 hover:ring-white/20 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <BarChart4 className="size-5 text-[oklch(0.7_0.18_200)]" />
                    Dashboard
                    <ArrowRight className="ml-auto size-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>Profiles, sections, and trends at a glance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-md bg-gradient-to-br from-[oklch(0.28_0.06_235)] to-[oklch(0.33_0.08_205)] opacity-90">
                    <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1509817316-291d510dc1f4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/chat" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
              <Card className="h-full border-white/15 bg-white/10 backdrop-blur-lg shadow-md transition duration-300 motion-safe:hover:-translate-y-1 hover:border-white/30 hover:ring-2 hover:ring-white/20 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <MessageCircle className="size-5 text-[oklch(0.7_0.18_200)]" />
                    Conversational AI
                    <ArrowRight className="ml-auto size-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>Natural language queries over ARGO data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-gradient-to-br from-[oklch(0.28_0.06_235)] to-[oklch(0.33_0.08_205)]" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/map" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
              <Card className="h-full border-white/15 bg-white/10 backdrop-blur-lg shadow-md transition duration-300 motion-safe:hover:-translate-y-1 hover:border-white/30 hover:ring-2 hover:ring-white/20 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <MapIcon className="size-5 text-[oklch(0.7_0.18_200)]" />
                    Ocean Map
                    <ArrowRight className="ml-auto size-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>Live float positions and regional focus.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video overflow-hidden rounded-md">
                    <img alt="ocean" className="h-full w-full object-cover opacity-90 mix-blend-luminosity" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/insights" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
              <Card className="h-full border-white/15 bg-white/10 backdrop-blur-lg shadow-md transition duration-300 motion-safe:hover:-translate-y-1 hover:border-white/30 hover:ring-2 hover:ring-white/20 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                    <Compass className="size-5 text-[oklch(0.7_0.18_200)]" />
                    Insights
                    <ArrowRight className="ml-auto size-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>Auto-summaries and regional highlights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-gradient-to-br from-[oklch(0.28_0.06_235)] to-[oklch(0.33_0.08_205)]" />
                  <div className="mt-3 text-xs text-muted-foreground">
                    Need alerts? Visit <Link href="/alert" className="underline underline-offset-4">Smart Alerts</Link>.
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Bell className="size-3.5" /> Prototype UI • No backend
          </div>
        </div>
      </section>

      {/* Why Varuna */}
      <section className="w-full px-6 sm:px-8 mt-20 scroll-mt-24" aria-labelledby="why-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="why-heading" className="sr-only">Why choose Varuna</h2>
          <div className="mb-8 flex items-center gap-2">
            <div className="h-px w-6 bg-white/20" />
            <p className="text-xs uppercase tracking-wider text-white/70">Why Varuna</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.28_0.06_235_/_0.5)] text-white">
                <ShieldCheck className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Reliable anomaly detection</h3>
              <p className="mt-1 text-sm text-white/80">Monitor oceans in real time and get notified when metrics deviate from your thresholds.</p>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.33_0.08_205_/_0.5)] text-white">
                <Sparkles className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Conversational insights</h3>
              <p className="mt-1 text-sm text-white/80">Ask natural-language questions. Get maps, charts, and summaries instantly.</p>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.28_0.16_180_/_0.5)] text-white">
                <Activity className="size-4" />
              </div>
              <h3 className="text-base font-semibold text-white">Actionable dashboards</h3>
              <p className="mt-1 text-sm text-white/80">Build focused dashboards with thresholds and alerts tailored to your region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="w-full px-6 sm:px-8 mt-16 scroll-mt-24" aria-labelledby="trusted-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="trusted-heading" className="sr-only">Trusted by teams</h2>
          <div className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg shadow-md">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
              <span className="text-white/60">Trusted by teams exploring</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Pacific Ops</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Atlantic Watch</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Indian Ocean Lab</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Polar Research</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="w-full px-6 sm:px-8 mt-16 pb-20 scroll-mt-24" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="cta-heading" className="sr-only">Get started</h2>
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[oklch(0.28_0.06_235_/_0.7)] via-[oklch(0.26_0.06_225_/_0.6)] to-[oklch(0.22_0.08_210_/_0.6)] p-8 text-white shadow-xl">
            <div className="absolute inset-0 -z-10 opacity-20" style={{backgroundImage:"radial-gradient(600px_200px_at_20%_0%,rgba(255,255,255,0.2),transparent),radial-gradient(400px_160px_at_80%_0%,rgba(255,255,255,0.15),transparent)"}} />
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold leading-tight">Ready to explore the ocean with Varuna?</h3>
                <p className="mt-1 text-sm text-white/80">Ask questions, set smart alerts, and visualize regions—all in one place.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button asChild size="sm" className="bg-[oklch(0.78_0.16_200)] text-[oklch(0.2_0.05_235)] hover:bg-[oklch(0.74_0.16_200)]">
                  <Link href="/chat" className="inline-flex items-center gap-2">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <Link href="/map">Explore Map</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
