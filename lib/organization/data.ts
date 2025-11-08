import { VenueTypeFilter } from "./types";
import { TabItem } from "@/lib/types/common/navigation";
import {
  DashboardIcon,
  activeIcon,
  hospitalsIcon,
  otherIcon,
  airPortIcon,
  shoppingMallIcon,
  onePlaceIcon,
} from "@/icons/Assets";

export const overviewStatMeta = {
  total: {
    id: "total-organizations",
    title: "Total Organizations",
    icon: DashboardIcon,
  },
  active: {
    id: "active-organizations",
    title: "Active Organizations",
    icon: activeIcon,
  },
  hospitals: {
    id: "hospital-organizations",
    title: "Hospitals",
    icon: hospitalsIcon,
  },
  otherVenues: {
    id: "other-organizations",
    title: "Other Venues",
    icon: otherIcon,
  },
} as const;

export const venueTypeMeta = {
  Hospital: {
    id: "hospital",
    title: "Hospital",
    description: "Healthcare facilities and medical centers",
    icon: hospitalsIcon,
    iconColor: "bg-green-100",
  },
  Airport: {
    id: "airport",
    title: "Airport",
    description: "Airports and aviation facilities",
    icon: airPortIcon,
    iconColor: "bg-blue-100",
  },
  "Shopping Mall": {
    id: "shopping-mall",
    title: "Shopping Mall",
    description: "Retail centers and shopping complexes",
    icon: shoppingMallIcon,
    iconColor: "bg-yellow-100",
  },
  "Open Place": {
    id: "open-place",
    title: "Open Place",
    description: "Parks, campuses, and public spaces",
    icon: onePlaceIcon,
    iconColor: "bg-pink-100",
  },
} as const;

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

export const organizationTabs: TabItem[] = [
  { id: "overview", label: "Overview", href: "/organizations" },
  { id: "list", label: "Organizations", href: "/organizations/list" },
  {
    id: "venue-templates",
    label: "Venue Templates",
    href: "/organizations/venue-templates",
  },
];
