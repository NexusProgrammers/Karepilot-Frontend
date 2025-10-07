"use client";

import { POI } from "@/lib/points-of-interest/types";
import { MapPin, Settings } from "lucide-react";

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
          <p className="text-base font-normal text-card-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
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
              className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 flex items-center gap-3 border-t border-border">
        <button className="flex-1 cursor-pointer px-4 py-3 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          View
        </button>
        <button className="flex-1 cursor-pointer px-4 py-3 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors">
          Edit
        </button>
        <button className="w-10 h-10 cursor-pointer flex items-center justify-center text-card-foreground bg-card border border-border rounded-2xl hover:bg-muted transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
