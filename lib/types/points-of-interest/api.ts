"use strict";

export interface PointOfInterestContact {
  phone?: string;
  email?: string;
  operatingHours?: string;
}

export interface PointOfInterestAccessibility {
  wheelchairAccessible: boolean;
  hearingLoop: boolean;
  visualAidSupport: boolean;
}

export interface PointOfInterestCoordinates {
  latitude?: number;
  longitude?: number;
  x?: number;
  y?: number;
}

export interface PointOfInterestUserRef {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PointOfInterestOrganization {
  id: string;
  name: string;
  organizationType: string;
}

export interface PointOfInterest {
  id: string;
  organization: PointOfInterestOrganization;
  name: string;
  category: string;
  categoryType?: string | null;
  building: string;
  floor: string;
  roomNumber?: string | null;
  description?: string | null;
  tags: string[];
  amenities: string[];
  contact?: PointOfInterestContact | null;
  accessibility: PointOfInterestAccessibility;
  status: string;
  mapCoordinates?: PointOfInterestCoordinates | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: PointOfInterestUserRef | null;
  updatedBy?: PointOfInterestUserRef | null;
}

export interface PointsOfInterestPagination {
  current: number;
  pages: number;
  total: number;
  limit: number;
}

export interface PointsOfInterestListResponse {
  success: boolean;
  message: string;
  data: {
    pointsOfInterest: PointOfInterest[];
    pagination: PointsOfInterestPagination;
  };
}

export interface PointOfInterestResponse {
  success: boolean;
  message: string;
  data: {
    pointOfInterest: PointOfInterest;
  };
}

export interface PointsOfInterestQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  building?: string;
  floor?: string;
  organizationId?: string;
  isActive?: boolean;
}

export interface CreatePointOfInterestRequest {
  organizationId: string;
  name: string;
  category: string;
  categoryType?: string;
  building: string;
  floor: string;
  roomNumber?: string;
  description?: string;
  tags?: string[];
  amenities?: string[];
  contact?: PointOfInterestContact | null;
  accessibility?: Partial<PointOfInterestAccessibility> | null;
  status?: string;
  mapCoordinates?: PointOfInterestCoordinates | null;
  isActive?: boolean;
}

export interface UpdatePointOfInterestRequest {
  organizationId?: string;
  name?: string;
  category?: string;
  categoryType?: string | null;
  building?: string;
  floor?: string;
  roomNumber?: string | null;
  description?: string | null;
  tags?: string[];
  amenities?: string[];
  contact?: PointOfInterestContact | null;
  accessibility?: Partial<PointOfInterestAccessibility> | null;
  status?: string;
  mapCoordinates?: PointOfInterestCoordinates | null;
  isActive?: boolean;
}

