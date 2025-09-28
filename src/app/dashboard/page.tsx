"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon, MapPinIcon, BarChart3Icon, TrendingUpIcon, WavesIcon } from "lucide-react"

const makeMock = (len = 30) =>
  Array.from({ length: len }).map((_, i) => ({
    t: `${i}`.padStart(2, "0"),
    temperature: 2 + Math.sin(i / 3) * 0.6 + Math.random() * 0.1,
    salinity: 34.2 + Math.cos(i / 4) * 0.15 + Math.random() * 0.02,
    oxygen: 200 + Math.sin(i / 5) * 10 + Math.random() * 2,
  }))

// Regional dashboard types
interface Dashboard {
  id: string
  name: string
  description: string
  variables: string[]
  dateCreated: string
  region: string
}

interface Region {
  id: string
  name: string
  country: string
  coordinates: { lat: number; lng: number }
  description: string
  dashboards: Dashboard[]
}

// Predefined coastal regions around the world
const initialRegions: Region[] = [
  {
    id: "mangalore-coast",
    name: "Mangalore Coast",
    country: "India",
    coordinates: { lat: 12.9141, lng: 74.8560 },
    description: "Arabian Sea coastal waters off Karnataka",
    dashboards: [
      {
        id: "mg-temp-1",
        name: "Monsoon Temperature Analysis",
        description: "Temperature variations during monsoon season",
        variables: ["temperature", "salinity"],
        dateCreated: "2024-03-15",
        region: "mangalore-coast"
      },
      {
        id: "mg-oxygen-1",
        name: "Oxygen Depletion Study",
        description: "Dissolved oxygen levels and marine life impact",
        variables: ["oxygen", "temperature"],
        dateCreated: "2024-03-20",
        region: "mangalore-coast"
      },
      {
        id: "mg-multi-1",
        name: "Multi-Parameter Correlation",
        description: "Comprehensive analysis of temperature, salinity, and oxygen",
        variables: ["temperature", "salinity", "oxygen"],
        dateCreated: "2024-03-25",
        region: "mangalore-coast"
      }
    ]
  },
  {
    id: "kerala-backwaters",
    name: "Kerala Backwaters",
    country: "India",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    description: "Coastal lagoons and estuarine systems",
    dashboards: [
      {
        id: "kb-salinity-1",
        name: "Salinity Gradient Analysis",
        description: "Freshwater-seawater mixing patterns",
        variables: ["salinity", "temperature"],
        dateCreated: "2024-03-10",
        region: "kerala-backwaters"
      },
      {
        id: "kb-ecosystem-1",
        name: "Ecosystem Health Monitor",
        description: "Water quality parameters for aquaculture",
        variables: ["oxygen", "salinity"],
        dateCreated: "2024-03-18",
        region: "kerala-backwaters"
      }
    ]
  },
  {
    id: "mumbai-coast",
    name: "Mumbai Coast",
    country: "India",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    description: "Western Indian coastline near Mumbai",
    dashboards: [
      {
        id: "mb-pollution-1",
        name: "Urban Runoff Impact",
        description: "Pollution effects on coastal water quality",
        variables: ["oxygen", "temperature"],
        dateCreated: "2024-03-12",
        region: "mumbai-coast"
      },
      {
        id: "mb-thermal-1",
        name: "Thermal Pollution Study",
        description: "Industrial discharge temperature monitoring",
        variables: ["temperature"],
        dateCreated: "2024-03-22",
        region: "mumbai-coast"
      },
      {
        id: "mb-comprehensive-1",
        name: "Comprehensive Water Quality",
        description: "All parameters monitoring for coastal management",
        variables: ["temperature", "salinity", "oxygen"],
        dateCreated: "2024-03-28",
        region: "mumbai-coast"
      }
    ]
  },
  {
    id: "goa-coast",
    name: "Goa Coast",
    country: "India",
    coordinates: { lat: 15.2993, lng: 74.1240 },
    description: "Central west coast of India",
    dashboards: [
      {
        id: "gc-tourism-1",
        name: "Tourism Impact Assessment",
        description: "Water quality changes during peak season",
        variables: ["oxygen", "salinity"],
        dateCreated: "2024-03-14",
        region: "goa-coast"
      },
      {
        id: "gc-seasonal-1",
        name: "Seasonal Variation Study",
        description: "Pre and post monsoon comparisons",
        variables: ["temperature", "salinity"],
        dateCreated: "2024-03-26",
        region: "goa-coast"
      }
    ]
  },
  {
    id: "chennai-coast",
    name: "Chennai Coast",
    country: "India",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    description: "Bay of Bengal coastal waters off Tamil Nadu",
    dashboards: [
      {
        id: "ch-cyclone-1",
        name: "Cyclone Impact Analysis",
        description: "Water parameter changes during extreme weather",
        variables: ["temperature", "oxygen"],
        dateCreated: "2024-03-16",
        region: "chennai-coast"
      },
      {
        id: "ch-upwelling-1",
        name: "Upwelling Phenomenon",
        description: "Deep water upwelling and nutrient distribution",
        variables: ["temperature", "salinity", "oxygen"],
        dateCreated: "2024-03-24",
        region: "chennai-coast"
      }
    ]
  },
  {
    id: "visakhapatnam-coast",
    name: "Visakhapatnam Coast",
    country: "India",
    coordinates: { lat: 17.6868, lng: 83.2185 },
    description: "Eastern Indian coastline near Andhra Pradesh",
    dashboards: [
      {
        id: "vz-port-1",
        name: "Port Activity Impact",
        description: "Shipping and port operations effect on water quality",
        variables: ["salinity", "oxygen"],
        dateCreated: "2024-03-19",
        region: "visakhapatnam-coast"
      }
    ]
  },
  {
    id: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    coordinates: { lat: -16.2839, lng: 145.7781 },
    description: "World's largest coral reef system",
    dashboards: [
      {
        id: "gbr-coral-1",
        name: "Coral Bleaching Monitor",
        description: "Temperature stress on coral ecosystems",
        variables: ["temperature", "oxygen"],
        dateCreated: "2024-03-11",
        region: "great-barrier-reef"
      },
      {
        id: "gbr-acidification-1",
        name: "Ocean Acidification Study",
        description: "pH and carbonate chemistry analysis",
        variables: ["temperature", "salinity"],
        dateCreated: "2024-03-21",
        region: "great-barrier-reef"
      }
    ]
  },
  {
    id: "california-coast",
    name: "California Coast",
    country: "USA",
    coordinates: { lat: 36.7783, lng: -119.4179 },
    description: "Pacific coastal waters off California",
    dashboards: [
      {
        id: "ca-kelp-1",
        name: "Kelp Forest Ecosystem",
        description: "Temperature and nutrient analysis for kelp growth",
        variables: ["temperature", "oxygen"],
        dateCreated: "2024-03-13",
        region: "california-coast"
      },
      {
        id: "ca-elnino-1",
        name: "El Niño Impact Study",
        description: "Climate oscillation effects on coastal waters",
        variables: ["temperature", "salinity"],
        dateCreated: "2024-03-27",
        region: "california-coast"
      }
    ]
  },
  {
    id: "mediterranean-coast",
    name: "Mediterranean Coast",
    country: "Spain",
    coordinates: { lat: 39.3999, lng: 2.7300 },
    description: "Western Mediterranean Sea region",
    dashboards: [
      {
        id: "med-warming-1",
        name: "Mediterranean Warming",
        description: "Long-term temperature trends and marine heatwaves",
        variables: ["temperature"],
        dateCreated: "2024-03-17",
        region: "mediterranean-coast"
      }
    ]
  },
  {
    id: "norwegian-coast",
    name: "Norwegian Coast",
    country: "Norway",
    coordinates: { lat: 62.4722, lng: 6.1494 },
    description: "North Atlantic coastal waters",
    dashboards: [
      {
        id: "no-arctic-1",
        name: "Arctic Water Mass Analysis",
        description: "Cold water intrusion and mixing patterns",
        variables: ["temperature", "salinity"],
        dateCreated: "2024-03-23",
        region: "norwegian-coast"
      }
    ]
  }
]

