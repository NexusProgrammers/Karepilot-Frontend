"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { dateRangeOptions } from "@/lib/analytics/data";

interface DateRangePickerProps {
  onRefresh?: () => void;
  onDateRangeChange?: (range: string) => void;
  defaultRange?: string;
}

export function DateRangePicker({
  onRefresh,
  onDateRangeChange,
  defaultRange = "Last 7 days",
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState(defaultRange);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    onDateRangeChange?.(range);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh?.();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="w-full border border-border rounded-4xl p-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <span className="text-sm font-medium text-foreground whitespace-nowrap mt-0 lg:mt-2">
            Date Range:
          </span>
          <div className="w-full sm:w-auto min-w-[140px]">
            <CustomSelect
              value={selectedRange}
              onChange={handleRangeChange}
              options={dateRangeOptions}
              placeholder="Select date range"
              label=""
              required={false}
            />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="w-full sm:w-auto cursor-pointer mt-0 md:mt-2 bg-background hover:bg-accent hover:text-accent-foreground border-border/50 shadow-sm transition-all duration-200"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
}
