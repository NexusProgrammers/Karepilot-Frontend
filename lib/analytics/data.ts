import { activeIcon, DashboardIcon, hospitalsIcon } from "@/icons/Assets";
import { StatItem } from "../organization/types";
import { TabItem } from "@/components/common/NavigationTabs";
import { InsightCard } from "./types";

export const analyticsStats: StatItem[] = [
  {
    id: 1,
    title: "Total Organizations",
    value: "34,098",
    change: "0 active",
    note: "from last week",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Active Organizations",
    value: "6",
    change: "Bonus: 0%",
    note: "from last week",
    icon: activeIcon,
  },
  {
    id: 3,
    title: "Hospitals",
    value: "2",
    change: "Avg: 0m",
    note: "from last week",
    icon: hospitalsIcon,
  },
];

export const navigationTabs: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/analytics"
  },
  {
    id: "user-engagement", 
    label: "User Engagement",
    href: "/analytics/user-engagement"
  },
  {
    id: "performance",
    label: "Performance", 
    href: "/analytics/performance"
  },
  {
    id: "venue-analytics",
    label: "Venue Analytics",
    href: "/analytics/venue-analytics"
  }
];


export const insightCards: InsightCard[] = [
  {
    title: "High User Engagement",
    description: "Your users are spending more time in the app, indicating strong engagement.",
    actionText: "Continue current strategies"
  },
  {
    title: "Popular Navigation Routes",
    description: "Certain areas are seeing high traffic. Consider optimizing these paths.",
    actionText: "Review POI placement"
  },
  {
    title: "System Performance",
    description: "Response times are optimal and error rates are low.",
    actionText: "Maintain current infrastructure"
  },
  {
    title: "Feature Adoption",
    description: "New features are being adopted quickly by users.",
    actionText: "Plan additional features"
  }
];

export const dateRangeOptions = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Last 180 days",
  "Last 365 days"
];

export const featureUsageData = [
  { name: "Navigation Start Rate", value: 79, max: 100 },
  { name: "Most Accessed POIs", value: 32, max: 100 },
  { name: "Access Preferences Engagement", value: 24, max: 100 },
  { name: "Map Views per Session", value: 2.4, max: 10 },
];

export const geoChartData = [
  ["Country", "Usage"],
  ["United States", 400],
  ["United Kingdom", 300],
  ["France", 250],
  ["Japan", 350],
  ["India", 380],
  ["Australia", 200],
  ["Brazil", 280],
  ["Canada", 220],
  ["Germany", 260],
  ["China", 320],
  ["Russia", 180],
  ["Mexico", 150],
  ["Italy", 190],
  ["Spain", 170],
  ["South Africa", 140],
];


export const geoChartOptions = {
  colorAxis: {
    colors: ["#E8F4F4", "#A8CDCD", "#7DBDBD", "#52ADAD", "#2D8A8A"],
  },
  backgroundColor: "transparent",
  datalessRegionColor: "hsl(var(--muted))",
  defaultColor: "hsl(var(--muted))",
  legend: "none",
  tooltip: {
    textStyle: {
      fontSize: 12,
      color: "hsl(var(--popover-foreground))",
    },
  },
};
