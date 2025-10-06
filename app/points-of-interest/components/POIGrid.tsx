"use client";

import { poisData } from "@/lib/points-of-interest/data";
import POICard from "./POICard";

export default function POIGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {poisData.map((poi) => (
        <POICard key={poi.id} poi={poi} />
      ))}
    </div>
  );
}

