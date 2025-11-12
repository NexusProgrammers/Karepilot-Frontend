import * as Yup from "yup";
import { MapLayerType } from "../types/map-manager";

export interface MapManagerSettingsFormValues {
  organization: string;
  autoPublishUpdates: boolean;
  highResThumbnails: boolean;
  enableVersionControl: boolean;
  defaultGridSize: number;
  defaultGridUnit: "px" | "ft" | "m";
  defaultSnapToGrid: boolean;
  defaultShowGrid: boolean;
  defaultZoom: number;
  defaultMapScale: string;
  allowedFileTypes: string;
  maxUploadSizeMb: number;
  defaultLayerVisibility: Record<MapLayerType, boolean>;
  notificationPublishSuccess: boolean;
  notificationPublishFailure: boolean;
  notificationApprovalRequired: boolean;
  retentionDraftVersions: number;
  retentionPublishedSnapshots: number;
}

export const mapManagerSettingsSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required"),
  defaultGridSize: Yup.number()
    .min(1, "Grid size must be at least 1")
    .max(500, "Grid size cannot exceed 500")
    .required("Grid size is required"),
  defaultGridUnit: Yup.mixed<"px" | "ft" | "m">()
    .oneOf(["px", "ft", "m"], "Invalid grid unit")
    .required("Grid unit is required"),
  defaultZoom: Yup.number()
    .min(10, "Default zoom must be at least 10")
    .max(400, "Default zoom cannot exceed 400")
    .required("Default zoom is required"),
  defaultMapScale: Yup.string().max(50, "Map scale cannot exceed 50 characters").nullable(),
  allowedFileTypes: Yup.string()
    .test(
      "allowed-file-types",
      "Provide a comma-separated list of file extensions",
      (value) => value === undefined || value.trim().length > 0,
    )
    .required("Allowed file types are required"),
  maxUploadSizeMb: Yup.number()
    .min(1, "Max upload size must be at least 1 MB")
    .max(500, "Max upload size cannot exceed 500 MB")
    .required("Max upload size is required"),
  retentionDraftVersions: Yup.number()
    .min(0, "Draft retention cannot be negative")
    .required("Draft retention is required"),
  retentionPublishedSnapshots: Yup.number()
    .min(0, "Published retention cannot be negative")
    .required("Published retention is required"),
});

export interface MapManagerBuildingFormValues {
  organization: string;
  name: string;
  code: string;
  description: string;
  tags: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude: string;
  longitude: string;
  isActive: boolean;
}

export const mapManagerBuildingSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(180, "Name cannot exceed 180 characters")
    .required("Building name is required"),
  code: Yup.string().max(20, "Code cannot exceed 20 characters").optional(),
  description: Yup.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  tags: Yup.string().optional(),
  addressLine1: Yup.string().max(200, "Address line 1 cannot exceed 200 characters").optional(),
  addressLine2: Yup.string().max(200, "Address line 2 cannot exceed 200 characters").optional(),
  city: Yup.string().max(120, "City cannot exceed 120 characters").optional(),
  state: Yup.string().max(120, "State cannot exceed 120 characters").optional(),
  postalCode: Yup.string().max(20, "Postal code cannot exceed 20 characters").optional(),
  country: Yup.string().max(120, "Country cannot exceed 120 characters").optional(),
  latitude: Yup.string()
    .test(
      "latitude-range",
      "Latitude must be between -90 and 90",
      (value) => !value || (parseFloat(value) >= -90 && parseFloat(value) <= 90),
    )
    .optional(),
  longitude: Yup.string()
    .test(
      "longitude-range",
      "Longitude must be between -180 and 180",
      (value) => !value || (parseFloat(value) >= -180 && parseFloat(value) <= 180),
    )
    .optional(),
});

export interface MapManagerFloorFormValues {
  organization: string;
  building: string;
  name: string;
  code: string;
  level: number;
  sequence: number;
  description: string;
  isBasement: boolean;
  isDefault: boolean;
  tags: string;
  isActive: boolean;
}

export const mapManagerFloorSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required"),
  building: Yup.string().required("Building is required"),
  name: Yup.string()
    .min(1, "Name must be at least 1 character")
    .max(120, "Name cannot exceed 120 characters")
    .required("Floor name is required"),
  code: Yup.string().max(20, "Code cannot exceed 20 characters").optional(),
  level: Yup.number().required("Level is required"),
  sequence: Yup.number().min(0, "Sequence cannot be negative").required("Sequence is required"),
  description: Yup.string().max(500, "Description cannot exceed 500 characters").optional(),
  tags: Yup.string().optional(),
});


