"use client";

import { PointOfInterestModal } from "@/app/dashboard/[id]/components/CreatePOIModal";
import { useGetPointOfInterestByIdQuery } from "@/lib/api/pointsOfInterestApi";
import { useState, useCallback } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  POIDetailHeader,
  BasicInformationCard,
  ContactInformationCard,
  AccessibilityFeaturesCard,
  QuickActionsCard,
  StatusMetadataCard,
  LocationPreviewCard,
  POIDetailSkeleton,
} from ".";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { useDeletePointOfInterestMutation } from "@/lib/api/pointsOfInterestApi";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";

export default function POIDetailPage() {
  const params = useParams<{ id: string }>();
  const poiRouteId = params?.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [skipDetailQuery, setSkipDetailQuery] = useState(false);
  const router = useRouter();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPointOfInterestByIdQuery(poiRouteId!, {
    skip: skipDetailQuery || !poiRouteId,
  });

  const [deletePointOfInterest, { isLoading: isDeleting }] = useDeletePointOfInterestMutation();

  const poi = data?.data?.pointOfInterest;
  const poiRecordId = poi?.id;
  const poiName = poi?.name ?? "";

  const isBusy = isLoading || isFetching;

  const handleCloseDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!poiRecordId) {
      return;
    }

    setSkipDetailQuery(true);

    await deletePointOfInterest(poiRecordId).unwrap();
    router.push("/points-of-interest");
  }, [deletePointOfInterest, poiRecordId, router]);

  if (isBusy) {
    return (
      <DashboardLayout
        showBackButton={true}
        backLink="/points-of-interest"
        pageTitle="Points of Interest"
      >
        <POIDetailSkeleton />
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

  if (skipDetailQuery) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  if (!poi || !poiRouteId) {
    notFound();
  }

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
                isDeleteLoading={isDeleting}
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

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
          title="Delete Point of Interest"
          description="This will permanently remove the selected point of interest and all of its details. This action cannot be undone."
          itemName={poiName}
          itemType="point of interest"
          isLoading={isDeleting}
        />
      </div>
    </DashboardLayout>
  );
}
