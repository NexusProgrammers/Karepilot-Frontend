export interface MapManagerFloorBuildingSummary {
  id: string;
  name: string;
  code?: string;
}

export interface MapManagerFloor {
  id: string;
  organization: string;
  building: string | MapManagerFloorBuildingSummary;
  name: string;
  code?: string;
  level: number;
  sequence: number;
  description?: string;
  isBasement: boolean;
  isDefault: boolean;
  tags: string[];
  attributes?: Record<string, any>;
  mapCount?: number;
  publishedMapCount?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MapManagerFloorsResponse {
  success: boolean;
  message: string;
  data: {
    floors: MapManagerFloor[];
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

export interface MapManagerFloorResponse {
  success: boolean;
  message: string;
  data: {
    floor: MapManagerFloor;
  };
}

export interface CreateMapManagerFloorRequest {
  organization: string;
  building: string;
  name: string;
  code?: string;
  level: number;
  sequence: number;
  description?: string;
  isBasement?: boolean;
  isDefault?: boolean;
  tags?: string[];
  attributes?: Record<string, any>;
  isActive?: boolean;
}

export interface UpdateMapManagerFloorRequest {
  name?: string;
  code?: string;
  level?: number;
  sequence?: number;
  description?: string;
  isBasement?: boolean;
  isDefault?: boolean;
  tags?: string[];
  attributes?: Record<string, any> | null;
  isActive?: boolean;
}

export interface MapManagerFloorQuery {
  page?: number;
  limit?: number;
  organization?: string;
  building?: string;
  search?: string;
  isActive?: boolean;
  includeInactiveBuilding?: boolean;
}


