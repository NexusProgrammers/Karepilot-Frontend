export type MapLayerType =
  | "floor-plan"
  | "poi"
  | "path"
  | "zone"
  | "label"
  | "entrance"
  | "elevator"
  | "restricted-zone"
  | "tag"
  | "ruler"
  | "measurement"
  | "annotation"
  | "message"
  | "media";

export interface MapManagerSettings {
  organization: string;
  autoPublishUpdates: boolean;
  highResThumbnails: boolean;
  enableVersionControl: boolean;
  defaultGridSize: number;
  defaultGridUnit: "px" | "ft" | "m";
  defaultSnapToGrid: boolean;
  defaultShowGrid: boolean;
  defaultZoom: number;
  defaultMapScale?: string | null;
  allowedFileTypes: string[];
  maxUploadSizeMb: number;
  defaultLayerVisibility: Partial<Record<MapLayerType, boolean>>;
  notificationPreferences?: {
    publishSuccess?: boolean;
    publishFailure?: boolean;
    approvalRequired?: boolean;
  };
  retentionPolicy?: {
    keepDraftVersions?: number;
    keepPublishedSnapshots?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface MapManagerSettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: MapManagerSettings;
  };
}

export interface UpdateMapManagerSettingsRequest {
  organization: string;
  autoPublishUpdates?: boolean;
  highResThumbnails?: boolean;
  enableVersionControl?: boolean;
  defaultGridSize?: number;
  defaultGridUnit?: "px" | "ft" | "m";
  defaultSnapToGrid?: boolean;
  defaultShowGrid?: boolean;
  defaultZoom?: number;
  defaultMapScale?: string | null;
  allowedFileTypes?: string[];
  maxUploadSizeMb?: number;
  defaultLayerVisibility?: Partial<Record<MapLayerType, boolean>>;
  notificationPreferences?: {
    publishSuccess?: boolean;
    publishFailure?: boolean;
    approvalRequired?: boolean;
  };
  retentionPolicy?: {
    keepDraftVersions?: number;
    keepPublishedSnapshots?: number;
  };
}


