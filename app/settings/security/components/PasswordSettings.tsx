"use client";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { Check } from "@/icons/Icons";
import { PasswordSettingsProps } from "@/lib/types/components";
import { useChangePasswordMutation } from "@/lib/api/settingsApi";
import { PasswordSettingsSkeleton } from "@/app/settings/components";
import { Formik, Form } from "formik";
import { Eye, EyeOff } from "@/icons/Icons";
import { useState } from "react";
import toast from "react-hot-toast";

export function PasswordSettings({
  title,
  subtitle,
  className = "",
}: PasswordSettingsProps) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await changePassword(values).unwrap();
      toast.success("Password changed successfully");
    } catch (e: any) {
      const msg = e?.data?.message || "Failed to change password";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return (
      <PasswordSettingsSkeleton title={title} subtitle={subtitle} className={className} />
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-12">
            <CustomInput
              label="Current Password"
              value={values.currentPassword}
              onChange={(value) => setFieldValue("currentPassword", value)}
              placeholder="Enter current password"
              type={showCurrent ? "text" : "password"}
              required
              rightIcon={showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowCurrent((s) => !s)}
            />

            <CustomInput
              label="New Password"
              value={values.newPassword}
              onChange={(value) => setFieldValue("newPassword", value)}
              placeholder="Enter new password"
              type={showNew ? "text" : "password"}
              required
              rightIcon={showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowNew((s) => !s)}
            />

            <CustomInput
              label="Confirm New Password"
              value={values.confirmNewPassword}
              onChange={(value) => setFieldValue("confirmNewPassword", value)}
              placeholder="Confirm new password"
              type={showConfirm ? "text" : "password"}
              required
              rightIcon={showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              onRightIconClick={() => setShowConfirm((s) => !s)}
            />

            <Button
              type="submit"
              disabled={!values.currentPassword || !values.newPassword || !values.confirmNewPassword || isLoading}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2 mt-12 md:mt-24 lg:mt-52 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
