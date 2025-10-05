"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

export default function SearchAndFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [buildingFilter, setBuildingFilter] = useState("All Buildings");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const buildingDropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = ["All Status", "Published", "Draft", "Archived"];
  const buildingOptions = [
    "All Buildings",
    "Main Building",
    "Emergency Wing",
    "Diagnostic Center",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        buildingDropdownRef.current &&
        !buildingDropdownRef.current.contains(event.target as Node)
      ) {
        setShowBuildingDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusDropdownToggle = () => {
    setShowBuildingDropdown(false);
    setShowStatusDropdown(!showStatusDropdown);
  };

  const handleBuildingDropdownToggle = () => {
    setShowStatusDropdown(false);
    setShowBuildingDropdown(!showBuildingDropdown);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border border-border rounded-2xl p-2 bg-card">
      <div className="relative flex-1 w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <input
            type="text"
            placeholder="Search floor plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted border-0 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative" ref={statusDropdownRef}>
          <button
            onClick={handleStatusDropdownToggle}
            className="flex items-center justify-between gap-2 px-6 py-2.5 bg-muted border-0 rounded-lg text-foreground hover:bg-muted/80 transition-colors min-w-[140px] md:min-w-[200px] cursor-pointer"
          >
            <span className="text-sm">{statusFilter}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                showStatusDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg z-50">
              <div className="p-2">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent ${
                      statusFilter === option ? "bg-accent" : ""
                    }`}
                  >
                    <span className="text-popover-foreground">{option}</span>
                    {statusFilter === option && (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={buildingDropdownRef}>
          <button
            onClick={handleBuildingDropdownToggle}
            className="flex items-center justify-between gap-2 px-6 py-2.5 bg-muted border-0 rounded-lg text-foreground cursor-pointer hover:bg-muted/80 transition-colors min-w-[140px] md:min-w-[200px]"
          >
            <span className="text-sm">{buildingFilter}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                showBuildingDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showBuildingDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-popover border border-border rounded-lg shadow-lg z-50">
              <div className="p-2">
                {buildingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBuildingFilter(option);
                      setShowBuildingDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent ${
                      buildingFilter === option ? "bg-accent" : ""
                    }`}
                  >
                    <span className="text-popover-foreground">{option}</span>
                    {buildingFilter === option && (
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
