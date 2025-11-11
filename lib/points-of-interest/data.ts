import { MapPin, CheckCircle, Grid3x3, Accessibility } from "@/icons/Icons";

import type { POIStatsConfig } from "./types";

export const poiStatsConfig: POIStatsConfig[] = [
  {
    id: "total-pois",
    title: "Total POIs",
    key: "total",
    icon: MapPin,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "active-pois",
    title: "Active",
    key: "active",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "categories-pois",
    title: "Categories",
    key: "categories",
    icon: Grid3x3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: "accessible-pois",
    title: "Accessible",
    key: "accessible",
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
