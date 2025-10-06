"use client";

import { Plus } from "lucide-react";

export default function POIHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">
          Points of Interest
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage locations and services for your organization
        </p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3D8C6C] text-white rounded-lg hover:bg-[#3D8C6C]/90 transition-colors">
        <Plus className="w-5 h-5" />
        Add New POI
      </button>
    </div>
  );
}

