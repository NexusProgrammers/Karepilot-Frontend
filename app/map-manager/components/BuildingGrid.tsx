"use client";

import { Button } from "@/components/ui/button";
import { MapManagerBuilding } from "@/lib/types/map-manager";
import { Building2, Edit, Plus } from "@/icons/Icons";

interface BuildingGridProps {
  buildings: MapManagerBuilding[];
  isLoading?: boolean;
  onCreateBuilding: () => void;
  onEditBuilding: (building: MapManagerBuilding) => void;
  onAddFloor: (building: MapManagerBuilding) => void;
  onSelectBuilding?: (buildingId: string) => void;
}

export default function BuildingGrid({
  buildings,
  isLoading,
  onCreateBuilding,
  onEditBuilding,
  onAddFloor,
  onSelectBuilding,
}: BuildingGridProps) {
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
            Add Building
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-4xl border border-border p-6 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-5 bg-muted rounded w-32" />
                <div className="w-8 h-8 bg-muted rounded-lg" />
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-4 bg-muted rounded w-36" />
              </div>
              <div className="h-10 bg-muted rounded mb-6" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-9 bg-muted rounded" />
                <div className="h-9 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={onCreateBuilding}
          className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Building
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buildings.map((building) => (
          <div
            key={building.id}
            className="bg-card rounded-4xl border border-border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-card-foreground mb-1">
                  {building.name}
                </h3>
                {building.code && (
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    {building.code}
                  </p>
                )}
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Floors</p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {building.floorCount}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-sm font-medium">
                    {building.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>

              {building.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {building.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <hr className="mb-6" />
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => onEditBuilding(building)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Building
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                onClick={() => onAddFloor(building)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Floor
              </Button>
            </div>
            {onSelectBuilding && (
              <Button
                variant="ghost"
                className="w-full mt-3 text-sm text-primary hover:text-primary/80 cursor-pointer"
                onClick={() => onSelectBuilding(building.id)}
              >
                View Floors
              </Button>
            )}
          </div>
        ))}
      </div>
      {buildings.length === 0 && (
        <div className="bg-card border border-border rounded-3xl p-10 text-center">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No buildings yet
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Start by adding a building to organize your floors and floor plans.
          </p>
          <Button
            onClick={onCreateBuilding}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Building
          </Button>
        </div>
      )}
    </div>
  );
}
