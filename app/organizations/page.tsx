"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import Tabs from "./components/Tabs";
import StatsGrid, { StatItem } from "@/components/common/StatsGrid";
import DashboardIcon from "@/assets/dashboard/dashboard.svg";
import activeIcon from "@/assets/organization/active-organizations.svg";
import hospitalsIcon from "@/assets/organization/hospitals.svg";
import otherIcon from "@/assets/organization/other-venues.svg";
import { AddOrganizationIcon } from "@/icons/dashboard";

const overviewStats: StatItem[] = [
  {
    id: 1,
    title: "Total Organizations",
    value: "6",
    change: "+20%",
    note: "from last week",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Active Organizations",
    value: "6",
    change: "+20%",
    note: "from last week",
    icon: activeIcon,
  },
  {
    id: 3,
    title: "Hospitals",
    value: "2",
    change: "+50%",
    note: "from last week",
    icon: hospitalsIcon,
  },
  {
    id: 4,
    title: "Other Venues",
    value: "4",
    change: "+0%",
    note: "from last week",
    icon: otherIcon,
  },
];

export default function OrganizationDashboard() {
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
          <AddOrganizationIcon />
          Add Organization</button>
      </div>

      <Tabs
        defaultActive="overview"
        tabs={[
          {
            id: "overview",
            label: "Overview",
            content: <StatsGrid stats={overviewStats} />,
          },
          {
            id: "organizations",
            label: "Organizations",
            content: <div>Organizations content goes here</div>,
          },
          {
            id: "venue-templates",
            label: "Venue Templates",
            content: <div>Venue templates content goes here</div>,
          },
        ]}
      />
    </DashboardLayout>
  );
}
