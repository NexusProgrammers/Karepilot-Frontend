import { DashboardLayout } from "@/components/DashboardLayout";
import { OrganizationNav } from "../components/OrganizationNav";
import OrganizationsList from "./components/OrganizationsList";
import { organizations } from "@/lib/organization/data";
import { OrganizationIcon } from "@/icons/dashboard";

export default function OrganizationsListPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-0">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-foreground">Organization Management</h1>
          <p className="text-muted-foreground mb-6">
            Manage multiple venues across different organization types
          </p>
        </div>
        <button className="bg-[#3D8C6C] p-3 rounded-full text-white flex gap-2 items-center cursor-pointer">
          <OrganizationIcon />
          Add Organization
        </button>
      </div>
      <OrganizationNav />
      <OrganizationsList organizations={organizations} />
    </DashboardLayout>
  );
}