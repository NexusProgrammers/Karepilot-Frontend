export interface MapEditorEntranceCoordinates {
  x: number;
  y: number;
}

export interface MapEditorEntrance {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  name: string;
  category: string;
  description?: string;
  coordinates: MapEditorEntranceCoordinates;
  icon?: string;
  color?: string;
  isAccessible: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorEntranceRequest {
  floorPlanId: string;
  name: string;
  category: string;
  description?: string;
  coordinates: MapEditorEntranceCoordinates;
  icon?: string;
  color?: string;
  isAccessible?: boolean;
}

export interface UpdateMapEditorEntranceRequest {
  name?: string;
  category?: string;
  description?: string;
  coordinates?: MapEditorEntranceCoordinates;
  icon?: string;
  color?: string;
  isAccessible?: boolean;
  isActive?: boolean;
}

export interface MapEditorEntranceQuery {
  floorPlanId: string;
  category?: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorEntranceResponse {
  success: boolean;
  message: string;
  data: {
    entrance: MapEditorEntrance;
  };
}

export interface MapEditorEntranceListResponse {
  success: boolean;
  message: string;
  data: {
    entrances: MapEditorEntrance[];
  };
}

