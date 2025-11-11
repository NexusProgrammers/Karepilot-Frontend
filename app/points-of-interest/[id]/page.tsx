"use client";

import { PointOfInterestModal } from "@/app/dashboard/[id]/components/CreatePOIModal";
import { useGetPointOfInterestByIdQuery } from "@/lib/api/pointsOfInterestApi";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
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
import { QueryErrorState } from "@/components/common/QueryErrorState";

function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 bg-muted rounded animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`poi-detail-skeleton-${index}`}
            className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse"
          >
            <div className="h-6 w-1/2 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-2/3 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function POIDetailPage() {
  const params = useParams<{ id: string }>();
  const poiId = params?.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPointOfInterestByIdQuery(poiId!, {
    skip: !poiId,
  });

  if (!poiId) {
    notFound();
  }

  const isBusy = isLoading || isFetching;

  if (isBusy) {
    return (
      <DashboardLayout
        showBackButton={true}
        backLink="/points-of-interest"
        pageTitle="Points of Interest"
      >
        <DetailSkeleton />
      </DashboardLayout>
    );
  }

  if (isError) {
    const status = (error as any)?.status;
    if (status === 404) {
      notFound();
    }

    return (
      <DashboardLayout
        showBackButton={true}
        backLink="/points-of-interest"
        pageTitle="Points of Interest"
      >
        <QueryErrorState
          error={error}
          onRetry={() => refetch()}
          retryLabel="Retry loading point of interest"
        />
      </DashboardLayout>
    );
  }

  const poi = data?.data?.pointOfInterest;

  if (!poi) {
    notFound();
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    console.log("Delete POI:", poi.id);
  };

  const handleViewOnMapClick = () => {
    console.log("View on map:", poi.id);
  };

  const handleGetDirectionsClick = () => {
    console.log("Get directions:", poi.id);
  };

  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/points-of-interest"
      pageTitle="Points of Interest"
    >
      <div className="min-h-screen bg-background">
        <POIDetailHeader poi={poi} />

        <div className="py-4">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full lg:w-[60%] flex flex-col gap-5">
              <BasicInformationCard poi={poi} />
              <ContactInformationCard poi={poi} />
              <AccessibilityFeaturesCard poi={poi} />
            </div>

            <div className="w-full lg:w-[40%] flex flex-col gap-5">
              <QuickActionsCard
                poi={poi}
                onEditClick={handleEditClick}
                onViewOnMapClick={handleViewOnMapClick}
                onGetDirectionsClick={handleGetDirectionsClick}
                onDeleteClick={handleDeleteClick}
              />
              <StatusMetadataCard poi={poi} />
              <LocationPreviewCard poi={poi} />
            </div>
          </div>
        </div>

        <PointOfInterestModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          pointOfInterest={poi}
        />
      </div>
    </DashboardLayout>
  );
}
