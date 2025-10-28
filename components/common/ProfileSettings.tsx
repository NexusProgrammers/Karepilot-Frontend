"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { Check } from "@/icons/Icons";
import { useGetGeneralSettingsQuery, useUpdateGeneralSettingsMutation } from "@/lib/api/settingsApi";
import toast from "react-hot-toast";
import { ProfileSettingsSkeleton } from "@/app/settings/components/ProfileSettingsSkeleton";
import { ProfileSettingsProps, ProfileFormData } from "@/lib/types/components";

export function ProfileSettings({
  title,
  subtitle,
  className = "",
}: ProfileSettingsProps) {
  const { data: settingsData, isLoading } = useGetGeneralSettingsQuery();
  const [updateSettings] = useUpdateGeneralSettingsMutation();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (settingsData?.data) {
      setFormData({
        firstName: settingsData.data.firstName,
        lastName: settingsData.data.lastName,
        email: settingsData.data.email,
      });
    }
  }, [settingsData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const result = await updateSettings({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      }).unwrap();
      toast.success(result.message || "Profile updated successfully");
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      const apiError = error as { data?: { message?: string } };
      if (apiError?.data?.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  if (isLoading) {
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

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-semibold text-muted-foreground">
                {formData.firstName[0]}
                {formData.lastName[0]}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CustomInput
            label="First Name"
            value={formData.firstName}
            onChange={(value) => handleInputChange("firstName", value)}
            placeholder="Enter first name"
          />

          <CustomInput
            label="Last Name"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
            placeholder="Enter last name"
          />

          <CustomInput
            label="Email Address"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            placeholder="Enter email address"
            type="email"
          />
        </div>

        <Button
          onClick={handleUpdateProfile}
          className="bg-[#3D8C6C] hover:bg-bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Update Profile
        </Button>
      </div>
    </div>
  );
}
