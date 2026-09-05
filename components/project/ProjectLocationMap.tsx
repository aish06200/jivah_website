"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { ProjectConnectivity } from "@/lib/types";

type MapPoi = {
  coordinates: [number, number];
  label: string;
  icon?: ProjectConnectivity["icon"];
};

type Props = {
  center: [number, number];
  zoom?: number;
  projectLabel: string;
  pois?: MapPoi[];
  className?: string;
};

const POI_MARKER_CLASS: Record<NonNullable<ProjectConnectivity["icon"]>, string> = {
  station: "project-location-poi--station",
  hospital: "project-location-poi--hospital",
  market: "project-location-poi--market",
  school: "project-location-poi--school",
  highway: "project-location-poi--highway",
  landmark: "project-location-poi--landmark",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createProjectMarker(label: string) {
  const markerEl = document.createElement("div");
  markerEl.className = "project-location-marker";
  markerEl.innerHTML = `
    <span class="project-location-marker__pin">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="12" cy="11" r="2.2" fill="currentColor"/>
      </svg>
    </span>
    <span class="project-location-marker__label">${escapeHtml(label)}</span>
  `;
  return markerEl;
}

function createPoiMarker(label: string, icon: ProjectConnectivity["icon"] = "landmark") {
  const markerEl = document.createElement("div");
  markerEl.className = `project-location-poi ${POI_MARKER_CLASS[icon]}`;
  markerEl.innerHTML = `
    <span class="project-location-poi__dot"></span>
    <span class="project-location-poi__label">${escapeHtml(label)}</span>
  `;
  return markerEl;
}

function DummyLocationMap({
  projectLabel,
  pois = [],
  className,
}: Pick<Props, "projectLabel" | "pois" | "className">) {
  return (
    <div
      className={`relative overflow-hidden bg-[#f5f0e8] ${className ?? ""}`}
      role="img"
      aria-label={`Map showing ${projectLabel}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(#e8e2d8 1px, transparent 1px), linear-gradient(90deg, #e8e2d8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#fafbfa]/80 via-transparent to-[#f5f0e8]/90" />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-forest text-white shadow-[0_4px_14px_rgba(12,123,84,0.35)] ring-4 ring-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="11" r="2.2" fill="currentColor" />
          </svg>
        </span>
        <span className="mt-2 max-w-[140px] truncate rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-ink shadow-sm">
          {projectLabel}
        </span>
      </div>
      {pois.length > 0 ? (
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {pois.map((poi) => (
            <span
              key={poi.label}
              className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium text-ink shadow-sm"
            >
              {poi.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function softenMapStyle(map: mapboxgl.Map) {
  const layers = [
    { id: "water", property: "fill-color", value: "#e8ece9" },
    { id: "land", property: "background-color", value: "#f7f4ef" },
  ] as const;

  for (const layer of layers) {
    if (map.getLayer(layer.id)) {
      map.setPaintProperty(layer.id, layer.property, layer.value);
    }
  }

  if (map.getLayer("road-primary")) {
    map.setPaintProperty("road-primary", "line-color", "#d8ddd8");
  }
  if (map.getLayer("road-secondary-tertiary")) {
    map.setPaintProperty("road-secondary-tertiary", "line-color", "#e5e8e4");
  }
}

function fitMapToMarkers(map: mapboxgl.Map, center: [number, number], pois: MapPoi[]) {
  const bounds = new mapboxgl.LngLatBounds();
  bounds.extend(center);
  pois.forEach((poi) => bounds.extend(poi.coordinates));
  map.fitBounds(bounds, { padding: 72, maxZoom: 13.2, duration: 0 });
}

export function ProjectLocationMap({
  center,
  zoom = 13,
  projectLabel,
  pois = [],
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom,
      attributionControl: false,
      interactive: false,
      fadeDuration: 0,
    });

    mapRef.current = map;

    map.on("load", () => {
      softenMapStyle(map);
      map.resize();

      pois.forEach((poi) => {
        new mapboxgl.Marker({
          element: createPoiMarker(poi.label, poi.icon),
          anchor: "bottom",
        })
          .setLngLat(poi.coordinates)
          .addTo(map);
      });

      new mapboxgl.Marker({ element: createProjectMarker(projectLabel), anchor: "bottom" })
        .setLngLat(center)
        .addTo(map);

      if (pois.length > 0) {
        fitMapToMarkers(map, center, pois);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
      if (pois.length > 0) {
        fitMapToMarkers(map, center, pois);
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [center, pois, projectLabel, token, zoom]);

  if (!token) {
    return <DummyLocationMap projectLabel={projectLabel} pois={pois} className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={`Map showing ${projectLabel} and nearby places`}
    />
  );
}
