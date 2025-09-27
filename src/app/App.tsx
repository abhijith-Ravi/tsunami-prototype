


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// Update the import path below if your Button component is located elsewhere
import { Button } from "../components/ui/button"
import { Compass, MessageCircle, BarChart4, Map as MapIcon, Bell, ArrowRight, ShieldCheck, Sparkles, Activity } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen px-0 pb-14 pt-0">
      {/* Hero */}
      <section className="relative isolate" aria-labelledby="hero-heading">
        {/* Background image with ocean overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
            alt="Deep ocean background"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.9)] via-[oklch(0.18_0.07_230_/_0.7)] to-[oklch(0.22_0.08_210_/_0.6)]" />
        </div>

        {/* Decorative frame similar to reference */}
        <div className="pointer-events-none absolute inset-x-4 top-6 -z-0 h-[calc(100%-3rem)] rounded-xl border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]" />

        {/* Subtle sonar rings */}
        <div className="pointer-events-none absolute right-10 top-24 -z-0 h-64 w-64 -translate-y-10 opacity-40">
          <div className="absolute inset-0 rounded-full border border-white/20 motion-safe:animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-white/20 motion-safe:animate-ping" />
          <div className="absolute inset-0 scale-150 rounded-full border border-white/10" />
        </div>

        {/* Scientific grid overlay */}
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-24 sm:px-6 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            THE MARINE AND AQUATIC SPECIALIST
          </div>
          <h1 id="hero-heading" className="max-w-2xl text-pretty text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow sm:text-6xl">
            Varuna — bridging science and simplicity in ocean exploration
          </h1>
          <div className="h-0.5 w-28 rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_200)] to-[oklch(0.7_0.18_200_/_0.4)]" />
          <p className="max-w-xl text-balance text-base text-white/80 sm:text-lg">
            Ask questions. See the ocean. Get insights. A conversational UI for ARGO float data with dashboards, maps, alerts, and trends.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="bg-[oklch(0.78_0.16_200)] text-[oklch(0.2_0.05_235)] hover:bg-[oklch(0.74_0.16_200)] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <a href="/chat" className="inline-flex items-center gap-2" aria-label="Ask Varuna in chat">
                Ask Varuna
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <a href="/dashboard">Build Dashboard</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0">
              <a href="/map" className="inline-flex items-center gap-2">
                Explore Map
                <MapIcon className="size-4" />
              </a>
            </Button>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Chat over ARGO</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Smart Alerts</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Ocean Map</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80">Dashboards</span>
          </div>
          {/* Scroll cue */}
          <div className="mt-4">
            <a href="#features" className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white">
              Learn more
              <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom fade into page background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-0 bg-gradient-to-b from-transparent to-[oklch(0.18_0.07_235_/_0.6)]" />
      </section>

      {/* Highlight stats strip */}
      <section className="mx-auto -mt-6 w-full max-w-6xl px-4 sm:px-6" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Platform highlights</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-white/15 bg-white/5 p-4 text-white/90 backdrop-blur transition-colors hover:border-white/30">
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
          <div className="rounded-lg border border-white/15 bg-white/5 p-4 text-white/90 backdrop-blur transition-colors hover:border-white/30">
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
          <div className="col-span-2 rounded-lg border border-white/15 bg-white/5 p-4 text-white/90 backdrop-blur transition-colors hover:border-white/30 sm:col-span-1">
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
      </section>

      {/* Quick entry cards */}
      <section id="features" className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 scroll-mt-24" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Explore features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="/dashboard" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
            <Card className="h-full border-white/15 bg-white/5 backdrop-blur transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:ring-1 hover:ring-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
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
          </a>

          <a href="/chat" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
            <Card className="h-full border-white/15 bg-white/5 backdrop-blur transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:ring-1 hover:ring-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
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
          </a>

          <a href="/map" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
            <Card className="h-full border-white/15 bg-white/5 backdrop-blur transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:ring-1 hover:ring-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
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
          </a>

          <a href="/insights" className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
            <Card className="h-full border-white/15 bg-white/5 backdrop-blur transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:ring-1 hover:ring-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
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
                  Need alerts? Visit <a href="/alerts" className="underline underline-offset-4">Smart Alerts</a>.
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Bell className="size-3.5" /> Prototype UI • Mock data • No backend
        </div>
      </section>

      {/* Why Varuna */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 scroll-mt-24" aria-labelledby="why-heading">
        <h2 id="why-heading" className="sr-only">Why choose Varuna</h2>
        <div className="mb-6 flex items-center gap-2">
          <div className="h-px w-6 bg-white/20" />
          <p className="text-xs uppercase tracking-wider text-white/70">Why Varuna</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/30">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.28_0.06_235_/_0.5)] text-white">
              <ShieldCheck className="size-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Reliable anomaly detection</h3>
            <p className="mt-1 text-sm text-white/80">Monitor oceans in real time and get notified when metrics deviate from your thresholds.</p>
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/30">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.33_0.08_205_/_0.5)] text-white">
              <Sparkles className="size-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Conversational insights</h3>
            <p className="mt-1 text-sm text-white/80">Ask natural-language questions. Get maps, charts, and summaries instantly.</p>
          </div>
          <div className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/30">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[oklch(0.28_0.16_180_/_0.5)] text-white">
              <Activity className="size-4" />
            </div>
            <h3 className="text-base font-semibold text-white">Actionable dashboards</h3>
            <p className="mt-1 text-sm text-white/80">Build focused dashboards with thresholds and alerts tailored to your region.</p>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 scroll-mt-24" aria-labelledby="trusted-heading">
        <h2 id="trusted-heading" className="sr-only">Trusted by teams</h2>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
            <span className="text-white/60">Trusted by teams exploring</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Pacific Ops</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Atlantic Watch</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Indian Ocean Lab</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">Polar Research</span>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 scroll-mt-24" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="sr-only">Get started</h2>
        <div className="relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-[oklch(0.28_0.06_235_/_0.6)] via-[oklch(0.26_0.06_225_/_0.5)] to-[oklch(0.22_0.08_210_/_0.5)] p-6 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="absolute inset-0 -z-10 opacity-20" style={{backgroundImage:"radial-gradient(600px_200px_at_20%_0%,rgba(255,255,255,0.2),transparent),radial-gradient(400px_160px_at_80%_0%,rgba(255,255,255,0.15),transparent)"}} />
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold leading-tight">Ready to explore the ocean with Varuna?</h3>
              <p className="mt-1 text-sm text-white/80">Ask questions, set smart alerts, and visualize regions—all in one place.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild size="sm" className="bg-[oklch(0.78_0.16_200)] text-[oklch(0.2_0.05_235)] hover:bg-[oklch(0.74_0.16_200)]">
                <a href="/chat" className="inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                <a href="/map">Explore Map</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}