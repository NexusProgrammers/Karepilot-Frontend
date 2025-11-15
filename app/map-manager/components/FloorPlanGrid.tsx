"use client";

import { useGetAllFloorPlansQuery } from "@/lib/api/floorPlansApi";
import { MapPin, Settings } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import Image from "next/image";
import SearchAndFilters from "./SearchAndFilters";

interface FloorPlanGridProps {
  searchQuery?: string; // Debounced search query for API calls
  searchInputValue?: string; // Non-debounced value for input field
  selectedStatus?: string;
  selectedBuilding?: string;
  onSearchChange?: (query: string) => void;
  onStatusChange?: (status: string) => void;
  onBuildingChange?: (building: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
    case "Draft":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    case "Archived":
      return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
    case "Disabled":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
    default:
      return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FloorPlanGrid({
  searchQuery = "",
  searchInputValue = "",
  selectedStatus = "all",
  selectedBuilding = "all",
  onSearchChange,
  onStatusChange,
  onBuildingChange,
}: FloorPlanGridProps) {
  const { data, isLoading, error, refetch } = useGetAllFloorPlansQuery({
    page: 1,
    limit: 12,
    search: searchQuery || undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    building: selectedBuilding !== "all" ? selectedBuilding : undefined,
  });

  const floorPlans = data?.data.floorPlans || [];
  const availableFilters = data?.data.availableFilters;

  return (
    <>
      <SearchAndFilters
        searchQuery={searchInputValue}
        selectedStatus={selectedStatus}
        selectedBuilding={selectedBuilding}
        availableFilters={availableFilters}
        onSearchChange={onSearchChange || (() => {})}
        onStatusChange={onStatusChange || (() => {})}
        onBuildingChange={onBuildingChange || (() => {})}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-4xl shadow-sm border border-gray-300 overflow-hidden p-6 animate-pulse"
            >
              <div className="h-48 md:h-80 bg-muted rounded-3xl mb-4"></div>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <QueryErrorState
          error={error}
          title="Failed to load floor plans"
          onRetry={() => refetch()}
        />
      ) : floorPlans.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No floor plans found</h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first floor plan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {floorPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-card rounded-4xl shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow p-6"
            >
              <div className="relative h-48 md:h-80 bg-muted flex items-center justify-center rounded-3xl border border-dashed border-gray-200 overflow-hidden">
                {plan.media?.thumbnailUrl ? (
                  <Image
                    src={plan.media.thumbnailUrl}
                    alt={plan.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : plan.media?.fileUrl ? (
                  <Image
                    src={plan.media.fileUrl}
                    alt={plan.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No Preview</p>
                  </div>
                )}

                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      plan.status
                    )}`}
                  >
                    {plan.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-card-foreground text-base mb-2">
                  {plan.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {plan.building.name} • {plan.floorLabel}
                </p>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>
                      {plan.metadata?.scale || "N/A"} • Floor {plan.floorNumber}
                    </span>
                    <span>V{plan.version}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Modified: {formatDate(plan.updatedAt)}
                  </p>
                  {plan.metadata?.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {plan.metadata.description}
                    </p>
                  )}
                </div>
                <hr className="mb-6" />
                <div className="flex gap-2 w-full">
                  <Link href={`/map-manager/map-editor?floorPlan=${plan.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="flex cursor-pointer w-full items-center justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      Preview
                    </Button>
                  </Link>
                  <Link href={`/map-manager/map-editor?floorPlan=${plan.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="flex cursor-pointer items-center w-full justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/map-manager/map-editor?floorPlan=${plan.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex cursor-pointer items-center justify-center w-10 h-10 bg-background border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
