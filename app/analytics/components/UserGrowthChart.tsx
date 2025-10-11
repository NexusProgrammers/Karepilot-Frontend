"use client";

import { ChartContainer } from "@/components/common/ChartContainer";
import { LineChartComponent } from "@/components/common/LineChartComponent";
import { lines, userGrowthData } from "@/lib/analytics/data";

export function UserGrowthChart({ className = "" }: { className?: string }) {
  return (
    <ChartContainer
      title="User Growth"
      subtitle="Monthly active user growth"
      className={className}
    >
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-green-500 rounded-full"></div>
          <span className="text-sm text-foreground">Current Week: $50,211</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-foreground">
            Previous Week: $60,768
          </span>
        </div>
      </div>
      <LineChartComponent data={userGrowthData} lines={lines} height={256} />
    </ChartContainer>
  );
}
