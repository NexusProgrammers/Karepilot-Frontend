import { activeIcon, DashboardIcon, hospitalsIcon } from "@/icons/Assets";
import { StatItem } from "../organization/types";

export const analyticsStats: StatItem[] = [
  {
    id: 1,
    title: "Total Organizations",
    value: "34,098",
    change: "0 active",
    note: "from last week",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Active Organizations",
    value: "6",
    change: "Bonus: 0%",
    note: "from last week",
    icon: activeIcon,
  },
  {
    id: 3,
    title: "Hospitals",
    value: "2",
    change: "Avg: 0m",
    note: "from last week",
    icon: hospitalsIcon,
  },
];
