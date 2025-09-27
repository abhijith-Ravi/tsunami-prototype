"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BellOff, BellRing, Waves, Thermometer, Droplets, Activity, AlertTriangle, MapPin, TrendingUp, Settings, Plus, X, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface Alert {
  id: string
  title: string
  region: string
  severity: "High" | "Medium" | "Low"
  property: string
  threshold: number
  currentValue: number
  timestamp: string
  isActive: boolean
  description: string
}

const initialAlerts: Alert[] = [
  { 
    id: "a1", 
    title: "Temperature Anomaly", 
    region: "North Atlantic (45°N, 30°W)", 
    severity: "High",
    property: "temperature",
    threshold: 18.5,
    currentValue: 21.2,
    timestamp: "2 minutes ago",
    isActive: true,
    description: "Sea surface temperature exceeded threshold by +2.7°C. Unusual warming event detected."
  },
  { 
    id: "a2", 
    title: "Salinity Intrusion", 
    region: "Mediterranean Sea (36°N, 15°E)", 
    severity: "Medium",
    property: "salinity",
    threshold: 38.5,
    currentValue: 39.1,
    timestamp: "15 minutes ago",
    isActive: true,
    description: "Salinity levels show +0.6 PSU increase, indicating potential water mass intrusion."
  },
  { 
    id: "a3", 
    title: "Oxygen Depletion", 
    region: "Arabian Sea (15°N, 65°E)", 
    severity: "High",
    property: "oxygen",
    threshold: 150,
    currentValue: 89,
    timestamp: "1 hour ago",
    isActive: false,
    description: "Dissolved oxygen levels dropped 40% below normal in OMZ expansion."
  },
  { 
    id: "a4", 
    title: "Chlorophyll Bloom", 
    region: "Southern Ocean (50°S, 140°E)", 
    severity: "Low",
    property: "chlorophyll",
    threshold: 2.5,
    currentValue: 4.8,
    timestamp: "3 hours ago",
    isActive: true,
    description: "Phytoplankton bloom detected with 92% increase in chlorophyll-a concentration."
  }
]

