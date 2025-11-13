"use client";

import Image from "next/image";
import { MapManagerFloorPlan } from "@/lib/types/map-manager";
import { Button } from "@/components/ui/button";
import { Edit, Plus, ExternalLink, FileText } from "@/icons/Icons";
import { format } from "date-fns";

interface FloorPlanGridProps {
  floorPlans: MapManagerFloorPlan[];
  isLoading?: boolean;
  onCreateFloorPlan: () => void;
  onEditFloorPlan: (floorPlan: MapManagerFloorPlan) => void;
}

const FloorPlanGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="bg-card rounded-4xl border border-border overflow-hidden p-6 animate-pulse"
      >
        <div className="relative h-48 bg-muted rounded-3xl mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-1/3" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="h-9 bg-muted rounded" />
          <div className="h-9 bg-muted rounded" />
        </div>
      </div>
    ))}
  </div>
);

const statusStyles: Record<string, string> = {
  Published: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  Draft: "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
  Building: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  New: "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
  Archived: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300",
};

export default function FloorPlanGrid({
  floorPlans,
  isLoading,
  onCreateFloorPlan,
  onEditFloorPlan,
}: FloorPlanGridProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="cursor-not-allowed opacity-50"
            disabled
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Floor Plan
          </Button>
        </div>
        <FloorPlanGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={onCreateFloorPlan}
          className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Floor Plan
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {floorPlans.map((floorPlan) => {
          const building = floorPlan.building;
          const floor = floorPlan.floor;

          return (
            <div
              key={floorPlan.id}
              className="bg-card rounded-4xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-muted rounded-3xl mx-6 mt-6 mb-4 overflow-hidden flex items-center justify-center">
                {floorPlan.previewUrl ? (
                  <Image
                    src={floorPlan.previewUrl}
                    alt={floorPlan.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="w-10 h-10 mb-2" />
                    <p className="text-sm">No preview available</p>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      statusStyles[floorPlan.status] ?? statusStyles.Draft
                    }`}
                  >
                    {floorPlan.status}
                  </span>
                </div>
                {floorPlan.file?.fileName && (
                  <div className="absolute bottom-3 right-3 bg-background/85 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">
                    {floorPlan.file.fileName}
                  </div>
                )}
              </div>

              <div className="px-6 pb-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-card-foreground text-base">
                    {floorPlan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {building.name}
                    {building.code ? ` • ${building.code}` : ""} • {floor.name}
                  </p>
                </div>

                {floorPlan.description && (
                  <p className="text-sm text-muted-foreground">
                    {floorPlan.description}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="bg-muted/60 rounded-xl px-3 py-2">
                    <p className="font-medium text-foreground">Version</p>
                    <p>{floorPlan.versionNumber}</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl px-3 py-2">
                    <p className="font-medium text-foreground">Last Updated</p>
                    <p>
                      {floorPlan.updatedAt
                        ? format(new Date(floorPlan.updatedAt), "MMM d, yyyy")
                        : "—"}
                    </p>
                  </div>
                </div>

                {floorPlan.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {floorPlan.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {floorPlan.file?.url && (
                    <Button
                      variant="secondary"
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        window.open(floorPlan.file?.url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 cursor-pointer"
                    onClick={() => onEditFloorPlan(floorPlan)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {floorPlans.length === 0 && (
        <div className="bg-card border border-border rounded-3xl p-10 text-center">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No floor plans found
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Try adjusting your filters or upload a new floor plan to get started.
          </p>
          <Button
            onClick={onCreateFloorPlan}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Upload Floor Plan
          </Button>
        </div>
      )}
    </div>
  );
}
