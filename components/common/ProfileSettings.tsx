"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { Check, Edit } from "@/icons/Icons";
import {
  useGetGeneralSettingsQuery,
  useUpdateProfileSettingsMutation,
} from "@/lib/api/settingsApi";
import { uploadFile } from "@/lib/api/uploadApi";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { ProfileSettingsSkeleton } from "@/app/settings/components/ProfileSettingsSkeleton";
import { ProfileSettingsProps, ProfileFormData } from "@/lib/types/components";
import { profileSettingsValidationSchema } from "@/lib/validations";

export function ProfileSettings({
  title,
  subtitle,
  className = "",
}: ProfileSettingsProps) {
  const { data: settingsData, isLoading } = useGetGeneralSettingsQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileSettingsMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitialValues = (): ProfileFormData => {
    if (settingsData?.data) {
      return {
        firstName: settingsData.data.firstName || "",
        lastName: settingsData.data.lastName || "",
        email: settingsData.data.email || "",
        profileImage: settingsData.data.profileImage || "",
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      profileImage: "",
    };
  };

  const handleImageUpload = async (
    file: File,
    setFieldValue: (field: string, value: string) => void
  ) => {
    try {
      toast.loading("Uploading image...");
      const result = await uploadFile(file, "admin-profiles");
      setFieldValue("profileImage", result.data.url);
      toast.dismiss();
      toast.success("Image uploaded successfully");
    } catch (error: unknown) {
      toast.dismiss();
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file, setFieldValue);
    }
  };

  const handleSubmit = async (values: ProfileFormData) => {
    try {
      const result = await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        profileImage: values.profileImage,
      }).unwrap();
      toast.success(result.message || "Profile updated successfully");
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      const apiError = error as { data?: { message?: string } };
      if (apiError?.data?.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  if (isLoading || isUpdating) {
    return (
      <ProfileSettingsSkeleton
        title={title}
        subtitle={subtitle}
        className={className}
      />
    );
  }

  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <Formik
        initialValues={getInitialValues()}
        validationSchema={profileSettingsValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                {values.profileImage ? (
                  <Image
                    src={values.profileImage}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {values.firstName[0] || "U"}
                      {values.lastName[0] || ""}
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-[#3D8C6C] text-white cursor-pointer rounded-full p-1.5 hover:bg-green-700 transition-colors"
                  type="button"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Field name="firstName">
                  {({
                    field,
                    meta,
                  }: {
                    field: { value: string };
                    meta: { touched: boolean; error?: string };
                  }) => (
                    <>
                      <CustomInput
                        label=""
                        value={field.value}
                        onChange={(value) => setFieldValue("firstName", value)}
                        placeholder="Enter first name"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Field name="lastName">
                  {({
                    field,
                    meta,
                  }: {
                    field: { value: string };
                    meta: { touched: boolean; error?: string };
                  }) => (
                    <>
                      <CustomInput
                        label=""
                        value={field.value}
                        onChange={(value) => setFieldValue("lastName", value)}
                        placeholder="Enter last name"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Field name="email">
                  {({
                    field,
                    meta,
                  }: {
                    field: { value: string };
                    meta: { touched: boolean; error?: string };
                  }) => (
                    <>
                      <CustomInput
                        label=""
                        value={field.value}
                        onChange={(value) => setFieldValue("email", value)}
                        placeholder="Enter email address"
                        type="email"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-sm mt-1">
                          {meta.error}
                        </div>
                      )}
                    </>
                  )}
                </Field>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
