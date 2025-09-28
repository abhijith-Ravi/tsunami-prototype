"use client";

import * as React from "react";
import { MapContainer, TileLayer, CircleMarker, Polyline, Rectangle, useMap, useMapEvents, Popup, Tooltip } from "react-leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, LatLngBoundsExpression } from "leaflet";

interface MapComponentProps {
  basemap: string;
  showTracks: boolean;
  showDensity: boolean;
  selectionBounds: any;
  onSelectionChange: (bounds: any) => void;
  onRegionSelect?: (bounds: any, regionName: string) => void;
  monitoredRegions?: Array<{
    id: string;
    label: string;
    bounds: any;
    active: boolean;
    alertCount: number;
  }>;
}

interface Float {
  id: string;
  position: LatLngExpression;
  trajectory?: LatLngExpression[];
  status: 'active' | 'drifting' | 'inactive';
  temperature: number;
  salinity: number;
  oxygen: number;
  lastUpdate: string;
}

interface RegionSelectListenerProps {
  onRegionSelect: (bounds: any, regionName: string) => void;
}

function RegionSelectListener({ onRegionSelect }: RegionSelectListenerProps) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [startPos, setStartPos] = React.useState<[number, number] | null>(null);
  const [currentBounds, setCurrentBounds] = React.useState<any>(null);

  useMapEvents({
    mousedown(e: any) {
      if (e.originalEvent.shiftKey) {
        setIsSelecting(true);
        setStartPos([e.latlng.lat, e.latlng.lng]);
      }
    },
    mousemove(e: any) {
      if (isSelecting && startPos) {
        const bounds = [
          [Math.min(startPos[0], e.latlng.lat), Math.min(startPos[1], e.latlng.lng)],
          [Math.max(startPos[0], e.latlng.lat), Math.max(startPos[1], e.latlng.lng)]
        ];
        setCurrentBounds(bounds);
      }
    },
    mouseup(e: any) {
      if (isSelecting && startPos && currentBounds) {
        const regionName = `Custom Region ${Date.now().toString().slice(-4)}`;
        onRegionSelect(currentBounds, regionName);
        setIsSelecting(false);
        setStartPos(null);
        setCurrentBounds(null);
      }
    }
  });

  return currentBounds ? (
    <Rectangle 
      bounds={currentBounds} 
      pathOptions={{ 
        color: "#10b981", 
        weight: 2, 
        fillOpacity: 0.2, 
        dashArray: "5,5" 
      }} 
    />
  ) : null;
}

function AttachMapRef({ onReady }: { onReady: (map: any) => void }) {
  const map = useMap();
  React.useEffect(() => { onReady(map) }, [map, onReady]);
  return null;
}

// Predefined ocean-only ARGO float positions - globally distributed across all ocean basins
const oceanFloatPositions: LatLngExpression[] = [
  // North Pacific (10 floats)
  [45.2, -150.3], [42.1, -142.7], [38.9, -155.2], [35.2, -160.1], [33.8, -152.4],
  [40.1, -165.2], [37.5, -158.9], [44.2, -148.6], [39.7, -143.1], [41.3, -147.8],
  
  // South Pacific (10 floats)
  [-15.3, -170.2], [-18.7, -165.4], [-22.1, -158.7], [-25.8, -162.3], [-28.4, -155.1],
  [-12.9, -175.6], [-30.2, -168.9], [-35.1, -172.4], [-32.7, -165.2], [-27.3, -159.8],
  
  // North Atlantic (8 floats)
  [55.2, -30.4], [52.8, -25.7], [48.9, -35.2], [45.3, -28.9], [42.1, -32.6],
  [58.4, -20.1], [50.7, -38.4], [47.2, -22.8],
  
  // South Atlantic (8 floats)
  [-25.3, -15.2], [-28.7, -8.4], [-32.1, -22.7], [-35.8, -18.3], [-38.4, -12.1],
  [-22.9, -25.6], [-40.2, -28.9], [-39.7, -19.2],
  
  // Indian Ocean (10 floats)
  [-15.2, 68.3], [-18.9, 75.7], [-22.4, 82.1], [-25.1, 89.4], [-28.7, 96.2],
  [-32.3, 103.8], [-35.9, 110.5], [-12.8, 72.9], [-30.1, 85.3], [-26.4, 78.7],
  
  // Southern Ocean / Antarctic (6 floats)
  [-52.1, -45.3], [-55.7, -38.2], [-58.3, -52.8], [-60.9, -47.1], [-54.2, -41.6],
  [-56.8, 15.7],
  
  // Arctic Ocean (4 floats)
  [78.2, -15.3], [75.8, 25.7], [73.4, 45.2], [76.1, 65.8],
  
  // Mediterranean Sea (3 floats)
  [38.5, 15.2], [41.2, 8.7], [36.8, 22.4],
  
  // Additional diverse locations (6 floats)
  [-59.4, 25.2], [-62.1, 35.8], [-57.3, 45.1], // More Southern Ocean
  [79.7, 85.3], // Arctic
  [33.1, 125.4], [28.7, 135.2], // Western Pacific
];

