export interface MapManagerBuildingAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface MapManagerBuildingGeoLocation {
  latitude?: number;
  longitude?: number;
}

export interface MapManagerBuilding {
  id: string;
  organization: string;
  name: string;
  code?: string;
  description?: string;
  tags: string[];
  address?: MapManagerBuildingAddress;
  geoLocation?: MapManagerBuildingGeoLocation;
  metadata?: Record<string, any>;
  floorCount: number;
  defaultFloor?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MapManagerBuildingsResponse {
  success: boolean;
  message: string;
  data: {
    buildings: MapManagerBuilding[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface MapManagerBuildingResponse {
  success: boolean;
  message: string;
  data: {
    building: MapManagerBuilding;
  };
}

export interface MapManagerBuildingStats {
  total: number;
  active: number;
  inactive: number;
  totalFloors: number;
}

export interface MapManagerBuildingStatsResponse {
  success: boolean;
  message: string;
  data: MapManagerBuildingStats;
}

export interface CreateMapManagerBuildingRequest {
  organization: string;
  name: string;
  code?: string;
  description?: string;
  tags?: string[];
  address?: MapManagerBuildingAddress;
  geoLocation?: MapManagerBuildingGeoLocation;
  defaultFloor?: string | null;
  metadata?: Record<string, any>;
  isActive?: boolean;
}

export interface UpdateMapManagerBuildingRequest {
  name?: string;
  code?: string;
  description?: string;
  tags?: string[];
  address?: MapManagerBuildingAddress | null;
  geoLocation?: MapManagerBuildingGeoLocation | null;
  defaultFloor?: string | null;
  metadata?: Record<string, any> | null;
  isActive?: boolean;
}

export interface MapManagerBuildingQuery {
  page?: number;
  limit?: number;
  organization?: string;
  search?: string;
  isActive?: boolean;
  tag?: string;
}


