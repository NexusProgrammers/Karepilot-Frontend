export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Pending" | "Inactive";
  lastActive: string;
  location: string;
  avatar?: string;
  tags: string[];
}

export interface Role {
  id: number;
  name: string;
  userCount: number;
  permissions: string[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: number;
  icon: string;
  iconBg: string;
  iconColor: string;
}
