export interface MapEditorElevatorCoordinates {
  x: number;
  y: number;
}

export interface MapEditorElevator {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  name: string;
  description?: string;
  coordinates: MapEditorElevatorCoordinates;
  connectsToFloors: string[];
  icon?: string;
  color?: string;
  isAccessible: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorElevatorRequest {
  floorPlanId: string;
  name: string;
  description?: string;
  coordinates: MapEditorElevatorCoordinates;
  connectsToFloors: string[];
  icon?: string;
  color?: string;
  isAccessible?: boolean;
}

export interface UpdateMapEditorElevatorRequest {
  name?: string;
  description?: string;
  coordinates?: MapEditorElevatorCoordinates;
  connectsToFloors?: string[];
  icon?: string;
  color?: string;
  isAccessible?: boolean;
  isActive?: boolean;
}

export interface MapEditorElevatorQuery {
  floorPlanId: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorElevatorResponse {
  success: boolean;
  message: string;
  data: {
    elevator: MapEditorElevator;
  };
}

export interface MapEditorElevatorListResponse {
  success: boolean;
  message: string;
  data: {
    elevators: MapEditorElevator[];
  };
}
