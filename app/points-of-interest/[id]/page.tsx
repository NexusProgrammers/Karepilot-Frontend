"use client";

import { poisData } from "@/lib/points-of-interest/data";
import { EditPOIModal } from "@/app/dashboard/[id]/components/EditPOIModal";
import { useState } from "react";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  POIDetailHeader,
  BasicInformationCard,
  ContactInformationCard,
  AccessibilityFeaturesCard,
  QuickActionsCard,
  StatusMetadataCard,
  LocationPreviewCard,
} from "./components";

export default function POIDetailPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const poiId = 1;
  const foundPoi = poisData.find((p) => p.id === poiId);

  if (!foundPoi) {
    notFound();
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    console.log("Delete POI:", foundPoi.id);
  };

  const handleViewOnMapClick = () => {
    console.log("View on map:", foundPoi.id);
  };

  const handleGetDirectionsClick = () => {
    console.log("Get directions:", foundPoi.id);
  };

  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/points-of-interest"
      pageTitle="Points of Interest"
    >
      <div className="min-h-screen bg-background">
        <POIDetailHeader poi={foundPoi} />

        <div className="py-4">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full lg:w-[60%] flex flex-col gap-5">
              <BasicInformationCard poi={foundPoi} />
              <ContactInformationCard poi={foundPoi} />
              <AccessibilityFeaturesCard />
            </div>

            <div className="w-full lg:w-[40%] flex flex-col gap-5">
              <QuickActionsCard
                poi={foundPoi}
                onEditClick={handleEditClick}
                onViewOnMapClick={handleViewOnMapClick}
                onGetDirectionsClick={handleGetDirectionsClick}
                onDeleteClick={handleDeleteClick}
              />
              <StatusMetadataCard poi={foundPoi} />
              <LocationPreviewCard poi={foundPoi} />
            </div>
          </div>
        </div>

        <EditPOIModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          poi={foundPoi}
        />
      </div>
    </DashboardLayout>
  );
}
