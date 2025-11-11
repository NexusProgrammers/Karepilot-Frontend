"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import type { KeyboardEvent } from "react";

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
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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

    const apiKey = "AIzaSyAW9nZTfMsKqlQZ9sFeG-hHE33s5QtTRzs";
    console.log("apiKey", apiKey);
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

  useEffect(() => {
    if (!mapsApi || !map || !searchInputRef.current) {
      return;
    }

    if (!("places" in mapsApi) || !mapsApi.places?.Autocomplete) {
      setSearchError("Places library not available.");
      return;
    }

    const autocomplete = new mapsApi.places.Autocomplete(searchInputRef.current, {
      fields: ["geometry", "name", "formatted_address"],
      types: ["geocode"],
    });

    autocomplete.bindTo("bounds", map);

    const placeChangedListener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry?.location || !mapMarker) {
        setSearchError("No location data available for that place.");
        return;
      }

      setSearchError(null);

      const location = place.geometry.location;
      const coords = { lat: location.lat(), lng: location.lng() };

      map.panTo(coords);
      map.setZoom(18);
      mapMarker.setMap(map);
      mapMarker.setPosition(coords);
      onMarkerChange(coords);

      if (place.formatted_address || place.name) {
        const inputEl = searchInputRef.current;
        if (inputEl) {
          inputEl.value = place.formatted_address ?? place.name ?? "";
        }
      }
    });

    return () => {
      mapsApi.event?.removeListener(placeChangedListener);
      mapsApi.event?.clearInstanceListeners?.(autocomplete);
    };
  }, [map, mapMarker, mapsApi, onMarkerChange]);

  const handleManualSearch = useCallback(() => {
    const query = searchInputRef.current?.value.trim();

    if (!query || !mapsApi || !map || !mapMarker) {
      return;
    }

    setSearchError(null);
    const geocoder = new mapsApi.Geocoder();

    geocoder.geocode({ address: query }, (results: any, status: string) => {
      if (status === "OK" && results[0]?.geometry?.location) {
        const location = results[0].geometry.location;
        const coords = { lat: location.lat(), lng: location.lng() };

        map.panTo(coords);
        map.setZoom(18);
        mapMarker.setMap(map);
        mapMarker.setPosition(coords);
        onMarkerChange(coords);
      } else {
        setSearchError("No results found for that search.");
      }
    });
  }, [map, mapMarker, mapsApi, onMarkerChange]);

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleManualSearch();
      }
    },
    [handleManualSearch],
  );

  const handleSearchChange = useCallback(() => {
    if (searchError) {
      setSearchError(null);
    }
  }, [searchError]);

  const isMapReady = Boolean(map && mapMarker && mapsApi);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 flex flex-col gap-2">
        <div className="pointer-events-auto flex items-center gap-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a location"
            onKeyDown={handleSearchKeyDown}
            onChange={handleSearchChange}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            disabled={!isMapReady}
          />
          <button
            type="button"
            onClick={handleManualSearch}
            disabled={!isMapReady}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Search
          </button>
        </div>
        {searchError && (
          <div className="pointer-events-auto rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive shadow-sm">
            {searchError}
          </div>
        )}
      </div>

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
