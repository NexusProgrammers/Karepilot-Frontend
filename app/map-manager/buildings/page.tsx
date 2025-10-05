"use client";

import { DashboardLayout } from '@/components/DashboardLayout'
import MapManagerHeader from '../components/MapManagerHeader'
import MapManagerStats from '../components/MapManagerStats'
import MapManagerTabs from '../components/MapManagerTabs'

export default function BuildingsPage() {
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
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-card-foreground mb-2">
              Buildings Management
            </h2>
            <p className="text-muted-foreground">
              Manage building configurations and settings
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}