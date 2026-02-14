import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { motion } from "framer-motion";
import { zones, getRiskColor, getRiskBg } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

const layers = ["Temperature", "Humidity", "AQI", "Vulnerability"] as const;

export default function HeatMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(["Temperature", "Vulnerability"]));

  const toggleLayer = (layer: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      next.has(layer) ? next.delete(layer) : next.add(layer);
      return next;
    });
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [22.5, 78.5],
      zoom: 5,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    zones.forEach((zone) => {
      const color = getRiskColor(zone.riskLevel);
      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius: Math.max(12, zone.vulnerabilityScore / 3),
        color,
        fillColor: color,
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(map);

      circle.bindPopup(`
        <div style="min-width:220px;font-family:'DM Sans',sans-serif;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong style="font-family:'Space Grotesk',sans-serif;">${zone.name}</strong>
            <span style="padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;text-transform:uppercase;background:${color}22;color:${color};border:1px solid ${color}44;">
              ${zone.riskLevel}
            </span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:12px;margin-bottom:8px;">
            <span>🌡️ ${zone.temperature}°C</span>
            <span>💧 ${zone.humidity}%</span>
            <span>🌫️ AQI ${zone.aqi}</span>
            <span>👥 ${(zone.population / 1000).toFixed(0)}K</span>
          </div>
          <div style="border-top:1px solid #333;padding-top:8px;margin-bottom:4px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
              <span style="opacity:0.7;">Vulnerability Score</span>
              <strong>${zone.vulnerabilityScore}/100</strong>
            </div>
            <div style="width:100%;height:6px;background:#222;border-radius:4px;overflow:hidden;">
              <div style="width:${zone.vulnerabilityScore}%;height:100%;background:${color};border-radius:4px;"></div>
            </div>
          </div>
          <div style="font-size:11px;opacity:0.7;margin-top:8px;">
            🏥 ${zone.nearestHospital} (${zone.hospitalDistance})
          </div>
        </div>
      `);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      {/* Layer controls */}
      <div className="absolute top-4 right-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-3 space-y-2"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Layers</p>
          {layers.map((layer) => (
            <button
              key={layer}
              onClick={() => toggleLayer(layer)}
              className={`block w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeLayers.has(layer)
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {layer}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Risk Level</p>
          <div className="space-y-1.5">
            {[
              { label: "Extreme (80+)", color: "bg-heat-red" },
              { label: "High (60-79)", color: "bg-heat-orange" },
              { label: "Moderate (40-59)", color: "bg-heat-yellow" },
              { label: "Safe (<40)", color: "bg-heat-green" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${l.color}`} />
                <span className="text-xs text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
