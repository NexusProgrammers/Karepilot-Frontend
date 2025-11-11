"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";
import { loadGoogleMaps } from "@/lib/maps/googleMapsLoader";

type GoogleMaps = Awaited<ReturnType<typeof loadGoogleMaps>>;
type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
type LegacyMarker = google.maps.Marker;
type AnyMarker = AdvancedMarkerElement | LegacyMarker;
interface GoogleMapProps {
  height?: number;
  marker: { lat: number; lng: number } | null;
  onMarkerChange: (coords: { lat: number; lng: number } | null) => void;
}

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.006 };
const DEFAULT_ZOOM = 16;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

export function InteractivePoiMap({ height = 320, marker, onMarkerChange }: GoogleMapProps) {
  const [googleMaps, setGoogleMaps] = useState<GoogleMaps | null>(null);
  const [map, setMap] = useState<any>(null);
  const [mapMarker, setMapMarker] = useState<AnyMarker | null>(null);
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [activePredictionIndex, setActivePredictionIndex] = useState(-1);
  const predictionDebounceRef = useRef<number | null>(null);

  const center = useMemo(() => marker ?? DEFAULT_CENTER, [marker]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const googleInstance = await loadGoogleMaps();
        if (!cancelled && googleInstance) {
          setGoogleMaps(googleInstance);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to load Google Maps API.";
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

  const isAdvancedMarker = useCallback(
    (marker: AnyMarker | null): marker is AdvancedMarkerElement =>
      Boolean(marker && "position" in marker && !("setPosition" in marker)),
    [],
  );

  const isLegacyMarker = useCallback(
    (marker: AnyMarker | null): marker is LegacyMarker =>
      Boolean(marker && typeof (marker as LegacyMarker).setPosition === "function"),
    [],
  );

  const setMarkerPosition = useCallback(
    (marker: AnyMarker, coords: google.maps.LatLngLiteral) => {
      if (isAdvancedMarker(marker)) {
        marker.position = coords;
      } else if (isLegacyMarker(marker)) {
        marker.setPosition(coords);
      }
    },
    [isAdvancedMarker, isLegacyMarker],
  );

  const setMarkerMap = useCallback(
    (marker: AnyMarker, mapInstance: google.maps.Map | null) => {
      if (isAdvancedMarker(marker)) {
        marker.map = mapInstance ?? null;
      } else if (isLegacyMarker(marker)) {
        marker.setMap(mapInstance ?? null);
      }
    },
    [isAdvancedMarker, isLegacyMarker],
  );

  const initializeMap = useCallback(
    (maps: GoogleMaps) => {
      if (!mapContainer || map) {
        return;
      }

      const container = mapContainer as HTMLDivElement;

      const mapInstance = new maps.maps.Map(container, {
        center,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
        ...(MAP_ID ? { mapId: MAP_ID } : {}),
      });

      const supportsAdvancedMarker =
        Boolean(MAP_ID && maps.maps.marker?.AdvancedMarkerElement);

      const markerInstance: AnyMarker = supportsAdvancedMarker
        ? new maps.maps.marker.AdvancedMarkerElement({
            position: center,
            map: marker ? mapInstance : undefined,
            gmpDraggable: true,
          })
        : new maps.maps.Marker({
            position: center,
            map: marker ? mapInstance : undefined,
            draggable: true,
          });

      markerInstance.addListener("dragend", (event: any) => {
        const latLng =
          event?.latLng ??
          (event?.detail?.latLng ?? event?.target?.position ?? null);
        if (latLng) {
          const lat = typeof latLng.lat === "function" ? latLng.lat() : latLng.lat;
          const lng = typeof latLng.lng === "function" ? latLng.lng() : latLng.lng;
          onMarkerChange({ lat, lng });
        }
      });

      mapInstance.addListener("click", (event: any) => {
        if (!event?.latLng) {
          return;
        }
        const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setMarkerPosition(markerInstance, coords);
        setMarkerMap(markerInstance, mapInstance);
        onMarkerChange(coords);
      });

      setMap(mapInstance);
      setMapMarker(markerInstance);
    },
    [center, mapContainer, map, marker, onMarkerChange, setMarkerPosition, setMarkerMap],
  );

  useEffect(() => {
    if (googleMaps) {
      initializeMap(googleMaps);
    }
  }, [googleMaps, initializeMap]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.setAttribute("autocomplete", "off");
    }
  }, []);

  useEffect(() => {
    if (!map || !mapMarker || !googleMaps) {
      return;
    }

    if (marker) {
      setMarkerPosition(mapMarker, marker);
      setMarkerMap(mapMarker, map);
      map.panTo(marker);
      map.setZoom(DEFAULT_ZOOM);
    } else {
      setMarkerMap(mapMarker, null);
      map.panTo(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [map, mapMarker, marker, googleMaps, setMarkerPosition, setMarkerMap]);

  useEffect(() => {
    if (!googleMaps || !map) {
      return;
    }

    if (!googleMaps.maps.places) {
      setSearchError("Places library not available.");
      return;
    }

    if (!autocompleteService) {
      setAutocompleteService(new googleMaps.maps.places.AutocompleteService());
    }

    if (!placesService) {
      setPlacesService(new googleMaps.maps.places.PlacesService(map));
    }
  }, [googleMaps, map, autocompleteService, placesService]);

  const handleManualSearch = useCallback(() => {
    const query = searchValue.trim();

    if (!query || !googleMaps || !map || !mapMarker) {
      return;
    }

    setSearchError(null);
    const geocoder = new googleMaps.maps.Geocoder();

    geocoder.geocode({ address: query }, (results: any, status: string) => {
      if (status === "OK" && results[0]?.geometry?.location) {
        const location = results[0].geometry.location;
        const coords = { lat: location.lat(), lng: location.lng() };

        map.panTo(coords);
        map.setZoom(18);
        setMarkerMap(mapMarker, map);
        setMarkerPosition(mapMarker, coords);
        onMarkerChange(coords);
        setPredictions([]);
        setActivePredictionIndex(-1);
        setSearchValue(results[0].formatted_address ?? query);
      } else {
        setSearchError("No results found for that search.");
      }
    });
  }, [
    map,
    mapMarker,
    googleMaps,
    onMarkerChange,
    setMarkerMap,
    setMarkerPosition,
    searchValue,
  ]);

  const handlePredictionSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | null) => {
      if (!prediction || !placesService || !googleMaps || !map || !mapMarker) {
        return;
      }

      placesService.getDetails(
        {
          placeId: prediction.place_id,
          fields: ["geometry", "formatted_address", "name"],
        },
        (place, status) => {
          if (
            status !== googleMaps.maps.places.PlacesServiceStatus.OK ||
            !place?.geometry?.location
          ) {
            setSearchError("Unable to retrieve details for that place.");
            return;
          }

          setSearchError(null);
          const location = place.geometry.location;
          const coords = { lat: location.lat(), lng: location.lng() };
          map.panTo(coords);
          map.setZoom(18);
          setMarkerMap(mapMarker, map);
          setMarkerPosition(mapMarker, coords);
          onMarkerChange(coords);
          setPredictions([]);
          setActivePredictionIndex(-1);
          setSearchValue(
            place.formatted_address ?? place.name ?? prediction.description ?? "",
          );
        },
      );
    },
    [placesService, googleMaps, map, mapMarker, setMarkerMap, setMarkerPosition, onMarkerChange],
  );

  const handleSearchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (activePredictionIndex >= 0 && predictions[activePredictionIndex]) {
          handlePredictionSelect(predictions[activePredictionIndex]);
        } else {
          handleManualSearch();
        }
      } else if (event.key === "ArrowDown" && predictions.length > 0) {
        event.preventDefault();
        setActivePredictionIndex((prev) => (prev + 1) % predictions.length);
      } else if (event.key === "ArrowUp" && predictions.length > 0) {
        event.preventDefault();
        setActivePredictionIndex((prev) =>
          prev <= 0 ? predictions.length - 1 : prev - 1,
        );
      } else if (event.key === "Escape") {
        setPredictions([]);
        setActivePredictionIndex(-1);
      }
    },
    [handleManualSearch, predictions, activePredictionIndex, handlePredictionSelect],
  );

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      if (searchError) {
        setSearchError(null);
      }
    },
    [searchError],
  );

  useEffect(() => {
    if (!autocompleteService || !googleMaps) {
      return;
    }

    if (predictionDebounceRef.current) {
      window.clearTimeout(predictionDebounceRef.current);
    }

    const trimmed = searchValue.trim();
    if (!trimmed || trimmed.length < 3) {
      setPredictions([]);
      setActivePredictionIndex(-1);
      return;
    }

    predictionDebounceRef.current = window.setTimeout(() => {
      autocompleteService.getPlacePredictions(
        {
          input: trimmed,
          types: ["geocode"],
        },
        (results, status) => {
          if (
            status === googleMaps.maps.places.PlacesServiceStatus.OK &&
            results?.length
          ) {
            setPredictions(results);
            setActivePredictionIndex(-1);
          } else {
            setPredictions([]);
          }
        },
      );
    }, 250);

    return () => {
      if (predictionDebounceRef.current) {
        window.clearTimeout(predictionDebounceRef.current);
      }
    };
  }, [searchValue, autocompleteService, googleMaps]);

  const isMapReady = Boolean(map && mapMarker && googleMaps);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-3 right-3 top-3 z-10 flex flex-col gap-2">
        <div className="pointer-events-auto flex items-center gap-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a location"
            value={searchValue}
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
        {predictions.length > 0 && (
          <div className="pointer-events-auto max-h-64 overflow-auto rounded-lg border border-border bg-background shadow-lg">
            {predictions.map((prediction, index) => (
              <button
                key={prediction.place_id}
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  handlePredictionSelect(prediction);
                }}
                className={`flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm transition ${
                  index === activePredictionIndex
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <span className="font-medium">
                  {prediction.structured_formatting?.main_text ?? prediction.description}
                </span>
                {prediction.structured_formatting?.secondary_text && (
                  <span className="text-xs text-muted-foreground">
                    {prediction.structured_formatting.secondary_text}
                  </span>
                )}
              </button>
            ))}
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
