export interface MapEditorPathPoint {
  x: number;
  y: number;
}

export interface MapEditorPath {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  name?: string;
  points: MapEditorPathPoint[];
  color?: string;
  strokeWidth?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorPathRequest {
  floorPlanId: string;
  name?: string;
  points: MapEditorPathPoint[];
  color?: string;
  strokeWidth?: number;
}

export interface UpdateMapEditorPathRequest {
  name?: string;
  points?: MapEditorPathPoint[];
  color?: string;
  strokeWidth?: number;
  isActive?: boolean;
}

export interface MapEditorPathQuery {
  floorPlanId: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorPathResponse {
  success: boolean;
  message: string;
  data: {
    path: MapEditorPath;
  };
}

export interface MapEditorPathListResponse {
  success: boolean;
  message: string;
  data: {
    paths: MapEditorPath[];
  };
}

