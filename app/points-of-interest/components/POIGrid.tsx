"use client";

import { useGetPointsOfInterestQuery } from "@/lib/api/pointsOfInterestApi";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import POICard from "./POICard";
import { POIGridSkeleton } from "./POIGridSkeleton";

export default function POIGrid() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPointsOfInterestQuery();

  const pointsOfInterest = data?.data?.pointsOfInterest ?? [];
  const isBusy = isLoading || isFetching;

  if (isBusy) {
    return <POIGridSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        error={error}
        onRetry={() => refetch()}
        retryLabel="Retry loading points of interest"
      />
    );
  }

  if (!pointsOfInterest.length) {
    return (
      <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
        No points of interest found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {pointsOfInterest.map((poi) => (
        <POICard key={poi.id} poi={poi} />
      ))}
    </div>
  );
}

