"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Siren } from "@/icons/Icons";

interface AlertsAndGeofencingHeaderProps {
  onCreateZone: () => void;
  onCreateAlert: () => void;
}

export function AlertsAndGeofencingHeader({
  onCreateZone,
  onCreateAlert,
}: AlertsAndGeofencingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-6">
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-card-foreground mb-1 sm:mb-2">
          Alerts & Geofencing
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Monitor alerts and manage geofence zones for your organization.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <Button
          onClick={onCreateZone}
          variant="outline"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
        >
          <MapPin className="w-4 h-4" />
          <span>Create Zone</span>
        </Button>

        <Button
          onClick={onCreateAlert}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90 cursor-pointer"
        >
          <Siren className="w-4 h-4" />
          <span>Create Alert</span>
        </Button>
      </div>
    </div>
  );
}
