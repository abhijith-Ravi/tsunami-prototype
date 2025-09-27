"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const makeMock = (len = 30) =>
  Array.from({ length: len }).map((_, i) => ({
    t: `${i}`.padStart(2, "0"),
    temperature: 2 + Math.sin(i / 3) * 0.6 + Math.random() * 0.1,
    salinity: 34.2 + Math.cos(i / 4) * 0.15 + Math.random() * 0.02,
    oxygen: 200 + Math.sin(i / 5) * 10 + Math.random() * 2,
  }))

export default function DashboardPage() {
  const [variable, setVariable] = React.useState("temperature")
  const [region, setRegion] = React.useState("global-ocean")
  const [depth, setDepth] = React.useState("0-2000m")
  const data = React.useMemo(() => makeMock(36), [variable, region, depth])

  const chartConfig = {
    series: { label: variable === "salinity" ? "Salinity (PSU)" : variable === "oxygen" ? "Oxygen (µmol/kg)" : "Temperature (°C)", color: "oklch(0.7 0.18 200)" },
  } as const

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Varuna Dashboard</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={variable} onValueChange={setVariable}>
              <SelectTrigger className="min-w-40"><SelectValue placeholder="Variable" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="salinity">Salinity</SelectItem>
                <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="min-w-40"><SelectValue placeholder="Region" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="global-ocean">Global Ocean</SelectItem>
                <SelectItem value="north-atlantic">North Atlantic</SelectItem>
                <SelectItem value="equatorial-pacific">Equatorial Pacific</SelectItem>
                <SelectItem value="southern-ocean">Southern Ocean</SelectItem>
              </SelectContent>
            </Select>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger className="min-w-40"><SelectValue placeholder="Depth" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2000m">0–2000 m</SelectItem>
                <SelectItem value="0-1000m">0–1000 m</SelectItem>
                <SelectItem value="500-2000m">500–2000 m</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-[oklch(0.4_0.12_210)] hover:bg-[oklch(0.38_0.12_210)]">Apply</Button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Time Series</CardTitle>
              <CardDescription>
                {variable} • {region.replace("-", " ")} • {depth}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[320px] w-full">
                <AreaChart data={data} margin={{ left: 6, right: 6, top: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="fillA" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="oklch(0.7 0.18 200)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="t" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={60} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey={variable} stroke="var(--color-series)" fill="url(#fillA)" strokeWidth={2} />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
              <CardDescription>Mock statistics from latest cycle</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm">
                <li className="flex items-center justify-between"><span>Active floats</span><span className="font-mono">3,921</span></li>
                <li className="flex items-center justify-between"><span>New profiles (24h)</span><span className="font-mono">7,204</span></li>
                <li className="flex items-center justify-between"><span>Anomalies flagged</span><span className="font-mono">12</span></li>
                <li className="flex items-center justify-between"><span>Coverage</span><span className="font-mono">92%</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}