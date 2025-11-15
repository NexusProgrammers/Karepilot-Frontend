"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { CreatePOIModal } from "@/app/dashboard/[id]/components/CreatePOIModal";
import POIHeader from "../components/POIHeader";
import POIStats from "../components/POIStats";
import POITabs from "../components/POITabs";
import POISearchAndFilters from "../components/POISearchAndFilters";

export default function Settings() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Points of Interest"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <POIHeader onCreatePOI={() => setIsCreateModalOpen(true)} />
        <POIStats />
        <POITabs />
        <POISearchAndFilters
          search={""}
          status={"all"}
          building={""}
          onSearchChange={() => {}}
          onStatusChange={() => {}}
          onBuildingChange={() => {}}
        />
        <div>
          <h1>Settings</h1>
        </div>
      </div>
      <CreatePOIModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </DashboardLayout>
  );
}
