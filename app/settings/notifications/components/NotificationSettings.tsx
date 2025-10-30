"use client";

import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Check } from "@/icons/Icons";
import { Formik, Form, Field } from "formik";
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/lib/api/settingsApi";
import toast from "react-hot-toast";
import { NotificationSettingsSkeleton } from "@/app/settings/components/NotificationSettingsSkeleton";
import { NotificationSettingsProps } from "@/lib/types/components";
import { NotificationSettingsFormValues } from "@/lib/types/validations/validation";
import { notificationSettingsValidationSchema } from "@/lib/validations";

const notificationOptions = [
  {
    field: "emailNotifications",
    label: "Email Notifications",
    description: "Receive notifications via email",
  },
  {
    field: "pushNotifications",
    label: "Push Notifications",
    description: "Receive push notifications on your device",
  },
  {
    field: "smsAlerts",
    label: "SMS Alerts",
    description: "Receive critical alerts via SMS",
  },
  {
    field: "securityAlerts",
    label: "Security Alerts",
    description: "Get notified about security-related events",
  },
  {
    field: "emergencyAlerts",
    label: "Emergency Alerts",
    description: "Receive urgent emergency notifications",
  },
  {
    field: "weeklyReports",
    label: "Weekly Reports",
    description: "Get weekly summary reports via email",
  },
];

export function NotificationSettings({
  title,
  subtitle,
  className = "",
}: NotificationSettingsProps) {
  const { data: settingsData, isLoading } = useGetNotificationSettingsQuery();
  const [updateNotificationSettings, { isLoading: isUpdating }] =
    useUpdateNotificationSettingsMutation();

  const getInitialValues = (): NotificationSettingsFormValues => {
    if (settingsData?.data) {
      return {
        emailNotifications: settingsData.data.emailNotifications ?? true,
        pushNotifications: settingsData.data.pushNotifications ?? true,
        smsAlerts: settingsData.data.smsAlerts ?? true,
        securityAlerts: settingsData.data.securityAlerts ?? true,
        emergencyAlerts: settingsData.data.emergencyAlerts ?? true,
        weeklyReports: settingsData.data.weeklyReports ?? true,
      };
    }
    return {
      emailNotifications: true,
      pushNotifications: true,
      smsAlerts: true,
      securityAlerts: true,
      emergencyAlerts: true,
      weeklyReports: true,
    };
  };

  const handleSubmit = async (values: NotificationSettingsFormValues) => {
    try {
      const result = await updateNotificationSettings(values).unwrap();

      if (result.success) {
        toast.success(
          result.message || "Notification settings saved successfully!"
        );
      }
    } catch (error: unknown) {
      console.error("Error updating notification settings:", error);
      const apiError = error as { data?: { message?: string } };
      if (apiError?.data?.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error(
          "Failed to update notification settings. Please try again."
        );
      }
    }
  };

  if (isLoading || isUpdating) {
    return (
      <NotificationSettingsSkeleton
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
        validationSchema={notificationSettingsValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notificationOptions.map((option) => (
                <div
                  key={option.field}
                  className="bg-background border border-border rounded-xl p-4"
                >
                  <Field name={option.field}>
                    {() => (
                      <ToggleSwitch
                        checked={
                          values[
                            option.field as keyof NotificationSettingsFormValues
                          ] as boolean
                        }
                        onChange={(checked) =>
                          setFieldValue(option.field, checked)
                        }
                        label={option.label}
                        description={option.description}
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>

            <div className="flex justify-start">
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4" />
                {isUpdating ? "Saving..." : "Save Notification Settings"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
