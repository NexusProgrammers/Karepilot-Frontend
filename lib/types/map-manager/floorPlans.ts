export type FloorPlanStatus =
  | "Draft"
  | "Published"
  | "Archived"
  | "Building"
  | "New";

export interface MapManagerFloorPlanFile {
  fileName: string;
  mimeType: string;
  fileSizeInBytes: number;
  url?: string;
}

export interface MapManagerFloorPlan {
  id: string;
  organization: string;
  building: {
    id: string;
    name: string;
    code?: string;
  };
  floor: {
    id: string;
    name: string;
    code?: string;
    level?: number;
  };
  name: string;
  status: FloorPlanStatus;
  description?: string;
  scale?: string;
  tags: string[];
  file?: MapManagerFloorPlanFile | null;
  previewUrl?: string;
  versionNumber: number;
  lastPublishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface MapManagerFloorPlansResponse {
  success: boolean;
  message: string;
  data: {
    floorPlans: MapManagerFloorPlan[];
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

export interface MapManagerFloorPlanResponse {
  success: boolean;
  message: string;
  data: {
    floorPlan: MapManagerFloorPlan;
  };
}

export interface MapManagerFloorPlanQuery {
  page?: number;
  limit?: number;
  organization?: string;
  building?: string;
  floor?: string;
  status?: FloorPlanStatus;
  search?: string;
  tag?: string;
}

export interface CreateMapManagerFloorPlanRequest {
  organization: string;
  building: string;
  floor: string;
  name: string;
  status?: FloorPlanStatus;
  description?: string;
  scale?: string;
  tags?: string[];
  file?: MapManagerFloorPlanFile | null;
  previewUrl?: string;
}

export interface UpdateMapManagerFloorPlanRequest {
  name?: string;
  status?: FloorPlanStatus;
  description?: string;
  scale?: string;
  tags?: string[];
  file?: MapManagerFloorPlanFile | null;
  previewUrl?: string | null;
}

export interface MapManagerFloorPlanStats {
  total: number;
  published: number;
  draft: number;
  inProgress: number;
  archived: number;
}

export interface MapManagerFloorPlanStatsResponse {
  success: boolean;
  message: string;
  data: MapManagerFloorPlanStats;
}


