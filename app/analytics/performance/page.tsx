"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGrid from "@/components/common/StatsGrid";
import {
  performanceStats,
  navigationTabs,
  performanceStatisticsData,
} from "@/lib/analytics/data";
import NavigationTabs from "@/components/common/NavigationTabs";
import { DateRangePicker } from "../components/DateRangePicker";
import { ChartContainer } from "@/components/common/ChartContainer";
import { LineChartComponent } from "@/components/common/LineChartComponent";
import { performanceTrendsData, performanceLines } from "@/lib/analytics/data";
import { SystemHealthComponent } from "@/components/common/SystemHealthComponent";
import { performanceSystemHealth } from "@/lib/analytics/data";
import { PerformanceStatistics } from "./components/PerformanceStatistics";

export default function page() {
  const handleDateRangeChange = (range: string) => {
    console.log("Date range changed to:", range);
  };

  const handleRefresh = async () => {
    console.log("Refreshing data...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <DashboardLayout
      pageTitle="Analytics & Reports"
      showOrganizationHeader={true}
      showBackButton={true}
      backLink="/"
      organizationName="Central Medical Hospital"
    >
      <div className="space-y-6">
        <DateRangePicker
          onDateRangeChange={handleDateRangeChange}
          onRefresh={handleRefresh}
          defaultRange="Last 7 days"
        />

        <NavigationTabs
          tabs={navigationTabs}
          maxWidth="max-w-[550px]"
          responsive={true}
        />

        <StatsGrid
          stats={performanceStats}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SystemHealthComponent
            title="System Health"
            subtitle="Real-time system performance metrics"
            data={performanceSystemHealth}
          />
          <ChartContainer
            title="Performance Trends"
            subtitle="System performance over time"
          >
            <LineChartComponent
              data={performanceTrendsData}
              lines={performanceLines}
              height={320}
            />
          </ChartContainer>
        </div>
        <PerformanceStatistics
          title="Performance Statistics"
          stats={performanceStatisticsData}
        />
      </div>
    </DashboardLayout>
  );
}
