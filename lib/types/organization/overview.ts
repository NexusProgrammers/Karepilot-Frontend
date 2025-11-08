import { OrganizationUserRef } from "./organization";

export interface OrganizationSummaryMetric {
  count: number;
  change: number;
}

export interface OrganizationDistributionItem {
  organizationType: string;
  count: number;
}

export type OrganizationActivityType = "created" | "updated" | "deactivated";

export interface OrganizationActivityItem {
  id: string;
  name: string;
  organizationType: string;
  isActive: boolean;
  activityType: OrganizationActivityType;
  createdAt: string;
  updatedAt: string;
  actor: (OrganizationUserRef & { id?: string }) | null;
}

export interface OrganizationOverviewPayload {
  summary: {
    total: OrganizationSummaryMetric;
    active: OrganizationSummaryMetric;
    hospitals: OrganizationSummaryMetric;
    otherVenues: OrganizationSummaryMetric;
  };
  distribution: OrganizationDistributionItem[];
  recentActivity: OrganizationActivityItem[];
}

export interface OrganizationOverviewResponse {
  success: boolean;
  message: string;
  data: OrganizationOverviewPayload;
}


