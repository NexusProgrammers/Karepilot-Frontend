"use client";

import { useEffect, useMemo, useState } from "react";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerStats from "./MapManagerStats";
import MapManagerTabs from "./MapManagerTabs";
import MapManagerSearchAndFilters from "./SearchAndFilters";
import BuildingGrid from "./BuildingGrid";
import ManageBuildingModal from "./ManageBuildingModal";
import ManageFloorModal from "./ManageFloorModal";
import { DashboardLayout } from "@/components/DashboardLayout";
import { usePrimaryOrganization } from "@/lib/hooks/usePrimaryOrganization";
import {
  useGetMapManagerBuildingsQuery,
  useGetMapManagerBuildingStatsQuery,
} from "@/lib/api/mapManagerApi";
import { MapManagerBuilding } from "@/lib/types/map-manager";
import { FilterOption } from "@/components/common/SearchAndFilters";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { cn } from "@/lib/utils";

export default function MapManagerBuildingsView() {
  const {
    organizationId,
    organizationName,
    isLoading: isOrganizationLoading,
  } = usePrimaryOrganization();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("all");
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [buildingToEdit, setBuildingToEdit] = useState<MapManagerBuilding | null>(null);
  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
  const [initialBuildingIdForFloor, setInitialBuildingIdForFloor] = useState<
    string | undefined
  >(undefined);

  const {
    data: buildingsData,
    isLoading: isLoadingBuildings,
    isFetching: isFetchingBuildings,
    refetch: refetchBuildings,
  } = useGetMapManagerBuildingsQuery(
    {
      organization: organizationId,
      search: searchQuery || undefined,
      limit: 100,
    },
    { skip: !organizationId },
  );

  const buildings = buildingsData?.data?.buildings ?? [];

  const buildingOptions: FilterOption[] = useMemo(() => {
    const options: FilterOption[] = [{ label: "All Buildings", value: "all" }];
    buildings.forEach((building) => {
      options.push({
        label: building.code ? `${building.name} (${building.code})` : building.name,
        value: building.id,
      });
    });
    return options;
  }, [buildings]);

  useEffect(() => {
    if (
      selectedBuildingId !== "all" &&
      buildings.every((building) => building.id !== selectedBuildingId)
    ) {
      setSelectedBuildingId("all");
    }
  }, [buildings, selectedBuildingId]);

  const filteredBuildings =
    selectedBuildingId === "all"
      ? buildings
      : buildings.filter((building) => building.id === selectedBuildingId);

  const {
    data: statsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
    refetch: refetchStats,
  } = useGetMapManagerBuildingStatsQuery(
    { organization: organizationId ?? undefined },
    { skip: !organizationId },
  );

  const handleRefresh = () => {
    refetchBuildings();
    refetchStats();
  };

  const handleCreateBuilding = () => {
    setBuildingToEdit(null);
    setIsBuildingModalOpen(true);
  };

  const handleEditBuilding = (building: MapManagerBuilding) => {
    setBuildingToEdit(building);
    setIsBuildingModalOpen(true);
  };

  const handleAddFloor = (building: MapManagerBuilding) => {
    setInitialBuildingIdForFloor(building.id);
    setIsFloorModalOpen(true);
  };

  const isLoadingAny =
    isOrganizationLoading ||
    isLoadingBuildings ||
    isFetchingBuildings ||
    isLoadingStats ||
    isFetchingStats;

  return (
    <DashboardLayout
      showBackButton
      showOrganizationHeader
      organizationName={organizationName}
      pageTitle="Map Manager"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className={cn("space-y-6", isLoadingAny && "opacity-90")}>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <MapManagerHeader
          organizationName={organizationName}
          extraActions={
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleCreateBuilding}
            >
              Add Building
            </Button>
          }
        />
        <MapManagerStats
          stats={statsData?.data}
          isLoading={isLoadingStats || isFetchingStats}
        />
        <MapManagerTabs />
        <MapManagerSearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          buildingOptions={buildingOptions}
          selectedBuilding={selectedBuildingId}
          onBuildingChange={setSelectedBuildingId}
        />
        <BuildingGrid
          buildings={filteredBuildings}
          isLoading={isLoadingBuildings || isFetchingBuildings}
          onCreateBuilding={handleCreateBuilding}
          onEditBuilding={handleEditBuilding}
          onAddFloor={handleAddFloor}
        />
      </div>

      <ManageBuildingModal
        isOpen={isBuildingModalOpen}
        onClose={() => {
          setIsBuildingModalOpen(false);
          setBuildingToEdit(null);
          refetchBuildings();
          refetchStats();
        }}
        organizationId={organizationId ?? ""}
        building={buildingToEdit}
      />

      <ManageFloorModal
        isOpen={isFloorModalOpen}
        onClose={() => {
          setIsFloorModalOpen(false);
          setInitialBuildingIdForFloor(undefined);
          refetchBuildings();
          refetchStats();
        }}
        organizationId={organizationId ?? ""}
        buildings={buildings}
        initialBuildingId={initialBuildingIdForFloor}
      />
    </DashboardLayout>
  );
}


