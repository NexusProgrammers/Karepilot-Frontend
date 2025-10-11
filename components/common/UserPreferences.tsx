"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/common/CustomSelect";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Check } from "@/icons/Icons";
import { UserPreference } from "@/lib/settings/types";

interface UserPreferencesProps {
  title: string;
  subtitle: string;
  preferences: UserPreference[];
  className?: string;
}

export function UserPreferences({
  title,
  subtitle,
  preferences,
  className = "",
}: UserPreferencesProps) {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [preferenceValues, setPreferenceValues] = useState(
    preferences.reduce((acc, pref) => ({ ...acc, [pref.id]: pref.value }), {})
  );

  const handlePreferenceChange = (id: number, value: string) => {
    setPreferenceValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", { ...preferenceValues, autoRefresh });
  };

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

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themePref && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {themePref.label} *
              </label>
              <CustomSelect
                options={themePref.options}
                value={
                  preferenceValues[
                    themePref.id as keyof typeof preferenceValues
                  ] as string
                }
                onChange={(value) =>
                  handlePreferenceChange(themePref.id, value)
                }
                placeholder={`Select ${themePref.label.toLowerCase()}`}
                label=""
              />
            </div>
          )}

          {languagePref && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {languagePref.label} *
              </label>
              <CustomSelect
                options={languagePref.options}
                value={
                  preferenceValues[
                    languagePref.id as keyof typeof preferenceValues
                  ] as string
                }
                onChange={(value) =>
                  handlePreferenceChange(languagePref.id, value)
                }
                placeholder={`Select ${languagePref.label.toLowerCase()}`}
                label=""
              />
            </div>
          )}
        </div>

        {timezonePref && (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {timezonePref.label} *
            </label>
            <CustomSelect
              options={timezonePref.options}
              value={
                preferenceValues[
                  timezonePref.id as keyof typeof preferenceValues
                ] as string
              }
              onChange={(value) =>
                handlePreferenceChange(timezonePref.id, value)
              }
              placeholder={`Select ${timezonePref.label.toLowerCase()}`}
              label=""
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dateFormatPref && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {dateFormatPref.label} *
              </label>
              <CustomSelect
                options={dateFormatPref.options}
                value={
                  preferenceValues[
                    dateFormatPref.id as keyof typeof preferenceValues
                  ] as string
                }
                onChange={(value) =>
                  handlePreferenceChange(dateFormatPref.id, value)
                }
                placeholder={`Select ${dateFormatPref.label.toLowerCase()}`}
                label=""
              />
            </div>
          )}

          {timeFormatPref && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {timeFormatPref.label} *
              </label>
              <CustomSelect
                options={timeFormatPref.options}
                value={
                  preferenceValues[
                    timeFormatPref.id as keyof typeof preferenceValues
                  ] as string
                }
                onChange={(value) =>
                  handlePreferenceChange(timeFormatPref.id, value)
                }
                placeholder={`Select ${timeFormatPref.label.toLowerCase()}`}
                label=""
              />
            </div>
          )}
        </div>

        <ToggleSwitch
          checked={autoRefresh}
          onChange={setAutoRefresh}
          label="Auto Refresh"
          description="Automatically refresh data"
        />

        {refreshIntervalPref && (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {refreshIntervalPref.label} *
            </label>
            <CustomSelect
              options={refreshIntervalPref.options}
              value={
                preferenceValues[
                  refreshIntervalPref.id as keyof typeof preferenceValues
                ] as string
              }
              onChange={(value) =>
                handlePreferenceChange(refreshIntervalPref.id, value)
              }
              placeholder={`Select ${refreshIntervalPref.label.toLowerCase()}`}
              label=""
            />
          </div>
        )}

        <Button
          onClick={handleSavePreferences}
          className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Save Preference
        </Button>
      </div>
    </div>
  );
}
