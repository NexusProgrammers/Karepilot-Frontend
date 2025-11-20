export type RestrictionType = "Staff Only" | "Authorized Personnel" | "Emergency Access Only";

export interface MapEditorRestrictedZoneCoordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MapEditorRestrictedZone {
  id: string;
  floorPlan: {
    id: string;
    title: string;
    floorLabel: string;
  };
  name: string;
  description?: string;
  restrictionType: RestrictionType;
  coordinates: MapEditorRestrictedZoneCoordinates;
  color?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMapEditorRestrictedZoneRequest {
  floorPlanId: string;
  name: string;
  description?: string;
  restrictionType: RestrictionType;
  coordinates: MapEditorRestrictedZoneCoordinates;
  color?: string;
}

export interface UpdateMapEditorRestrictedZoneRequest {
  name?: string;
  description?: string;
  restrictionType?: RestrictionType;
  coordinates?: MapEditorRestrictedZoneCoordinates;
  color?: string;
  isActive?: boolean;
}

export interface MapEditorRestrictedZoneQuery {
  floorPlanId: string;
  isActive?: boolean;
  search?: string;
}

export interface MapEditorRestrictedZoneResponse {
  success: boolean;
  message: string;
  data: {
    restrictedZone: MapEditorRestrictedZone;
  };
}

export interface MapEditorRestrictedZoneListResponse {
  success: boolean;
  message: string;
  data: {
    restrictedZones: MapEditorRestrictedZone[];
  };
}

