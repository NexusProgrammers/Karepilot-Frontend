"use client";

import SearchAndFilters from "@/components/common/SearchAndFilters";

type POISearchAndFiltersProps = {
  search: string;
  status: "all" | "Active" | "Inactive";
  building: string;
  onSearchChange: (query: string) => void;
  onStatusChange: (value: "all" | "Active" | "Inactive") => void;
  onBuildingChange: (value: string) => void;
};

export default function POISearchAndFilters({
  search,
  status,
  building,
  onSearchChange,
  onStatusChange,
  onBuildingChange,
}: POISearchAndFiltersProps) {
  const handleFilterChange = (filterLabel: string, value: string) => {
    if (filterLabel === "Status") {
      onStatusChange(value as "all" | "Active" | "Inactive");
    } else if (filterLabel === "Building") {
      onBuildingChange(value);
    }
  };

  return (
    <SearchAndFilters
      searchPlaceholder="Search points of interest..."
      filters={[
        {
          label: "Status",
          options: [
            { label: "All Status", value: "all" },
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
          ],
          defaultValue: "all",
        },
        {
          label: "Building",
          options: [
            { label: "All Buildings", value: "all" },
            { label: "Main Hospital", value: "Main Hospital" },
            { label: "Emergency Wing", value: "Emergency Wing" },
            { label: "Diagnostic Wing", value: "Diagnostic Wing" },
            { label: "Pediatric Wing", value: "Pediatric Wing" },
          ],
          defaultValue: "all",
        },
      ]}
      onSearchChange={onSearchChange}
      onFilterChange={handleFilterChange}
      searchValue={search}
      selectedFilters={{
        Status: status,
        Building: building,
      }}
    />
  );
}

