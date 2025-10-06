import { LucideIcon } from "lucide-react";

export interface POI {
  id: number;
  title: string;
  building: string;
  floor: string;
  roomNumber: string;
  description: string;
  categories: string[];
  amenities: {
    icon: LucideIcon;
    label: string;
  }[];
  updatedDate: string;
  categoryType: string;
}

export interface POIStats {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

