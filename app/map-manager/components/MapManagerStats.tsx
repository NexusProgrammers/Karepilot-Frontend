"use client";

import StatsGridWithIcons, {
  StatItemWithIcon,
} from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import { Map, CheckCircle2, ClipboardList, Archive, Layers } from "@/icons/Icons";
import { MapManagerFloorPlanStats } from "@/lib/types/map-manager";

interface MapManagerStatsProps {
  stats?: MapManagerFloorPlanStats | null;
  isLoading?: boolean;
}

const buildStatsItems = (
  stats?: MapManagerFloorPlanStats | null,
): StatItemWithIcon[] => [
  {
    id: "total-floor-plans",
    title: "Total Floor Plans",
    value: stats?.total ?? 0,
    icon: Map,
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "published-floor-plans",
    title: "Published",
    value: stats?.published ?? 0,
    icon: CheckCircle2,
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "draft-floor-plans",
    title: "Drafts",
    value: stats?.draft ?? 0,
    icon: ClipboardList,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "archived-floor-plans",
    title: "Archived",
    value: stats?.archived ?? 0,
    icon: Archive,
    iconBg: "bg-gray-100 dark:bg-gray-800",
    iconColor: "text-gray-600 dark:text-gray-300",
  },
  {
    id: "in-progress-floor-plans",
    title: "In Progress",
    value: stats?.inProgress ?? 0,
    icon: Layers,
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function MapManagerStats({
  stats,
  isLoading,
}: MapManagerStatsProps) {
  if (isLoading) {
    return <StatsGridSkeleton />;
  }

  return <StatsGridWithIcons stats={buildStatsItems(stats)} />;
}
