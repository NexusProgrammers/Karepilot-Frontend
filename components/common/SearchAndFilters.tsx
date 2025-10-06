"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

export type FilterOption = {
  label: string;
  value: string;
};

export type SearchAndFiltersProps = {
  searchPlaceholder?: string;
  filters?: {
    label: string;
    options: FilterOption[];
    defaultValue?: string;
  }[];
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filterLabel: string, value: string) => void;
};

export default function SearchAndFilters({
  searchPlaceholder = "Search...",
  filters = [],
  onSearchChange,
  onFilterChange,
}: SearchAndFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>(
    () => {
      const initialFilters: Record<string, string> = {};
      filters.forEach((filter) => {
        initialFilters[filter.label] =
          filter.defaultValue || filter.options[0]?.value || "";
      });
      return initialFilters;
    }
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleFilterSelect = (filterLabel: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [filterLabel]: value }));
    setOpenDropdown(null);
    onFilterChange?.(filterLabel, value);
  };

  const toggleDropdown = (filterLabel: string) => {
    setOpenDropdown((prev) => (prev === filterLabel ? null : filterLabel));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-border rounded-2xl p-2 bg-card">
      <div className="relative flex-1 w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background transition-colors"
          />
        </div>
      </div>

      {filters.length > 0 && (
        <div className="flex gap-3">
          {filters.map((filter) => (
            <div
              key={filter.label}
              className="relative"
              ref={(el) => {
                dropdownRefs.current[filter.label] = el;
              }}
            >
              <button
                onClick={() => toggleDropdown(filter.label)}
                className="flex items-center justify-between gap-2 px-6 py-2.5 bg-muted border-0 rounded-lg text-foreground hover:bg-muted/80 transition-colors min-w-[140px] md:min-w-[200px] cursor-pointer"
              >
                <span className="text-sm">
                  {filter.options.find(
                    (opt) => opt.value === selectedFilters[filter.label]
                  )?.label || filter.options[0]?.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openDropdown === filter.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === filter.label && (
                <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    {filter.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterSelect(filter.label, option.value)
                        }
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent ${
                          selectedFilters[filter.label] === option.value
                            ? "bg-accent"
                            : ""
                        }`}
                      >
                        <span className="text-popover-foreground">
                          {option.label}
                        </span>
                        {selectedFilters[filter.label] === option.value && (
                          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

