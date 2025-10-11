"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Check } from "@/icons/Icons";
import { NotificationSetting } from "@/lib/settings/types";

interface NotificationSettingsProps {
  title: string;
  subtitle: string;
  settings: NotificationSetting[];
  className?: string;
}

export function NotificationSettings({
  title,
  subtitle,
  settings,
  className = "",
}: NotificationSettingsProps) {
  const [notificationSettings, setNotificationSettings] = useState(settings);

  const handleToggle = (id: number) => {
    setNotificationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );
  };

  const handleSaveSettings = () => {
    console.log("Saving notification settings:", notificationSettings);
  };

  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {notificationSettings.map((setting) => (
          <div
            key={setting.id}
            className="bg-background border border-border rounded-xl p-4"
          >
            <ToggleSwitch
              checked={setting.checked}
              onChange={() => handleToggle(setting.id)}
              label={setting.title}
              description={setting.description}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <Button
          onClick={handleSaveSettings}
          className="bg-[#3D8C6C] hover:bg-[#3D8C6C] cursor-pointer text-white flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}