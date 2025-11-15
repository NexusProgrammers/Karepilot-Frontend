export interface MapManagementSettings {
  organizationId: string;
  autoPublishUpdates: boolean;
  highResolutionThumbnails: boolean;
  enableVersionControl: boolean;
  updatedAt: string;
}

export interface MapManagementSettingsResponse {
  success: boolean;
  message: string;
  data: {
    settings: MapManagementSettings;
  };
}

export interface UpdateMapManagementSettingsRequest {
  organizationId: string;
  autoPublishUpdates?: boolean;
  highResolutionThumbnails?: boolean;
  enableVersionControl?: boolean;
}

export interface MapManagementSettingsQuery {
  organizationId: string;
}