// Generate realistic ARGO float trajectories with varied lengths
function generateTrajectory(startPos: LatLngExpression, floatId: string): LatLngExpression[] {
  const [startLat, startLng] = startPos as [number, number];
  const trajectory: LatLngExpression[] = [startPos];
  
  // Vary trajectory length based on float characteristics
  const floatAge = parseInt(floatId.slice(-3)) % 100; // Use last 3 digits as "age"
  let length: number;
  
  if (floatAge < 20) {
    length = 3 + Math.floor(Math.random() * 5); // Short trajectory: 3-7 points (new floats)
  } else if (floatAge < 60) {
    length = 8 + Math.floor(Math.random() * 8); // Medium trajectory: 8-15 points
  } else {
    length = 16 + Math.floor(Math.random() * 20); // Long trajectory: 16-35 points (old floats)
  }
  
  let lat = startLat;
  let lng = startLng;
  
  for (let i = 1; i < length; i++) {
    // More realistic drift patterns
    const timeStep = i / length; // Progress along trajectory
    
    // Seasonal and regional variations
    let latDrift = (Math.random() - 0.5) * 0.8; // Increased variability
    let lngDrift = 0;
    
    // Regional current patterns
    if (Math.abs(lat) < 10) {
      // Equatorial currents: strong east-west flow
      lngDrift = (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random() * 1.0);
      latDrift *= 0.3; // Less north-south movement
    } else if (Math.abs(lat) < 30) {
      // Trade wind regions: westward drift
      lngDrift = -0.4 - Math.random() * 0.8;
      latDrift *= 0.5;
    } else if (Math.abs(lat) < 60) {
      // Westerlies: eastward drift
      lngDrift = 0.3 + Math.random() * 0.9;
      latDrift *= 0.7;
    } else {
      // Polar regions: more chaotic
      lngDrift = (Math.random() - 0.5) * 1.2;
      latDrift *= 1.0;
    }
    
    // Add some randomness and current loops
    if (i > 5 && Math.random() < 0.2) {
      // Occasional current loop or eddy
      const loopRadius = 0.5 + Math.random() * 1.0;
      const angle = (i * 0.5) % (2 * Math.PI);
      latDrift += loopRadius * Math.sin(angle);
      lngDrift += loopRadius * Math.cos(angle);
    }
    
    lat = Math.max(-75, Math.min(80, lat + latDrift));
    lng = lng + lngDrift;
    
    // Wrap longitude
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    
    trajectory.push([lat, lng]);
  }
  
  return trajectory;
}

// Generate realistic float data
function generateFloatData(): Float[] {
  console.log('Generating float data for', oceanFloatPositions.length, 'positions');
  
  // Select diverse float indices for trajectories from different regions
  const diverseTrajectoryIndices = [
    2,   // North Pacific
    12,  // South Pacific  
    20,  // North Atlantic
    28,  // South Atlantic
    32,  // Indian Ocean
    42,  // Southern Ocean
    46,  // Arctic Ocean
    49,  // Mediterranean
    55,  // Additional Southern Ocean
    58   // Western Pacific
  ];
  
  const results = oceanFloatPositions.map((pos, index) => {
    const floatId = `ARGO-${2900000 + index}`;
    // Only show trajectories for selected diverse floats
    const hasTrajectory = diverseTrajectoryIndices.includes(index);
    
    console.log(`Float ${index}: ${floatId} at ${pos} - trajectory: ${hasTrajectory}`);
    
    return {
      id: floatId,
      position: pos,
      trajectory: hasTrajectory ? generateTrajectory(pos, floatId) : undefined,
      status: ['active', 'drifting', 'inactive'][Math.floor(Math.random() * 3)] as 'active' | 'drifting' | 'inactive',
      temperature: 2 + Math.random() * 28, // 2-30°C
      salinity: 32 + Math.random() * 6,    // 32-38 PSU
      oxygen: 180 + Math.random() * 120,   // 180-300 μmol/kg
      lastUpdate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toISOString().split('T')[0]
    };
  });
  
  console.log('Generated', results.length, 'floats with', diverseTrajectoryIndices.length, 'trajectories');
  return results;
}

