export interface OrganizationVenueTemplateRef {
  _id: string;
  id?: string;
  name: string;
  description?: string;
  includedFeatures?: string[];
  defaultPOICategories?: string[];
}

export interface OrganizationUserRef {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Organization {
  id: string;
  organizationType: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  address: string;
  venueTemplate?: OrganizationVenueTemplateRef | null;
  isActive: boolean;
  createdBy?: OrganizationUserRef | null;
  updatedBy?: OrganizationUserRef | null;
  createdAt: string;
  updatedAt?: string;
}

export interface OrganizationPagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

export interface OrganizationsListResponse {
  success: boolean;
  message: string;
  data: {
    organizations: Organization[];
    pagination: OrganizationPagination;
  };
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: {
    organization: Organization;
  };
}

export interface CreateOrganizationRequest {
  organizationType: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  address: string;
  venueTemplate: string;
  isActive?: boolean;
}

export interface UpdateOrganizationRequest {
  organizationType?: string;
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  address?: string;
  venueTemplate?: string;
  isActive?: boolean;
}

export interface OrganizationQuery {
  page?: number;
  limit?: number;
  search?: string;
  organizationType?: string;
  isActive?: boolean;
  country?: string;
  city?: string;
}

export interface DeleteOrganizationResponse {
  success: boolean;
  message: string;
}

export interface OrganizationSelectionProps {
  onSelect?: (organization: Organization) => void;
  selectedOrganization?: Organization | null;
}
