"use client";

import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Check } from "@/icons/Icons";
import { SecuritySettingsProps } from "@/lib/types/components";
import {
  useGetSecuritySettingsQuery,
  useUpdateSecuritySettingsMutation,
} from "@/lib/api/settingsApi";
import { SecuritySettingsSkeleton } from "@/app/settings/components";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";

export function SecuritySettings({
  title,
  subtitle,
  settings,
  className = "",
}: SecuritySettingsProps) {
  const { data, isLoading, isError, error, refetch } =
    useGetSecuritySettingsQuery();
  const [updateSecurity, { isLoading: isUpdating }] =
    useUpdateSecuritySettingsMutation();

  const initialValues = {
    twoFactorAuth:
      (data?.data.twoFactorEnabled as boolean | undefined) ??
      ((settings.find((s) => s.name === "twoFactorAuth")?.value as boolean) ??
        false),
    sessionTimeout: String(
      data?.data.sessionTimeout ??
        (settings.find((s) => s.name === "sessionTimeout")?.value as string) ??
        "30",
    ),
    maxLoginAttempts: String(
      data?.data.maxLoginAttempts ??
        (settings.find((s) => s.name === "maxLoginAttempts")?.value as string) ??
        "5",
    ),
    passwordExpiry: String(
      data?.data.passwordExpiry ??
        (settings.find((s) => s.name === "passwordExpiry")?.value as string) ??
        "90",
    ),
    auditLogs:
      (data?.data.auditLogs as boolean | undefined) ??
      ((settings.find((s) => s.name === "auditLogs")?.value as boolean) ??
        true),
  } as const;

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const maxAttempts = parseInt(values.maxLoginAttempts, 10);
      if (!Number.isFinite(maxAttempts) || maxAttempts > 10) {
        toast.error("Max Login Attempts cannot exceed 10");
        return;
      }

      await updateSecurity({
        twoFactorEnabled: (values as any).twoFactorAuth as boolean,
        sessionTimeout: parseInt(values.sessionTimeout, 10),
        maxLoginAttempts: maxAttempts,
        passwordExpiry: parseInt(values.passwordExpiry, 10),
        auditLogs: values.auditLogs,
      }).unwrap();
      toast.success("Security settings updated successfully");
    } catch (e: any) {
      const msg = e?.data?.message || "Failed to update security settings";
      toast.error(msg);
    }
  };

  if (isLoading || isUpdating) {
    return (
      <SecuritySettingsSkeleton
        title={title}
        subtitle={subtitle}
        className={className}
      />
    );
  }

  if (isError) {
    return (
      <div
        className={`bg-background border border-border rounded-xl p-6 ${className}`}
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <QueryErrorState
          error={error}
          title="Unable to load security settings"
          onRetry={refetch}
        />
      </div>
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
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {settings.map((setting) => (
              <div key={setting.id}>
                {setting.type === "toggle" ? (
                  <div className="border border-border rounded-xl p-6">
                    <ToggleSwitch
                      checked={(values as any)[setting.name] as boolean}
                      onChange={(checked) =>
                        setFieldValue(setting.name, checked)
                      }
                      label={setting.label}
                      description={setting.description || ""}
                    />
                  </div>
                ) : (
                  (() => {
                    const cleanedLabel = setting.label.replace(/\*\s*$/, "");
                    return (
                      <CustomInput
                        label={cleanedLabel}
                        value={(values as any)[setting.name] as string}
                        onChange={(value) => setFieldValue(setting.name, value)}
                        placeholder={`Enter ${cleanedLabel.toLowerCase()}`}
                        required={setting.required}
                      />
                    );
                  })()
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Save Security Settings
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
