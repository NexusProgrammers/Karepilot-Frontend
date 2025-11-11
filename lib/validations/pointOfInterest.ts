import * as Yup from "yup";

const validationSchema = Yup.object({
    organizationId: Yup.string().required("Organization is required"),
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    building: Yup.string().required("Building is required"),
    floor: Yup.string().required("Floor is required"),
    status: Yup.string().required("Status is required"),
    email: Yup.string().email("Enter a valid email").optional(),
    latitude: Yup.string().matches(/^-?\d*\.?\d*$/, "Invalid latitude").optional(),
    longitude: Yup.string().matches(/^-?\d*\.?\d*$/, "Invalid longitude").optional(),
  });