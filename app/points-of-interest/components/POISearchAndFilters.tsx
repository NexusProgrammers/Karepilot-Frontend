"use client";

import SearchAndFilters from "@/components/common/SearchAndFilters";

export default function POISearchAndFilters() {
  const handleSearchChange = (query: string) => {
    console.log("Search query:", query);
  };

  const handleFilterChange = (filterLabel: string, value: string) => {
    console.log(`Filter ${filterLabel} changed to:`, value);
  };

  return (
    <SearchAndFilters
      searchPlaceholder="Search floor plans..."
      filters={[
        {
          label: "Status",
          options: [
            { label: "All Status", value: "all" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
          defaultValue: "all",
        },
        {
          label: "Buildings",
          options: [
            { label: "All Buildings", value: "all" },
            { label: "Main Hospital", value: "main" },
            { label: "Diagnostic Wing", value: "diagnostic" },
          ],
          defaultValue: "all",
        },
      ]}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
    />
  );
}

