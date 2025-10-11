"use client";

import { CustomSelect } from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "@/icons/Icons";

interface DataCategory {
  id: number;
  name: string;
  checked: boolean;
}

interface CustomExportProps {
  title: string;
  subtitle: string;
  dataCategories: DataCategory[];
  dateRangeOptions: string[];
  formatOptions: string[];
  className?: string;
}

export function CustomExport({
  title,
  subtitle,
  dataCategories,
  dateRangeOptions,
  formatOptions,
  className = "",
}: CustomExportProps) {
  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">
            Data Categories
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {dataCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={category.checked}
                  className="data-[state=checked]:bg-[#3D8C6C] data-[state=checked]:border-[#3D8C6C] cursor-pointer"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm text-foreground cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Date Range *
          </label>
          <CustomSelect
            label=""
            options={dateRangeOptions}
            value="Last 30 days"
            onChange={() => {}}
            placeholder="Select date range"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Export Format *
          </label>
          <CustomSelect
            label=""
            options={formatOptions}
            value="CSV"
            onChange={() => {}}
            placeholder="Select format"
          />
        </div>

        <Button className="w-full bg-[#3D8C6C] hover:bg-[#2F6B54] text-white flex items-center gap-2 cursor-pointer">
          <Upload className="w-4 h-4" />
          Create Custom Export
        </Button>
      </div>
    </div>
  );
}
