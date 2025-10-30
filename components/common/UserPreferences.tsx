"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/common/CustomSelect";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Check } from "@/icons/Icons";
import {
  useGetGeneralSettingsQuery,
  useUpdatePreferencesMutation,
} from "@/lib/api/settingsApi";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import { userPreferencesValidationSchema } from "@/lib/validations/authSchemas";
import { UserPreferencesSkeleton } from "@/app/settings/components/UserPreferencesSkeleton";
import { UserPreferencesProps } from "@/lib/types/components";
import { UserPreferencesFormValues } from "@/lib/types/validation";
import timezones from "timezones-list";

export function UserPreferences({
  title,
  subtitle,
  preferences,
  className = "",
}: UserPreferencesProps) {
  const { data: settingsData, isLoading } = useGetGeneralSettingsQuery();
  const [updatePreferences, { isLoading: isUpdating }] = useUpdatePreferencesMutation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitialValues = (): UserPreferencesFormValues => {
    if (settingsData?.data) {
      const data = settingsData.data;
      return {
        theme:
          (data.theme
            ? data.theme.charAt(0).toUpperCase() + data.theme.slice(1)
            : "Dark") || "Dark",
        language: data.language || "English",
        timezone: data.timezone || "UTC",
        dateFormat: data.dateFormat || "MM/DD/YYYY",
        timeFormat: data.timeFormat === "24" ? "24 Hours" : "12 Hours",
        autoRefresh: data.autoRefresh ?? true,
        refreshInterval: String(data.refreshInterval || 30),
      };
    }
    return {
      theme:
        (theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Dark") ||
        "Dark",
      language: "English",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12 Hours",
      autoRefresh: true,
      refreshInterval: "30",
    };
  };

  const handleSubmit = async (values: UserPreferencesFormValues) => {
    try {
      const apiValues: {
        theme?: string;
        language?: string;
        timezone?: string;
        dateFormat?: string;
        timeFormat?: string;
        autoRefresh?: boolean;
        refreshInterval?: number;
      } = {
        theme: values.theme.toLowerCase(),
        language: values.language,
        timezone: values.timezone,
        dateFormat: values.dateFormat,
        timeFormat: values.timeFormat === "24 Hours" ? "24" : "12",
        autoRefresh: values.autoRefresh,
        refreshInterval: parseInt(values.refreshInterval, 10),
      };

      const result = await updatePreferences(apiValues).unwrap();

      if (result.success) {
        toast.success(result.message || "Preferences saved successfully!");
        if (values.theme.toLowerCase() !== theme) {
          setTheme(values.theme.toLowerCase());
          toast.success(`Theme changed to ${values.theme}`);
        }
      }
    } catch (error: unknown) {
      console.error("Error updating preferences:", error);
      const apiError = error as { data?: { message?: string } };
      if (apiError?.data?.message) {
        toast.error(apiError.data.message);
      } else {
        toast.error("Failed to update preferences. Please try again.");
      }
    }
  };

  const handleThemeChange = (
    value: string,
    setFieldValue: (field: string, value: string | boolean) => void
  ) => {
    setFieldValue("theme", value);
    const themeValue = value.toLowerCase();
    setTheme(themeValue);
    toast.success(`Theme changed to ${value}`);
  };

  const timezoneOptions = useMemo(() => {
    return timezones.map((tz) => tz.label);
  }, []);

  if (!mounted || isLoading || isUpdating) {
    return (
      <UserPreferencesSkeleton
        title={title}
        subtitle={subtitle}
        className={className}
      />
    );
  }

  const themePref = preferences.find((p) => p.label === "Theme");
  const languagePref = preferences.find((p) => p.label === "Language");
  const timezonePref = preferences.find((p) => p.label === "Timezone");
  const dateFormatPref = preferences.find((p) => p.label === "Date Format");
  const timeFormatPref = preferences.find((p) => p.label === "Time Format");
  const refreshIntervalPref = preferences.find(
    (p) => p.label === "Refresh Interval (seconds)"
  );

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
        validationSchema={userPreferencesValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themePref && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {themePref.label} <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    options={themePref.options}
                    value={values.theme}
                    onChange={(value) =>
                      handleThemeChange(value, setFieldValue)
                    }
                    placeholder={`Select ${themePref.label.toLowerCase()}`}
                    label=""
                  />
                </div>
              )}

              {languagePref && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {languagePref.label} <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    options={languagePref.options}
                    value={values.language}
                    onChange={(value) => setFieldValue("language", value)}
                    placeholder={`Select ${languagePref.label.toLowerCase()}`}
                    label=""
                  />
                </div>
              )}
            </div>

            {timezonePref && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {timezonePref.label} <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={timezoneOptions}
                  value={values.timezone}
                  onChange={(value) => setFieldValue("timezone", value)}
                  placeholder={`Select ${timezonePref.label.toLowerCase()}`}
                  label=""
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dateFormatPref && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {dateFormatPref.label} <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    options={dateFormatPref.options}
                    value={values.dateFormat}
                    onChange={(value) => setFieldValue("dateFormat", value)}
                    placeholder={`Select ${dateFormatPref.label.toLowerCase()}`}
                    label=""
                  />
                </div>
              )}

              {timeFormatPref && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {timeFormatPref.label} <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    options={timeFormatPref.options}
                    value={values.timeFormat}
                    onChange={(value) => setFieldValue("timeFormat", value)}
                    placeholder={`Select ${timeFormatPref.label.toLowerCase()}`}
                    label=""
                  />
                </div>
              )}
            </div>

            <div>
              <Field name="autoRefresh">
                {({
                  field,
                  form,
                }: {
                  field: { value: boolean };
                  form: {
                    setFieldValue: (field: string, value: boolean) => void;
                  };
                }) => (
                  <ToggleSwitch
                    checked={field.value}
                    onChange={(checked) =>
                      form.setFieldValue("autoRefresh", checked)
                    }
                    label="Auto Refresh"
                    description="Automatically refresh data"
                  />
                )}
              </Field>
            </div>

            {refreshIntervalPref && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {refreshIntervalPref.label} <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  options={refreshIntervalPref.options}
                  value={values.refreshInterval}
                  onChange={(value) => setFieldValue("refreshInterval", value)}
                  placeholder={`Select ${refreshIntervalPref.label.toLowerCase()}`}
                  label=""
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              {isUpdating ? "Saving..." : "Save Preference"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
