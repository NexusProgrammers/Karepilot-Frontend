"use client";

import { POI } from "@/lib/points-of-interest/types";
import { Settings } from "lucide-react";

interface POICardProps {
  poi: POI;
}

export default function POICard({ poi }: POICardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-card-foreground mb-1">
              {poi.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {poi.building} • {poi.floor}
            </p>
          </div>
          <span className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-950 px-3 py-1 rounded-md">
            {poi.categoryType}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-base font-medium text-card-foreground mb-2">
            {poi.roomNumber}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {poi.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {poi.categories.map((category, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1.5 rounded-md bg-muted text-muted-foreground font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-3 border-t border-border">
        <div className="flex items-center gap-3">
          {poi.amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <div key={index} title={amenity.label}>
                <IconComponent className="w-5 h-5 text-blue-600" />
              </div>
            );
          })}
          <span className="text-xs text-muted-foreground ml-auto">
            Updated {poi.updatedDate}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-border">
        <button className="px-4 py-3 text-sm font-medium text-card-foreground hover:bg-muted transition-colors border-r border-border">
          View
        </button>
        <button className="px-4 py-3 text-sm font-medium text-card-foreground hover:bg-muted transition-colors border-r border-border">
          Edit
        </button>
        <button className="px-4 py-3 text-sm font-medium text-card-foreground hover:bg-muted transition-colors flex items-center justify-center">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

