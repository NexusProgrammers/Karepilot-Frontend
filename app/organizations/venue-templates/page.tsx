import { DashboardLayout } from "@/components/DashboardLayout";
import { OrganizationNav } from "../components/OrganizationNav";
import { OrganizationHeader } from "@/components/common/OrganizationHeader";
import { VenueTemplatesGrid } from "./components/VenueTemplatesGrid";

export default function page() {
  return (
    <DashboardLayout pageTitle="Organizations">
      <OrganizationHeader />
      <OrganizationNav />
      <VenueTemplatesGrid />
    </DashboardLayout>
  );
}
