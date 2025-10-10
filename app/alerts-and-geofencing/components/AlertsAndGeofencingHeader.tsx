"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "@/icons/Icons";

interface AlertsAndGeofencingHeaderProps {
  onCreateZone: () => void;
  onCreateAlert: () => void;
}

export function AlertsAndGeofencingHeader({
  onCreateZone,
  onCreateAlert,
}: AlertsAndGeofencingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-card-foreground mb-2">
          Alerts & Geofencing
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor alerts and manage geofence zones for your organization.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onCreateZone}
          variant="outline"
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          Create Zone
        </Button>

        <Button
          onClick={onCreateAlert}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Alert
        </Button>
      </div>
    </div>
  );
}
