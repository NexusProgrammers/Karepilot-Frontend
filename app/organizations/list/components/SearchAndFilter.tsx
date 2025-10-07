"use client";

import { useState, useRef, useEffect } from "react";
import { venueTypeFilters } from "@/lib/organization/data";
import { searchIcon } from "@/icons/dashboard";
import { Button } from "@/components/ui/button";

type SearchAndFilterProps = {
  onSearchChange: (searchTerm: string) => void;
  onFilterChange: (filterValue: string) => void;
  selectedFilter: string;
};

export default function SearchAndFilter({
  onSearchChange,
  onFilterChange,
  selectedFilter,
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 border border-border rounded-3xl p-4 bg-card">
      <div className="flex-1 relative bg-muted rounded-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
          {searchIcon({}) as React.ReactNode}
        </div>
        <input
          type="text"
          placeholder="Search organizations"
          className="block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D8C6C] focus:border-transparent bg-transparent text-foreground placeholder:text-muted-foreground"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="relative" ref={filterRef}>
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant="ghost"
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-muted transition-colors min-w-[180px] cursor-pointer"
        >
          <span className="text-sm font-medium text-muted-foreground">
            {venueTypeFilters.find((f) => f.value === selectedFilter)?.name ||
              "All Venue Types"}
          </span>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              isFilterOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-popover rounded-lg shadow-lg border border-border z-10">
            <div className="p-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Filter: Venue Types
              </h3>
              <div className="space-y-1">
                {venueTypeFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    onClick={() => {
                      onFilterChange(filter.value);
                      setIsFilterOpen(false);
                    }}
                    variant="ghost"
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                      selectedFilter === filter.value
                        ? "bg-accent text-accent-foreground"
                        : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.name}</span>
                      {selectedFilter === filter.value && (
                        <svg
                          className="w-4 h-4 text-muted-foreground"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}