"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

const mock = Array.from({ length: 24 }).map((_, i) => ({
  t: i,
  anomaly: Math.max(0, Math.sin(i / 4) * 0.6 + Math.random() * 0.4),
}))

export default function InsightsPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Insights</h1>
            <p className="text-muted-foreground text-sm">Auto-summaries and regional highlights (mock)</p>
          </div>
          <Link href="/alerts" className="text-sm underline underline-offset-4">View Smart Alerts →</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Anomaly Intensity</CardTitle>
              <CardDescription>Recent 24-cycle anomaly indicator</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ series: { label: "Anomaly", color: "oklch(0.62 0.13 240)" } }} className="h-[280px] w-full">
                <AreaChart data={mock} margin={{ left: 6, right: 6, top: 8, bottom: 8 }}>
                  <defs>
                    <linearGradient id="fillAnom" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.62 0.13 240)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="oklch(0.62 0.13 240)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="t" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={50} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area dataKey="anomaly" stroke="oklch(0.62 0.13 240)" fill="url(#fillAnom)" strokeWidth={2} type="monotone" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Highlights</CardTitle>
              <CardDescription>Top signals</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 text-sm">
                <li>• Southern Ocean: Deepening mixed layer in late winter</li>
                <li>• Equatorial Pacific: Freshening near 140°W</li>
                <li>• North Atlantic: Oxygen minimum uplift by 50 m</li>
              </ul>
            </CardContent>
          </Card>
        </div>
    </main>
  )
}