import { DashboardLayout } from "@/components/DashboardLayout";
import POIHeader from "./components/POIHeader";
import POIStats from "./components/POIStats";
import POITabs from "./components/POITabs";
import POISearchAndFilters from "./components/POISearchAndFilters";
import POIGrid from "./components/POIGrid";

export default function PointsOfInterestPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Points of Interest"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <POIHeader />
        <POIStats />
        <POITabs />
        <POISearchAndFilters />
        <POIGrid />
      </div>
    </DashboardLayout>
  );
}
