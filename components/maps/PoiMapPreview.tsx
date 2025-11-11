"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/maps/googleMapsLoader";

type GoogleMaps = Awaited<ReturnType<typeof loadGoogleMaps>>;
type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
type LegacyMarker = google.maps.Marker;
type AnyMarker = AdvancedMarkerElement | LegacyMarker;

interface PoiMapPreviewProps {
  latitude: number;
  longitude: number;
  height?: number;
  zoom?: number;
  className?: string;
}

const DEFAULT_ZOOM = 17;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

function isAdvancedMarker(marker: AnyMarker | null): marker is AdvancedMarkerElement {
  return Boolean(marker && "position" in marker && !("setPosition" in marker));
}

function isLegacyMarker(marker: AnyMarker | null): marker is LegacyMarker {
  return Boolean(marker && typeof (marker as LegacyMarker).setPosition === "function");
}

function setMarkerPosition(marker: AnyMarker, coords: google.maps.LatLngLiteral) {
  if (isAdvancedMarker(marker)) {
    marker.position = coords;
  } else if (isLegacyMarker(marker)) {
    marker.setPosition(coords);
  }
}

function setMarkerMap(marker: AnyMarker, mapInstance: google.maps.Map | null) {
  if (isAdvancedMarker(marker)) {
    marker.map = mapInstance ?? null;
  } else if (isLegacyMarker(marker)) {
    marker.setMap(mapInstance ?? null);
  }
}

export function PoiMapPreview({
  latitude,
  longitude,
  height = 240,
  zoom = DEFAULT_ZOOM,
  className,
}: PoiMapPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<AnyMarker | null>(null);
  const [googleMaps, setGoogleMaps] = useState<GoogleMaps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const center = useMemo<google.maps.LatLngLiteral>(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude],
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const maps = await loadGoogleMaps();
        if (!cancelled) {
          setGoogleMaps(maps);
          setLoadError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load Google Maps.";
          setLoadError(message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const initializeMap = useCallback(
    (maps: GoogleMaps) => {
      if (!containerRef.current || mapRef.current) {
        return;
      }

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        ...(MAP_ID ? { mapId: MAP_ID } : {}),
      };

      mapRef.current = new maps.maps.Map(containerRef.current, mapOptions);

      const supportsAdvancedMarker =
        Boolean(MAP_ID && maps.maps.marker?.AdvancedMarkerElement);

      markerRef.current = supportsAdvancedMarker
        ? new maps.maps.marker.AdvancedMarkerElement({
            position: center,
            map: mapRef.current ?? undefined,
          })
        : new maps.maps.Marker({
            position: center,
            map: mapRef.current ?? undefined,
          });
    },
    [center, zoom],
  );

  useEffect(() => {
    if (googleMaps) {
      initializeMap(googleMaps);
    }
  }, [googleMaps, initializeMap]);

  useEffect(() => {
    if (!googleMaps || !mapRef.current || !markerRef.current) {
      return;
    }

    setMarkerPosition(markerRef.current, center);
    setMarkerMap(markerRef.current, mapRef.current);
    mapRef.current.panTo(center);
    mapRef.current.setZoom(zoom);
  }, [center, zoom, googleMaps]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden"
        style={{ height }}
      />
      {(isLoading || loadError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur">
          <p className="text-sm text-muted-foreground px-4 text-center">
            {loadError ?? "Loading map preview…"}
          </p>
        </div>
      )}
    </div>
  );
}

