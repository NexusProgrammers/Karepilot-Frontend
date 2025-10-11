export interface InsightCard {
  title: string;
  description: string;
  actionText: string;
}

export interface UserDemographic {
  category: string;
  count: number;
  color: string;
}

export interface UserActivityData {
  month: string;
  newUsers: number;
  returningUsers: number;
}