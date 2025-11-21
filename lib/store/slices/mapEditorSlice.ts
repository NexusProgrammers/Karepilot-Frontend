import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface MapEditorState {
  layerVisibility: LayerVisibility;
  properties: MapEditorProperties;
}

// Default state - same on server and client to avoid hydration issues
const initialState: MapEditorState = {
  layerVisibility: {
    floorPlan: true,
    pois: true,
    paths: true,
    zones: true,
    labels: true,
  },
  properties: {
    gridSize: 10,
    snapToGrid: true,
    showGrid: true,
  },
};

const mapEditorSlice = createSlice({
  name: "mapEditor",
  initialState,
  reducers: {
    toggleLayer: (state, action: PayloadAction<keyof LayerVisibility>) => {
      state.layerVisibility[action.payload] =
        !state.layerVisibility[action.payload];
    },
    setLayerVisibility: (
      state,
      action: PayloadAction<{
        layerId: keyof LayerVisibility;
        visible: boolean;
      }>
    ) => {
      state.layerVisibility[action.payload.layerId] = action.payload.visible;
    },
    setGridSize: (state, action: PayloadAction<number>) => {
      state.properties.gridSize = action.payload;
    },
    setSnapToGrid: (state, action: PayloadAction<boolean>) => {
      state.properties.snapToGrid = action.payload;
    },
    setShowGrid: (state, action: PayloadAction<boolean>) => {
      state.properties.showGrid = action.payload;
    },
    resetLayers: (state) => {
      state.layerVisibility = initialState.layerVisibility;
    },
    resetProperties: (state) => {
      state.properties = initialState.properties;
    },
    resetMapEditor: (state) => {
      state.layerVisibility = initialState.layerVisibility;
      state.properties = initialState.properties;
    },
  },
});

export const {
  toggleLayer,
  setLayerVisibility,
  setGridSize,
  setSnapToGrid,
  setShowGrid,
  resetLayers,
  resetProperties,
  resetMapEditor,
} = mapEditorSlice.actions;

export default mapEditorSlice.reducer;
