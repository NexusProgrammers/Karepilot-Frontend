"use client";

import StatsGridWithIcons, {
  StatItemWithIcon,
} from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import { Building2, Users, Map, Grid3x3 } from "@/icons/Icons";
import type { MapManagerBuildingStats } from "@/lib/types/map-manager/buildings";

interface MapManagerBuildingStatsProps {
  stats?: MapManagerBuildingStats | null;
  isLoading?: boolean;
}

const buildStatsItems = (
  stats?: MapManagerBuildingStats | null,
): StatItemWithIcon[] => [
  {
    id: "total-buildings",
    title: "Total Buildings",
    value: stats?.total ?? 0,
    icon: Building2,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "active-buildings",
    title: "Active Buildings",
    value: stats?.active ?? 0,
    icon: Users,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "inactive-buildings",
    title: "Inactive Buildings",
    value: stats?.inactive ?? 0,
    icon: Map,
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "total-floors",
    title: "Total Floors",
    value: stats?.totalFloors ?? 0,
    icon: Grid3x3,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function MapManagerBuildingStats({
  stats,
  isLoading,
}: MapManagerBuildingStatsProps) {
  if (isLoading) {
    return <StatsGridSkeleton />;
  }

  return <StatsGridWithIcons stats={buildStatsItems(stats)} />;
}


