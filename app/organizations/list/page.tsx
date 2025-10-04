import { DashboardLayout } from "@/components/DashboardLayout";
import { OrganizationNav } from "../components/OrganizationNav";
import OrganizationsList from "./components/OrganizationsList";
import { organizations } from "@/lib/organization/data";
import { OrganizationHeader } from "@/components/common/OrganizationHeader";

export default function OrganizationsListPage() {
  return (
    <DashboardLayout pageTitle="Organizations">
      <OrganizationHeader />
      <OrganizationNav />
      <OrganizationsList organizations={organizations} />
    </DashboardLayout>
  );
}