"use strict";

import { Loader } from "@googlemaps/js-api-loader";

const apiKey = "AIzaSyAW9nZTfMsKqlQZ9sFeG-hHE33s5QtTRzs";

let loader: Loader | null = null;
let loadPromise: Promise<typeof google> | null = null;

export function loadGoogleMaps() {
  if (!apiKey) {
    return Promise.reject(
      new Error("Google Maps API key missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY."),
    );
  }

  if (!loader) {
    loader = new Loader({
      apiKey,
      libraries: ["places", "marker"],
      version: "weekly",
    });
  }

  if (!loadPromise) {
    loadPromise = loader.load();
  }

  return loadPromise;
}


