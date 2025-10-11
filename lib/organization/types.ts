import { StaticImageData } from "next/image";

export type StatItem = {
  id: number | string;
  title: string;
  value: string | number;
  change?: string;
  note?: string;
  icon: string;
};

export type VenueTypeItem = {
  id: number | string;
  title: string;
  count: string | number;
  description: string;
  icon: StaticImageData | string;
  iconColor: string;
};

export type OrganizationItem = {
  id: number | string;
  name: string;
  type: string;
  status: "active" | "inactive";
  location: string;
  createdAt: string;
  primaryAddress?: string;
  detailedAddress?: string;
  email?: string;
  phone?: string;
  operatingHours?: string;
  icon?: StaticImageData | string;
  hasNotification?: boolean;
};

export type VenueTypeFilter = {
  id: number | string;
  name: string;
  value: string;
};

export interface VenueTemplateCardProps {
  title: string;
  description: string;
  features: string[];
  poiCategories: string[];
  icon: React.ReactNode;
}