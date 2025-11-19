"use client";

import { useGetAllFloorPlansQuery } from "@/lib/api/floorPlansApi";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import { MapPin, CheckCircle, Edit3 } from "@/icons/Icons";
import { StatItemWithIcon } from "@/components/common/StatsGridWithIcons";

export default function MapManagerStats() {
  const { data, isLoading } = useGetAllFloorPlansQuery({
    page: 1,
    limit: 1,
  });

  if (isLoading) {
    return <StatsGridSkeleton count={3} />;
  }

  const stats = data?.data.stats;
  if (!stats) {
    return <StatsGridSkeleton count={3} />;
  }

  const mapStats: StatItemWithIcon[] = [
    {
      id: 1,
      title: "Total Maps",
      value: stats.totalMaps.toString(),
      icon: MapPin,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      title: "Published Maps",
      value: stats.publishedMaps.toString(),
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Drafted Maps",
      value: stats.draftedMaps.toString(),
      icon: Edit3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return <StatsGridWithIcons stats={mapStats} />;
}
