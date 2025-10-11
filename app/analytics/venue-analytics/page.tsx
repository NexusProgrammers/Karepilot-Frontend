"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import {
  navigationTabs,
  mostPopularDestinationsData,
  venuePerformanceStats,
} from "@/lib/analytics/data";
import NavigationTabs from "@/components/common/NavigationTabs";
import { DateRangePicker } from "../components/DateRangePicker";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { PerformanceStatistics } from "@/components/common/PerformanceStatistics";
import { MostPopularDestinations } from "./components/MostPopularDestinations";
import { UsagePatterns } from "./components/UsagePatterns";
import { VenuePerformanceStatistics } from "./components/VenuePerformanceStatistics";

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
          gridClassName="grid grid-cols-2 lg:grid-cols-5 gap-4"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MostPopularDestinations
            title="Most Popular Destinations"
            subtitle="Top visited POIs and areas"
            destinations={mostPopularDestinationsData}
          />

          <UsagePatterns
            title="Usage Patterns"
            subtitle="Peak hours and usage distribution"
          />
        </div>
        <VenuePerformanceStatistics />
      </div>
    </DashboardLayout>
  );
}
