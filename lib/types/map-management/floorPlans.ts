export interface FloorPlanBuilding {
  id: string;
  name: string;
}

export interface FloorPlanMetadata {
  scale?: string | null;
  description?: string | null;
  tags?: string[];
  highlights?: string[];
}

export interface FloorPlanMedia {
  fileUrl?: string | null;
  fileKey?: string | null;
  thumbnailUrl?: string | null;
  thumbnailKey?: string | null;
}

export interface FloorPlan {
  id: string;
  title: string;
  floorLabel: string;
  floorNumber: number;
  status: "Published" | "Draft" | "Disabled" | "Archived";
  building: FloorPlanBuilding;
  metadata: FloorPlanMetadata;
  media: FloorPlanMedia;
  version: number;
  versionNotes?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FloorPlansPagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

export interface FloorPlansStats {
  totalMaps: number;
  publishedMaps: number;
  draftedMaps: number;
  disabledMaps: number;
  archivedMaps: number;
  buildings: number;
}

export interface AvailableBuilding {
  id: string;
  name: string;
  floors: number;
}

export interface AvailableFilters {
  buildings: AvailableBuilding[];
  statuses: string[];
  tags: string[];
  floorLabels: string[];
}

export interface FloorPlansListResponse {
  success: boolean;
  message: string;
  data: {
    floorPlans: FloorPlan[];
    pagination: FloorPlansPagination;
    stats: FloorPlansStats;
    availableFilters: AvailableFilters;
  };
}

export interface FloorPlanQuery {
  page?: number;
  limit?: number;
  search?: string;
  building?: string;
  status?: string;
  tag?: string;
  floorLabel?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  organizationId?: string;
}

export interface FloorPlanResponse {
  success: boolean;
  message: string;
  data: {
    floorPlan: FloorPlan;
  };
}

export interface CreateFloorPlanRequest {
  organizationId: string;
  buildingId: string;
  title: string;
  floorLabel: string;
  floorNumber?: number | null;
  status?: "Draft" | "Published" | "Disabled" | "Archived";
  media?: FloorPlanMedia;
  metadata?: FloorPlanMetadata;
  isTemplate?: boolean;
  versionNotes?: string | null;
}

