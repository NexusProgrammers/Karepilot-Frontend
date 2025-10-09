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
  accessibility: {
    wheelchair: boolean;
    hearingLoop: boolean;
    visualAidSupport?: boolean;
  };
  contact?: {
    phone?: string;
    email?: string;
    operatingHours?: string;
  };
  status: "Active" | "Inactive" | "Maintenance";
  coordinates?: {
    x: number;
    y: number;
  };
}

export interface POIStats {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

