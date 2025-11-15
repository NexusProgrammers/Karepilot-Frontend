import * as Yup from "yup";

export interface CreateFloorPlanFormValues {
  organizationId: string;
  buildingId: string;
  floorLabel: string;
  mapName: string;
  mapScale: string;
  description: string;
  tags?: string[];
  selectedFile: File | null;
}

export const createFloorPlanSchema = Yup.object().shape({
  organizationId: Yup.string().required("Organization is required"),
  buildingId: Yup.string().required("Building is required"),
  floorLabel: Yup.string().required("Floor is required"),
  mapName: Yup.string()
    .min(2, "Map name must be at least 2 characters")
    .max(120, "Map name cannot exceed 120 characters")
    .required("Map name is required"),
  mapScale: Yup.string()
    .required("Map scale is required")
    .matches(/^1:\d+$/, "Scale must be in format 1:XXX (e.g., 1:100)"),
  description: Yup.string()
    .max(500, "Description cannot exceed 500 characters")
    .nullable()
    .required(),
  tags: Yup.array()
    .of(Yup.string().max(40, "Tag cannot exceed 40 characters"))
    .optional(),
  selectedFile: Yup.mixed<File>()
    .required("Please select a file to upload")
    .test("fileType", "Unsupported file format. Supported: PDF, PNG, JPG, SVG, DWG, CAD", (value) => {
      if (!value) return false;
      const validTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "application/acad",
        "application/x-dwg",
      ];
      const validExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".svg", ".dwg", ".cad"];
      const fileName = value.name.toLowerCase();
      const hasValidExtension = validExtensions.some((ext) => fileName.endsWith(ext));
      return validTypes.includes(value.type) || hasValidExtension;
    })
    .test("fileSize", "File size must be less than 10MB", (value) => {
      if (!value) return false;
      return value.size <= 10 * 1024 * 1024; 
    }),
});

