/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Asset {
  id: number;
  name: string;
  type: "device" | "equipment" | "staff";
  status: "online" | "offline" | "low-battery";
  location: string;
  building: string;
  floor: string;
  batteryLevel: number;
  lastSeen: string;
  department?: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: number;
  icon: any;
  iconBg: string;
  iconColor: string;
}

export interface FilterOption {
  label: string;
  value: string;
  checked?: boolean;
}
