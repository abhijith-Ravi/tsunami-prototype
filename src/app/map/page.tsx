"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Create a dynamic map component
const LeafletMap = dynamic(() => import("./MapComponent"), { 
  ssr: false,
  loading: () => <div className="aspect-[16/10] w-full bg-slate-900/50 rounded-xl border border-white/20 flex items-center justify-center text-white">Loading map...</div>
});

export default function MapPage() {
  // Property selection for the graph
  const [xProperty, setXProperty] = React.useState("temperature");
  const [yProperty, setYProperty] = React.useState("salinity");
  
  // Basemap and overlays
  const [basemap, setBasemap] = React.useState("blue-marble");
  const [showTracks, setShowTracks] = React.useState(true);
  const [showDensity, setShowDensity] = React.useState(false);

  // Drag-to-select rectangle (Leaflet bounds)
  type Bounds = any | null;
  const [selectionBounds, setSelectionBounds] = React.useState<Bounds>(null);

  // Monitored regions with enhanced properties
  type Monitored = { 
    id: string; 
    label: string; 
    bounds: any; 
    active: boolean;
    createdAt: string;
    alertCount: number;
    lastAlert?: string;
  };
  const [monitored, setMonitored] = React.useState<Monitored[]>([]);
  const [regionAlerts, setRegionAlerts] = React.useState<Record<string, number>>({});
  const timersRef = React.useRef<Record<string, number>>({});

  // Multiple threshold lines
  const [thresholds, setThresholds] = React.useState<Array<{ id: string; value: number; color: string; label: string }>>([
    { id: "1", value: 0.6, color: "#ef4444", label: "Critical" },
    { id: "2", value: 0.4, color: "#f59e0b", label: "Warning" }
  ]);
  
  const [draggedThreshold, setDraggedThreshold] = React.useState<string | null>(null);
  const lastNotifiedRef = React.useRef<Record<string, number>>({});

  // Properties for graph generation
  const properties = [
    { value: "temperature", label: "Temperature (°C)", unit: "°C" },
    { value: "salinity", label: "Salinity (PSU)", unit: "PSU" },
    { value: "oxygen", label: "Dissolved Oxygen (μmol/kg)", unit: "μmol/kg" },
    { value: "pressure", label: "Pressure (dbar)", unit: "dbar" },
    { value: "chlorophyll", label: "Chlorophyll-a (mg/m³)", unit: "mg/m³" },
    { value: "ph", label: "pH", unit: "pH" },
    { value: "density", label: "Density (kg/m³)", unit: "kg/m³" },
    { value: "nitrate", label: "Nitrate (μmol/kg)", unit: "μmol/kg" }
  ];

  // Mock data stream for chart (now represents relationship between two properties)
  const [series, setSeries] = React.useState<number[]>(() => 
    Array.from({ length: 100 }, (_, i) => {
      // Create correlation between properties with some noise
      const base = 0.5 + 0.3 * Math.sin(i / 8);
      const correlation = getPropertyCorrelation(xProperty, yProperty);
      return Math.max(0, Math.min(1, base + correlation * 0.2 + (Math.random() - 0.5) * 0.15));
    })
  );

  function getPropertyCorrelation(x: string, y: string): number {
    // Simulate realistic oceanographic correlations
    const correlations: Record<string, Record<string, number>> = {
      temperature: { salinity: 0.7, oxygen: -0.8, density: -0.9 },
      salinity: { temperature: 0.7, density: 0.8, oxygen: -0.3 },
      oxygen: { temperature: -0.8, salinity: -0.3, ph: 0.6 },
      pressure: { density: 0.9, temperature: -0.4 }
    };
    return correlations[x]?.[y] || 0;
  }

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSeries((prev) => {
        const correlation = getPropertyCorrelation(xProperty, yProperty);
        const nextVal = 0.5 + 0.3 * Math.sin((prev.length + Date.now() / 3000) / 8) + 
                       correlation * 0.2 + (Math.random() - 0.5) * 0.15;
        const next = [...prev.slice(-99), Math.max(0, Math.min(1, nextVal))];
        
        // Check all thresholds
        const latest = next[next.length - 1];
        
        return next;
      });
    }, 2000);
    return () => window.clearInterval(id);
  }, [xProperty, yProperty, thresholds]);

  // Regenerate data when properties change
  React.useEffect(() => {
    setSeries(Array.from({ length: 100 }, (_, i) => {
      const base = 0.5 + 0.3 * Math.sin(i / 8);
      const correlation = getPropertyCorrelation(xProperty, yProperty);
      return Math.max(0, Math.min(1, base + correlation * 0.2 + (Math.random() - 0.5) * 0.15));
    }));
  }, [xProperty, yProperty]);

  // Predefined ocean regions (bounds)
  const regions = [
    { id: "pacific", label: "Pacific Ocean", bounds: [[-30, 120], [30, -120]] },
    { id: "atlantic", label: "Atlantic Ocean", bounds: [[-40, -60], [40, 10]] },
    { id: "indian", label: "Indian Ocean", bounds: [[-35, 40], [20, 110]] },
    { id: "southern", label: "Southern Ocean", bounds: [[-70, -180], [-45, 180]] },
    { id: "arctic", label: "Arctic Ocean", bounds: [[66, -180], [90, 180]] },
  ];

  function startMonitoringRegion(bounds: any, regionName: string) {
    const id = `region-${Date.now()}`;
    const label = regionName;
    const newRegion: Monitored = {
      id,
      label,
      bounds,
      active: true,
      createdAt: new Date().toLocaleString(),
      alertCount: 0
    };
    
    setMonitored((prev) => [newRegion, ...prev]);
    setRegionAlerts(prev => ({ ...prev, [id]: 0 }));
    
    // Start monitoring with realistic ocean anomaly detection
    const tid = window.setInterval(() => {
      // Simulate various ocean anomalies based on region
      const anomalies = [
        'Unusual temperature spike detected',
        'Salinity anomaly observed', 
        'Oxygen depletion warning',
        'Current velocity change detected',
        'Marine heatwave conditions',
        'Upwelling event detected'
      ];
      
      if (Math.random() < 0.25) { // 25% chance of alert
        const anomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
        const alertTime = new Date().toLocaleTimeString();
        
        setRegionAlerts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        setMonitored(prev => prev.map(region => 
          region.id === id 
            ? { ...region, alertCount: (region.alertCount || 0) + 1, lastAlert: alertTime }
            : region
        ));
        
        toast.error(`🚨 ${regionName}`, { 
          description: `${anomaly} in ${xProperty}-${yProperty} correlation at ${alertTime}`,
          duration: 5000
        });
      }
    }, 12000 + Math.random() * 8000); // 12-20 second intervals
    
    timersRef.current[id] = tid as unknown as number;
    
    toast.success('Monitoring Started', {
      description: `Now monitoring ${regionName} for ocean anomalies`
    });
  }

  function startMonitoringSelected() {
    if (!selectionBounds) {
      toast.info("Select a region", { description: "Hold Shift and drag on the map to draw a selection box." });
      return;
    }
    const id = `sel-${Date.now()}`;
    const label = `${xProperty}/${yProperty} Monitor`;
    const newRegion: Monitored = {
      id,
      label,
      bounds: selectionBounds,
      active: true,
      createdAt: new Date().toLocaleString(),
      alertCount: 0
    };
    setMonitored((prev) => [newRegion, ...prev]);
    
    const tid = window.setInterval(() => {
      if (Math.random() < 0.3) {
        toast.error("Anomaly detected", { 
          description: `${label}: Unusual ${xProperty}-${yProperty} correlation detected in monitored region.` 
        });
      }
    }, 8000 + Math.random() * 7000);
    timersRef.current[id] = tid as unknown as number;
  }

  function toggleMonitor(m: Monitored) {
    if (m.active) {
      const tid = timersRef.current[m.id];
      if (tid) window.clearInterval(tid);
      timersRef.current[m.id] = 0 as unknown as number;
    } else {
      const tid = window.setInterval(() => {
        if (Math.random() < 0.3) {
          toast.error("Anomaly detected", { description: `${m.label}: Unusual correlation pattern detected.` });
        }
      }, 8000 + Math.random() * 7000);
      timersRef.current[m.id] = tid as unknown as number;
    }
    setMonitored((prev) => prev.map((x) => x.id === m.id ? { ...x, active: !x.active } : x));
  }

  React.useEffect(() => () => {
    Object.values(timersRef.current).forEach((tid) => tid && window.clearInterval(tid));
  }, []);

  // Chart helpers
  const viewWidth = 800;
  const viewHeight = 300;
  const pathD = React.useMemo(() => {
    const step = viewWidth / (series.length - 1);
    return series
      .map((v, i) => {
        const x = i * step;
        const y = (1 - v) * (viewHeight - 32) + 16;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [series]);

  function onChartPointerDown(e: React.PointerEvent<SVGElement>, thresholdId: string) {
    e.preventDefault();
    setDraggedThreshold(thresholdId);
    updateThresholdFromEvent(e, thresholdId);
  }

  function onChartPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!draggedThreshold) return;
    updateThresholdFromEvent(e, draggedThreshold);
  }

  function onChartPointerUp() {
    setDraggedThreshold(null);
  }

  function updateThresholdFromEvent(e: React.PointerEvent<SVGElement>, thresholdId: string) {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newValue = 1 - (y - 16) / (viewHeight - 32);
    const clampedValue = Math.max(0, Math.min(1, newValue));
    
    setThresholds(prev => prev.map(t => 
      t.id === thresholdId ? { ...t, value: clampedValue } : t
    ));
  }

  function addThreshold() {
    const colors = ["#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"];
    const labels = ["Normal", "Elevated", "Warning", "Critical", "Emergency"];
    const newId = Date.now().toString();
    const colorIndex = thresholds.length % colors.length;
    
    setThresholds(prev => [...prev, {
      id: newId,
      value: 0.5,
      color: colors[colorIndex],
      label: labels[colorIndex] || `Threshold ${prev.length + 1}`
    }]);
  }

  function removeThreshold(id: string) {
    setThresholds(prev => prev.filter(t => t.id !== id));
  }

  const selectedXProp = properties.find(p => p.value === xProperty);
  const selectedYProp = properties.find(p => p.value === yProperty);

  return (
    <main className="min-h-screen py-8">
      {/* Ocean-themed background - using original scheme */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
          alt="Deep ocean background"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.16_0.05_240_/_0.9)] via-[oklch(0.18_0.07_230_/_0.7)] to-[oklch(0.22_0.08_210_/_0.6)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Advanced Ocean Monitoring</CardTitle>
            <CardDescription className="text-blue-200/70">
              Select properties to analyze, draw regions to monitor, and set multiple alert thresholds like a trading interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <Select value={basemap} onValueChange={setBasemap}>
                <SelectTrigger className="min-w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Basemap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-marble">OSM Standard</SelectItem>
                  <SelectItem value="bathymetry">Carto Voyager</SelectItem>
                  <SelectItem value="night-lights">Dark</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch checked={showTracks} onCheckedChange={setShowTracks} />
                <Label className="text-white text-sm">Float Tracks</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch checked={showDensity} onCheckedChange={setShowDensity} />
                <Label className="text-white text-sm">Density Overlay</Label>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Button onClick={startMonitoringSelected} className="bg-emerald-600 hover:bg-emerald-700">
                  Start Monitoring Region
                </Button>
              </div>
            </div>

            {/* Region chips with quick monitoring */}
            <div className="mb-4 space-y-2">
              <div className="text-white text-sm font-medium">Quick Monitor Ocean Regions:</div>
              <div className="flex flex-wrap gap-2">
                {regions.map((r) => {
                  const isMonitored = monitored.some(m => m.label === r.label && m.active);
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        if (isMonitored) {
                          toast.info('Already Monitoring', { description: `${r.label} is already being monitored` });
                        } else {
                          startMonitoringRegion(r.bounds, r.label);
                        }
                      }}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                        isMonitored 
                          ? 'border-green-400 bg-green-500/20 text-green-300 hover:bg-green-500/30'
                          : 'border-white/30 bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {isMonitored && '✓ '}{r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Leaflet Map */}
            <LeafletMap 
              basemap={basemap}
              showTracks={showTracks}
              showDensity={showDensity}
              selectionBounds={selectionBounds}
              onSelectionChange={setSelectionBounds}
              onRegionSelect={startMonitoringRegion}
              monitoredRegions={monitored}
            />

            {/* Enhanced monitored regions list */}
            {monitored.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-sm font-medium">Active Monitoring Regions ({monitored.length})</h3>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      // Stop all monitoring
                      Object.values(timersRef.current).forEach(tid => tid && window.clearInterval(tid));
                      setMonitored([]);
                      setRegionAlerts({});
                      toast.success('All monitoring stopped');
                    }}
                    className="text-xs h-7 border-red-400/50 text-red-300 hover:bg-red-500/10"
                  >
                    Stop All
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {monitored.map((m) => (
                    <div key={m.id} className="flex items-start justify-between rounded-lg border border-white/20 bg-white/5 p-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={m.active ? "default" : "secondary"} 
                            className={m.active ? "bg-emerald-500/20 text-emerald-300" : "bg-gray-500/20 text-gray-300"}
                          >
                            {m.active ? '🟢' : '⏸️'} {m.label}
                          </Badge>
                          {m.alertCount > 0 && (
                            <Badge variant="destructive" className="bg-red-500/20 text-red-300 text-xs">
                              {m.alertCount} alerts
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-white/60 space-y-0.5">
                          <div>Started: {m.createdAt}</div>
                          {m.lastAlert && <div>Last Alert: {m.lastAlert}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-3">
                        <Button size="sm" variant="ghost" onClick={() => toggleMonitor(m)} className="text-white h-7 text-xs px-2">
                          {m.active ? "⏸️" : "▶️"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => {
                            const tid = timersRef.current[m.id];
                            if (tid) window.clearInterval(tid);
                            setMonitored(prev => prev.filter(x => x.id !== m.id));
                            setRegionAlerts(prev => {
                              const { [m.id]: _, ...rest } = prev;
                              return rest;
                            });
                            toast.success('Region removed from monitoring');
                          }} 
                          className="text-red-300 h-7 text-xs px-2"
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Property Selection & Smart Alerts Chart */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white">Smart Alerts - Property Correlation Analysis</CardTitle>
                <CardDescription className="text-blue-200/70">
                  Select two oceanographic properties to analyze their correlation and set multiple threshold lines.
                </CardDescription>
              </div>
              <Button onClick={addThreshold} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Add Threshold
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Property Selection */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm mb-2 block">X-Axis Property</Label>
                <Select value={xProperty} onValueChange={setXProperty}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select X property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map(prop => (
                      <SelectItem key={prop.value} value={prop.value}>{prop.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white text-sm mb-2 block">Y-Axis Property</Label>
                <Select value={yProperty} onValueChange={setYProperty}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Y property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map(prop => (
                      <SelectItem key={prop.value} value={prop.value}>{prop.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Threshold Management */}
            <div className="mb-4 flex flex-wrap gap-2">
              {thresholds.map((threshold) => (
                <div key={threshold.id} className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: threshold.color }}
                  />
                  <span className="text-white text-xs">{threshold.label}: {threshold.value.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => removeThreshold(threshold.id)}
                    className="text-red-300 h-5 w-5 p-0"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>

            {/* Interactive Chart */}
            <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-slate-900/50">
              <svg
                viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                width="100%"
                height={viewHeight}
                className="block cursor-crosshair"
                onPointerMove={onChartPointerMove}
                onPointerUp={onChartPointerUp}
                onPointerLeave={onChartPointerUp}
              >
                {/* Grid */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <g key={i}>
                    <line 
                      x1={0} 
                      x2={viewWidth} 
                      y1={(i * (viewHeight - 32)) / 10 + 16} 
                      y2={(i * (viewHeight - 32)) / 10 + 16} 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth={i % 5 === 0 ? 1 : 0.5}
                    />
                    <line 
                      x1={(i * viewWidth) / 10} 
                      x2={(i * viewWidth) / 10} 
                      y1={16} 
                      y2={viewHeight - 16} 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth={i % 5 === 0 ? 1 : 0.5}
                    />
                  </g>
                ))}
                
                {/* Data line */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  className="drop-shadow-sm"
                />
                
                {/* Threshold lines */}
                {thresholds.map((threshold) => (
                  <g key={threshold.id}>
                    <line
                      x1={0}
                      x2={viewWidth}
                      y1={(1 - threshold.value) * (viewHeight - 32) + 16}
                      y2={(1 - threshold.value) * (viewHeight - 32) + 16}
                      stroke={threshold.color}
                      strokeWidth={3}
                      strokeDasharray="8 4"
                      className="cursor-ns-resize hover:stroke-opacity-80"
                      onPointerDown={(e) => onChartPointerDown(e, threshold.id)}
                    />
                    <circle 
                      cx={viewWidth - 20} 
                      cy={(1 - threshold.value) * (viewHeight - 32) + 16} 
                      r={8} 
                      fill={threshold.color}
                      className="cursor-ns-resize hover:opacity-80"
                      onPointerDown={(e) => onChartPointerDown(e, threshold.id)}
                    />
                    <text
                      x={viewWidth - 40}
                      y={(1 - threshold.value) * (viewHeight - 32) + 20}
                      fill={threshold.color}
                      fontSize="12"
                      textAnchor="end"
                      className="pointer-events-none font-medium"
                    >
                      {threshold.label}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Chart info overlay */}
              <div className="absolute left-4 top-4 rounded-lg bg-black/60 backdrop-blur px-3 py-2 text-sm text-white">
                <div className="font-medium">{selectedXProp?.label} vs {selectedYProp?.label}</div>
                <div className="text-xs text-white/70">Correlation Factor: {getPropertyCorrelation(xProperty, yProperty).toFixed(2)}</div>
              </div>
              
              {/* Current values */}
              <div className="absolute right-4 top-4 rounded-lg bg-black/60 backdrop-blur px-3 py-2 text-sm text-white">
                <div>Current: {series[series.length - 1]?.toFixed(3) || "0.000"}</div>
                <div className="text-xs text-white/70">Live correlation index</div>
              </div>
              
              {/* Instructions */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 backdrop-blur px-3 py-2 text-xs text-white/70">
                💡 Drag threshold lines to adjust alert levels
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}