import { LucideIcon } from "@/icons/Icons";
import { PointOfInterest as PointOfInterestApi } from "../types/points-of-interest/api";

export type POI = PointOfInterestApi;
export type PointOfInterest = PointOfInterestApi;

export interface POIStats {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

