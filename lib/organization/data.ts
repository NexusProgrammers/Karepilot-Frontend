import {
  StatItem,
  VenueTypeItem,
  OrganizationItem,
  VenueTypeFilter,
} from "./types";
import { ActivityItem } from "../dashboard/types";
import { TabItem } from "@/lib/types/navigation";
import {
  DashboardIcon,
  activeIcon,
  hospitalsIcon,
  otherIcon,
  airPortIcon,
  shoppingMallIcon,
  onePlaceIcon,
} from "@/icons/Assets";

export const overviewStats: StatItem[] = [
  {
    id: 1,
    title: "Total Organizations",
    value: "6",
    change: "+20%",
    note: "from last week",
    icon: DashboardIcon,
  },
  {
    id: 2,
    title: "Active Organizations",
    value: "6",
    change: "+20%",
    note: "from last week",
    icon: activeIcon,
  },
  {
    id: 3,
    title: "Hospitals",
    value: "2",
    change: "+50%",
    note: "from last week",
    icon: hospitalsIcon,
  },
  {
    id: 4,
    title: "Other Venues",
    value: "4",
    change: "+0%",
    note: "from last week",
    icon: otherIcon,
  },
];

export const venueTypes: VenueTypeItem[] = [
  {
    id: 1,
    title: "Hospital",
    count: "2",
    description: "Healthcare facilities and medical centers",
    icon: hospitalsIcon,
    iconColor: "bg-green-100",
  },
  {
    id: 2,
    title: "Airport",
    count: "2",
    description: "Airports and aviation facilities",
    icon: airPortIcon,
    iconColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "Shopping Mall",
    count: "1",
    description: "Retail centers and shopping complexes",
    icon: shoppingMallIcon,
    iconColor: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Open Place",
    count: "1",
    description: "Parks, campuses, and public spaces",
    icon: onePlaceIcon,
    iconColor: "bg-pink-100",
  },
];

export const organizations: OrganizationItem[] = [
  {
    id: 1,
    name: "Central Medical Hospital",
    type: "Hospital",
    status: "active",
    location: "Terminal 4, Queens, NY",
    createdAt: "2025-08-01",
    primaryAddress: "Terminal 4, Queens, NY",
    detailedAddress: "123 Medical Drive",
    email: "ezeydesign@centralmedical.com",
    phone: "+1-555-0123-9876",
    operatingHours: "00:00 - 23:59",
    icon: hospitalsIcon,
  },
  {
    id: 2,
    name: "JFK International Airport",
    type: "Airport",
    status: "active",
    location: "987 Maple Dr, Houston, TX",
    createdAt: "2025-08-02",
    primaryAddress: "987 Maple Dr, Houston, TX",
    detailedAddress: "JFK Airport, Terminal 1",
    email: "ops@jfk.com",
    phone: "+1-555-0123-9876",
    operatingHours: "04:00 - 02:00",
    icon: airPortIcon,
  },
  {
    id: 3,
    name: "Manhattan Shopping Center",
    type: "Mall",
    status: "active",
    location: "Unit 202, Chicago, IL",
    createdAt: "2025-07-31",
    primaryAddress: "Unit 202, Chicago, IL",
    detailedAddress: "Manhattan Shopping Center",
    email: "mark@mantattan.com",
    phone: "+1-555-0123-9876",
    operatingHours: "10:00 - 22:00",
    icon: shoppingMallIcon,
  },
  {
    id: 4,
    name: "Velvet Lane Luxury Plaza",
    type: "Mall",
    status: "active",
    location: "789 Oak St, San Diego, CA",
    createdAt: "2025-07-30",
    primaryAddress: "789 Oak St, San Diego, CA",
    detailedAddress: "Velvet Lane Luxury Plaza",
    email: "john@velvet.com",
    phone: "+1-555-0123-9876",
    operatingHours: "06:00 - 20:00",
    icon: shoppingMallIcon,
  },
  {
    id: 5,
    name: "Northgate Plaza",
    type: "Open Place",
    status: "active",
    location: "456 Pine Ave, Los Angeles, CA",
    createdAt: "2025-08-01",
    primaryAddress: "456 Pine Ave, Los Angeles, CA",
    detailedAddress: "Northgate Plaza",
    email: "ezekiel@northgate.com",
    phone: "+1-555-0123-9876",
    operatingHours: "07:00 - 23:00",
    icon: onePlaceIcon,
  },
  {
    id: 6,
    name: "Crescent Pavilion",
    type: "Shopping Mall",
    status: "inactive",
    location: "123 Main St, New York, NY",
    createdAt: "2025-07-28",
    primaryAddress: "123 Main St, New York, NY",
    detailedAddress: "Crescent Pavilion",
    email: "jay@crescentpavilion.com",
    phone: "+1-555-0123-9876",
    operatingHours: "09:00 - 17:00",
    icon: shoppingMallIcon,
    hasNotification: true,
  },
];

export const venueTypeFilters: VenueTypeFilter[] = [
  {
    id: 1,
    name: "All Venue Types",
    value: "all",
  },
  {
    id: 2,
    name: "Hospitals",
    value: "hospital",
  },
  {
    id: 3,
    name: "Airports",
    value: "airport",
  },
  {
    id: 4,
    name: "Shopping Malls",
    value: "mall",
  },
  {
    id: 5,
    name: "Open Places",
    value: "open_place",
  },
];

export const organizationActivities: ActivityItem[] = [
  {
    id: 1,
    text: "New hospital added: Regional Medical Center",
    author: "Admin",
    time: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    text: "Airport configuration updated: LAX Terminal 2",
    author: "System",
    time: "1 day ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    text: "Mall deactivated: Downtown Shopping Center",
    author: "Admin",
    time: "2 days ago",
    color: "bg-red-500",
  },
  {
    id: 4,
    text: "New open place added: Central Park Navigation",
    author: "Admin",
    time: "3 days ago",
    color: "bg-orange-500",
  },
];

export const organizationTabs: TabItem[] = [
  { id: "overview", label: "Overview", href: "/organizations" },
  { id: "list", label: "Organizations", href: "/organizations/list" },
  {
    id: "venue-templates",
    label: "Venue Templates",
    href: "/organizations/venue-templates",
  },
];
