"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, User, Waves, TrendingUp, MapPin, BarChart3, Compass, Thermometer, Activity } from "lucide-react"

interface Msg { 
  id: string; 
  role: "user" | "assistant"; 
  content: string;
  timestamp: string;
}

// Enhanced responses with more realistic scientific data
const responses: { [key: string]: string } = {
  "temperature": "🌊 **Current Sea Surface Temperature Analysis:**\n\nI've analyzed the latest ARGO float data across global oceans. Here are the key findings:\n\n• **North Atlantic**: +1.2°C above seasonal average (15.8°C vs 14.6°C norm)\n• **Pacific Equatorial**: Moderate cooling trend (-0.4°C) indicating potential La Niña conditions\n• **Mediterranean Sea**: Exceptionally warm at 24.1°C, +2.3°C above climatology\n• **Southern Ocean**: Antarctic waters showing +0.8°C warming, concerning for ice dynamics\n\n**Significant Event**: Gulf Stream thermal front has shifted 23km northward over the past 2 weeks, suggesting strengthened current transport. This could impact European weather patterns.\n\nWould you like me to generate a thermal anomaly map or analyze temperature trends for a specific region?",
  
  "salinity": "🧂 **Global Salinity Patterns - Latest Analysis:**\n\nCurrent salinity measurements reveal several interesting patterns:\n\n• **Labrador Sea**: Significant freshening detected - 34.1 PSU (0.4 below normal)\n• **Arabian Sea**: High salinity pool at 36.8 PSU indicates intense evaporation\n• **Bay of Bengal**: Monsoon freshening ongoing - 32.1 PSU surface layer\n• **Drake Passage**: Intermediate waters showing 0.2 PSU increase\n\n**Alert**: Unusual low-salinity lens detected at 45°N, 30°W - possibly related to accelerated Greenland melt. This anomaly has persisted for 3 weeks and is expanding southward.\n\n**Oceanographic Impact**: The salinity gradient between subtropical and subpolar waters has intensified by 15%, potentially affecting thermohaline circulation.\n\nShall I analyze salinity-temperature relationships or focus on a specific water mass?",
  
  "oxygen": "💨 **Dissolved Oxygen Levels - Critical Analysis:**\n\n⚠️ **Concerning Developments:**\n\n• **Arabian Sea OMZ**: Oxygen levels critically low at 0.8 μmol/kg (200-800m depth)\n• **Eastern Pacific**: Hypoxic zone expanding - now 23% larger than 2019 baseline\n• **Baltic Sea**: Deep water renewal event detected, O₂ increasing to 180 μmol/kg\n• **California Current**: Seasonal upwelling bringing low-O₂ water to surface\n\n**Biological Impact**: Fish species migration patterns altered in the Peru Current due to shoaling oxycline (oxygen minimum zone moving upward).\n\n**Positive News**: North Atlantic deep convection has injected well-oxygenated water to 2000m depth, reversing 5-year declining trend.\n\n**Research Note**: New data suggests climate change is intensifying oxygen minimum zones faster than predicted. Marine ecosystems in affected regions showing stress indicators.\n\nWould you like ecosystem impact assessments or biogeochemical model projections?",
  
  "current": "🌀 **Ocean Current Analysis - Dynamic Patterns:**\n\n**Major Current Systems Status:**\n\n• **Gulf Stream**: Velocity increased 12% (peak: 2.1 m/s at Cape Hatteras)\n• **Kuroshio**: Meandering pattern observed - large warm core eddy at 35°N, 145°E\n• **Antarctic Circumpolar Current**: Transport up 8% to 147 Sv (Sverdrups)\n• **California Current**: Seasonal intensification - 0.4 m/s southward flow\n\n**Unprecedented Event**: AMOC (Atlantic Meridional Overturning Circulation) showing unusual variability - strength oscillating between 11-18 Sv over past month.\n\n**Eddy Activity**: \n- Agulhas rings particularly active this season (5 major eddies tracked)\n- Gulf Stream warm core rings interacting with continental shelf\n- Pacific mesoscale eddy field 20% more energetic than climatology\n\n**Float Tracking**: 3,847 ARGO floats currently active, providing real-time current measurements. Notable: Float #2901746 completed 7-month journey from Bermuda to Portugal following Gulf Stream-NAC pathway.\n\nInterested in specific current system analysis or eddy tracking data?",
  
  "anomaly": "⚠️ **Ocean Anomaly Detection Report - Past 7 Days:**\n\n**🔴 High Priority Alerts:**\n\n1. **Temperature Spike Event** (Detected: 3 days ago)\n   - Location: 38°N, 142°E (off Japan)\n   - Magnitude: +3.2°C above normal\n   - Depth: Surface to 150m\n   - Likely cause: Kuroshio warm core eddy interaction\n\n2. **Salinity Drop** (Ongoing: 2 weeks)\n   - Location: Fram Strait (79°N, 2°E)\n   - Magnitude: -0.8 PSU\n   - Impact: Affecting Arctic-Atlantic water exchange\n\n3. **Deep Convection Event** (Detected: 5 days ago)\n   - Location: Labrador Sea\n   - Depth reached: 1,800m (unusually deep for season)\n   - O₂ injection: +45 μmol/kg increase\n\n**🟡 Monitoring:**\n- Unusual chlorophyll bloom in South Pacific (possible volcanic ash fertilization)\n- pH anomaly in Coral Triangle region (-0.15 units)\n- Abnormal wave height patterns in North Sea\n\n**AI Confidence Levels**: Temperature (96%), Salinity (89%), Current (92%)\n\nShall I investigate any specific anomaly or set up automated monitoring?",
  
  "trends": "📈 **Long-term Ocean Climate Trends (2000-2024):**\n\n**🌡️ Temperature Trends:**\n- Global ocean warming: +0.6°C over 2 decades\n- Arctic Ocean: Fastest warming at +1.4°C\n- Deep ocean (>2000m): +0.1°C (significant for such depths)\n- Marine heatwave frequency: 50% increase since 2010\n\n**🧂 Salinity Evolution:**\n- \"Salty getting saltier, fresh getting fresher\" pattern confirmed\n- Subtropical gyres: +0.1 PSU increase\n- Polar regions: -0.2 PSU decrease (freshening acceleration)\n\n**🌊 Circulation Changes:**\n- AMOC weakening: -15% since 2004 (now ~13 Sv)\n- Subtropical gyre expansion: 2-5° poleward shift\n- Upwelling intensification in eastern boundary currents\n\n**💨 Oxygen Decline:**\n- Global ocean deoxygenation: -2% O₂ content since 2000\n- OMZ expansion: 4.5 million km² increase\n- Coastal hypoxic zones: Tripled in occurrence\n\n**🔬 Biogeochemical Shifts:**\n- Ocean acidification: pH declined by 0.08 units\n- Phytoplankton biomass: 6% decline in subtropical regions\n- Carbon uptake efficiency: Decreasing in Southern Ocean\n\n**Projection Alert**: Current trends suggest critical thresholds may be reached by 2035-2040 for several key indicators.\n\nWould you like detailed regional breakdowns or future scenario modeling?",

  "help": "🔬 **Varuna Ocean AI - Capabilities Overview:**\n\nI'm your advanced oceanographic assistant with access to the global ARGO float network and satellite data. Here's what I can help you with:\n\n**📊 Real-Time Analysis:**\n- Sea surface temperature and subsurface thermal structure\n- Salinity patterns and water mass identification\n- Ocean currents and eddy tracking\n- Dissolved oxygen and biogeochemical parameters\n\n**🚨 Monitoring & Alerts:**\n- Anomaly detection and threshold alerts\n- Marine heatwave tracking\n- Unusual circulation pattern identification\n- Ecosystem stress indicators\n\n**📈 Climate Intelligence:**\n- Long-term trend analysis\n- Seasonal pattern recognition\n- Climate change impact assessment\n- Predictive modeling insights\n\n**🗺️ Spatial Analysis:**\n- Regional focus studies\n- Cross-basin comparisons\n- Depth profile analysis\n- Custom geographic queries\n\n**Example queries:**\n• \"Show temperature anomalies in the North Atlantic\"\n• \"Track the Gulf Stream's current strength\"\n• \"Analyze oxygen depletion trends\"\n• \"Monitor salinity changes near Greenland\"\n\nWhat oceanographic phenomenon would you like to explore today?",

  "hello": "👋 **Welcome to Varuna Ocean Intelligence!**\n\nI'm your AI oceanographer, connected to the world's most comprehensive ocean monitoring network. I can analyze real-time data from 4,000+ ARGO floats, satellite observations, and historical datasets spanning decades.\n\n**What I'm currently tracking:**\n• 🌡️ Global temperature patterns and marine heatwaves\n• 🧂 Salinity changes and freshwater inputs\n• 🌊 Ocean current dynamics and circulation patterns\n• 💨 Oxygen levels and biogeochemical cycles\n• 🔍 Anomaly detection across all ocean basins\n\n**Recent highlights:**\n- Detecting unusual warming in the North Pacific\n- Monitoring Arctic freshening events\n- Tracking deep convection in the Labrador Sea\n- Analyzing subtropical gyre circulation changes\n\nI'm here to help you understand our changing oceans. What aspect of ocean science interests you most today? You can ask about specific regions, phenomena, or trends you'd like to explore!",
}

