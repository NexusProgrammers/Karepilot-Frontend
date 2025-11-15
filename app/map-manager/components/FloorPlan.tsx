"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import MapManagerHeader from "../components/MapManagerHeader";
import MapManagerStats from "../components/MapManagerStats";
import MapManagerTabs from "../components/MapManagerTabs";
import FloorPlanGrid from "../components/FloorPlanGrid";

function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function FloorPlan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("all");
  
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Map Manager"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <MapManagerHeader />
        <MapManagerStats />
        <MapManagerTabs />
        <FloorPlanGrid
          searchQuery={debouncedSearchQuery}
          searchInputValue={searchQuery}
          selectedStatus={selectedStatus}
          selectedBuilding={selectedBuilding}
          onSearchChange={setSearchQuery}
          onStatusChange={setSelectedStatus}
          onBuildingChange={setSelectedBuilding}
        />
      </div>
    </DashboardLayout>
  );
}