const properties = [
  { value: "temperature", label: "Temperature", unit: "°C", icon: Thermometer },
  { value: "salinity", label: "Salinity", unit: "PSU", icon: Droplets },
  { value: "oxygen", label: "Dissolved Oxygen", unit: "μmol/kg", icon: Activity },
  { value: "chlorophyll", label: "Chlorophyll-a", unit: "mg/m³", icon: Activity },
  { value: "ph", label: "pH", unit: "pH", icon: Droplets },
  { value: "pressure", label: "Pressure", unit: "dbar", icon: TrendingUp },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = React.useState<Alert[]>(initialAlerts)
  const [mute, setMute] = React.useState(false)
  const [showCreateAlert, setShowCreateAlert] = React.useState(false)
  const [filterSeverity, setFilterSeverity] = React.useState<string>("all")
  const [filterProperty, setFilterProperty] = React.useState<string>("all")
  
  // New alert form state
  const [newAlert, setNewAlert] = React.useState({
    title: "",
    region: "",
    property: "temperature",
    threshold: "",
    severity: "Medium" as Alert["severity"]
  })

  // Filter alerts based on selected filters
  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === "all" || alert.severity === filterSeverity
    const propertyMatch = filterProperty === "all" || alert.property === filterProperty
    return severityMatch && propertyMatch
  })

  const activeAlertsCount = alerts.filter(a => a.isActive).length

  function toggleAlert(id: string) {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ))
    toast.success("Alert status updated")
  }

  function deleteAlert(id: string) {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
    toast.success("Alert deleted")
  }

  function createAlert() {
    if (!newAlert.title || !newAlert.region || !newAlert.threshold) {
      toast.error("Please fill all required fields")
      return
    }

    const alert: Alert = {
      id: `alert-${Date.now()}`,
      title: newAlert.title,
      region: newAlert.region,
      property: newAlert.property,
      threshold: parseFloat(newAlert.threshold),
      currentValue: parseFloat(newAlert.threshold) * (0.8 + Math.random() * 0.4), // Mock current value
      severity: newAlert.severity,
      timestamp: "Just created",
      isActive: true,
      description: `Custom alert for ${newAlert.property} monitoring in ${newAlert.region}`
    }

    setAlerts(prev => [alert, ...prev])
    setNewAlert({ title: "", region: "", property: "temperature", threshold: "", severity: "Medium" })
    setShowCreateAlert(false)
    toast.success("Alert created successfully")
  }

  function getSeverityColor(severity: Alert["severity"]) {
    switch(severity) {
      case "High": return "bg-red-500/10 text-red-400 border-red-500/20"
      case "Medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20"  
      case "Low": return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    }
  }

  function getSeverityGlow(severity: Alert["severity"]) {
    switch(severity) {
      case "High": return "shadow-[0_0_20px_-4px_rgba(239,68,68,0.6)]"
      case "Medium": return "shadow-[0_0_18px_-6px_rgba(245,158,11,0.5)]"
      case "Low": return "shadow-[0_0_18px_-6px_rgba(59,130,246,0.4)]"
    }
  }

  function getPropertyIcon(property: string) {
    const prop = properties.find(p => p.value === property)
    return prop?.icon || AlertTriangle
  }

  return (
    <div className="min-h-screen">
      {/* Ocean-themed background - using original scheme */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Deep ocean background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.9)] via-[oklch(0.18_0.07_230_/_0.7)] to-[oklch(0.22_0.08_210_/_0.6)]" />
      </div>

      <main className="relative z-10 min-h-screen px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-6xl space-y-8">
          
          {/* Header */}
          <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                      <Waves className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-white tracking-tight">Smart Ocean Alerts</CardTitle>
                      <CardDescription className="text-blue-200/70">
                        Real-time monitoring and anomaly detection across global oceans
                      </CardDescription>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{activeAlertsCount}</div>
                    <div className="text-xs text-blue-200/70">Active Alerts</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch checked={!mute} onCheckedChange={setMute} />
                    {!mute ? (
                      <div className="flex items-center gap-2 text-sm text-white">
                        <BellRing className="h-4 w-4 text-cyan-400 animate-pulse" />
                        <span>Live</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <BellOff className="h-4 w-4" />
                        <span>Muted</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Controls */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-white text-sm">Filter by severity:</Label>
                    <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-white text-sm">Filter by property:</Label>
                    <Select value={filterProperty} onValueChange={setFilterProperty}>
                      <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Properties</SelectItem>
                        {properties.map(prop => (
                          <SelectItem key={prop.value} value={prop.value}>{prop.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowCreateAlert(!showCreateAlert)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </div>

              {/* Create Alert Form */}
              {showCreateAlert && (
                <div className="mt-6 p-6 rounded-xl border border-white/20 bg-white/5">
                  <h3 className="text-lg font-semibold text-white mb-4">Create New Alert</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white text-sm mb-2 block">Alert Title *</Label>
                      <Input
                        value={newAlert.title}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Temperature Anomaly"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">Region *</Label>
                      <Input
                        value={newAlert.region}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, region: e.target.value }))}
                        placeholder="e.g., Pacific Ocean (30°N, 140°W)"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">Property</Label>
                      <Select value={newAlert.property} onValueChange={(value) => setNewAlert(prev => ({ ...prev, property: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {properties.map(prop => (
                            <SelectItem key={prop.value} value={prop.value}>{prop.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">
                        Threshold * ({properties.find(p => p.value === newAlert.property)?.unit})
                      </Label>
                      <Input
                        type="number"
                        value={newAlert.threshold}
                        onChange={(e) => setNewAlert(prev => ({ ...prev, threshold: e.target.value }))}
                        placeholder="e.g., 25.5"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label className="text-white text-sm mb-2 block">Severity</Label>
                      <Select value={newAlert.severity} onValueChange={(value: Alert["severity"]) => setNewAlert(prev => ({ ...prev, severity: value }))}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <Button onClick={createAlert} className="bg-emerald-600 hover:bg-emerald-700">
                      Create Alert
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowCreateAlert(false)}
                      className="text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
                <CardContent className="py-12 text-center">
                  <div className="text-white/60 text-lg">No alerts match your current filters</div>
                  <div className="text-white/40 text-sm mt-2">Try adjusting your filter criteria</div>
                </CardContent>
              </Card>
            ) : (
              filteredAlerts.map((alert) => {
                const Icon = getPropertyIcon(alert.property)
                const propertyInfo = properties.find(p => p.value === alert.property)
                
                return (
                  <Card
                    key={alert.id}
                    className={`border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl ${getSeverityGlow(alert.severity)}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl text-cyan-300 ring-1 ring-white/10 shadow-lg">
                            <Icon className="h-6 w-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                              <Badge className={`${getSeverityColor(alert.severity)} font-medium`}>
                                {alert.severity}
                              </Badge>
                              {alert.isActive ? (
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                                  Paused
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 text-blue-200/70 text-sm mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{alert.region}</span>
                              <span className="text-white/40">•</span>
                              <span>{alert.timestamp}</span>
                            </div>
                            
                            <p className="text-white/80 text-sm mb-3">{alert.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-white/60">Current:</span>
                                <span className="font-mono text-white">
                                  {alert.currentValue.toFixed(1)} {propertyInfo?.unit}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-white/60">Threshold:</span>
                                <span className="font-mono text-white">
                                  {alert.threshold.toFixed(1)} {propertyInfo?.unit}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-white/60">Deviation:</span>
                                <span className={`font-mono ${alert.currentValue > alert.threshold ? 'text-red-400' : 'text-emerald-400'}`}>
                                  {alert.currentValue > alert.threshold ? '+' : ''}
                                  {(alert.currentValue - alert.threshold).toFixed(1)} {propertyInfo?.unit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleAlert(alert.id)}
                            className="text-white hover:bg-white/10"
                          >
                            {alert.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteAlert(alert.id)}
                            className="text-red-300 hover:bg-red-500/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </main>
    </div>
  )
}