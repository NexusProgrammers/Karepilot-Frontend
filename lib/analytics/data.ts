import { activeIcon, DashboardIcon, hospitalsIcon } from "@/icons/Assets";
import { StatItem } from "../organization/types";
import { TabItem } from "@/components/common/NavigationTabs";
import { InsightCard } from "./types";
import { AlertTriangleIcon, ClockIcon, CheckCircleIcon } from "@/icons/Icons";

export const performanceStats=  [
  {
    id: 1,
    title: "System Uptime",
    value: "94%",
    change: "12% higher",
    note: "from yesterday",
    icon: "",
    iconComponent: CheckCircleIcon,
    showIcon: true,
    iconColor: "#10b981", 
    iconBackgroundColor: "#dcfce7", 
  },
  {
    id: 2,
    title: "Avg Response Time",
    value: "23s",
    change: "32% higher",
    note: "from last week",
    icon: "",
    iconComponent: ClockIcon,
    showIcon: true,
    iconColor: "#3b82f6", 
    iconBackgroundColor: "#dbeafe",
  },
  {
    id: 3,
    title: "Error Rate",
    value: "1%",
    change: "Avg: 654m",
    note: "from last week",
    icon: "",
    iconComponent: AlertTriangleIcon,
    showIcon: true,
    iconColor: "#ef4444", 
    iconBackgroundColor: "#fef2f2", 
  },
];

export const performanceSystemHealth = [
  {
    name: "CPU Usage",
    time: "Uptime",
    status: "Healthy" as const,
    health: 99.9,
  },
  {
    name: "Disk Usage",
    time: "Uptime",
    status: "Healthy" as const,
    health: 90.1,
  },
  {
    name: "Memory Usage",
    time: "Uptime",
    status: "Warning" as const,
    health: 62,
  },
  {
    name: "Network I/O",
    time: "Uptime",
    status: "Healthy" as const,
    health: 91.3,
  },
];

export const performanceTrendsData = [
  { month: "Jan", current: 8, previous: 12 },
  { month: "Feb", current: 18, previous: 10 },
  { month: "Mar", current: 12, previous: 15 },
  { month: "Apr", current: 20, previous: 12 },
  { month: "May", current: 15, previous: 22 },
  { month: "Jun", current: 21, previous: 18 },
];

export const userEngagementStats: StatItem[] = [
  {
    id: 1,
    title: "Active Users",
    value: "34,098",
    change: "12% higher from last week",
    note: "from last week",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "User Retention",
    value: "32,320",
    change: "32% higher from last week",
    note: "from last week",
    icon: activeIcon,
  },
  {
    id: 3,
    title: "Avg Session",
    value: "2,345m",
    change: "Avg: 654m from last week",
    note: "from last week",
    icon: hospitalsIcon,
  },
  {
    id: 4,
    title: "Total Sessions",
    value: "2",
    change: "Avg: 0m from last week",
    note: "from last week",
    icon: hospitalsIcon,
  },
];

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
    href: "/analytics",
  },
  {
    id: "user-engagement",
    label: "User Engagement",
    href: "/analytics/user-engagement",
  },
  {
    id: "performance",
    label: "Performance",
    href: "/analytics/performance",
  },
  {
    id: "venue-analytics",
    label: "Venue Analytics",
    href: "/analytics/venue-analytics",
  },
];

export const insightCards: InsightCard[] = [
  {
    title: "High User Engagement",
    description:
      "Your users are spending more time in the app, indicating strong engagement.",
    actionText: "Continue current strategies",
  },
  {
    title: "Popular Navigation Routes",
    description:
      "Certain areas are seeing high traffic. Consider optimizing these paths.",
    actionText: "Review POI placement",
  },
  {
    title: "System Performance",
    description: "Response times are optimal and error rates are low.",
    actionText: "Maintain current infrastructure",
  },
  {
    title: "Feature Adoption",
    description: "New features are being adopted quickly by users.",
    actionText: "Plan additional features",
  },
];

export const dateRangeOptions = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
  "Last 180 days",
  "Last 365 days",
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

export const userActivityData = [
  { month: "Jan", newUsers: 14, returningUsers: 10 },
  { month: "Feb", newUsers: 21, returningUsers: 7 },
  { month: "Mar", newUsers: 20, returningUsers: 6 },
  { month: "Apr", newUsers: 25, returningUsers: 5 },
  { month: "May", newUsers: 19, returningUsers: 6 },
  { month: "Jun", newUsers: 21, returningUsers: 6 },
];

export const userDemographicsData = [
  { category: "Staff", count: 4, color: "#3b82f6" },
  { category: "Management", count: 4, color: "#10b981" },
  { category: "Security", count: 4, color: "#ef4444" },
  { category: "Visitors", count: 4, color: "#6b7280" },
];

export const lines = [
  {
    dataKey: "currentWeek",
    stroke: "#10b981",
    strokeDasharray: "5 5",
    name: "→ Current Week",
  },
  {
    dataKey: "previousWeek",
    stroke: "#3b82f6",
    name: "→ Previous Week",
  },
];

export const userGrowthData = [
  { month: "Jan", currentWeek: 9, previousWeek: 12 },
  { month: "Feb", currentWeek: 15, previousWeek: 14 },
  { month: "Mar", currentWeek: 17, previousWeek: 16 },
  { month: "Apr", currentWeek: 19, previousWeek: 18 },
  { month: "May", currentWeek: 21, previousWeek: 20 },
  { month: "Jun", currentWeek: 19, previousWeek: 22 },
];

export const performanceLines = [
  {
    dataKey: "current",
    stroke: "#3b82f6",
    name: "Current Performance",
  },
  {
    dataKey: "previous",
    stroke: "#10b981",
    strokeDasharray: "5 5",
    name: "Previous Performance",
  },
];

export const performanceStatisticsData = [
  {
    id: 1,
    value: "0",
    label: "Requests/min",
    color: "#f97316", // Orange color
  },
  {
    id: 2,
    value: "0",
    label: "Alerts Resolved",
    color: "#10b981", // Green color
  },
  {
    id: 3,
    value: "0h",
    label: "Maintenance Time",
    color: "#3b82f6", // Blue color
  },
  {
    id: 4,
    value: "24/7",
    label: "Monitoring",
    color: "#10b981", // Green color
  },
];
