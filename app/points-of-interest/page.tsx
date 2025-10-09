"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import POIHeader from "./components/POIHeader";
import POIStats from "./components/POIStats";
import POITabs from "./components/POITabs";
import POISearchAndFilters from "./components/POISearchAndFilters";
import POIGrid from "./components/POIGrid";
import { CreatePOIModal } from "@/app/dashboard/[id]/components/CreatePOIModal";

export default function PointsOfInterestPage() {
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
        <POISearchAndFilters />
        <POIGrid />
      </div>
      <CreatePOIModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </DashboardLayout>
  );
}