export default function MapComponent({ 
  basemap, 
  showTracks, 
  showDensity, 
  selectionBounds, 
  onSelectionChange, 
  onRegionSelect, 
  monitoredRegions = [] 
}: MapComponentProps) {
  const mapRef = React.useRef<any>(null);

  // Generate realistic ARGO float data - force regeneration with timestamp
  const [refreshKey, setRefreshKey] = React.useState(0);
  const floatData = React.useMemo<Float[]>(
    () => {
      console.log('Generating new float data with', oceanFloatPositions.length, 'positions');
      return generateFloatData();
    },
    [refreshKey] // This will force regeneration when refreshKey changes
  );

  // Tile sources
  const tileUrl = basemap === "bathymetry"
    ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
    : basemap === "night-lights"
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const getFloatColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981'; // Green
      case 'drifting': return '#06b6d4'; // Blue  
      case 'inactive': return '#8b5cf6'; // Purple
      default: return '#6b7280'; // Gray
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'drifting': return '🔵';
      case 'inactive': return '🟣';
      default: return '⚪';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 shadow-2xl">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="aspect-[16/10] w-full"
        scrollWheelZoom
        zoomControl={true}
        worldCopyJump
        attributionControl={false}
        boxZoom={false}
      >
        <TileLayer url={tileUrl} />
        
        {onRegionSelect && (
          <RegionSelectListener onRegionSelect={onRegionSelect} />
        )}

        {showDensity && (
          <>
            <Rectangle bounds={[[-10, -40], [20, 20]]} pathOptions={{ color: "#06b6d4", weight: 1, opacity: 0.4, fillOpacity: 0.15 }} />
            <Rectangle bounds={[[30, 100], [50, 140]]} pathOptions={{ color: "#8b5cf6", weight: 1, opacity: 0.4, fillOpacity: 0.15 }} />
            <Rectangle bounds={[[-35, 60], [-15, 110]]} pathOptions={{ color: "#10b981", weight: 1, opacity: 0.4, fillOpacity: 0.15 }} />
          </>
        )}

        {/* Render float trajectories with enhanced visibility */}
        {showTracks && floatData.map((float) => (
          float.trajectory && (
            <React.Fragment key={`${float.id}-trajectory-group`}>
              {/* Main trajectory line - clean and smooth */}
              <Polyline
                key={`${float.id}-trajectory`}
                positions={float.trajectory}
                pathOptions={{
                  color: getFloatColor(float.status),
                  weight: float.trajectory.length > 15 ? 3 : float.trajectory.length > 8 ? 2.5 : 2,
                  opacity: 0.7,
                  lineCap: "round",
                  lineJoin: "round"
                }}
              />
              {/* Trajectory start point */}
              <CircleMarker
                key={`${float.id}-start`}
                center={float.trajectory[0]}
                radius={3}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: getFloatColor(float.status),
                  fillOpacity: 0.9,
                  weight: 2
                }}
              >
                <Tooltip permanent={false} direction="top">
                  <div className="text-xs">
                    🚀 Start: {float.id}
                  </div>
                </Tooltip>
              </CircleMarker>
            </React.Fragment>
          )
        ))}

        {/* Render ARGO floats */}
        {floatData.map((float) => (
          <CircleMarker
            key={float.id}
            center={float.position}
            pathOptions={{
              color: getFloatColor(float.status),
              weight: 2,
              fillOpacity: 0.8,
              fillColor: getFloatColor(float.status)
            }}
            radius={float.status === 'active' ? 6 : 4}
          >
            <Tooltip permanent={false} direction="top" offset={[0, -10]}>
              <div className="text-xs">
                <div className="font-semibold">{float.id}</div>
                <div>{getStatusIcon(float.status)} {float.status}</div>
              </div>
            </Tooltip>
            <Popup>
              <div className="text-sm space-y-2 min-w-[200px]">
                <div className="font-semibold text-blue-600">{float.id}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Status:</div>
                  <div className="font-medium">{getStatusIcon(float.status)} {float.status}</div>
                  <div>Temperature:</div>
                  <div className="font-medium">{float.temperature.toFixed(1)}°C</div>
                  <div>Salinity:</div>
                  <div className="font-medium">{float.salinity.toFixed(1)} PSU</div>
                  <div>Oxygen:</div>
                  <div className="font-medium">{float.oxygen.toFixed(0)} μmol/kg</div>
                  <div>Last Update:</div>
                  <div className="font-medium">{float.lastUpdate}</div>
                </div>
                {float.trajectory && (
                  <div className="text-xs text-gray-600 border-t pt-2">
                    �️ Trajectory: {float.trajectory.length} positions tracked
                    <br />📏 Path length: {float.trajectory.length > 15 ? "Long" : float.trajectory.length > 8 ? "Medium" : "Short"}
                    <br />📅 {float.trajectory.length < 5 ? "Recent deployment" : float.trajectory.length > 20 ? "Long-term float" : "Established float"}
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Render monitored regions */}
        {monitoredRegions.map((region) => (
          <Rectangle
            key={region.id}
            bounds={region.bounds}
            pathOptions={{
              color: region.active ? "#10b981" : "#6b7280",
              weight: region.active ? 3 : 2,
              fillOpacity: region.active ? 0.15 : 0.08,
              dashArray: region.active ? "0" : "10,5",
              className: region.active ? "animate-pulse" : ""
            }}
          >
            <Popup>
              <div className="text-sm space-y-2 min-w-[180px]">
                <div className="font-semibold text-blue-600 flex items-center gap-2">
                  {region.active ? "🟢" : "⏸️"} {region.label}
                </div>
                <div className="text-xs space-y-1">
                  <div>Status: <span className="font-medium">{region.active ? "Active" : "Paused"}</span></div>
                  <div>Alerts: <span className="font-medium text-red-600">{region.alertCount}</span></div>
                </div>
                <div className="text-xs text-gray-600 border-t pt-1">
                  Click to view monitoring details
                </div>
              </div>
            </Popup>
            <Tooltip permanent={true} direction="center" opacity={0.9}>
              <div className="text-center">
                <div className="font-semibold text-xs">{region.label}</div>
                <div className="text-xs">
                  {region.active ? "🟢 Monitoring" : "⏸️ Paused"}
                  {region.alertCount > 0 && (
                    <span className="ml-1 text-red-600 font-bold">{region.alertCount}⚠️</span>
                  )}
                </div>
              </div>
            </Tooltip>
          </Rectangle>
        ))}

        {/* Current selection bounds */}
        {selectionBounds && (
          <Rectangle 
            bounds={selectionBounds} 
            pathOptions={{ 
              color: "#fbbf24", 
              weight: 3, 
              fillOpacity: 0.2, 
              dashArray: "10,5"
            }} 
          >
            <Tooltip permanent={true} direction="center">
              <div className="text-xs font-semibold text-center">
                📍 Selected Region
                <br />Click "Start Monitoring" to track
              </div>
            </Tooltip>
          </Rectangle>
        )}

        <AttachMapRef onReady={(map) => { mapRef.current = map }} />
      </MapContainer>

      <div className="absolute left-4 top-4 rounded-lg bg-black/70 backdrop-blur px-3 py-2 text-sm text-white">
        <div className="flex items-center gap-2 mb-1">
          💡 <span className="font-medium">Shift + Drag</span> to select monitoring regions
        </div>
        <div className="text-xs text-white/80 space-y-1">
          <div>🟢 Active Floats • 🔵 Drifting • 🟣 Inactive</div>
          <div>🛤️ Trajectories: Thick=Long paths, Thin=Short paths</div>
          <div>📍 Green regions = Active monitoring</div>
          <div>Click floats/regions for details</div>
        </div>
      </div>

      <div className="absolute right-4 top-4 space-y-2">
        <Button variant="secondary" size="sm" onClick={() => mapRef.current?.setView([20, 0], 2)}>
          Reset View
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => setRefreshKey(prev => prev + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Refresh Floats
        </Button>
        <div className="text-xs text-white bg-black/60 backdrop-blur px-2 py-1 rounded">
          {floatData.length} ARGO Floats
        </div>
      </div>

      {/* Enhanced legend */}
      <div className="absolute left-4 bottom-4 rounded-lg bg-black/70 backdrop-blur px-3 py-2 text-xs text-white space-y-3">
        {/* Float status legend */}
        <div>
          <div className="font-medium mb-2">ARGO Float Status</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Active ({floatData.filter(f => f.status === 'active').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Drifting ({floatData.filter(f => f.status === 'drifting').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Inactive ({floatData.filter(f => f.status === 'inactive').length})</span>
            </div>
          </div>
        </div>
        
        {/* Trajectory legend */}
        <div className="border-t border-white/20 pt-2">
          <div className="font-medium mb-2">Trajectory Types</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-green-500 rounded"></div>
              <span>Long-term ({floatData.filter(f => f.trajectory && f.trajectory.length > 15).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500 rounded"></div>
              <span>Medium ({floatData.filter(f => f.trajectory && f.trajectory.length > 8 && f.trajectory.length <= 15).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-purple-500 rounded"></div>
              <span>Short ({floatData.filter(f => f.trajectory && f.trajectory.length <= 8).length})</span>
            </div>
          </div>
        </div>
        
        {/* Monitoring legend */}
        {monitoredRegions.length > 0 && (
          <div className="border-t border-white/20 pt-2">
            <div className="font-medium mb-2">Monitoring Regions</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2 border border-green-500 bg-green-500/20 rounded-sm"></div>
                <span>Active ({monitoredRegions.filter(r => r.active).length})</span>
              </div>
              {monitoredRegions.filter(r => !r.active).length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-2 border border-gray-500 bg-gray-500/20 rounded-sm"></div>
                  <span>Paused ({monitoredRegions.filter(r => !r.active).length})</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}