import { DashboardLayout } from "@/components/DashboardLayout";
import MapManagerHeader from "../components/MapManagerHeader";
import MapManagerStats from "../components/MapManagerStats";
import MapManagerTabs from "../components/MapManagerTabs";
import BuildingGrid from "../components/BuildingGrid";

export default function page() {
  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Map Manager"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <MapManagerHeader />
        <MapManagerStats />
        <MapManagerTabs />
        <BuildingGrid />
      </div>
    </DashboardLayout>
  );
}

