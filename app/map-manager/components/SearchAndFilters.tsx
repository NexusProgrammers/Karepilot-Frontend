"use client";

import SearchAndFilters, {
  FilterOption,
} from "@/components/common/SearchAndFilters";

interface MapManagerSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  buildingOptions: FilterOption[];
  selectedBuilding: string;
  onBuildingChange: (value: string) => void;
}

export default function MapManagerSearchAndFilters({
  searchQuery,
  onSearchChange,
  buildingOptions,
  selectedBuilding,
  onBuildingChange,
}: MapManagerSearchAndFiltersProps) {
  const filters =
    buildingOptions.length > 0
      ? [
          {
            label: "Building",
            options: buildingOptions,
            defaultValue: buildingOptions[0]?.value,
          },
        ]
      : [];

  return (
    <SearchAndFilters
      searchPlaceholder="Search floor plans..."
      searchValue={searchQuery}
      onSearchChange={onSearchChange}
      filters={filters}
      selectedFilters={{ Building: selectedBuilding }}
      onFilterChange={(label, value) => {
        if (label === "Building") {
          onBuildingChange(value);
        }
      }}
    />
  );
}
