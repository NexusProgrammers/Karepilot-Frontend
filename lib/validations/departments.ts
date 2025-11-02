import * as yup from "yup";

export const createDepartmentSchema = yup.object({
  name: yup
    .string()
    .min(2, "Department name must be at least 2 characters long")
    .max(100, "Department name cannot exceed 100 characters")
    .required("Department name is required"),
  description: yup
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  isActive: yup.boolean().optional().default(true),
});

export const updateDepartmentSchema = yup.object({
  name: yup
    .string()
    .min(2, "Department name must be at least 2 characters long")
    .max(100, "Department name cannot exceed 100 characters")
    .optional(),
  description: yup
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  isActive: yup.boolean().optional(),
});

export type CreateDepartmentFormValues = yup.InferType<typeof createDepartmentSchema>;
export type UpdateDepartmentFormValues = yup.InferType<typeof updateDepartmentSchema>;

