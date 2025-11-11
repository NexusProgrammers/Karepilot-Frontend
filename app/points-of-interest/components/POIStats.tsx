"use client";

import { useMemo } from "react";
import { poiStatsConfig } from "@/lib/points-of-interest/data";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import { useGetPointsOfInterestQuery } from "@/lib/api/pointsOfInterestApi";
import type { PointsOfInterestQuery } from "@/lib/types/points-of-interest/api";

type POIStatsProps = {
  queryParams?: PointsOfInterestQuery;
};

export default function POIStats({ queryParams }: POIStatsProps) {
  const {
    data,
    isLoading,
  } = useGetPointsOfInterestQuery(queryParams ?? undefined);

  const statsValues = data?.data?.stats;

  const stats = useMemo(
    () =>
      poiStatsConfig.map((config) => ({
        id: config.id,
        title: config.title,
        value: statsValues ? statsValues[config.key] ?? 0 : 0,
        icon: config.icon,
        iconBg: config.iconBg,
        iconColor: config.iconColor,
      })),
    [statsValues],
  );

  if (isLoading && !data) {
    return <StatsGridSkeleton />;
  }

  return <StatsGridWithIcons stats={stats} />;
}

