"use client";

import { useEffect, useMemo, useState } from "react";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerStats from "./MapManagerStats";
import MapManagerTabs from "./MapManagerTabs";
import MapManagerSearchAndFilters from "./SearchAndFilters";
import FloorPlanGrid from "./FloorPlanGrid";
import ManageBuildingModal from "./ManageBuildingModal";
import ManageFloorModal from "./ManageFloorModal";
import ManageFloorPlanModal from "./ManageFloorPlanModal";
import { usePrimaryOrganization } from "@/lib/hooks/usePrimaryOrganization";
import {
  useGetMapManagerBuildingsQuery,
  useGetMapManagerFloorsQuery,
  useGetMapManagerFloorPlansQuery,
  useGetMapManagerFloorPlanStatsQuery,
} from "@/lib/api/mapManagerApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import {
  MapManagerBuilding,
  MapManagerFloor,
  MapManagerFloorPlan,
} from "@/lib/types/map-manager";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { FilterOption } from "@/components/common/SearchAndFilters";
import { cn } from "@/lib/utils";

export default function MapManagerFloorsView() {
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
  const [floorToEdit, setFloorToEdit] = useState<MapManagerFloor | null>(null);
  const [initialBuildingIdForFloor, setInitialBuildingIdForFloor] = useState<
    string | undefined
  >(undefined);
  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);
  const [floorPlanToEdit, setFloorPlanToEdit] = useState<MapManagerFloorPlan | null>(null);

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
      const currentOrg = organizationsData.data.organizations.find(
        (org) => org.id === selectedOrganizationId,
      );
      if (currentOrg) {
        setSelectedOrganizationName(currentOrg.name);
      }
    }
  }, [organizationsData?.data?.organizations, selectedOrganizationId]);

  const organizationOptions =
    organizationsData?.data?.organizations.map((organization) => ({
      label: organization.name,
      value: organization.id,
    })) ?? [];

  const buildingsQueryEnabled = Boolean(selectedOrganizationId);
  const floorsQueryEnabled = Boolean(selectedOrganizationId);
  const floorPlansQueryEnabled = Boolean(selectedOrganizationId);

  const {
    data: buildingsData,
    isLoading: isLoadingBuildings,
    isFetching: isFetchingBuildings,
    refetch: refetchBuildings,
  } = useGetMapManagerBuildingsQuery(
    {
      organization: selectedOrganizationId,
      search: searchQuery || undefined,
      limit: 50,
    },
    { skip: !buildingsQueryEnabled },
  );

  const buildings = useMemo(
    () => buildingsData?.data?.buildings ?? [],
    [buildingsData?.data?.buildings],
  );

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
    data: floorPlanStatsData,
    isLoading: isLoadingFloorPlanStats,
    isFetching: isFetchingFloorPlanStats,
    refetch: refetchFloorPlanStats,
  } = useGetMapManagerFloorPlanStatsQuery(
    { organization: selectedOrganizationId ?? undefined },
    { skip: !floorPlansQueryEnabled },
  );

  const {
    data: floorPlansData,
    isLoading: isLoadingFloorPlans,
    isFetching: isFetchingFloorPlans,
    refetch: refetchFloorPlans,
  } = useGetMapManagerFloorPlansQuery(
    {
      organization: selectedOrganizationId,
      building: selectedBuildingId !== "all" ? selectedBuildingId : undefined,
      search: searchQuery || undefined,
      limit: 20,
    },
    { skip: !floorPlansQueryEnabled },
  );

  const floorPlans = useMemo(
    () => floorPlansData?.data?.floorPlans ?? [],
    [floorPlansData?.data?.floorPlans],
  );

  const {
    data: floorsData,
    isFetching: isFetchingFloors,
    refetch: refetchFloors,
  } = useGetMapManagerFloorsQuery(
    {
      organization: selectedOrganizationId,
      building: selectedBuildingId !== "all" ? selectedBuildingId : undefined,
      limit: 100,
    },
    { skip: !floorsQueryEnabled },
  );

  const floors = useMemo(() => floorsData?.data?.floors ?? [], [floorsData?.data?.floors]);

  const handleRefresh = () => {
    refetchBuildings();
    refetchFloors();
    refetchFloorPlans();
    refetchFloorPlanStats();
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

  const handleCreateFloorPlan = () => {
    setFloorPlanToEdit(null);
    setIsFloorPlanModalOpen(true);
  };

  const handleEditFloorPlan = (floorPlan: MapManagerFloorPlan) => {
    setFloorPlanToEdit(floorPlan);
    setIsFloorPlanModalOpen(true);
  };

  const isLoadingAny =
    isPrimaryOrganizationLoading ||
    isFetchingOrganizations ||
    isLoadingBuildings ||
    isFetchingBuildings ||
    isLoadingFloorPlans ||
    isFetchingFloorPlans ||
    isLoadingFloorPlanStats ||
    isFetchingFloorPlanStats;

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
          onPrimaryAction={handleCreateFloorPlan}
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
          stats={floorPlanStatsData?.data}
          isLoading={isLoadingFloorPlanStats || isFetchingFloorPlanStats}
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
          floorPlans={floorPlans}
          isLoading={isLoadingFloorPlans || isFetchingFloorPlans}
          onCreateFloorPlan={handleCreateFloorPlan}
          onEditFloorPlan={handleEditFloorPlan}
        />
      </div>

      <ManageBuildingModal
        isOpen={isBuildingModalOpen}
        onClose={() => {
          setIsBuildingModalOpen(false);
          setBuildingToEdit(null);
          refetchBuildings();
          refetchFloorPlanStats();
        }}
        organizationId={selectedOrganizationId ?? ""}
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
          refetchFloorPlanStats();
        }}
        organizationId={selectedOrganizationId ?? ""}
        buildings={buildings}
        floor={floorToEdit}
        initialBuildingId={initialBuildingIdForFloor}
      />

      <ManageFloorPlanModal
        isOpen={isFloorPlanModalOpen}
        onClose={() => {
          setIsFloorPlanModalOpen(false);
          setFloorPlanToEdit(null);
          refetchFloorPlans();
          refetchFloorPlanStats();
          refetchFloors();
          refetchBuildings();
        }}
        organizationId={selectedOrganizationId ?? ""}
        buildings={buildings}
        floorPlan={floorPlanToEdit}
      />
    </DashboardLayout>
  );
}


