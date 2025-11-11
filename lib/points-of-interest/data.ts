import {
  MapPin,
  CheckCircle,
  Grid3x3,
  Accessibility,
} from "@/icons/Icons";

import { POIStats } from "./types";

export const poiStats: POIStats[] = [
  {
    id: 1,
    title: "Total POIs",
    value: "4",
    icon: MapPin,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Active",
    value: "6",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Categories",
    value: "1",
    icon: Grid3x3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: 4,
    title: "Accessible",
    value: "4",
    icon: Accessibility,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export const poiTabs = [
  { id: "floor-plans", label: "Floor Plans", href: "/points-of-interest" },
  {
    id: "buildings",
    label: "Buildings",
    href: "/points-of-interest/buildings",
  },
  { id: "settings", label: "Settings", href: "/points-of-interest/settings" },
];
