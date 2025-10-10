"use client";

import { useState, useRef, useEffect } from "react";
import { FilterOption } from "@/lib/asset-tracking/types";
import { ChevronDown, Check } from "@/icons/Icons";

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  className?: string;
}

export function FilterDropdown({ 
  label, 
  options, 
  selectedValue, 
  onSelectionChange,
  className = ""
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleOptionSelect = (value: string) => {
    onSelectionChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-muted border-0 rounded-lg text-card-foreground hover:bg-muted/80 transition-colors w-full cursor-pointer"
      >
        <span className="text-sm font-medium">{selectedOption?.label || label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors ${
                  selectedValue === option.value ? "bg-accent" : ""
                }`}
              >
                <span className="text-card-foreground">{option.label}</span>
                {selectedValue === option.value && (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}