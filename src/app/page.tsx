"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Compass, MessageCircle, BarChart4, Map as MapIcon, Bell, ArrowRight, ShieldCheck, Sparkles, Activity } from "lucide-react"

const statCards = [
  { label: "Floats Tracked", value: "3,241", change: "2.4% this week", points: "0,18 15,16 30,17 45,14 60,12 75,9 90,11 105,6 120,8" },
  { label: "Active Regions", value: "27", change: "+1 region", points: "0,20 20,18 40,16 60,14 80,12 100,10 120,9" },
  { label: "Daily Observations", value: "1.2M+", change: "+18k vs yesterday", points: "0,14 12,15 24,13 36,12 48,10 60,11 72,9 84,7 96,9 108,6 120,7", span: "col-span-2 sm:col-span-1" }
]

const featureCards = [
  { href: "/dashboard", icon: BarChart4, title: "Dashboard", description: "Profiles, sections, and trends at a glance.", hasImage: true },
  { href: "/chat", icon: MessageCircle, title: "Conversational AI", description: "Natural language queries over ARGO data." },
  { href: "/map", icon: MapIcon, title: "Ocean Map", description: "Live float positions and regional focus.", hasImage: true },
  { href: "/insights", icon: Compass, title: "Insights", description: "Auto-summaries and regional highlights.", hasExtra: true }
]

const whyCards = [
  { icon: ShieldCheck, title: "Reliable anomaly detection", description: "Monitor oceans in real time and get notified when metrics deviate from your thresholds.", bg: "bg-[oklch(0.28_0.06_235_/_0.5)]" },
  { icon: Sparkles, title: "Conversational insights", description: "Ask natural-language questions. Get maps, charts, and summaries instantly.", bg: "bg-[oklch(0.33_0.08_205_/_0.5)]" },
  { icon: Activity, title: "Actionable dashboards", description: "Build focused dashboards with thresholds and alerts tailored to your region.", bg: "bg-[oklch(0.28_0.16_180_/_0.5)]" }
]

