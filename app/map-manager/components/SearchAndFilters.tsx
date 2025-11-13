"use client";

import SearchAndFilters from "@/components/common/SearchAndFilters";

export default function MapManagerSearchAndFilters() {
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
            { label: "Published", value: "published" },
            { label: "Draft", value: "draft" },
            { label: "Archived", value: "archived" },
          ],
          defaultValue: "all",
        },
        {
          label: "Building",
          options: [
            { label: "All Buildings", value: "all" },
            { label: "Main Building", value: "main" },
            { label: "Emergency Wing", value: "emergency" },
            { label: "Diagnostic Center", value: "diagnostic" },
          ],
          defaultValue: "all",
        },
      ]}
      onSearchChange={handleSearchChange}
      onFilterChange={handleFilterChange}
    />
  );
}
