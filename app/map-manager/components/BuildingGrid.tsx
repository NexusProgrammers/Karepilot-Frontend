"use client";

import { useState } from "react";
import { ShoppingCart } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { useGetAllBuildingsQuery } from "@/lib/api/buildingsApi";
import { MapBuildingSummary } from "@/lib/types/map-management/buildings";
import { QueryErrorState } from "@/components/common/QueryErrorState";

function BuildingCard({ building }: { building: MapBuildingSummary }) {
  return (
    <div className="bg-card rounded-4xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-card-foreground">
            {building.name}
          </h3>
          {building.code && (
            <p className="text-sm text-muted-foreground mt-1">Code: {building.code}</p>
          )}
        </div>
        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 ml-4">
          <ShoppingCart className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6 justify-between">
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-card-foreground">
            {building.floors}
          </div>
          <div className="text-sm text-muted-foreground">Total Floors</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {building.publishedFloors}
          </div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
      </div>

      {building.description && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {building.description}
          </p>
        </div>
      )}

      {building.tags && building.tags.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {building.tags.map((tag, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              building.status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : building.status === "Inactive"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            }`}
          >
            {building.status}
          </span>
        </div>
      </div>

      <hr className="mb-6 border-border" />
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
        >
          Use This Template
        </Button>
        <Button
          variant="outline"
          className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
        >
          Add Floor
        </Button>
      </div>
    </div>
  );
}

export default function BuildingGrid() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>("");

  const { data, isLoading, error, refetch } = useGetAllBuildingsQuery({
    page: 1,
    limit: 12,
    ...(selectedOrganizationId ? { organizationId: selectedOrganizationId } : {}),
  });

  const buildings = data?.data?.buildings || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-4xl border border-border p-6 animate-pulse"
          >
            <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-20 bg-muted rounded mb-4"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        onRetry={() => refetch()}
        description="Failed to load buildings"
      />
    );
  }

  if (buildings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No buildings found</p>
        <p className="text-sm text-muted-foreground">
          Create your first building to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {buildings.map((building) => (
        <BuildingCard key={building.id} building={building} />
      ))}
    </div>
  );
}

