 "use client";

import { MapManagerFloor } from "@/lib/types/map-manager";
import { Button } from "@/components/ui/button";
import { MapPin, Edit, Plus } from "@/icons/Icons";

interface FloorPlanGridProps {
  floors: MapManagerFloor[];
  isLoading?: boolean;
  onCreateFloor: () => void;
  onEditFloor: (floor: MapManagerFloor) => void;
}

const FloorGridSkeleton = () => (
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

export default function FloorPlanGrid({
  floors,
  isLoading,
  onCreateFloor,
  onEditFloor,
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
            Add Floor
          </Button>
        </div>
        <FloorGridSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={onCreateFloor}
          className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Floor
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {floors.map((floor) => {
          const building =
            typeof floor.building === "object" && floor.building !== null
              ? floor.building
              : undefined;

          return (
            <div
              key={floor.id}
              className="bg-card rounded-4xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-muted flex items-center justify-center rounded-3xl border border-dashed border-border mx-6 mt-6 mb-4">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">
                    Level {floor.level} • Sequence {floor.sequence}
                  </p>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      floor.isDefault
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {floor.isDefault ? "Default Floor" : "Floor"}
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6">
                <h3 className="font-semibold text-card-foreground text-base mb-2">
                  {floor.name}
                </h3>
                {building && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {building.name}
                    {building.code ? ` • ${building.code}` : ""}
                  </p>
                )}

                {floor.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {floor.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{floor.isBasement ? "Basement Level" : "Above Ground"}</span>
                  <span>{floor.isActive ? "Active" : "Inactive"}</span>
                </div>

                {floor.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {floor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <hr className="mb-6" />
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
                    onClick={() => onEditFloor(floor)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Floor
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {floors.length === 0 && (
        <div className="bg-card border border-border rounded-3xl p-10 text-center">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            No floors found
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Try adjusting your filters or add a new floor to get started.
          </p>
          <Button
            onClick={onCreateFloor}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Floor
          </Button>
        </div>
      )}
    </div>
  );
}
