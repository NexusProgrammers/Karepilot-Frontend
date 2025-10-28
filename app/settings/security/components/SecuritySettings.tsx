"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Check } from "@/icons/Icons";
import { SecuritySettingsProps, SecuritySettingsState } from "@/lib/types/components";

export function SecuritySettings({
  title,
  subtitle,
  settings,
  className = "",
}: SecuritySettingsProps) {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingsState>(
    settings.reduce(
      (acc, setting) => ({ ...acc, [setting.name]: setting.value }),
      {}
    ) as SecuritySettingsState
  );

  const handleToggle = (name: string) => {
    setSecuritySettings((prev) => {
      return { ...prev, [name]: !prev[name] as boolean };
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setSecuritySettings((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSaveSettings = () => {
    console.log("Saving security settings:", securitySettings);
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
        {settings.map((setting) => (
          <div key={setting.id}>
            {setting.type === "toggle" ? (
              <div className="border border-border rounded-xl p-6">
                <ToggleSwitch
                  checked={
                    securitySettings[
                      setting.name as keyof typeof securitySettings
                    ] as boolean
                  }
                  onChange={() => handleToggle(setting.name)}
                  label={setting.label}
                  description={setting.description || ""}
                />
              </div>
            ) : (
              <CustomInput
                label={setting.label}
                value={
                  securitySettings[
                    setting.name as keyof typeof securitySettings
                  ] as string
                }
                onChange={(value) => handleInputChange(setting.name, value)}
                placeholder={`Enter ${setting.label.toLowerCase()}`}
                type={setting.name.includes("password") ? "password" : "text"}
                required={setting.required}
              />
            )}
          </div>
        ))}

        <Button
          onClick={handleSaveSettings}
          className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Save Security Settings
        </Button>
      </div>
    </div>
  );
}
