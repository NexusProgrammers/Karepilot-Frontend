"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import MapManagerHeader from "./MapManagerHeader";
import MapManagerStats from "./MapManagerStats";
import MapManagerTabs from "./MapManagerTabs";
import MapSettings from "./MapSettings";
import { usePrimaryOrganization } from "@/lib/hooks/usePrimaryOrganization";
import { useGetMapManagerBuildingStatsQuery } from "@/lib/api/mapManagerApi";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "@/icons/Icons";
import { cn } from "@/lib/utils";

export default function MapManagerSettingsView() {
  const {
    organizationId,
    organizationName,
    isLoading: isOrganizationLoading,
  } = usePrimaryOrganization();

  const {
    data: statsData,
    isLoading: isLoadingStats,
    isFetching: isFetchingStats,
    refetch,
  } = useGetMapManagerBuildingStatsQuery(
    { organization: organizationId ?? undefined },
    { skip: !organizationId },
  );

  const handleRefresh = () => {
    refetch();
  };

  const isLoadingAny =
    isOrganizationLoading || isLoadingStats || isFetchingStats;

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
        <MapManagerHeader organizationName={organizationName} />
        <MapManagerStats
          stats={statsData?.data}
          isLoading={isLoadingStats || isFetchingStats}
        />
        <MapManagerTabs />
        <MapSettings organizationId={organizationId} />
      </div>
    </DashboardLayout>
  );
}


