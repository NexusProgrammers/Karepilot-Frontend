export interface PerformanceStatItem {
  id: number;
  value: string;
  label: string;
  color: string;
}

export interface PerformanceStatisticsProps {
  title?: string;
  stats: PerformanceStatItem[];
  className?: string;
  showBorder?: boolean;
  gridClassName?: string;
}

