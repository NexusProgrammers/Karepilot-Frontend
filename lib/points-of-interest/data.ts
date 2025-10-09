import { MapPin, CheckCircle, Grid3x3, Accessibility, Wifi, Coffee, Zap } from "lucide-react";
import { POI, POIStats } from "./types";

export const poiStats: POIStats[] = [
  {
    id: 1,
    title: "Total POIs",
    value: "4",
    icon: MapPin,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Active",
    value: "6",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Categories",
    value: "1",
    icon: Grid3x3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: 4,
    title: "Accessible",
    value: "4",
    icon: Accessibility,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export const poisData: POI[] = [
  {
    id: 1,
    title: "Emergency Department",
    building: "Main Hospital",
    floor: "Ground Floor",
    roomNumber: "ED-001",
    description: "24/7 emergency medical services with trauma care",
    categories: ["24/7", "Trauma", "Emergency"],
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Zap, label: "Power" },
    ],
    updatedDate: "2025-08-12",
    categoryType: "Unknown Category",
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      visualAidSupport: false,
    },
    contact: {
      phone: "+1 345-874-7894",
      email: "emergency@hospital.com",
      operatingHours: "24/7",
    },
    status: "Active",
    coordinates: {
      x: 120,
      y: 80,
    },
  },
  {
    id: 2,
    title: "Main Pharmacy",
    building: "Main Hospital",
    floor: "1st Floor",
    roomNumber: "Room PH-105",
    description: "Main hospital pharmacy and medication dispensing",
    categories: ["Pharmacy", "Medication", "Prescription"],
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Coffee, label: "Waiting" },
    ],
    updatedDate: "2024-01-16",
    categoryType: "Unknown Category",
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      visualAidSupport: false,
    },
    contact: {
      phone: "+1 345-874-7895",
      email: "pharmacy@hospital.com",
      operatingHours: "8:00 AM - 8:00 PM",
    },
    status: "Active",
    coordinates: {
      x: 150,
      y: 120,
    },
  },
  {
    id: 3,
    title: "Radiology Department",
    building: "Diagnostic Wing",
    floor: "2nd Floor",
    roomNumber: "Room RAD-201",
    description: "X-ray, MRI, CT scan services",
    categories: ["Xray", "MR", "CT Scan"],
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Zap, label: "Power" },
    ],
    updatedDate: "2024-01-16",
    categoryType: "Unknown Category",
    accessibility: {
      wheelchair: true,
      hearingLoop: false,
      visualAidSupport: true,
    },
    contact: {
      phone: "+1 345-874-7896",
      email: "radiology@hospital.com",
      operatingHours: "7:00 AM - 6:00 PM",
    },
    status: "Active",
    coordinates: {
      x: 200,
      y: 150,
    },
  },
  {
    id: 4,
    title: "Emergency Department",
    building: "Main Hospital",
    floor: "Ground Floor",
    roomNumber: "Room ED-001",
    description: "24/7 emergency medical services with trauma care",
    categories: ["24/7", "Trauma", "Emergency"],
    amenities: [
      { icon: Wifi, label: "WiFi" },
      { icon: Zap, label: "Power" },
    ],
    updatedDate: "2024-01-16",
    categoryType: "Unknown Category",
    accessibility: {
      wheelchair: true,
      hearingLoop: true,
      visualAidSupport: true,
    },
    contact: {
      phone: "+1 345-874-7897",
      email: "emergency2@hospital.com",
      operatingHours: "24/7",
    },
    status: "Active",
    coordinates: {
      x: 100,
      y: 90,
    },
  },
];

export const poiTabs = [
  { id: "floor-plans", label: "Floor Plans", href: "/points-of-interest" },
  { id: "buildings", label: "Buildings", href: "/points-of-interest/buildings" },
  { id: "settings", label: "Settings", href: "/points-of-interest/settings" },
];

