"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

type GoogleMapsType = any;

interface GoogleMapProps {
  height?: number;
  marker: { lat: number; lng: number } | null;
  onMarkerChange: (coords: { lat: number; lng: number } | null) => void;
}

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.006 };
const DEFAULT_ZOOM = 16;

export function InteractivePoiMap({ height = 320, marker, onMarkerChange }: GoogleMapProps) {
  const [map, setMap] = useState<GoogleMapsType["Map"] | null>(null);
  const [mapsApi, setMapsApi] = useState<GoogleMapsType | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [mapMarker, setMapMarker] = useState<GoogleMapsType["Marker"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const center = useMemo(() => marker ?? DEFAULT_CENTER, [marker]);

  const initializeMap = useCallback(
    (maps: GoogleMapsType) => {
      if (!mapContainer || map) {
        return;
      }

      const mapInstance = new maps.Map(mapContainer, {
        center,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
      });

      const markerInstance = new maps.Marker({
        position: center,
        map: marker ? mapInstance : undefined,
        draggable: true,
      });

      markerInstance.addListener("dragend", () => {
        const position = markerInstance.getPosition();
        if (position) {
          onMarkerChange({ lat: position.lat(), lng: position.lng() });
        }
      });

      mapInstance.addListener("click", (event: any) => {
        if (!event.latLng) {
          return;
        }
        const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        markerInstance.setPosition(coords);
        markerInstance.setMap(mapInstance);
        onMarkerChange(coords);
      });

      setMap(mapInstance);
      setMapMarker(markerInstance);
    },
    [center, mapContainer, map, marker, onMarkerChange],
  );

  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-google-maps-loader="true"]',
    );

    if (existingScript && (window as any).google?.maps) {
      setMapsApi((window as any).google.maps);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLoadError("Google Maps API key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsLoader = "true";

    const onLoad = () => {
      if ((window as any).google?.maps) {
        setMapsApi((window as any).google.maps);
      } else {
        setLoadError("Failed to load Google Maps API.");
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    script.addEventListener("load", onLoad);
    script.addEventListener("error", () => {
      setIsLoading(false);
      setLoadError("Failed to load Google Maps API script.");
    });

    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (mapsApi) {
      initializeMap(mapsApi);
    }
  }, [mapsApi, initializeMap]);

  useEffect(() => {
    if (!map || !mapMarker || !mapsApi) {
      return;
    }

    if (marker) {
      mapMarker.setPosition(marker);
      mapMarker.setMap(map);
      map.panTo(marker);
      map.setZoom(DEFAULT_ZOOM);
    } else {
      mapMarker.setMap(null);
      map.panTo(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [map, mapMarker, marker, mapsApi]);

  return (
    <div className="relative">
      <div
        ref={setMapContainer}
        className="w-full rounded-xl overflow-hidden"
        style={{ height }}
      />
      {(isLoading || loadError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
          {loadError ? (
            <p className="text-sm text-red-500 text-center px-4">{loadError}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Loading map…</p>
          )}
        </div>
      )}
    </div>
  );
}