export default function DashboardPage() {
  const [variable, setVariable] = React.useState("temperature")
  const [region, setRegion] = React.useState("global-ocean")
  const [depth, setDepth] = React.useState("0-2000m")
  const [regions, setRegions] = React.useState<Region[]>(initialRegions)
  const [activeTab, setActiveTab] = React.useState("regions")
  const [selectedRegion, setSelectedRegion] = React.useState<Region | null>(null)
  const [selectedDashboard, setSelectedDashboard] = React.useState<Dashboard | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isRegionDialogOpen, setIsRegionDialogOpen] = React.useState(false)
  const [isDashboardModalOpen, setIsDashboardModalOpen] = React.useState(false)
  const [newDashboard, setNewDashboard] = React.useState({
    name: "",
    description: "",
    variables: [] as string[],
    region: ""
  })
  const [newRegion, setNewRegion] = React.useState({
    name: "",
    country: "",
    lat: "",
    lng: "",
    description: ""
  })

  // Override body background for dashboard page
  React.useEffect(() => {
    document.body.classList.add('dashboard-page')
    document.body.style.backgroundImage = 'none'
    document.body.style.background = 'transparent'
    
    return () => {
      document.body.classList.remove('dashboard-page')
      document.body.style.backgroundImage = ''
      document.body.style.background = ''
    }
  }, [])

  const data = React.useMemo(() => makeMock(36), [variable, region, depth])

  // Generate comparison data for dashboard modal
  const generateComparisonData = (variables: string[]) => {
    return Array.from({ length: 30 }).map((_, i) => {
      const baseData: any = { t: `${i}`.padStart(2, "0") }
      
      variables.forEach(variable => {
        switch(variable) {
          case 'temperature':
            baseData[variable] = 2 + Math.sin(i / 3) * 0.6 + Math.random() * 0.1
            break
          case 'salinity':
            baseData[variable] = 34.2 + Math.cos(i / 4) * 0.15 + Math.random() * 0.02
            break
          case 'oxygen':
            baseData[variable] = 200 + Math.sin(i / 5) * 10 + Math.random() * 2
            break
          default:
            baseData[variable] = Math.random() * 100
        }
      })
      
      return baseData
    })
  }

  const getVariableColor = (variable: string) => {
    switch(variable) {
      case 'temperature': return 'oklch(0.7 0.18 0)'    // Red-orange
      case 'salinity': return 'oklch(0.7 0.18 120)'     // Blue-green
      case 'oxygen': return 'oklch(0.7 0.18 240)'       // Blue
      default: return 'oklch(0.7 0.18 200)'
    }
  }

  const getVariableUnit = (variable: string) => {
    switch(variable) {
      case 'temperature': return '°C'
      case 'salinity': return 'PSU'
      case 'oxygen': return 'µmol/kg'
      default: return ''
    }
  }

  const chartConfig = {
    series: { 
      label: variable === "salinity" ? "Salinity (PSU)" : 
              variable === "oxygen" ? "Oxygen (µmol/kg)" : 
              "Temperature (°C)", 
      color: "oklch(0.7 0.18 200)" 
    },
  } as const

  const openDashboardModal = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard)
    setIsDashboardModalOpen(true)
  }

  const handleCreateDashboard = () => {
    if (!newDashboard.name || !newDashboard.region) return
    
    const dashboard: Dashboard = {
      id: `dash-${Date.now()}`,
      name: newDashboard.name,
      description: newDashboard.description,
      variables: newDashboard.variables.length > 0 ? newDashboard.variables : ["temperature"],
      dateCreated: new Date().toISOString().split('T')[0],
      region: newDashboard.region
    }

    setRegions(prev => prev.map(region => 
      region.id === newDashboard.region 
        ? { ...region, dashboards: [...region.dashboards, dashboard] }
        : region
    ))

    setNewDashboard({ name: "", description: "", variables: [], region: "" })
    setIsCreateDialogOpen(false)
  }

  const handleCreateRegion = () => {
    if (!newRegion.name || !newRegion.country || !newRegion.lat || !newRegion.lng) return
    
    const region: Region = {
      id: `region-${Date.now()}`,
      name: newRegion.name,
      country: newRegion.country,
      coordinates: { lat: parseFloat(newRegion.lat), lng: parseFloat(newRegion.lng) },
      description: newRegion.description,
      dashboards: []
    }

    setRegions(prev => [...prev, region])
    setNewRegion({ name: "", country: "", lat: "", lng: "", description: "" })
    setIsRegionDialogOpen(false)
  }

  const toggleVariable = (variable: string) => {
    setNewDashboard(prev => ({
      ...prev,
      variables: prev.variables.includes(variable)
        ? prev.variables.filter(v => v !== variable)
        : [...prev.variables, variable]
    }))
  }

  const getTotalDashboards = () => regions.reduce((total, region) => total + region.dashboards.length, 0)

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      {/* Ocean-themed background */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Deep ocean background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.9)] via-[oklch(0.18_0.07_230_/_0.7)] to-[oklch(0.22_0.08_210_/_0.6)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">Varuna Regional Dashboard</h1>
          <p className="text-blue-200/90">Manage your coastal region analysis and create custom dashboards</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex p-1 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl">
              <TabsTrigger 
                value="regions" 
                className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10"
              >
                <MapPinIcon className="h-5 w-5" />
                <span className="font-medium">Regional Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-white/10"
              >
                <BarChart3Icon className="h-5 w-5" />
                <span className="font-medium">Analysis Dashboard</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="regions" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{regions.length}</div>
                  <p className="text-xs text-muted-foreground">Coastal monitoring areas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Dashboards</CardTitle>
                  <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{getTotalDashboards()}</div>
                  <p className="text-xs text-muted-foreground">Custom analysis dashboards</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Countries</CardTitle>
                  <WavesIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{new Set(regions.map(r => r.country)).size}</div>
                  <p className="text-xs text-muted-foreground">Nations with monitoring</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[oklch(0.4_0.12_210)] hover:bg-[oklch(0.38_0.12_210)]">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Dashboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Dashboard</DialogTitle>
                    <DialogDescription>
                      Create a custom analysis dashboard for a specific coastal region.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dashboard-name">Dashboard Name</Label>
                      <Input
                        id="dashboard-name"
                        value={newDashboard.name}
                        onChange={(e) => setNewDashboard(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Monsoon Temperature Analysis"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dashboard-region">Region</Label>
                      <Select value={newDashboard.region} onValueChange={(value) => setNewDashboard(prev => ({ ...prev, region: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map(region => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.name}, {region.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Variables to Monitor</Label>
                      <div className="flex flex-wrap gap-2">
                        {["temperature", "salinity", "oxygen"].map(variable => (
                          <Badge
                            key={variable}
                            variant={newDashboard.variables.includes(variable) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleVariable(variable)}
                          >
                            {variable.charAt(0).toUpperCase() + variable.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dashboard-description">Description (Optional)</Label>
                      <Textarea
                        id="dashboard-description"
                        value={newDashboard.description}
                        onChange={(e) => setNewDashboard(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your dashboard analysis..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateDashboard} disabled={!newDashboard.name || !newDashboard.region}>
                      Create Dashboard
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isRegionDialogOpen} onOpenChange={setIsRegionDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    Add Region
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Region</DialogTitle>
                    <DialogDescription>
                      Add a new coastal region for monitoring and analysis.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="region-name">Region Name</Label>
                      <Input
                        id="region-name"
                        value={newRegion.name}
                        onChange={(e) => setNewRegion(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Kochi Coast"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="region-country">Country</Label>
                      <Input
                        id="region-country"
                        value={newRegion.country}
                        onChange={(e) => setNewRegion(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="e.g., India"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-2">
                        <Label htmlFor="region-lat">Latitude</Label>
                        <Input
                          id="region-lat"
                          type="number"
                          step="any"
                          value={newRegion.lat}
                          onChange={(e) => setNewRegion(prev => ({ ...prev, lat: e.target.value }))}
                          placeholder="12.9141"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="region-lng">Longitude</Label>
                        <Input
                          id="region-lng"
                          type="number"
                          step="any"
                          value={newRegion.lng}
                          onChange={(e) => setNewRegion(prev => ({ ...prev, lng: e.target.value }))}
                          placeholder="74.8560"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="region-description">Description (Optional)</Label>
                      <Textarea
                        id="region-description"
                        value={newRegion.description}
                        onChange={(e) => setNewRegion(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe this coastal region..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreateRegion} disabled={!newRegion.name || !newRegion.country || !newRegion.lat || !newRegion.lng}>
                      Add Region
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Region Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regions.map(region => (
                <Card 
                  key={region.id} 
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                  onClick={() => setSelectedRegion(region)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPinIcon className="h-3 w-3" />
                          {region.country}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {region.dashboards.length} dashboard{region.dashboards.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {region.description || "Coastal monitoring region"}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Lat: {region.coordinates.lat.toFixed(4)}</span>
                      <span>Lng: {region.coordinates.lng.toFixed(4)}</span>
                    </div>
                    {region.dashboards.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Recent dashboards:</p>
                        <div className="space-y-1">
                          {region.dashboards.slice(0, 2).map(dashboard => (
                            <div key={dashboard.id} className="text-xs">
                              <span className="font-medium">{dashboard.name}</span>
                              <div className="flex gap-1 mt-1">
                                {dashboard.variables.map(variable => (
                                  <Badge key={variable} variant="outline" className="text-xs py-0 px-1">
                                    {variable}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                          {region.dashboards.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{region.dashboards.length - 2} more
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Select value={variable} onValueChange={setVariable}>
                <SelectTrigger className="min-w-40">
                  <SelectValue placeholder="Variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="salinity">Salinity</SelectItem>
                  <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                </SelectContent>
              </Select>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="min-w-40">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global-ocean">Global Ocean</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger className="min-w-40">
                  <SelectValue placeholder="Depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2000m">0–2000 m</SelectItem>
                  <SelectItem value="0-1000m">0–1000 m</SelectItem>
                  <SelectItem value="500-2000m">500–2000 m</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-[oklch(0.4_0.12_210)] hover:bg-[oklch(0.38_0.12_210)]">
                Apply
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Time Series Analysis</CardTitle>
                  <CardDescription>
                    {variable} • {regions.find(r => r.id === region)?.name || region.replace("-", " ")} • {depth}
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
                  <CardTitle className="text-lg">Region Statistics</CardTitle>
                  <CardDescription>Live data from monitoring stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Active floats</span>
                      <span className="font-mono">3,921</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>New profiles (24h)</span>
                      <span className="font-mono">7,204</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Anomalies flagged</span>
                      <span className="font-mono">12</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Coverage</span>
                      <span className="font-mono">92%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Region Detail Dialog */}
        {selectedRegion && (
          <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-2 shadow-2xl">
              <DialogHeader className="pb-4 border-b">
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <MapPinIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold">{selectedRegion.name}</div>
                    <div className="text-sm text-muted-foreground font-normal">
                      {selectedRegion.country} • {selectedRegion.dashboards.length} dashboard{selectedRegion.dashboards.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="overflow-y-auto max-h-[65vh] space-y-6 pr-2">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <WavesIcon className="h-4 w-4 text-blue-600" />
                    Location Details
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedRegion.description || "Coastal monitoring region"}
                  </p>
                  <div className="flex gap-4 text-xs">
                    <span className="px-2 py-1 bg-background/60 rounded">
                      Lat: {selectedRegion.coordinates.lat.toFixed(4)}
                    </span>
                    <span className="px-2 py-1 bg-background/60 rounded">
                      Lng: {selectedRegion.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                {selectedRegion.dashboards.length > 0 ? (
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BarChart3Icon className="h-5 w-5 text-green-600" />
                      Available Dashboards
                      <Badge variant="outline" className="ml-2">
                        {selectedRegion.dashboards.length}
                      </Badge>
                    </h4>
                    <div className="space-y-4">
                      {selectedRegion.dashboards.map(dashboard => (
                        <Card 
                          key={dashboard.id} 
                          className="relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-l-blue-500 bg-background/50 hover:bg-background/80 group"
                          onClick={() => openDashboardModal(dashboard)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                          
                          <CardContent className="p-6 relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h5 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200 mb-1">
                                  {dashboard.name}
                                </h5>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <TrendingUpIcon className="h-4 w-4" />
                                  <span>Created: {dashboard.dateCreated}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <BarChart3Icon className="h-5 w-5 text-blue-600" />
                                <span className="text-xs text-muted-foreground">View Dashboard</span>
                              </div>
                            </div>
                            
                            {dashboard.description && (
                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {dashboard.description}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {dashboard.variables.map(variable => (
                                <Badge 
                                  key={variable} 
                                  variant="secondary" 
                                  className="text-xs px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                >
                                  {variable.charAt(0).toUpperCase() + variable.slice(1)}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-border/50">
                              <span className="text-xs text-muted-foreground">
                                {dashboard.variables.length} variable{dashboard.variables.length !== 1 ? 's' : ''} monitored
                              </span>
                              <div className="flex items-center gap-1 text-xs text-blue-600 font-medium group-hover:gap-2 transition-all">
                                <span>Click to analyze</span>
                                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/20 rounded-lg">
                    <div className="p-4 bg-muted/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <BarChart3Icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium text-lg mb-2">No Dashboards Available</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      This region doesn't have any analysis dashboards yet.
                    </p>
                    <Button 
                      onClick={() => {
                        setSelectedRegion(null)
                        setNewDashboard(prev => ({ ...prev, region: selectedRegion.id }))
                        setIsCreateDialogOpen(true)
                      }}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create First Dashboard
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Dashboard Detail Modal */}
        {selectedDashboard && (
          <Dialog open={isDashboardModalOpen} onOpenChange={setIsDashboardModalOpen}>
            <DialogContent className="sm:max-w-[95vw] lg:max-w-[1200px] max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 border-2 shadow-2xl">
              <DialogHeader className="pb-6 border-b bg-gradient-to-r from-blue-500/5 to-transparent -m-6 p-6 mb-6">
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <BarChart3Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold">{selectedDashboard.name}</div>
                    <div className="text-sm text-muted-foreground font-normal mt-1">
                      {regions.find(r => r.id === selectedDashboard.region)?.name} • {selectedDashboard.dateCreated} • {selectedDashboard.variables.length} variable{selectedDashboard.variables.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="overflow-y-auto max-h-[75vh] space-y-8 pr-2">
                {selectedDashboard.description && (
                  <div className="p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUpIcon className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-lg">Analysis Overview</h4>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{selectedDashboard.description}</p>
                  </div>
                )}

                {/* Variables Overview */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-xl flex items-center gap-2">
                    <WavesIcon className="h-6 w-6 text-blue-600" />
                    Parameter Statistics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedDashboard.variables.map(variable => {
                      const data = generateComparisonData([variable])
                      const avgValue = data.reduce((sum, d) => sum + d[variable], 0) / data.length
                      const maxValue = Math.max(...data.map(d => d[variable]))
                      const minValue = Math.min(...data.map(d => d[variable]))
                      
                      return (
                        <Card key={variable} className="bg-gradient-to-br from-background to-muted/30 border-2 hover:shadow-lg transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold capitalize flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full shadow-sm" 
                                style={{ backgroundColor: getVariableColor(variable) }}
                              />
                              {variable} {getVariableUnit(variable)}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0 space-y-3">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                                <span className="text-sm text-muted-foreground">Average:</span>
                                <span className="font-mono font-medium">{avgValue.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                                <span className="text-sm text-muted-foreground">Maximum:</span>
                                <span className="font-mono font-medium text-green-700 dark:text-green-400">{maxValue.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                                <span className="text-sm text-muted-foreground">Minimum:</span>
                                <span className="font-mono font-medium text-orange-700 dark:text-orange-400">{minValue.toFixed(2)}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Main Chart */}
                <Card className="border-2 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-slate-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-blue-950/50 border-b">
                    <CardTitle className="text-xl flex items-center gap-3">
                      <BarChart3Icon className="h-6 w-6 text-blue-600" />
                      {selectedDashboard.variables.length > 1 ? 'Multi-Variable Comparison Chart' : 'Time Series Analysis'}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {selectedDashboard.variables.length > 1 
                        ? `Comparing ${selectedDashboard.variables.join(', ')} parameters over time with dual-axis scaling`
                        : `Detailed ${selectedDashboard.variables[0].charAt(0).toUpperCase() + selectedDashboard.variables[0].slice(1)} trends and temporal patterns`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[450px] w-full bg-gradient-to-b from-background to-muted/20 rounded-lg p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateComparisonData(selectedDashboard.variables)} margin={{ left: 40, right: 40, top: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="#e5e7eb" />
                          <XAxis 
                            dataKey="t" 
                            tick={{ fontSize: 12, fill: '#6b7280' }} 
                            axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                            tickLine={{ stroke: '#d1d5db' }}
                          />
                          {selectedDashboard.variables.map((variable, index) => (
                            <YAxis 
                              key={variable}
                              yAxisId={variable}
                              orientation={index === 0 ? "left" : index === 1 ? "right" : "left"}
                              tick={{ fontSize: 12, fill: getVariableColor(variable) }}
                              axisLine={{ stroke: getVariableColor(variable), strokeWidth: 2 }}
                              tickLine={{ stroke: getVariableColor(variable) }}
                              width={70}
                              label={{ 
                                value: `${variable.charAt(0).toUpperCase() + variable.slice(1)} (${getVariableUnit(variable)})`, 
                                angle: index === 0 ? -90 : 90, 
                                position: 'insideLeft',
                                style: { textAnchor: 'middle', fill: getVariableColor(variable), fontWeight: 'bold' }
                              }}
                            />
                          ))}
                          <ChartTooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-background/95 backdrop-blur-sm border-2 rounded-lg shadow-xl p-4 min-w-[200px]">
                                    <p className="font-semibold mb-3 text-lg">Time: {label}</p>
                                    {payload.map((entry) => (
                                      <div key={entry.dataKey} className="flex items-center gap-3 text-sm mb-2 last:mb-0">
                                        <div 
                                          className="w-4 h-4 rounded-full shadow-sm" 
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="capitalize font-medium min-w-[80px]">{entry.dataKey}:</span>
                                        <span className="font-mono font-bold">
                                          {Number(entry.value).toFixed(2)} {getVariableUnit(entry.dataKey as string)}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )
                              }
                              return null
                            }}
                          />
                          {selectedDashboard.variables.map(variable => (
                            <Line 
                              key={variable}
                              yAxisId={variable}
                              type="monotone" 
                              dataKey={variable} 
                              stroke={getVariableColor(variable)} 
                              strokeWidth={3}
                              dot={{ 
                                fill: getVariableColor(variable), 
                                strokeWidth: 0, 
                                r: 4,
                                className: 'hover:r-6 transition-all'
                              }}
                              activeDot={{ 
                                r: 7, 
                                stroke: getVariableColor(variable), 
                                strokeWidth: 3, 
                                fill: '#ffffff',
                                className: 'drop-shadow-lg'
                              }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights Panel */}
                {selectedDashboard.variables.length > 1 && (
                  <Card className="border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-b">
                      <CardTitle className="text-xl flex items-center gap-3">
                        <TrendingUpIcon className="h-6 w-6 text-green-600" />
                        AI-Generated Insights
                      </CardTitle>
                      <CardDescription className="text-base">
                        Automated correlation analysis and oceanographic interpretations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {selectedDashboard.variables.length >= 2 && (
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border-l-4 border-blue-500 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                              <WavesIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-2">
                                Primary Parameter Correlation
                              </h5>
                              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                                {selectedDashboard.variables.includes('temperature') && selectedDashboard.variables.includes('oxygen')
                                  ? "Strong negative correlation observed between temperature and dissolved oxygen levels. This is a typical inverse relationship in marine systems where warmer waters hold less dissolved oxygen, impacting marine ecosystem health."
                                  : selectedDashboard.variables.includes('temperature') && selectedDashboard.variables.includes('salinity')
                                  ? "Temperature and salinity exhibit complex seasonal variation patterns, indicating active water mass mixing processes. These variations suggest influences from monsoon patterns and coastal upwelling events."
                                  : selectedDashboard.variables.includes('salinity') && selectedDashboard.variables.includes('oxygen')
                                  ? "Salinity gradients show strong correlation with oxygen distribution patterns, suggesting significant freshwater influence on marine chemistry. This indicates active river discharge and estuarine mixing."
                                  : "Multi-parameter analysis reveals complex oceanographic interactions requiring detailed temporal and spatial analysis for comprehensive understanding."
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedDashboard.variables.length === 3 && (
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border-l-4 border-green-500 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                              <BarChart3Icon className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-lg text-green-900 dark:text-green-100 mb-2">
                                Comprehensive Water Mass Analysis
                              </h5>
                              <p className="text-green-800 dark:text-green-200 leading-relaxed">
                                Three-parameter correlation analysis provides complete water mass characterization. The simultaneous monitoring of temperature, salinity, and oxygen enables identification of distinct water masses, mixing zones, and ecosystem health indicators essential for marine conservation efforts.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border-l-4 border-amber-500 shadow-sm">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                            <TrendingUpIcon className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-lg text-amber-900 dark:text-amber-100 mb-2">
                              Data Quality & Methodology
                            </h5>
                            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                              Current visualizations use algorithmically generated mock data for prototype demonstration. In production deployment, real-time sensor data from Argo floats, CTD instruments, and autonomous underwater vehicles would provide accurate correlations, trends, and anomaly detection capabilities.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  )
}