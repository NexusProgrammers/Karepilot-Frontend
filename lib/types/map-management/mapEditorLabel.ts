export interface MapEditorLabelCoordinates {
  x: number;
  y: number;
}

export interface MapEditorLabel {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  text: string;
  coordinates: MapEditorLabelCoordinates;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorLabelRequest {
  floorPlanId: string;
  text: string;
  coordinates: MapEditorLabelCoordinates;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

export interface UpdateMapEditorLabelRequest {
  text?: string;
  coordinates?: MapEditorLabelCoordinates;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  isActive?: boolean;
}

export interface MapEditorLabelQuery {
  floorPlanId: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorLabelResponse {
  success: boolean;
  message: string;
  data: {
    label: MapEditorLabel;
  };
}

export interface MapEditorLabelListResponse {
  success: boolean;
  message: string;
  data: {
    labels: MapEditorLabel[];
  };
}

