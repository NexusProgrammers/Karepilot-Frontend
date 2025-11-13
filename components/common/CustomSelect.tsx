"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, LucideIcon } from "@/icons/Icons";

interface CustomSelectProps {
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  options:
    | string[]
    | {
        name?: string;
        label?: string;
        icon?: LucideIcon;
        value?: string;
      }[];
  placeholder: string;
  label: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export function CustomSelect({
  name,
  value,
  onChange,
  onValueChange,
  options,
  placeholder,
  label,
  required = false,
  icon,
  error,
  touched,
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOptionSelect = onValueChange ?? onChange ?? (() => {});
  const labelId = name ? `${name}-label` : undefined;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasError = touched && error;

  const normalizedOptions = (options as Array<
    string | { name?: string; label?: string; icon?: LucideIcon; value?: string }
  >).map((option) => {
    if (typeof option === "string") {
      return {
        name: option,
        value: option,
        IconComponent: null as LucideIcon | null,
      };
    }

    const optionName = option.name ?? option.label ?? option.value ?? "";
    return {
      name: optionName,
      value: option.value ?? optionName,
      IconComponent: option.icon ?? null,
    };
  });

  const selectedOption = normalizedOptions.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.name : value;
  
  return (
    <div>
      <label
        id={labelId}
        className={`block text-xs font-medium mb-1.5 ${hasError ? 'text-red-500' : 'text-muted-foreground'}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative" ref={dropdownRef}>
        <Button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          variant="ghost"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={labelId}
          className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-left 
          focus:outline-none transition-colors flex items-center justify-between gap-2 ${
            disabled 
              ? 'cursor-not-allowed opacity-50' 
              : 'cursor-pointer'
          } ${
            hasError 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-border focus:border-foreground'
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && (
              <span className="text-muted-foreground shrink-0">{icon}</span>
            )}
            <span
              className={value ? "text-foreground" : "text-muted-foreground"}
            >
              {value ? displayValue : placeholder}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover rounded-xl shadow-lg border border-border py-2 z-50 max-h-60 overflow-auto">
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground">
              {placeholder}
            </div>
            {normalizedOptions.map((option) => {
              return (
                <Button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    handleOptionSelect(option.value);
                    setIsOpen(false);
                  }}
                  variant="ghost"
                  className="w-full px-4 py-2.5 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer justify-start"
                >
                  <div className="flex items-center gap-2">
                    {option.IconComponent && <option.IconComponent className="w-4 h-4" />}
                    <span>{option.name}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
