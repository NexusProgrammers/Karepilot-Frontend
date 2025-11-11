"use client";

import { useCallback, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import POIHeader from "../components/POIHeader";
import POIStats from "../components/POIStats";
import POITabs from "../components/POITabs";
import POISearchAndFilters from "../components/POISearchAndFilters";
import POIGrid from "../components/POIGrid";
import { PointOfInterestModal } from "@/app/dashboard/[id]/components/CreatePOIModal";
import type { PointsOfInterestQuery } from "@/lib/types/points-of-interest/api";

type StatusFilter = "all" | "Active" | "Inactive" | "Maintenance";

export default function POIDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [building, setBuilding] = useState("all");

  const handleSearchChange = useCallback((query: string) => {
    setSearch(query);
  }, []);

  const handleStatusChange = useCallback((value: StatusFilter) => {
    setStatus(value);
  }, []);

  const handleBuildingChange = useCallback((value: string) => {
    setBuilding(value);
  }, []);

  const queryParams = useMemo<PointsOfInterestQuery>(() => {
    const params: PointsOfInterestQuery = {};

    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    if (status !== "all") {
      params.status = status;
    }

    if (building !== "all") {
      params.building = building;
    }

    return params;
  }, [search, status, building]);

  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Points of Interest"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <POIHeader onCreatePOI={() => setIsModalOpen(true)} />
        <POIStats queryParams={queryParams} />
        <POITabs />
        <POISearchAndFilters
          search={search}
          status={status}
          building={building}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onBuildingChange={handleBuildingChange}
        />
        <POIGrid queryParams={queryParams} />
      </div>
      <PointOfInterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pointOfInterest={null}
      />
    </DashboardLayout>
  );
}
