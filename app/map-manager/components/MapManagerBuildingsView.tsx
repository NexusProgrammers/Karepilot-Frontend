"use client";

import { useEffect, useMemo, useState } from "react";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerBuildingStats from "./MapManagerBuildingStats";
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
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { MapManagerBuilding } from "@/lib/types/map-manager";
import { FilterOption } from "@/components/common/SearchAndFilters";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { cn } from "@/lib/utils";

export default function MapManagerBuildingsView() {
  const {
    organizationId: primaryOrganizationId,
    organizationName: primaryOrganizationName,
    isLoading: isPrimaryOrganizationLoading,
  } = usePrimaryOrganization();

  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | undefined>(
    undefined,
  );
  const [selectedOrganizationName, setSelectedOrganizationName] = useState<string | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("all");
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [buildingToEdit, setBuildingToEdit] = useState<MapManagerBuilding | null>(null);
  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
  const [initialBuildingIdForFloor, setInitialBuildingIdForFloor] = useState<
    string | undefined
  >(undefined);

  const { data: organizationsData, isFetching: isFetchingOrganizations } =
    useGetOrganizationsQuery({
      limit: 100,
      status: "active",
    });

  useEffect(() => {
    if (!selectedOrganizationId && primaryOrganizationId) {
      setSelectedOrganizationId(primaryOrganizationId);
      setSelectedOrganizationName(primaryOrganizationName);
    }
  }, [primaryOrganizationId, primaryOrganizationName, selectedOrganizationId]);

  useEffect(() => {
    if (organizationsData?.data?.organizations && selectedOrganizationId) {
      const organization = organizationsData.data.organizations.find(
        (org) => org.id === selectedOrganizationId,
      );
      if (organization) {
        setSelectedOrganizationName(organization.name);
      }
    }
  }, [organizationsData?.data?.organizations, selectedOrganizationId]);

  const organizationOptions =
    organizationsData?.data?.organizations.map((organization) => ({
      label: organization.name,
      value: organization.id,
    })) ?? [];

  const {
    data: buildingsData,
    isLoading: isLoadingBuildings,
    isFetching: isFetchingBuildings,
    refetch: refetchBuildings,
  } = useGetMapManagerBuildingsQuery(
    {
      organization: selectedOrganizationId,
      search: searchQuery || undefined,
      limit: 100,
    },
    { skip: !selectedOrganizationId },
  );

  const buildings = useMemo(
    () => buildingsData?.data?.buildings ?? [],
    [buildingsData?.data?.buildings],
  );

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
    { organization: selectedOrganizationId ?? undefined },
    { skip: !selectedOrganizationId },
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

  const handleQuickAddFloor = () => {
    if (buildings.length === 0) {
      return;
    }

    const resolvedBuildingId =
      selectedBuildingId !== "all" ? selectedBuildingId : buildings[0]?.id;
    setInitialBuildingIdForFloor(resolvedBuildingId);
    setIsFloorModalOpen(true);
  };

  const isLoadingAny =
    isPrimaryOrganizationLoading ||
    isFetchingOrganizations ||
    isLoadingBuildings ||
    isFetchingBuildings ||
    isLoadingStats ||
    isFetchingStats;

  return (
    <DashboardLayout
      showBackButton
      showOrganizationHeader
      organizationName={selectedOrganizationName}
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
          organizationName={selectedOrganizationName}
          organizationOptions={organizationOptions}
          selectedOrganizationId={selectedOrganizationId}
          onOrganizationChange={(organization) => {
            setSelectedOrganizationId(organization);
            setSelectedBuildingId("all");
            setSearchQuery("");
          }}
          isOrganizationsLoading={isPrimaryOrganizationLoading || isFetchingOrganizations}
          actionLabel="Add Building"
          onPrimaryAction={handleCreateBuilding}
          extraActions={
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleQuickAddFloor}
            >
              Add Floor
            </Button>
          }
        />
        <MapManagerBuildingStats
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
        organizationId={selectedOrganizationId ?? ""}
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
        organizationId={selectedOrganizationId ?? ""}
        buildings={buildings}
        initialBuildingId={initialBuildingIdForFloor}
      />
    </DashboardLayout>
  );
}


