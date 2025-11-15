import * as Yup from "yup";
import { MapBuildingStatus } from "@/lib/types/map-management/buildings";

export interface CreateBuildingFormValues {
  organizationId: string;
  name: string;
  code: string;
  description: string;
  status: MapBuildingStatus;
  venueTemplateId: string;
  tags?: string[];
}

export const createBuildingSchema = Yup.object().shape({
  organizationId: Yup.string().required("Organization is required"),
  name: Yup.string()
    .min(2, "Building name must be at least 2 characters")
    .max(120, "Building name cannot exceed 120 characters")
    .required("Building name is required"),
  code: Yup.string()
    .max(50, "Building code cannot exceed 50 characters")
    .required("Building code is required"),
  description: Yup.string()
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  status: Yup.string()
    .oneOf(
      [MapBuildingStatus.ACTIVE, MapBuildingStatus.INACTIVE, MapBuildingStatus.ARCHIVED],
      "Invalid status selected"
    )
    .nullable()
    .notRequired(),
  venueTemplateId: Yup.string()
    .required("Venue template is required")
    .test("not-empty", "Venue template is required", (value) => {
      return value !== undefined && value !== null && value !== "";
    }),
  tags: Yup.array()
    .of(Yup.string().max(40, "Tag cannot exceed 40 characters"))
    .optional(),
});

