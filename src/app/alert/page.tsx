"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { BellOff, BellRing, Waves, Thermometer, Droplets, Activity, AlertTriangle } from "lucide-react"

const alerts = [
  { id: "a1", title: "Salinity spike", region: "North Atlantic", severity: "High" },
  { id: "a2", title: "Temperature dip", region: "Southern Ocean", severity: "Medium" },
  { id: "a3", title: "Oxygen anomaly", region: "Equatorial Pacific", severity: "Low" },
]

export default function AlertsPage() {
  const [mute, setMute] = React.useState(false)

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Card className="relative overflow-hidden border-white/10 bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(56,189,248,0.35)]">
          {/* decorative ocean glow */}
          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-cyan-400" />
                  <CardTitle className="tracking-tight">Smart Alerts</CardTitle>
                </div>
                <CardDescription>Automated ocean event detection (mock)</CardDescription>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={mute} onCheckedChange={setMute} />
                {mute ? (
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><BellOff className="h-4 w-4" /> Muted</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><BellRing className="h-4 w-4 text-cyan-400" /> Live</span>
                )}
              </label>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {alerts.map((a) => {
                const Icon = a.title.toLowerCase().includes("salinity")
                  ? Droplets
                  : a.title.toLowerCase().includes("temperature")
                  ? Thermometer
                  : a.title.toLowerCase().includes("oxygen")
                  ? Activity
                  : AlertTriangle

                const severityRing =
                  a.severity === "High"
                    ? "ring-red-500/40 hover:ring-red-400/50"
                    : a.severity === "Medium"
                    ? "ring-blue-500/30 hover:ring-blue-400/40"
                    : "ring-emerald-500/20 hover:ring-emerald-400/30"

                const badgeGlow =
                  a.severity === "High"
                    ? "shadow-[0_0_20px_-4px_rgba(239,68,68,0.6)]"
                    : a.severity === "Medium"
                    ? "shadow-[0_0_18px_-6px_rgba(59,130,246,0.5)]"
                    : "shadow-[0_0_18px_-6px_rgba(16,185,129,0.4)]"

                return (
                  <li
                    key={a.id}
                    className={`group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:translate-y-[-1px] hover:bg-white/10 ring-1 ring-inset ${severityRing}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 ring-1 ring-inset ring-white/10">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div>
                        <div className="text-sm font-medium tracking-tight">
                          {a.title}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {a.region}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={a.severity === "High" ? "destructive" : a.severity === "Medium" ? "secondary" : "outline"}
                      className={`${badgeGlow} backdrop-blur-sm`}
                    >
                      {a.severity}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}