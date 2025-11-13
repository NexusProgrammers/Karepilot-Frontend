"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationSwitcherProps {
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function OrganizationSwitcher({
  options,
  value,
  onChange,
  isLoading,
}: OrganizationSwitcherProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading || options.length === 0}>
      <SelectTrigger className="w-full md:w-64 rounded-xl bg-background border-border">
        <SelectValue placeholder={isLoading ? "Loading organizations..." : "Select organization"} />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


