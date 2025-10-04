import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGrid from "@/components/common/StatsGrid";
import RecentActivity from "@/components/common/RecentActivity";
import { OrganizationNav } from "./components/OrganizationNav";
import VenueTypeDistribution from "./components/VenueTypeDistribution";
import {
  organizationActivities,
  overviewStats,
  venueTypes,
} from "@/lib/organization/data";
import { OrganizationIcon } from "@/icons/dashboard";

export default function page() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-0">
        <div>
          <h1 className="text-2xl font-bold mb-1">Organization Management</h1>
          <p className="text-gray-500 mb-6">
            Manage multiple venues across different organization types
          </p>
        </div>
        <button className="bg-[#3D8C6C] p-3 rounded-full text-white flex gap-2 items-center cursor-pointer">
         <OrganizationIcon  />
          Add Organization
        </button>
      </div>
      <OrganizationNav />
      <StatsGrid stats={overviewStats} />
      <VenueTypeDistribution venues={venueTypes} />
      <RecentActivity
        title="Recent Organization Activity"
        subtitle="Latest updates and changes"
        buttonText="View Analytics"
        activities={organizationActivities}
        maxItems={4}
      />
    </DashboardLayout>
  );
}
