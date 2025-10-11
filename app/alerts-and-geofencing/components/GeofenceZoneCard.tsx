"use client";

import { GeofenceZone } from "@/lib/alerts-and-geofencing/types";
import { Button } from "@/components/ui/button";

interface GeofenceZoneCardProps {
  zone: GeofenceZone;
  onEdit: (zone: GeofenceZone) => void;
  onViewInMap: (zone: GeofenceZone) => void;
  onToggle: (zone: GeofenceZone) => void;
}

export function GeofenceZoneCard({ 
  zone, 
  onEdit, 
  onViewInMap, 
  onToggle 
}: GeofenceZoneCardProps) {
  const getAlertTypeStyles = (type: string) => {
    switch (type) {
      case "Restricted":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400";
      case "Alert":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Notification":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-3 sm:p-4">
      <div className="space-y-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-card-foreground">
            {zone.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {zone.location}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getAlertTypeStyles(zone.alertType)}`}>
              {zone.alertType}
            </span>
            <span className="text-xs text-muted-foreground">
              {zone.alertDescription}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {zone.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onEdit(zone)}
              variant="outline"
              size="sm"
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              Edit
            </Button>
            <Button
              onClick={() => onViewInMap(zone)}
              variant="outline"
              size="sm"
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              View in Map
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Active</span>
            <button
              type="button"
              onClick={() => onToggle(zone)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                zone.isActive ? "bg-[#3D8C6C]" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  zone.isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
