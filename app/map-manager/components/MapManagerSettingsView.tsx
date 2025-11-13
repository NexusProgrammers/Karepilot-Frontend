"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerStats from "./MapManagerStats";
import MapManagerTabs from "./MapManagerTabs";
import MapSettings from "./MapSettings";
import { usePrimaryOrganization } from "@/lib/hooks/usePrimaryOrganization";
import { useGetMapManagerFloorPlanStatsQuery } from "@/lib/api/mapManagerApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { cn } from "@/lib/utils";

export default function MapManagerSettingsView() {
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
    data: floorPlanStatsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
    refetch,
  } = useGetMapManagerFloorPlanStatsQuery(
    { organization: selectedOrganizationId ?? undefined },
    { skip: !selectedOrganizationId },
  );

  const handleRefresh = () => {
    refetch();
  };

  const isLoadingAny =
    isPrimaryOrganizationLoading || isFetchingOrganizations || isLoadingStats || isFetchingStats;

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
          onOrganizationChange={(organization) => setSelectedOrganizationId(organization)}
          isOrganizationsLoading={isPrimaryOrganizationLoading || isFetchingOrganizations}
          onPrimaryAction={null}
        />
        <MapManagerStats
          stats={floorPlanStatsData?.data}
          isLoading={isLoadingStats || isFetchingStats}
        />
        <MapManagerTabs />
        <MapSettings organizationId={selectedOrganizationId} />
      </div>
    </DashboardLayout>
  );
}


