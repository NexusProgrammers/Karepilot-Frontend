"use client";

import { AlertStats } from "@/lib/alerts-and-geofencing/types";
import { Shield, AlertTriangle, Square, SquareCheck } from "@/icons/Icons";
import StatsGridWithIcons, { StatItemWithIcon } from "@/components/common/StatsGridWithIcons";

interface AlertStatsCardsProps {
  stats: AlertStats;
}

export function AlertStatsCards({ stats }: AlertStatsCardsProps) {
  const statItems: StatItemWithIcon[] = [
    {
      id: 1,
      title: "Active Alerts",
      value: stats.activeAlerts,
      icon: Shield,
      iconColor: "text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      id: 2,
      title: "Critical",
      value: stats.critical,
      icon: AlertTriangle,
      iconColor: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/20",
    },
    {
      id: 3,
      title: "Geofence Zones",
      value: stats.geofenceZones,
      icon: Square,
      iconColor: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      id: 4,
      title: "Zone Triggers",
      value: stats.zoneTriggers,
      icon: SquareCheck,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
    },
  ];

  return (
    <div className="mb-6">
      <StatsGridWithIcons stats={statItems} />
    </div>
  );
}
