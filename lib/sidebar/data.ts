import {
  DashboardIcon,
  OrganizationIcon,
  MapManagerIcon,
  PointsOfInterestIcon,
  UserAndRolesIcon,
  AssetTrackingIcon,
  AlertsAndGeofencingIcon,
  AnalyticsIcon,
  SettingsIcon,
} from "@/icons/Svg";

export const navigationItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/",
  },
  {
    name: "Organizations",
    icon: OrganizationIcon,
    path: "/organizations",
  },
  {
    name: "Map Manager",
    icon: MapManagerIcon,
    path: "/map-manager",
  },
  {
    name: "Points of Interest",
    icon: PointsOfInterestIcon,
    path: "/points-of-interest",
  },
  {
    name: "User & Roles",
    icon: UserAndRolesIcon,
    path: "/users-and-roles",
  },
  {
    name: "Asset Tracking",
    icon: AssetTrackingIcon,
    path: "/asset-tracking",
  },
  {
    name: "Alerts & Geofencing",
    icon: AlertsAndGeofencingIcon,
    path: "/alerts-and-geofencing",
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
  },
];
