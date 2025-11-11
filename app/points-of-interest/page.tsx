"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import POIHeader from "./components/POIHeader";
import POIStats from "./components/POIStats";
import POITabs from "./components/POITabs";
import POISearchAndFilters from "./components/POISearchAndFilters";
import POIGrid from "./components/POIGrid";
import { PointOfInterestModal } from "@/app/dashboard/[id]/components/CreatePOIModal";

export default function PointsOfInterestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout
      showBackButton={true}
      showOrganizationHeader={true}
      organizationName="Central Medical Hospital"
      pageTitle="Points of Interest"
      backLink="/dashboard/central-medical-hospital"
    >
      <div className="space-y-6">
        <POIHeader onCreatePOI={() => setIsModalOpen(true)} />
        <POIStats />
        <POITabs />
        <POISearchAndFilters />
        <POIGrid />
      </div>
      <PointOfInterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pointOfInterest={null}
      />
    </DashboardLayout>
  );
}
