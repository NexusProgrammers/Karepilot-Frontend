export type ActivityItem = {
    id: number | string;
    text: string;
    author: string;
    time: string;
    color: string;
  };
  
  export interface RecentActivityProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonAction?: () => void;
    activities: ActivityItem[];
    maxItems?: number;
  }
  