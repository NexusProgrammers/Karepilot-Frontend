export interface LayerVisibility {
  floorPlan: boolean;
  pois: boolean;
  paths: boolean;
  zones: boolean;
  labels: boolean;
}

export interface MapEditorProperties {
  gridSize: number;
  snapToGrid: boolean;
  showGrid: boolean;
}

export interface MapEditorPreferences {
  id: string;
  userId: string;
  layerVisibility: LayerVisibility;
  properties: MapEditorProperties;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMapEditorPreferencesRequest {
  layerVisibility?: Partial<LayerVisibility>;
  properties?: Partial<MapEditorProperties>;
}

