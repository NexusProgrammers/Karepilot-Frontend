import { Asset, StatItem, FilterOption } from "./types";
import { PieChart, CheckCircle, Battery, Circle } from "@/icons/Icons";

export const assetsData: Asset[] = [
  {
    id: 1,
    name: "Radiology Department",
    type: "equipment",
    status: "online",
    location: "Emergency Department",
    building: "Main Hospital",
    floor: "Ground Floor",
    batteryLevel: 83,
    lastSeen: "2 minutes ago",
    department: "Radiology"
  },
  {
    id: 2,
    name: "Cardiology Department",
    type: "equipment",
    status: "offline",
    location: "Intensive Care Unit",
    building: "Annex Building",
    floor: "First Floor",
    batteryLevel: 67,
    lastSeen: "5 minutes ago",
    department: "Cardiology"
  },
  {
    id: 3,
    name: "Pediatrics Department",
    type: "equipment",
    status: "low-battery",
    location: "General Ward",
    building: "Main Hospital",
    floor: "Second Floor",
    batteryLevel: 20,
    lastSeen: "1 minute ago",
    department: "Pediatrics"
  },
  {
    id: 4,
    name: "Emergency Response Team",
    type: "staff",
    status: "online",
    location: "Emergency Department",
    building: "Main Hospital",
    floor: "Ground Floor",
    batteryLevel: 95,
    lastSeen: "30 seconds ago",
    department: "Emergency"
  },
  {
    id: 5,
    name: "ICU Monitoring System",
    type: "device",
    status: "online",
    location: "Intensive Care Unit",
    building: "Annex Building",
    floor: "First Floor",
    batteryLevel: 78,
    lastSeen: "1 minute ago",
    department: "ICU"
  },
  {
    id: 6,
    name: "Pharmacy Inventory",
    type: "equipment",
    status: "online",
    location: "Pharmacy",
    building: "Main Hospital",
    floor: "Ground Floor",
    batteryLevel: 92,
    lastSeen: "45 seconds ago",
    department: "Pharmacy"
  },
  {
    id: 7,
    name: "Security Patrol",
    type: "staff",
    status: "low-battery",
    location: "Main Entrance",
    building: "Main Hospital",
    floor: "Ground Floor",
    batteryLevel: 15,
    lastSeen: "3 minutes ago",
    department: "Security"
  },
  {
    id: 8,
    name: "Laboratory Equipment",
    type: "equipment",
    status: "offline",
    location: "Laboratory",
    building: "Diagnostic Wing",
    floor: "Second Floor",
    batteryLevel: 45,
    lastSeen: "10 minutes ago",
    department: "Laboratory"
  },
  {
    id: 9,
    name: "Maintenance Team",
    type: "staff",
    status: "online",
    location: "Maintenance Room",
    building: "Main Hospital",
    floor: "Basement",
    batteryLevel: 88,
    lastSeen: "2 minutes ago",
    department: "Maintenance"
  }
];

export const statsData: StatItem[] = [
  {
    id: "total-assets",
    title: "Total Assets",
    value: 9,
    icon: PieChart,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: "online",
    title: "Online",
    value: 6,
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: "low-battery",
    title: "Low Battery",
    value: 2,
    icon: Battery,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600"
  },
  {
    id: "offline",
    title: "Offline",
    value: 1,
    icon: Circle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600"
  }
];

export const typeFilters: FilterOption[] = [
  { label: "All Types", value: "all", checked: true },
  { label: "Devices", value: "device", checked: false },
  { label: "Equipment", value: "equipment", checked: false },
  { label: "Staff", value: "staff", checked: false }
];

export const buildingFilters: FilterOption[] = [
  { label: "All Buildings", value: "all", checked: true },
  { label: "Main Hospital", value: "main-hospital", checked: false },
  { label: "Emergency Wing", value: "emergency-wing", checked: false },
  { label: "Diagnostic Wing", value: "diagnostic-wing", checked: false }
];
