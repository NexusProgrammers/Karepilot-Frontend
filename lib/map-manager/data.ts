import { TabItem } from "@/lib/types/common/navigation";
import { MapPin, CheckCircle, Edit3, Building2 } from "@/icons/Icons";
import { StatItemWithIcon } from "@/components/common/StatsGridWithIcons";

export interface FloorPlan {
  id: number;
  title: string;
  subtitle: string;
  status: "Published" | "Draft" | "Archived" | "Building" | "New";
  statusColor: string;
  fileType: string;
  fileSize: string;
  modifiedDate: string;
  scale: string;
  version: string;
  hasPreview: boolean;
  building: string;
  floor: string;
}

export type MapStats = StatItemWithIcon;

export const mapStats: MapStats[] = [
  {
    id: 1,
    title: "Total Maps",
    value: "7",
    icon: MapPin,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Published Maps",
    value: "6",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Drafted Maps",
    value: "1",
    icon: Edit3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    id: 4,
    title: "Buildings",
    value: "4",
    icon: Building2,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export const floorPlans: FloorPlan[] = [
  {
    id: 1,
    title: "Main Building Floor 1",
    subtitle: "Main Building • Ground Floor",
    status: "Published",
    statusColor: "bg-green-100 text-green-800",
    fileType: "PNG",
    fileSize: "3.4 MB",
    modifiedDate: "2025-07-30 14:30",
    scale: "1:100",
    version: "V2",
    hasPreview: false,
    building: "Main Building",
    floor: "Ground Floor",
  },
  {
    id: 2,
    title: "Emergency Wing Floor 2",
    subtitle: "Emergency Wing • 2nd Floor",
    status: "Published",
    statusColor: "bg-green-100 text-green-800",
    fileType: "PDF",
    fileSize: "1.8 MB",
    modifiedDate: "2025-07-16 09:15",
    scale: "1:150",
    version: "V2",
    hasPreview: true,
    building: "Emergency Wing",
    floor: "2nd Floor",
  },
  {
    id: 3,
    title: "Diagnostic Center Ground",
    subtitle: "Diagnostic Center • Ground Floor",
    status: "Building",
    statusColor: "bg-blue-100 text-blue-800",
    fileType: "SVG",
    fileSize: "3.1 MB",
    modifiedDate: "2025-07-12 10:45",
    scale: "1:75",
    version: "V2",
    hasPreview: false,
    building: "Diagnostic Center",
    floor: "Ground Floor",
  },
  {
    id: 4,
    title: "Main Building Floor 1",
    subtitle: "Main Building • Ground Floor",
    status: "New",
    statusColor: "bg-orange-100 text-orange-800",
    fileType: "PNG",
    fileSize: "2.4 MB",
    modifiedDate: "2025-07-30 14:30",
    scale: "1:100",
    version: "V2",
    hasPreview: false,
    building: "Main Building",
    floor: "Ground Floor",
  },
];

export const statusOptions = ["All Status", "Published", "Draft", "Archived"];
export const buildingOptions = [
  "All Building",
  "Main Building",
  "Emergency Wing",
  "Diagnostic Center",
];

export const tabs = [
  { id: "floor-plans", label: "Floor Plans", href: "/map-manager" },
  { id: "buildings", label: "Buildings", href: "/map-manager/buildings" },
  { id: "settings", label: "Settings", href: "/map-manager/settings" },
];

export const buildings = [
  {
    id: 1,
    name: "Main Building",
    totalMaps: 4,
    publishedMaps: 3,
    floors: ["Ground", "1st", "2nd", "3rd", "Surgery"],
    activeFloor: "Ground",
  },
  {
    id: 2,
    name: "Emergency Wing",
    totalMaps: 3,
    publishedMaps: 2,
    floors: ["Ground", "1st", "2nd"],
    activeFloor: "Ground",
  },
  {
    id: 3,
    name: "Diagnostic Center",
    totalMaps: 3,
    publishedMaps: 3,
    floors: ["Ground", "1st", "2nd"],
    activeFloor: "Ground",
  },
  {
    id: 4,
    name: "Main Building",
    totalMaps: 4,
    publishedMaps: 3,
    floors: ["Ground", "1st", "2nd", "3rd"],
    activeFloor: "Ground",
  },
];

export const mapManagerTabs: TabItem[] = [
  { id: "floor-plans", label: "Floor Plans", href: "/map-manager" },
  { id: "drawing-tools", label: "Drawing Tools", href: "/map-manager/drawing-tools" },
  { id: "layers", label: "Layers", href: "/map-manager/layers" },
  { id: "properties", label: "Properties", href: "/map-manager/properties" },
  { id: "buildings", label: "Buildings", href: "/map-manager/buildings" },
  { id: "settings", label: "Settings", href: "/map-manager/settings" },
];
