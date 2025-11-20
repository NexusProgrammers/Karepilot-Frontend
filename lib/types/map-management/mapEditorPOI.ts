export interface MapEditorPOICoordinates {
  x: number;
  y: number;
}

export interface MapEditorPOI {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  name: string;
  category: string;
  description?: string;
  coordinates: MapEditorPOICoordinates;
  icon?: string;
  color?: string;
  isAccessible: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorPOIRequest {
  floorPlanId: string;
  name: string;
  category: string;
  description?: string;
  coordinates: MapEditorPOICoordinates;
  icon?: string;
  color?: string;
  isAccessible?: boolean;
}

export interface UpdateMapEditorPOIRequest {
  name?: string;
  category?: string;
  description?: string;
  coordinates?: MapEditorPOICoordinates;
  icon?: string;
  color?: string;
  isAccessible?: boolean;
  isActive?: boolean;
}

export interface MapEditorPOIQuery {
  floorPlanId: string;
  category?: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorPOIResponse {
  success: boolean;
  message: string;
  data: {
    poi: MapEditorPOI;
  };
}

export interface MapEditorPOIListResponse {
  success: boolean;
  message: string;
  data: {
    pois: MapEditorPOI[];
  };
}

