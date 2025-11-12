"use client";

import { useEffect, useMemo, useState } from "react";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerStats from "./MapManagerStats";
import MapManagerTabs from "./MapManagerTabs";
import MapManagerSearchAndFilters from "./SearchAndFilters";
import FloorPlanGrid from "./FloorPlanGrid";
import ManageBuildingModal from "./ManageBuildingModal";
import ManageFloorModal from "./ManageFloorModal";
import { usePrimaryOrganization } from "@/lib/hooks/usePrimaryOrganization";
import {
  useGetMapManagerBuildingsQuery,
  useGetMapManagerBuildingStatsQuery,
  useGetMapManagerFloorsQuery,
} from "@/lib/api/mapManagerApi";
import {
  MapManagerBuilding,
  MapManagerFloor,
} from "@/lib/types/map-manager";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { FilterOption } from "@/components/common/SearchAndFilters";
import { cn } from "@/lib/utils";

export default function MapManagerFloorsView() {
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
  const [floorToEdit, setFloorToEdit] = useState<MapManagerFloor | null>(null);
  const [initialBuildingIdForFloor, setInitialBuildingIdForFloor] = useState<
    string | undefined
  >(undefined);

  const buildingsQueryEnabled = Boolean(organizationId);
  const floorsQueryEnabled = Boolean(organizationId);

  const {
    data: buildingsData,
    isLoading: isLoadingBuildings,
    isFetching: isFetchingBuildings,
    refetch: refetchBuildings,
  } = useGetMapManagerBuildingsQuery(
    {
      organization: organizationId,
      search: searchQuery || undefined,
      limit: 50,
    },
    { skip: !buildingsQueryEnabled },
  );

  const buildings = buildingsData?.data?.buildings ?? [];

  useEffect(() => {
    if (
      selectedBuildingId !== "all" &&
      buildings.every((building) => building.id !== selectedBuildingId)
    ) {
      setSelectedBuildingId("all");
    }
  }, [buildings, selectedBuildingId]);

  const buildingFilterOptions: FilterOption[] = useMemo(() => {
    const options: FilterOption[] = [{ label: "All Buildings", value: "all" }];
    buildings.forEach((building) => {
      options.push({
        label: building.code ? `${building.name} (${building.code})` : building.name,
        value: building.id,
      });
    });
    return options;
  }, [buildings]);

  const {
    data: statsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
    refetch: refetchStats,
  } = useGetMapManagerBuildingStatsQuery(
    { organization: organizationId ?? undefined },
    { skip: !organizationId },
  );

  const {
    data: floorsData,
    isLoading: isLoadingFloors,
    isFetching: isFetchingFloors,
    refetch: refetchFloors,
  } = useGetMapManagerFloorsQuery(
    {
      organization: organizationId,
      building: selectedBuildingId !== "all" ? selectedBuildingId : undefined,
      search: searchQuery || undefined,
      limit: 20,
    },
    { skip: !floorsQueryEnabled },
  );

  const floors = floorsData?.data?.floors ?? [];

  const handleRefresh = () => {
    refetchBuildings();
    refetchFloors();
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

  const handleAddFloor = (building?: MapManagerBuilding) => {
    if (building) {
      setSelectedBuildingId(building.id);
      setInitialBuildingIdForFloor(building.id);
    } else if (selectedBuildingId !== "all") {
      setInitialBuildingIdForFloor(selectedBuildingId);
    } else if (buildings[0]) {
      setInitialBuildingIdForFloor(buildings[0].id);
    }
    setFloorToEdit(null);
    setIsFloorModalOpen(true);
  };

  const handleEditFloor = (floor: MapManagerFloor) => {
    const buildingId =
      typeof floor.building === "object" && floor.building !== null
        ? floor.building.id
        : (floor.building as string | undefined);
    if (buildingId) {
      setInitialBuildingIdForFloor(buildingId);
    }
    setFloorToEdit(floor);
    setIsFloorModalOpen(true);
  };

  const isLoadingAny =
    isOrganizationLoading ||
    isLoadingBuildings ||
    isFetchingBuildings ||
    isLoadingFloors ||
    isFetchingFloors ||
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
          buildingOptions={buildingFilterOptions}
          selectedBuilding={selectedBuildingId}
          onBuildingChange={setSelectedBuildingId}
        />
        <FloorPlanGrid
          floors={floors}
          isLoading={isLoadingFloors || isFetchingFloors}
          onCreateFloor={() => handleAddFloor()}
          onEditFloor={handleEditFloor}
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
          setFloorToEdit(null);
          setInitialBuildingIdForFloor(undefined);
          refetchFloors();
          refetchBuildings();
          refetchStats();
        }}
        organizationId={organizationId ?? ""}
        buildings={buildings}
        floor={floorToEdit}
        initialBuildingId={initialBuildingIdForFloor}
      />
    </DashboardLayout>
  );
}


