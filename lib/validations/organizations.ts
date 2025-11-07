import * as Yup from "yup";

export interface CreateOrganizationFormValues {
  organizationType: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  address: string;
  venueTemplate: string;
  isActive: boolean;
}

export interface UpdateOrganizationFormValues {
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

export const createOrganizationSchema = Yup.object().shape({
  organizationType: Yup.string()
    .trim()
    .min(2, "Organization type must be at least 2 characters")
    .required("Organization type is required"),
  name: Yup.string()
    .trim()
    .min(3, "Organization name must be at least 3 characters")
    .max(120, "Organization name cannot exceed 120 characters")
    .required("Organization name is required"),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Organization email is required"),
  phone: Yup.string()
    .trim()
    .min(5, "Contact number must be at least 5 characters")
    .max(30, "Contact number cannot exceed 30 characters")
    .required("Contact number is required"),
  country: Yup.string().trim().required("Country is required"),
  city: Yup.string().trim().required("City is required"),
  timezone: Yup.string().trim().required("Timezone is required"),
  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  venueTemplate: Yup.string()
    .trim()
    .required("Venue template selection is required"),
  isActive: Yup.boolean().required(),
});

export const updateOrganizationSchema = Yup.object().shape({
  organizationType: Yup.string().trim().min(2),
  name: Yup.string().trim().min(3).max(120),
  email: Yup.string().email("Please provide a valid email address"),
  phone: Yup.string().trim().min(5).max(30),
  country: Yup.string().trim(),
  city: Yup.string().trim(),
  timezone: Yup.string().trim(),
  address: Yup.string().trim().min(5),
  venueTemplate: Yup.string().trim(),
  isActive: Yup.boolean(),
});

export type OrganizationFormMode = "create" | "edit" | "view";


