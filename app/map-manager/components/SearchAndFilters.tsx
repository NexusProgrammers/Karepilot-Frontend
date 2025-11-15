"use client";

import SearchAndFilters from "@/components/common/SearchAndFilters";
import { AvailableFilters } from "@/lib/types/map-management/floorPlans";

interface MapManagerSearchAndFiltersProps {
  searchQuery: string;
  selectedStatus: string;
  selectedBuilding: string;
  availableFilters?: AvailableFilters;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
  onBuildingChange: (building: string) => void;
}

export default function MapManagerSearchAndFilters({
  searchQuery,
  selectedStatus,
  selectedBuilding,
  availableFilters,
  onSearchChange,
  onStatusChange,
  onBuildingChange,
}: MapManagerSearchAndFiltersProps) {
  const handleFilterChange = (filterLabel: string, value: string) => {
    if (filterLabel === "Status") {
      onStatusChange(value);
    } else if (filterLabel === "Building") {
      onBuildingChange(value);
    }
  };

  const statusOptions = [
    { label: "All Status", value: "all" },
    ...(availableFilters?.statuses.map((status) => ({
      label: status,
      value: status.toLowerCase(),
    })) || []),
  ];

  const buildingOptions = [
    { label: "All Buildings", value: "all" },
    ...(availableFilters?.buildings.map((building) => ({
      label: building.name,
      value: building.id,
    })) || []),
  ];

  return (
    <SearchAndFilters
      searchPlaceholder="Search floor plans..."
      filters={[
        {
          label: "Status",
          options: statusOptions,
          defaultValue: selectedStatus,
        },
        {
          label: "Building",
          options: buildingOptions,
          defaultValue: selectedBuilding,
        },
      ]}
      onSearchChange={onSearchChange}
      onFilterChange={handleFilterChange}
    />
  );
}
