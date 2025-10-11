"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { Check } from "@/icons/Icons";

interface PasswordSettingsProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function PasswordSettings({
  title,
  subtitle,
  className = "",
}: PasswordSettingsProps) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = () => {
    console.log("Updating password:", passwordData);
  };

  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-12">
        <CustomInput
          label="Current Password"
          value={passwordData.currentPassword}
          onChange={(value) => handleInputChange("currentPassword", value)}
          placeholder="Enter current password"
          type="password"
          required
        />

        <CustomInput
          label="New Password"
          value={passwordData.newPassword}
          onChange={(value) => handleInputChange("newPassword", value)}
          placeholder="Enter new password"
          type="password"
          required
        />

        <CustomInput
          label="Confirm New Password"
          value={passwordData.confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          placeholder="Confirm new password"
          type="password"
          required
        />
      </div>

      <Button
        disabled={
          !passwordData.currentPassword ||
          !passwordData.newPassword ||
          !passwordData.confirmPassword
        }
        onClick={handleUpdatePassword}
        className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2 mt-12 md:mt-24 lg:mt-52"
      >
        <Check className="w-4 h-4" />
        Update Password
      </Button>
    </div>
  );
}
