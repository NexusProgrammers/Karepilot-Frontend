"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import SystemHealth from "./SystemHealth";
import activePatientsIcon from "@/assets/dashboard/central-medical-hospital/active-patients.svg";
import emergencyAlertsIcon from "@/assets/dashboard/central-medical-hospital/emergency-alerts.svg";
import equipmentTrackedIcon from "@/assets/dashboard/central-medical-hospital/equipment-tracked.svg";
import navigationRequestsIcon from "@/assets/dashboard/central-medical-hospital/navigation-requests.svg";
import StatsGrid, { StatItem } from "@/components/common/StatsGrid";

const hospitalStats: StatItem[] = [
  {
    id: 1,
    title: "Active Patients",
    value: "432",
    change: "+12%",
    note: "from last week",
    icon: activePatientsIcon,
  },
  {
    id: 2,
    title: "Emergency Alerts",
    value: "450",
    change: "+3%",
    note: "from last week",
    icon: emergencyAlertsIcon,
  },
  {
    id: 3,
    title: "Equipment Tracked",
    value: "512",
    change: "+7%",
    note: "from last week",
    icon: equipmentTrackedIcon,
  },
  {
    id: 4,
    title: "Navigation Requests",
    value: "370",
    change: "+14%",
    note: "from last week",
    icon: navigationRequestsIcon,
  },
];

export default function HospitalDetail() {
  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Dashboard"
      backLink="/"
    >
      <div className="mx-auto">
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Central Medical Hospital
              </h1>
              <p className="text-sm text-gray-500 mb-2">
                Terminal 4, Queens, NY
                <span className="p-2 bg-gray-200 rounded-xl text-black">
                  Hospital
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Manage patient flow, equipment, and medical facility navigation
              </p>
            </div>
          </div>
          <StatsGrid stats={hospitalStats} />
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActions />
            <SystemHealth />
          </div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}
