"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { Check } from "@/icons/Icons";

interface ProfileSettingsProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function ProfileSettings({
  title,
  subtitle,
  className = "",
}: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    firstName: "Ezekiel",
    lastName: "Olayiwola",
    email: "ezeydesign1@gmail.com",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = () => {
    console.log("Updating profile:", formData);
  };

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
