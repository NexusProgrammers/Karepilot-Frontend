export interface AnalyticsHeaderProps {
  title: string;
  description?: string;
}

export interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export interface FeatureUsageChartProps {
  data: any[];
}

export interface UserGrowthChartProps {
  data: any[];
}

export interface InsightCardsProps {
  insights: any[];
}
