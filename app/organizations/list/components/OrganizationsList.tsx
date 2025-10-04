"use client";

import { useState, useMemo } from "react";
import { OrganizationItem } from "@/lib/organization/types";
import SearchAndFilter from "./SearchAndFilter";
import OrganizationCard from "./OrganizationCard";

type OrganizationsListProps = {
  organizations: OrganizationItem[];
};

export default function OrganizationsList({ organizations }: OrganizationsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;

    if (searchTerm) {
      filtered = filtered.filter((org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter((org) => {
        const orgType = org.type.toLowerCase();
        switch (selectedFilter) {
          case "hospital":
            return orgType.includes("hospital");
          case "airport":
            return orgType.includes("airport");
          case "mall":
            return orgType.includes("mall");
          case "open_place":
            return orgType.includes("open place");
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [organizations, searchTerm, selectedFilter]);

  return (
    <>
      <SearchAndFilter
        onSearchChange={setSearchTerm}
        onFilterChange={setSelectedFilter}
        selectedFilter={selectedFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrganizations.map((organization) => (
          <OrganizationCard
            key={organization.id}
            organization={organization}
          />
        ))}
      </div>

      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No organizations found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </>
  );
}