const quickPrompts = [
  { icon: Thermometer, text: "What are the current temperature trends?", key: "temperature" },
  { icon: Waves, text: "Any unusual salinity patterns?", key: "salinity" },
  { icon: Activity, text: "Show me recent anomalies", key: "anomaly" },
  { icon: TrendingUp, text: "What are the long-term ocean trends?", key: "trends" },
  { icon: BarChart3, text: "Analyze ocean currents", key: "current" },
  { icon: Compass, text: "Check oxygen levels", key: "oxygen" },
]

function getResponse(text: string): string {
  const lowerText = text.toLowerCase()
  
  // Match keywords to responses
  for (const [key, response] of Object.entries(responses)) {
    if (lowerText.includes(key)) {
      return response
    }
  }
  
  // Default responses for common oceanographic queries
  if (lowerText.includes("help") || lowerText.includes("what can you")) {
    return responses.help
  }
  
  if (lowerText.includes("hello") || lowerText.includes("hi")) {
    return responses.hello
  }
  
  // Context-aware responses for specific scientific terms
  const scientificResponses: { [key: string]: string } = {
    "amoc": "🌊 The Atlantic Meridional Overturning Circulation (AMOC) is currently running at ~13 Sverdrups, which is 15% weaker than the 2004-2014 average. Recent ARGO data shows increased variability in the deep water formation regions of the Labrador Sea.",
    "eddy": "🌀 Mesoscale eddies are particularly active this month. I'm tracking 847 coherent eddies globally, with notable warm-core rings in the Gulf Stream region and Agulhas rings in the South Atlantic showing enhanced transport properties.",
    "upwelling": "⬆️ Current upwelling analysis shows intensified coastal upwelling in the California, Peru, and Benguela systems. This is bringing nutrient-rich but low-oxygen water to surface layers, affecting marine productivity patterns.",
    "gyres": "🌊 The five major subtropical gyres show poleward expansion trends. The North Pacific gyre has shifted 2.3° northward since 2000, influencing regional climate patterns and marine ecosystem boundaries.",
    "thermohaline": "🌡️🧂 Thermohaline circulation patterns show significant changes. Deep water formation in the North Atlantic has weakened, while Southern Ocean ventilation remains relatively stable. This affects global heat and carbon transport.",
  }

  for (const [key, response] of Object.entries(scientificResponses)) {
    if (lowerText.includes(key)) {
      return response
    }
  }
  
  // Fallback response with suggestions
  return "🌊 **Analyzing your query...**\n\nI'm processing your request against the ARGO database and satellite observations. Based on current data capabilities, I can provide detailed analysis on:\n\n• **Physical Properties**: Temperature, salinity, density profiles\n• **Circulation**: Current systems, eddies, water mass transport\n• **Biogeochemistry**: Oxygen, pH, nutrients, chlorophyll\n• **Climate Indicators**: Trends, anomalies, seasonal cycles\n\nCould you be more specific about the:\n- Ocean region you're interested in?\n- Parameter you'd like to analyze?\n- Time scale for the analysis?\n\nFor example: *\"Show temperature trends in the North Atlantic\"* or *\"Analyze oxygen depletion in the Pacific\"*"
}

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { 
      id: "m1", 
      role: "assistant", 
      content: responses.hello,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ])
  const [input, setInput] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  function sendMessage(customText?: string) {
    const text = (customText ?? input).trim()
    if (!text) return

    const userMsg: Msg = { 
      id: crypto.randomUUID(), 
      role: "user", 
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate realistic thinking time
    const thinkingTime = 1500 + Math.random() * 2000
    setTimeout(() => {
      const response = getResponse(text)
      const assistantMsg: Msg = { 
        id: crypto.randomUUID(), 
        role: "assistant", 
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, thinkingTime)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Ocean-themed background effects */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Deep ocean background"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.95)] via-[oklch(0.18_0.07_230_/_0.9)] to-[oklch(0.22_0.08_210_/_0.85)]" />
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 relative z-10 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="space-y-6 mb-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-3xl ${message.role === "user" ? "order-first" : ""}`}>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white ml-auto"
                      : "bg-white/10 backdrop-blur-lg text-blue-50 border border-white/20"
                  }`}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <p className={`text-xs text-blue-200/50 mt-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}>
                  {message.timestamp}
                </p>
              </div>

              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="max-w-3xl">
                <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-lg text-blue-50 border border-white/20 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Analyzing ocean data</span>
                    <div className="flex gap-1 ml-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Prompts - Show only when no messages or just welcome */}
        {messages.length <= 1 && (
          <div className="mb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-blue-200/70">Try asking about:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {quickPrompts.map((prompt, i) => {
                const Icon = prompt.icon
                return (
                  <Button
                    key={i}
                    size="sm"
                    variant="ghost"
                    onClick={() => sendMessage(prompt.text)}
                    className="text-sm bg-white/10 hover:bg-white/20 text-blue-100 border border-white/20 rounded-xl py-3 h-auto"
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-left">{prompt.text}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about ocean temperature, salinity, currents, anomalies..."
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/60 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-cyan-400/50"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-xl shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-blue-200/50">
              Powered by ARGO float network data • Real-time oceanographic analysis
            </p>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
              Live Data
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}