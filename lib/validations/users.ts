import * as Yup from "yup";

export interface CreateUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  department: string | null;
  phoneNumber: string;
  badgeNumber: string;
  shift: string;
  currentLocation?: string;
}

export interface UpdateUserFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  department?: string | null;
  phoneNumber?: string;
  badgeNumber?: string;
  shift?: string;
  currentLocation?: string;
  profileImage?: string;
  isActive?: boolean;
}

export const createUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(
      ["Admin", "Manager", "Technician", "Staff", "Security", "Viewer"],
      "Invalid role selected"
    )
    .required("Role is required"),
  department: Yup.string()
    .when("role", {
      is: "Admin",
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required("Department is required"),
    }),
  phoneNumber: Yup.string().optional(),
  badgeNumber: Yup.string().optional(),
  shift: Yup.string().optional(),
  currentLocation: Yup.string().optional(),
});

export const updateUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.string().email("Please provide a valid email address"),
  password: Yup.string().min(6, "Password must be at least 6 characters long"),
  role: Yup.string().oneOf(
    ["Admin", "Manager", "Technician", "Staff", "Security", "Viewer"],
    "Invalid role selected"
  ),
  department: Yup.string().nullable(),
  phoneNumber: Yup.string().optional(),
  badgeNumber: Yup.string().optional(),
  shift: Yup.string().optional(),
  currentLocation: Yup.string().optional(),
  profileImage: Yup.string().optional(),
  isActive: Yup.boolean().optional(),
});

