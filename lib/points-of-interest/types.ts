import { LucideIcon } from "@/icons/Icons";
import { PointOfInterest as PointOfInterestApi } from "../types/points-of-interest/api";

export type POI = PointOfInterestApi;
export type PointOfInterest = PointOfInterestApi;

export type PointOfInterestStatKey = "total" | "active" | "categories" | "accessible";

export interface POIStatsConfig {
  id: string;
  title: string;
  key: PointOfInterestStatKey;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

