"use client";

import { useState } from "react";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { Button } from "@/components/ui/button";
import { CreateGeofenceZoneData, NotificationSettings } from "@/lib/alerts-and-geofencing/types";
import { X, MapPin } from "@/icons/Icons";

interface CreateGeofenceZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateGeofenceZoneData) => void;
}

export function CreateGeofenceZoneModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateGeofenceZoneModalProps) {
  const [formData, setFormData] = useState<CreateGeofenceZoneData>({
    name: "",
    type: "Monitoring",
    description: "",
    notifications: {
      email: true,
      sms: false,
      push: false,
      sound: false
    }
  });

  const zoneTypes = [
    "Monitoring",
    "Restricted",
    "Alert",
    "Notification"
  ];

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Create Geofence Zone
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Set up a new monitoring zone with custom alert rules
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-6">
            <div>
              <CustomInput
                value={formData.name}
                onChange={(value) => setFormData({...formData, name: value})}
                placeholder="e.g. ICU Restricted Zone"
                label="Zone Name"
                required
              />
            </div>

            <div>
              <CustomSelect
                value={formData.type}
                onChange={(value) => setFormData({...formData, type: value})}
                options={zoneTypes}
                placeholder="Select Zone Type"
                label="Zone Type"
                required
              />
            </div>

            <div>
              <CustomTextarea
                value={formData.description}
                onChange={(value) => setFormData({...formData, description: value})}
                placeholder="e.g., describe the purpose and rules for this zone..."
                label="Description"
                required
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <ToggleSwitch
                  checked={formData.notifications.email}
                  onChange={() => handleNotificationChange('email', !formData.notifications.email)}
                  label="Email Notifications"
                  description="Send alerts via email"
                />
                
                <ToggleSwitch
                  checked={formData.notifications.sms}
                  onChange={() => handleNotificationChange('sms', !formData.notifications.sms)}
                  label="SMS Notifications"
                  description="Send urgent alerts via SMS"
                />
                
                <ToggleSwitch
                  checked={formData.notifications.push}
                  onChange={() => handleNotificationChange('push', !formData.notifications.push)}
                  label="Push Notifications"
                  description="Send mobile push notifications"
                />
                
                <ToggleSwitch
                  checked={formData.notifications.sound}
                  onChange={() => handleNotificationChange('sound', !formData.notifications.sound)}
                  label="Sound Alerts Notifications"
                  description="Play audio alerts on triggers"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/50">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-5 flex gap-2 py-2.5 text-sm cursor-pointer font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90"
          >
            <MapPin className="w-4 h-4" />
            Create Zone
          </Button>
        </div>
      </div>
    </div>
  );
}
