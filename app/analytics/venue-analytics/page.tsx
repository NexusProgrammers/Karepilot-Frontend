"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { navigationTabs, venuePerformanceStats } from "@/lib/analytics/data";
import NavigationTabs from "@/components/common/NavigationTabs";
import { DateRangePicker } from "../components/DateRangePicker";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { PerformanceStatistics } from "@/components/common/PerformanceStatistics";

export default function page() {
  const handleDateRangeChange = (range: string) => {
    console.log("Date range changed to:", range);
  };

  const handleRefresh = async () => {
    console.log("Refreshing data...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleExportData = () => {
    console.log("Exporting analytics data...");
  };

  const handleGenerateReport = () => {
    console.log("Generating analytics report...");
  };

  return (
    <DashboardLayout
      pageTitle=""
      showOrganizationHeader={true}
      showBackButton={true}
      backLink="/"
      organizationName="Central Medical Hospital"
    >
      <div className="space-y-6">
        <AnalyticsHeader
          onExportData={handleExportData}
          onGenerateReport={handleGenerateReport}
        />

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

        <PerformanceStatistics
          stats={venuePerformanceStats}
          showBorder={false}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        />
      </div>
    </DashboardLayout>
  );
}
