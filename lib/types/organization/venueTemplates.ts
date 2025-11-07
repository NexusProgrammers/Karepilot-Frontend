export interface VenueTemplate {
  id: string;
  name: string;
  description?: string;
  includedFeatures: string[];
  defaultPOICategories: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface VenueTemplateResponse {
  success: boolean;
  message: string;
  data: {
    venueTemplate: VenueTemplate;
  };
}

export interface VenueTemplatesListResponse {
  success: boolean;
  message: string;
  data: {
    venueTemplates: VenueTemplate[];
    pagination: {
      current: number;
      pages: number;
      total: number;
      limit: number;
    };
  };
}

export interface CreateVenueTemplateRequest {
  name: string;
  description?: string;
  includedFeatures?: string[];
  defaultPOICategories?: string[];
}

export interface UpdateVenueTemplateRequest {
  name?: string;
  description?: string;
  includedFeatures?: string[];
  defaultPOICategories?: string[];
}

export interface VenueTemplateQuery {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
}

