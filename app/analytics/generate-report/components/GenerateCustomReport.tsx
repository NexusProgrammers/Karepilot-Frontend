"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { ReportSection } from "@/lib/analytics/types";
import { ArrowUpRight } from "@/icons/Icons";
import { CustomSelect } from "@/components/common/CustomSelect";

interface GenerateCustomReportProps {
  title: string;
  subtitle: string;
  dateRangeOptions: string[];
  formatOptions: string[];
  sections: ReportSection[];
  onSectionToggle: (sectionId: number) => void;
  onGenerateReport: () => void;
  className?: string;
}

export function GenerateCustomReport({
  title,
  subtitle,
  dateRangeOptions,
  formatOptions,
  sections,
  onSectionToggle,
  onGenerateReport,
  className = "",
}: GenerateCustomReportProps) {
  const [selectedDateRange, setSelectedDateRange] = useState("Last 30 days");
  const [selectedFormat, setSelectedFormat] = useState("PDF Report");

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
          <label className="text-sm font-medium text-foreground mb-2 block">
            Date Range *
          </label>
          <CustomSelect
            options={dateRangeOptions}
            value={selectedDateRange}
            onChange={setSelectedDateRange}
            placeholder="Select date range"
            label=""
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Export Format *
          </label>
          <CustomSelect
            options={formatOptions}
            value={selectedFormat}
            onChange={setSelectedFormat}
            placeholder="Select format"
            label=""
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            Include Sections
          </label>
          <div className="space-y-3">
            {sections.map((section) => (
              <CustomCheckbox
                key={section.id}
                id={`section-${section.id}`}
                label={section.name}
                checked={section.checked}
                onChange={() => onSectionToggle(section.id)}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={onGenerateReport}
          className="w-full bg-[#2F6B54] hover:bg-[#2F6B54] cursor-pointer text-white flex items-center justify-center gap-2 py-3"
        >
          <ArrowUpRight className="w-4 h-4" />
          Create Custom Export
        </Button>
      </div>
    </div>
  );
}
