"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import HospitalStats from "./HospitalStats";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import SystemHealth from "./SystemHealth";

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
                Terminal 4, Queens, NY{" "}
                <span className="p-2 bg-gray-200 rounded-xl text-black">
                  Hospital
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Manage patient flow, equipment, and medical facility navigation
              </p>
            </div>
          </div>
          <HospitalStats />
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
