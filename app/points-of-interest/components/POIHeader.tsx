"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface POIHeaderProps {
  onCreatePOI?: () => void;
}

export default function POIHeader({ onCreatePOI }: POIHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
          Points of Interest
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Manage locations and services for your organization
        </p>
      </div>
      <Button 
        onClick={onCreatePOI}
        className="flex items-center dark:text-white cursor-pointer max-w-[200px] justify-center gap-2 px-3 sm:px-4 py-3 sm:py-2.5 bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-sm sm:text-base w-full sm:w-auto"
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="inline">Add New POI</span>
      </Button>
    </div>
  );
}