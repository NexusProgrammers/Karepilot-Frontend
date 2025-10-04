"use client";

import { useState, useRef, useEffect } from "react";
import { venueTypeFilters } from "@/lib/organization/data";
import { searchIcon } from "@/icons/dashboard";

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
    <div className="flex flex-col sm:flex-row gap-4 mb-6 border border-gray-300 rounded-3xl p-4">
      <div className="flex-1 relative bg-gray-100 rounded-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {searchIcon({}) as React.ReactNode}
        </div>
        <input
          type="text"
          placeholder="Search organizations"
          className="block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D8C6C] focus:border-transparent"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="relative" ref={filterRef}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 transition-colors min-w-[180px] cursor-pointer"
        >
          <span className="text-sm font-medium text-gray-700">
            {venueTypeFilters.find((f) => f.value === selectedFilter)?.name ||
              "All Venue Types"}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
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
        </button>

        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Filter: Venue Types
              </h3>
              <div className="space-y-1">
                {venueTypeFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      onFilterChange(filter.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedFilter === filter.value
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.name}</span>
                      {selectedFilter === filter.value && (
                        <svg
                          className="w-4 h-4 text-gray-600"
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
