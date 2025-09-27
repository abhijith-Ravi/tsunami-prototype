"use client";

import * as React from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Rectangle, useMap, useMapEvents } from "react-leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

interface MapComponentProps {
  basemap: string;
  showTracks: boolean;
  showDensity: boolean;
  selectionBounds: any;
  onSelectionChange: (bounds: any) => void;
}

interface BoxSelectListenerProps {
  onBox: (bounds: any) => void;
}

function BoxSelectListener({ onBox }: BoxSelectListenerProps) {
  useMapEvents({
    zoomend(e: any) {
      // Check if boxZoomBounds exists on the event target (the map)
      const map = e.target;
      if (map?.boxZoomBounds) {
        onBox(map.boxZoomBounds);
        // Optionally clear the boxZoomBounds after use
        map.boxZoomBounds = null;
      }
    },
  });
  return null;
}

function AttachMapRef({ onReady }: { onReady: (map: any) => void }) {
  const map = useMap();
  React.useEffect(() => { onReady(map) }, [map, onReady]);
  return null;
}

export default function MapComponent({ basemap, showTracks, showDensity, selectionBounds, onSelectionChange }: MapComponentProps) {
  const mapRef = React.useRef<any>(null);

  // Mock float markers
  const markers = React.useMemo<LatLngExpression[]>(
    () => Array.from({ length: 50 }).map(() => [
      -60 + Math.random() * 120,
      -170 + Math.random() * 340,
    ]) as LatLngExpression[],
    []
  );

  // Tile sources
  const tileUrl = basemap === "bathymetry"
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
    : basemap === "night-lights"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-2xl">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="aspect-[16/10] w-full"
        boxZoom
        scrollWheelZoom
        zoomControl={true}
        worldCopyJump
        attributionControl={false}
      >
        <TileLayer url={tileUrl} />
        <BoxSelectListener onBox={onSelectionChange} />

        {showTracks && (
          <>
            <Polyline positions={[[5, -160], [10, -140], [12, -120], [8, -100], [6, -80]]} pathOptions={{ color: "#06b6d4", weight: 2, opacity: 0.8 }} />
            <Polyline positions={[[-15, 40], [-10, 60], [-5, 80], [0, 100], [5, 120]]} pathOptions={{ color: "#8b5cf6", weight: 2, opacity: 0.8 }} />
            <Polyline positions={[[25, -20], [30, 0], [35, 20], [40, 40], [45, 60]]} pathOptions={{ color: "#f59e0b", weight: 2, opacity: 0.8 }} />
          </>
        )}

        {showDensity && (
          <>
            <Rectangle bounds={[[-10, -40], [20, 20]]} pathOptions={{ color: "#06b6d4", weight: 1, opacity: 0.4, fillOpacity: 0.15 }} />
            <Rectangle bounds={[[30, 100], [50, 140]]} pathOptions={{ color: "#8b5cf6", weight: 1, opacity: 0.4, fillOpacity: 0.15 }} />
          </>
        )}

        {markers.map((pos, i) => (
          <CircleMarker
            key={i}
            center={pos}
            pathOptions={{
              color: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#10b981",
              weight: 2,
              fillOpacity: 0.8
            }}
            radius={4}
          />
        ))}

        {selectionBounds && (
          <Rectangle bounds={selectionBounds} pathOptions={{ color: "#10b981", weight: 3, fillOpacity: 0.1, dashArray: "10,5" }} />
        )}

        <AttachMapRef onReady={(map) => { mapRef.current = map }} />
      </MapContainer>

      <div className="absolute left-4 top-4 rounded-lg bg-black/50 backdrop-blur px-3 py-2 text-sm text-white">
        💡 Shift+Drag to select regions • Click chips to navigate
      </div>

      <div className="absolute right-4 top-4">
        <Button variant="secondary" size="sm" onClick={() => mapRef.current?.setView([20, 0], 2)}>
          Reset View
        </Button>
      </div>
    </div>
  );
}
