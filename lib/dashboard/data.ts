import { StatItem } from "../organization/types";
import activePatientsIcon from "@/assets/dashboard/central-medical-hospital/active-patients.svg";
import emergencyAlertsIcon from "@/assets/dashboard/central-medical-hospital/emergency-alerts.svg";
import equipmentTrackedIcon from "@/assets/dashboard/central-medical-hospital/equipment-tracked.svg";
import navigationRequestsIcon from "@/assets/dashboard/central-medical-hospital/navigation-requests.svg";
import uploadFloorPlanIcon from "@/assets/dashboard/quick-actions/upload-floor-plan.svg";
import addMedicalPoiIcon from "@/assets/dashboard/quick-actions/add-medical-poi.svg";
import trackEquipmentIcon from "@/assets/dashboard/quick-actions/track-equipment.svg";
import assignNurseStaffZoneIcon from "@/assets/dashboard/quick-actions/assign-nurse-staff-zone.svg";
import downloadDailyReportIcon from "@/assets/dashboard/quick-actions/download-daily-report.svg";
import addWardLocationIcon from "@/assets/dashboard/quick-actions/add-ward-location.svg";
import markEmergencyExitIcon from "@/assets/dashboard/quick-actions/mark-emergency-exist-location.svg";
import { ActivityItem } from "./types";
import { 
  Compass, 
  Building2, 
  Settings, 
  Bell, 
  Coffee, 
  Camera, 
  Pill, 
  TestTube, 
  Image as ImageIcon 
} from "lucide-react";


export const hospitalStats: StatItem[] = [
  {
    id: 1,
    title: "Active Patients",
    value: "432",
    change: "+12%",
    note: "from last week",
    icon: activePatientsIcon,
  },
  {
    id: 2,
    title: "Emergency Alerts",
    value: "450",
    change: "+3%",
    note: "from last week",
    icon: emergencyAlertsIcon,
  },
  {
    id: 3,
    title: "Equipment Tracked",
    value: "512",
    change: "+7%",
    note: "from last week",
    icon: equipmentTrackedIcon,
  },
  {
    id: 4,
    title: "Navigation Requests",
    value: "370",
    change: "+14%",
    note: "from last week",
    icon: navigationRequestsIcon,
  },
];

export const categories = [
  "Navigation",
  "Facility",
  "Service",
  "Emergency",
  "Amenity",
  "Medical Department",
  "Pharmacy",
  "Laboratory",
  "Medical Imaging",
];

export const facilities = [
  { name: "Navigation", icon: Compass },
  { name: "Facility", icon: Building2 },
  { name: "Service", icon: Settings },
  { name: "Emergency", icon: Bell },
  { name: "Amenity", icon: Coffee },
  { name: "Medical Department", icon: Camera },
  { name: "Pharmacy", icon: Pill },
  { name: "Laboratory", icon: TestTube },
  { name: "Medical Imaging", icon: ImageIcon },
];

export const buildings = [
  "Main Hospital",
  "Emergency Wing",
  "Diagnostic Wing",
  "Pediatric Wing",
];

export const floors = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"];


export const quickActions = [
    {
      id: 1,
      title: "Upload Floor Plan",
      description: "Import a floor plan for a hospital in PDF, PNG, or CAD",
      icon: uploadFloorPlanIcon,
      action: "upload-floor-plan",
    },
    {
      id: 2,
      title: "Add Medical POI",
      description: "Edit key reports, Crisis, ERs, Pharmacists, Waiting Areas",
      icon: addMedicalPoiIcon,
      action: "add-medical-poi"
    },
    {
      id: 3,
      title: "Track Equipment",
      description:
        "Track live location of staff, visitors, or equipment on floors",
      icon: trackEquipmentIcon,
    },
    {
      id: 4,
      title: "Emergency Alerts",
      description: "Set alerts for unauthorized access to critical areas",
      icon: emergencyAlertsIcon,
    },
    {
      id: 5,
      title: "Assign a Nurse or Staff to a Zone",
      description:
        "Allocate medical or support staff to specific layer or geofenced zones",
      icon: assignNurseStaffZoneIcon,
    },
    {
      id: 6,
      title: "Add Ward Locations",
      description:
        "Create markers for patient wards and assign floor/ward numbers",
      icon: addWardLocationIcon,
    },
    {
      id: 7,
      title: "Download Daily Report",
      description:
        "View and export live reports showing hospital events and departments",
      icon: downloadDailyReportIcon,
    },
    {
      id: 8,
      title: "Mark Emergency Exit Location",
      description: "Define and label safe exit routes for emergencies",
      icon: markEmergencyExitIcon,
    },
  ];
  

  export const systemHealth = [
    { name: "Database", health: 99, status: "Healthy", time: "Update" },
    {
      name: "Location Services",
      health: 90,
      status: "Healthy",
      time: "Uptime",
    },
    { name: "Map Rendering", health: 70, status: "Warning", time: "Uptime" },
    { name: "Tracking", health: 91, status: "Healthy", time: "Uptime" },
    {
      name: "Notification System",
      health: 99,
      status: "Healthy",
      time: "Uptime",
    },
  ];


export const dashboardActivities: ActivityItem[] = [
  {
    id: 1,
    text: "Patient transfer completed to Recovery Room",
    author: "Dr. Michael Smith",
    time: "30 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    text: "Emergency alert cleared: ICU Ward",
    author: "Dr. Sarah Chen",
    time: "45 minutes ago",
    color: "bg-red-500",
  },
  {
    id: 3,
    text: "New patient check-in: Room 204",
    author: "Reception",
    time: "55 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 4,
    text: "Medication dosage updated: Level 2",
    author: "Dr. Kevin Roberts",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    id: 5,
    text: "Surgery scheduled: Patient Monitor Today, 2:30PM - RM203",
    author: "Dr. Jenifer Wu",
    time: "10 minutes ago",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    text: "Latest updates for Central Medical Hospital",
    author: "James Smiths",
    time: "10 minutes ago",
    color: "bg-green-500",
  },
];

  
export const organizations = [
  {
    name: "Central Medical Hospital",
    location: "Terminal 4, Queens, NY",
    type: "Hospital",
  },
  {
    name: "JFK International Airport",
    location: "087 Maple Dr, Houston, TX",
    type: "Airport",
  },
  {
    name: "Manhattan Shopping Center",
    location: "Unit 202, Chicago, IL",
    type: "Mall",
  },
  {
    name: "Velvet Lane Luxury Plaza",
    location: "789 Oak St, San Diego, CA",
    type: "Mall",
  },
  {
    name: "Northgate Plaza",
    location: "456 Pine Ave, Los Angeles, CA",
    type: "Open Plaza",
  },
  {
    name: "Crescent Pavilion",
    location: "123 Main St, New York, NY",
    type: "Shopping Mall",
  },
];
 
export const menuOptions = [
  "Local Mall",
  "Shopping Center",
  "Community Hospital",
  "Fashion Outlet",
  "Grocery Store",
  "Urgent Care Facility",
  "Electronics Retailer",
];