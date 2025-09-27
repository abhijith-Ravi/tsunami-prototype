"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Polyline, Rectangle, useMap, useMapEvents } from "react-leaflet";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

export default function MapPage() {
  // Basemap and overlays
  const [basemap, setBasemap] = React.useState("blue-marble");
  const [showTracks, setShowTracks] = React.useState(true);
  const [showDensity, setShowDensity] = React.useState(false);

  // Leaflet map ref helpers
  const mapRef = React.useRef<ReturnType<typeof useMap> | null>(null);

  // Drag-to-select rectangle (Leaflet bounds)
  type Bounds = LatLngBoundsExpression | null;
  const [selectionBounds, setSelectionBounds] = React.useState<Bounds>(null);

  // Monitored regions
  type Monitored = { id: string; label: string; bounds: NonNullable<Bounds>; active: boolean };
  const [monitored, setMonitored] = React.useState<Monitored[]>([]);
  const timersRef = React.useRef<Record<string, number>>({});

  // Threshold chart controls
  const [threshold, setThreshold] = React.useState(0.5); // normalized 0..1
  const draggingThresholdRef = React.useRef(false);
  const lastNotifiedRef = React.useRef<number | null>(null);

  // Mock data stream for chart
  const [series, setSeries] = React.useState<number[]>(() => Array.from({ length: 80 }, (_, i) => 0.5 + 0.35 * Math.sin(i / 6) + (Math.random() - 0.5) * 0.12));
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setSeries((prev) => {
        const nextVal = 0.5 + 0.35 * Math.sin((prev.length + Date.now() / 4000) / 6) + (Math.random() - 0.5) * 0.12;
        const next = [...prev.slice(-79), Math.max(0, Math.min(1, nextVal))];
        // Notify if crossing threshold (only once per new point)
        const latest = next[next.length - 1];
        if (latest > threshold && lastNotifiedRef.current !== next.length) {
          toast.warning("Threshold crossed", { description: `Value ${latest.toFixed(2)} exceeded ${threshold.toFixed(2)}` });
          lastNotifiedRef.current = next.length;
        }
        return next;
      });
    }, 1500);
    return () => window.clearInterval(id);
  }, [threshold]);

  // Predefined ocean regions (bounds)
  const regions = [
    { id: "pacific", label: "Pacific Ocean", bounds: [[-30, 120], [30, -120]] as LatLngBoundsExpression },
    { id: "atlantic", label: "Atlantic Ocean", bounds: [[-40, -60], [40, 10]] as LatLngBoundsExpression },
    { id: "indian", label: "Indian Ocean", bounds: [[-35, 40], [20, 110]] as LatLngBoundsExpression },
    { id: "southern", label: "Southern Ocean", bounds: [[-70, -180], [-45, 180]] as LatLngBoundsExpression },
    { id: "arctic", label: "Arctic Ocean", bounds: [[66, -180], [90, 180]] as LatLngBoundsExpression },
  ];

  // Mock float markers
  const markers = React.useMemo<LatLngExpression[]>(
    () => Array.from({ length: 30 }).map(() => [
      -60 + Math.random() * 120, // lat -60..60
      -170 + Math.random() * 340, // lng -170..170
    ]) as LatLngExpression[],
    []
  );

  function ResetViewBtn() {
    const map = useMap();
    return (
      <Button
        variant="secondary"
        onClick={() => { map.setView([20, 0], 2) }}
      >
        Reset View
      </Button>
    );
  }

  function FlyToRegion({ bounds }: { bounds: LatLngBoundsExpression }) {
    const map = useMap();
    React.useEffect(() => { map.flyToBounds(bounds as any, { padding: [24, 24] }) }, [bounds, map]);
    return null;
  }

  function BoxSelectListener({ onBox }: { onBox: (b: LatLngBoundsExpression) => void }) {
    useMapEvents({
      boxzoomend(e: any) {
        if (e?.boxZoomBounds) onBox(e.boxZoomBounds as LatLngBoundsExpression);
      },
    });
    return null;
  }

  function startMonitoringSelected() {
    if (!selectionBounds) {
      toast.info("Select a region", { description: "Hold Shift and drag on the map to draw a selection box." });
      return;
    }
    const id = `sel-${Date.now()}`;
    const label = "Custom Region";
    setMonitored((prev) => [{ id, label, bounds: selectionBounds, active: true }, ...prev]);
    // Simulate anomalies by random timer
    const tid = window.setInterval(() => {
      if (Math.random() < 0.35) {
        toast.error("Anomaly detected", { description: `${label}: unusual condition shift detected (mock).` });
      }
    }, 5000 + Math.random() * 5000);
    timersRef.current[id] = tid as unknown as number;
  }

  function toggleMonitor(m: Monitored) {
    if (m.active) {
      // stop
      const tid = timersRef.current[m.id];
      if (tid) window.clearInterval(tid);
      timersRef.current[m.id] = 0 as unknown as number;
    } else {
      const tid = window.setInterval(() => {
        if (Math.random() < 0.35) {
          toast.error("Anomaly detected", { description: `${m.label}: unusual condition shift detected (mock).` });
        }
      }, 5000 + Math.random() * 5000);
      timersRef.current[m.id] = tid as unknown as number;
    }
    setMonitored((prev) => prev.map((x) => x.id === m.id ? { ...x, active: !x.active } : x));
  }

  React.useEffect(() => () => {
    // cleanup timers
    Object.values(timersRef.current).forEach((tid) => tid && window.clearInterval(tid));
  }, []);

  // Chart helpers
  const viewWidth = 700;
  const viewHeight = 240;
  const pathD = React.useMemo(() => {
    const step = viewWidth / (series.length - 1);
    return series
      .map((v, i) => {
        const x = i * step;
        const y = (1 - v) * (viewHeight - 16) + 8;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [series]);

  function onChartPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    draggingThresholdRef.current = true;
    updateThresholdFromEvent(e);
  }
  function onChartPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!draggingThresholdRef.current) return;
    updateThresholdFromEvent(e);
  }
  function onChartPointerUp() {
    draggingThresholdRef.current = false;
  }
  function updateThresholdFromEvent(e: React.PointerEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const t = 1 - (y - 8) / (viewHeight - 16);
    setThreshold(Math.max(0, Math.min(1, t)));
  }

  // Tile sources
  const tileUrl = basemap === "bathymetry"
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
    : basemap === "night-lights"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <main className="min-h-screen py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Card className="border-border/50 bg-background/60 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle>Ocean Map Monitoring</CardTitle>
            <CardDescription>
              Click a region chip to fly. Hold Shift + drag to draw a selection. Then press "Start Monitoring" to simulate alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Select value={basemap} onValueChange={setBasemap}>
                <SelectTrigger className="min-w-40"><SelectValue placeholder="Basemap" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-marble">OSM Standard</SelectItem>
                  <SelectItem value="bathymetry">Carto Voyager</SelectItem>
                  <SelectItem value="night-lights">Dark</SelectItem>
                </SelectContent>
              </Select>

              <label className="flex items-center gap-2 text-sm"><Switch checked={showTracks} onCheckedChange={setShowTracks} />Tracks</label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={showDensity} onCheckedChange={setShowDensity} />Heat</label>

              <div className="ms-auto flex items-center gap-2">
                <Button onClick={startMonitoringSelected}>Start Monitoring Region</Button>
              </div>
            </div>

            {/* Region chips */}
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => mapRef.current && (mapRef.current as any).flyToBounds(r.bounds as any, { padding: [24, 24] })}
                  className="rounded-full border px-2.5 py-1 border-border/60 bg-background/60 text-foreground/80 text-[11px] hover:bg-background/80"
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Leaflet Map */}
            <div className="relative overflow-hidden rounded-md border border-border/60">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                className="aspect-[16/9] w-full"
                boxZoom
                scrollWheelZoom
                zoomControl={true}
                worldCopyJump
                attributionControl={false}
              >
                <TileLayer url={tileUrl} />

                {/* Listen to Shift+Drag box selection */}
                <BoxSelectListener onBox={(b) => setSelectionBounds(b)} />

                {/* Tracks overlay */}
                {showTracks && (
                  <Polyline positions={[[5, -160], [10, -140], [12, -120], [8, -100], [6, -80]]} color="oklch(0.7 0.18 200)" weight={2} opacity={0.6} />
                )}

                {/* Simple heat proxy overlay */}
                {showDensity && (
                  <Rectangle bounds={[[-5, -30], [10, 15]]} pathOptions={{ color: "#00bcd4", weight: 1, opacity: 0.3, fillOpacity: 0.12 }} />
                )}

                {/* Float markers */}
                {markers.map((pos, i) => (
                  <CircleMarker key={i} center={pos} radius={3} pathOptions={{ color: "#44d1d9", weight: 1, fillOpacity: 0.9 }} />
                ))}

                {/* Selection rectangle preview */}
                {selectionBounds && (
                  <Rectangle bounds={selectionBounds} pathOptions={{ color: "#34d399", weight: 2, fillOpacity: 0.1 }} />
                )}

                {/* Imperative helpers */}
                <AttachMapRef onReady={(map) => { mapRef.current = map as any }} />
              </MapContainer>

              {/* Map hint */}
              <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground">
                Hint: Shift+Drag to select a custom region
              </div>

              {/* Reset view button overlay (keeps layout simple) */}
              <div className="absolute right-3 top-3">
                <Button variant="secondary" size="sm" onClick={() => (mapRef.current as any)?.setView([20, 0], 2)}>Reset View</Button>
              </div>
            </div>

            {/* Monitored regions list */}
            {monitored.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {monitored.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 rounded-md border border-border/50 bg-background/50 px-2 py-1">
                    <Badge variant={m.active ? "default" : "secondary"}>{m.label}</Badge>
                    <span className="text-xs text-muted-foreground">bounds set</span>
                    <Button size="sm" variant="ghost" onClick={() => toggleMonitor(m)}>
                      {m.active ? "Stop" : "Resume"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Threshold chart with draggable line */}
        <Card className="border-border/50 bg-background/60 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle>Smart Alerts – Threshold Line</CardTitle>
            <CardDescription>Drag the horizontal line to set a rule. Alerts fire when series crosses it (mock).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-md border border-border/60">
              <svg
                viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                width="100%"
                height={viewHeight}
                className="block bg-gradient-to-b from-background/60 to-background/20"
                onPointerDown={onChartPointerDown}
                onPointerMove={onChartPointerMove}
                onPointerUp={onChartPointerUp}
                onPointerLeave={onChartPointerUp}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <line key={i} x1={0} x2={viewWidth} y1={(i * viewHeight) / 5} y2={(i * viewHeight) / 5} stroke="oklch(1 0 0 / 0.1)" />
                ))}
                <path d={pathD} fill="none" stroke="oklch(0.7 0.18 200)" strokeWidth={2} />
                <line
                  x1={0}
                  x2={viewWidth}
                  y1={(1 - threshold) * (viewHeight - 16) + 8}
                  y2={(1 - threshold) * (viewHeight - 16) + 8}
                  stroke="oklch(0.76 0.2 170)"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                />
                <circle cx={viewWidth - 16} cy={(1 - threshold) * (viewHeight - 16) + 8} r={6} fill="oklch(0.76 0.2 170)" />
              </svg>
              <div className="absolute right-3 top-2 rounded bg-background/80 px-2 py-1 text-xs text-muted-foreground">
                Threshold: <span className="font-medium text-foreground">{threshold.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// Small helpers for overlay UI in the map section
function RegionFlyChip({ label, bounds }: { label: string; bounds: LatLngBoundsExpression }) {
  const [active, setActive] = React.useState(false);
  const map = useMapOptional();
  return (
    <button
      onClick={() => { if (map) { map.flyToBounds(bounds as any, { padding: [24, 24] }); setActive(true); setTimeout(() => setActive(false), 600) } }}
      className={`rounded-full border px-2.5 py-1 ${active ? "border-primary bg-primary/10" : "border-border/60 bg-background/60"} text-foreground/80 text-[11px] hover:bg-background/80`}
    >
      {label}
    </button>
  );
}

function ResetButtonOverlay() {
  const map = useMapOptional();
  return (
    <Button variant="secondary" size="sm" onClick={() => map?.setView([20, 0], 2)}>Reset View</Button>
  );
}

function AttachMapRef({ onReady }: { onReady: (map: any) => void }) {
  const map = useMap();
  React.useEffect(() => { onReady(map) }, [map, onReady]);
  return null;
}

function useMapOptional() {
  try {
    // Will throw if used outside MapContainer; we guard with try/catch
    return useMap();
  } catch {
    return null as any;
  }
}