"use client";

import { ChartContainer } from "@/components/common/ChartContainer";
import { LineChartComponent } from "@/components/common/LineChartComponent";
import { performanceLines, performanceTrendsData } from "@/lib/analytics/data";

export function PerformanceTrendsChart({
  className = "",
}: {
  className?: string;
}) {
  return (
    <ChartContainer
      title="Performance Trends"
      subtitle="System performance over time"
      className={className}
    >
      <LineChartComponent
        data={performanceTrendsData}
        lines={performanceLines}
        height={320}
      />
    </ChartContainer>
  );
}
