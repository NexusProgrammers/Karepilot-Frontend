"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import QuickActions from "./QuickActions";
import RecentActivity from "../../../../components/common/RecentActivity";
import SystemHealth from "./SystemHealth";
import { dashboardActivities, hospitalStats } from "@/lib/dashboard/data";
import StatsGrid from "@/components/common/StatsGrid";

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
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Central Medical Hospital
              </h1>
              <p className="text-sm text-muted-foreground mb-2">
                Terminal 4, Queens, NY
                <span className="p-2 bg-muted rounded-xl text-foreground">
                  Hospital
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
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
          <RecentActivity
            title="Recent Activity"
            subtitle="Latest updates for Central Medical Hospital"
            buttonText="View All"
            activities={dashboardActivities}
            maxItems={6}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}