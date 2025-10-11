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

export interface QuickExportItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  iconColor?: string;
}

export interface RecentReport {
  id: number;
  filename: string;
  size: string;
  date: string;
  status: "Ready" | "Processing";
  statusColor: string;
}

export interface ReportTemplate {
  id: number;
  title: string;
  description: string;
  tags: string[];
  isSelected?: boolean;
}

export interface ReportSection {
  id: number;
  name: string;
  checked: boolean;
}
