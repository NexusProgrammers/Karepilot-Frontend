"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGrid from "@/components/common/StatsGrid";
import { analyticsStats, navigationTabs } from "@/lib/analytics/data";
import NavigationTabs from "@/components/common/NavigationTabs";
import { DateRangePicker } from "../components/DateRangePicker";

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
          stats={analyticsStats}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        />
      </div>
    </DashboardLayout>
  );
}
