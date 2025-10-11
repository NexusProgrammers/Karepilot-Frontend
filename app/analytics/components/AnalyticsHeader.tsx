"use client";

import { Button } from "@/components/ui/button";
import { Upload, BarChart3 } from "@/icons/Icons";
import Link from "next/link";

interface AnalyticsHeaderProps {
  title?: string;
  subtitle?: string;
  onExportData?: () => void;
  onGenerateReport?: () => void;
  className?: string;
}

export function AnalyticsHeader({
  title = "Analytics & Reports",
  subtitle = "Insights into hospital navigation and device usage",
  onExportData,
  onGenerateReport,
  className = "",
}: AnalyticsHeaderProps) {
  const handleExportData = () => {
    if (onExportData) {
      onExportData();
    } else {
      console.log("Export Data clicked");
    }
  };

  const handleGenerateReport = () => {
    if (onGenerateReport) {
      onGenerateReport();
    } else {
      console.log("Generate Report clicked");
    }
  };

  return (
    <div className={`bg-background ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/analytics/export-data">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="flex items-center cursor-pointer gap-2 bg-background hover:bg-accent hover:text-accent-foreground border-border text-foreground"
            >
              <Upload className="w-4 h-4" />
              <span>Export Data</span>
            </Button>
          </Link>

          <Link href="/analytics/generate-report">
            <Button
              variant="outline"
              onClick={handleGenerateReport}
              className="flex items-center gap-2 cursor-pointer bg-[#3D8C6C] hover:bg-[#2F6B54] hover:text-white text-white"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Generate Report</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
