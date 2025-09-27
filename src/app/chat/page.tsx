"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bot, SendHorizonal, User } from "lucide-react"

interface Msg { id: string; role: "user" | "assistant"; content: string }

const canned = [
  "Here is a summary of the last 30 days of ARGO profiles in the North Atlantic...",
  "The mixed layer depth increased by ~15m compared to climatology in this region.",
  "A salinity anomaly of +0.2 PSU was detected near 20°W, 35°N.",
]

// Suggested demo prompts mapped to deterministic replies for a smooth prototype
const suggestions: { prompt: string; reply: string }[] = [
  {
    prompt: "Show temperature trends in the Southern Ocean for the last quarter",
    reply: "Southern Ocean SST trend (last 90 days): +0.6°C vs prior quarter; strongest warming near 140°E, 55°S."
  },
  {
    prompt: "Summarize ARGO profiles in the North Atlantic for the last 30 days",
    reply: "North Atlantic (30 days): 3,241 profiles ingested. Mixed layer depth deepened by ~12–18 m in subpolar gyre."
  },
  {
    prompt: "Any salinity anomalies near 20°W, 35°N?",
    reply: "Yes. A surface salinity anomaly of +0.2 PSU detected near 20°W, 35°N; likely linked to subtropical intrusion."
  },
]

function getReply(text: string) {
  const q = text.toLowerCase()
  // Exact/deterministic matches by keyword to keep demo consistent
  if (q.includes("southern ocean") && q.includes("temperature") && (q.includes("quarter") || q.includes("90"))) {
    return suggestions[0].reply
  }
  if ((q.includes("north atlantic") && (q.includes("30") || q.includes("last 30") || q.includes("month"))) || q.includes("profiles")) {
    return suggestions[1].reply
  }
  if ((q.includes("20°w") || q.includes("20w") || q.includes("20 w")) && (q.includes("35°n") || q.includes("35n") || q.includes("35 n")) && q.includes("salinity")) {
    return suggestions[2].reply
  }
  // Fallback to an existing canned response
  return canned[Math.floor(Math.random() * canned.length)]
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { id: "m1", role: "assistant", content: "Hi, I'm Varuna. Ask me about ARGO data: regions, trends, or anomalies." },
  ])
  const [input, setInput] = React.useState("")
  const [typing, setTyping] = React.useState(false)

  function send(custom?: string) {
    const text = (custom ?? input).trim()
    if (!text) return
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      const reply: Msg = { id: crypto.randomUUID(), role: "assistant", content: getReply(text) }
      setMessages((m) => [...m, reply])
      setTyping(false)
    }, 700)
  }

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Ask Varuna</CardTitle>
            <CardDescription>Conversational analysis over ARGO float data (mocked)</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Quick suggestion chips for the demo */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="me-1">Try:</span>
              {suggestions.map((s, i) => (
                <Button key={i} size="sm" variant="secondary" className="h-7 px-2 text-[11px]" onClick={() => send(s.prompt)}>
                  {s.prompt}
                </Button>
              ))}
            </div>

            <div className="mb-4 h-[420px] overflow-y-auto rounded border p-3">
              <ul className="grid gap-3">
                {messages.map((m) => (
                  <li key={m.id} className="flex items-start gap-2">
                    {m.role === "assistant" ? (
                      <Bot className="mt-1 size-4 text-[oklch(0.7_0.18_200)]" />
                    ) : (
                      <User className="mt-1 size-4 opacity-60" />
                    )}
                    <div className="rounded-md bg-card/60 p-2 text-sm leading-relaxed">
                      {m.content}
                    </div>
                  </li>
                ))}
                {typing && (
                  <li className="flex items-start gap-2 opacity-70">
                    <Bot className="mt-1 size-4 text-[oklch(0.7_0.18_200)]" />
                    <div className="rounded-md bg-card/60 p-2 text-sm">Typing…</div>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="e.g., Show temperature trends in the Southern Ocean for the last quarter"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <Button onClick={() => send()} className="bg-[oklch(0.4_0.12_210)] hover:bg-[oklch(0.38_0.12_210)]">
                <SendHorizonal className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}