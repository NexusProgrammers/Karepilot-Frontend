export interface MapEditorMeasurementPoint {
  x: number;
  y: number;
}

export interface MapEditorMeasurement {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  startPoint: MapEditorMeasurementPoint;
  endPoint: MapEditorMeasurementPoint;
  distance: number;
  unit: string;
  color?: string;
  strokeWidth?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorMeasurementRequest {
  floorPlanId: string;
  startPoint: MapEditorMeasurementPoint;
  endPoint: MapEditorMeasurementPoint;
  distance: number;
  unit: string;
  color?: string;
  strokeWidth?: number;
}

export interface UpdateMapEditorMeasurementRequest {
  startPoint?: MapEditorMeasurementPoint;
  endPoint?: MapEditorMeasurementPoint;
  distance?: number;
  unit?: string;
  color?: string;
  strokeWidth?: number;
  isActive?: boolean;
}

export interface MapEditorMeasurementQuery {
  floorPlanId: string;
  isActive?: boolean;
}

export interface MapEditorMeasurementResponse {
  success: boolean;
  message: string;
  data: {
    measurement: MapEditorMeasurement;
  };
}

export interface MapEditorMeasurementListResponse {
  success: boolean;
  message: string;
  data: {
    measurements: MapEditorMeasurement[];
  };
}

