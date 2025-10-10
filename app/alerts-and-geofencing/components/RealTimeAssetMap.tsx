"use client";

import { GeofenceZone } from "@/lib/alerts-and-geofencing/types";
import { GeofenceZoneCard } from "./GeofenceZoneCard";

interface RealTimeAssetMapProps {
  zones: GeofenceZone[];
  onEditZone: (zone: GeofenceZone) => void;
  onViewZoneInMap: (zone: GeofenceZone) => void;
  onToggleZone: (zone: GeofenceZone) => void;
}

export function RealTimeAssetMap({
  zones,
  onEditZone,
  onViewZoneInMap,
  onToggleZone,
}: RealTimeAssetMapProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Real-time Asset Map
          </h3>
          <p className="text-sm text-muted-foreground">
            Live tracking of assets across hospital buildings
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {zones.map((zone) => (
          <GeofenceZoneCard
            key={zone.id}
            zone={zone}
            onEdit={onEditZone}
            onViewInMap={onViewZoneInMap}
            onToggle={onToggleZone}
          />
        ))}
      </div>
    </div>
  );
}