const cardClass = "rounded-xl border border-white/15 bg-white/10 backdrop-blur-lg shadow-md transition-colors hover:border-white/30 hover:shadow-xl"
const sectionClass = "w-full px-6 sm:px-8"
const containerClass = "mx-auto max-w-6xl"

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
      <section className="relative isolate flex items-center justify-center min-h-[100vh] py-20" aria-labelledby="hero-heading">
        {/* Scientific grid overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.25)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className={`${containerClass} flex w-full items-center justify-between px-6 sm:px-8`}>
          {/* Left side content */}
          <div className="flex w-full max-w-4xl flex-col items-start gap-6 lg:max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
              THE MARINE AND AQUATIC SPECIALIST
            </div>
            <h1 id="hero-heading" className="max-w-4xl text-pretty text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl">
              Varuna
            </h1>
            <p className="mt-2 text-2xl font-medium text-white/80 sm:text-3xl lg:text-4xl leading-tight tracking-tight">
              Bridging science and simplicity in ocean exploration
            </p>
            <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[oklch(0.78_0.16_200)] to-[oklch(0.7_0.18_200_/_0.4)] shadow-lg" />
            <p className="max-w-2xl text-balance text-lg leading-relaxed text-white/90 sm:text-xl">
              Ask questions. See the ocean. Get insights. A conversational UI for ARGO float data with dashboards, maps, alerts, and trends.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
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
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Chat over ARGO</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Smart Alerts</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Ocean Map</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">Dashboards</span>
            </div>
            {/* Scroll cue */}
            <div className="mt-6">
              <Link href="#features" className="group inline-flex items-center gap-2 text-white/70 transition hover:text-white">
                Discover Features
                <ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Right side - Ocean visualization */}
          <div className="hidden lg:flex lg:justify-end lg:items-center lg:flex-shrink-0">
            <div className="relative">
              {/* Enhanced sonar rings */}
              <div className="relative h-96 w-96">
                {/* Outer rings with staggered animations */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" style={{animationDuration: '4s'}} />
                <div className="absolute inset-4 rounded-full border border-cyan-300/30 animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}} />
                <div className="absolute inset-8 rounded-full border border-blue-300/40 animate-ping" style={{animationDuration: '3.5s', animationDelay: '1s'}} />
                <div className="absolute inset-12 rounded-full border border-blue-400/50 animate-ping" style={{animationDuration: '4.5s', animationDelay: '1.5s'}} />
                
                {/* Static rings for depth */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                
                {/* Center element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-cyan-400/80 to-blue-500/80 shadow-2xl shadow-cyan-500/30 backdrop-blur">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-white/20">
                      <Compass className="h-12 w-12 text-white animate-spin" style={{animationDuration: '20s'}} />
                    </div>
                  </div>
                </div>

                {/* Floating data points - improved positioning and animations */}
                <div className="absolute top-12 right-16 h-3 w-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50 animate-bounce" style={{animationDelay: '0.3s', animationDuration: '2s'}} />
                <div className="absolute bottom-16 left-8 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-bounce" style={{animationDelay: '0.7s', animationDuration: '2.2s'}} />
                <div className="absolute top-24 left-12 h-2 w-2 rounded-full bg-red-400 shadow-lg shadow-red-400/50 animate-bounce" style={{animationDelay: '1.1s', animationDuration: '1.8s'}} />
                <div className="absolute bottom-24 right-12 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '2.4s'}} />
                <div className="absolute top-32 right-32 h-2 w-2 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50 animate-bounce" style={{animationDelay: '0.9s', animationDuration: '2.1s'}} />
                <div className="absolute bottom-32 left-24 h-2 w-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50 animate-bounce" style={{animationDelay: '1.3s', animationDuration: '1.9s'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight stats strip */}
      <section className={sectionClass} aria-labelledby="stats-heading">
        <div className={containerClass}>
          <h2 id="stats-heading" className="sr-only">Platform highlights</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {statCards.map((stat, i) => (
              <div key={i} className={`${cardClass} p-6 text-white/90 ${stat.span || ""}`}>
                <div className="text-xs uppercase tracking-wide text-white/60">{stat.label}</div>
                <div className="mt-1 text-2xl font-semibold">{stat.value}</div>
                <svg className="mt-2 h-8 w-full text-emerald-300/80" viewBox="0 0 120 24" fill="none">
                  <polyline points={stat.points} stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300 ring-1 ring-emerald-300/20">
                  <span aria-hidden>▲</span>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick entry cards */}
      <section id="features" className={`${sectionClass} mt-14 scroll-mt-24`} aria-labelledby="features-heading">
        <div className={containerClass}>
          <h2 id="features-heading" className="sr-only">Explore features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, i) => {
              const Icon = card.icon
              return (
                <Link key={i} href={card.href} className="group outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0 rounded-lg">
                  <Card className={`h-full ${cardClass} transition duration-300 motion-safe:hover:-translate-y-1 hover:ring-2 hover:ring-white/20 hover:shadow-2xl`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                        <Icon className="size-5 text-[oklch(0.7_0.18_200)]" />
                        {card.title}
                        <ArrowRight className="ml-auto size-4 translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className={`aspect-video ${card.hasImage ? "overflow-hidden" : ""} rounded-md ${card.hasImage ? "" : "bg-gradient-to-br from-[oklch(0.28_0.06_235)] to-[oklch(0.33_0.08_205)]"}`}>
                        {card.hasImage && card.href === "/dashboard" && (
                          <div className="h-full w-full bg-gradient-to-br from-[oklch(0.28_0.06_235)] to-[oklch(0.33_0.08_205)] opacity-90">
                            <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1509817316-291d510dc1f4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity" />
                          </div>
                        )}
                        {card.hasImage && card.href === "/map" && (
                          <img alt="ocean" className="h-full w-full object-cover opacity-90 mix-blend-luminosity" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop" />
                        )}
                      </div>
                      {card.hasExtra && (
                        <div className="mt-3 text-xs text-muted-foreground">
                          Need alerts? Visit <Link href="/alerts" className="underline underline-offset-4">Smart Alerts</Link>.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Bell className="size-3.5" /> Prototype UI • Mock data • No backend
          </div>
        </div>
      </section>

      {/* Why Varuna */}
      <section className={`${sectionClass} mt-20 scroll-mt-24`} aria-labelledby="why-heading">
        <div className={containerClass}>
          <h2 id="why-heading" className="sr-only">Why choose Varuna</h2>
          <div className="mb-8 flex items-center gap-2">
            <div className="h-px w-6 bg-white/20" />
            <p className="text-xs uppercase tracking-wider text-white/70">Why Varuna</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <div key={i} className={`group relative overflow-hidden ${cardClass} p-6`}>
                  <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-md ${card.bg} text-white`}>
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className={`${sectionClass} mt-16 scroll-mt-24`} aria-labelledby="trusted-heading">
        <div className={containerClass}>
          <h2 id="trusted-heading" className="sr-only">Trusted by teams</h2>
          <div className={`${cardClass} p-6`}>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/70">
              <span className="text-white/60">Trusted by teams exploring</span>
              {["Pacific Ops", "Atlantic Watch", "Indian Ocean Lab", "Polar Research"].map((team, i) => (
                <span key={i} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">{team}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className={`${sectionClass} mt-16 pb-20 scroll-mt-24`} aria-labelledby="cta-heading">
        <div className={containerClass}>
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