import { User, Role, Department } from "./types";
import { Users, CheckCircle, Building, Wifi } from "lucide-react";

export const usersData: User[] = [
  {
    id: 1,
    name: "Ezekiel Olayiwola",
    email: "ezekiel@gmail.com",
    role: "Super Admin",
    department: "Administration",
    status: "Active",
    lastActive: "2 hours ago",
    location: "Main Entrance",
    avatar: "/avatars/ezekiel.jpg",
    tags: ["Admin", "Active", "Emergency"]
  },
  {
    id: 2,
    name: "Nurse Patricia Williams",
    email: "patricia.williams@hospital.com",
    role: "Manager",
    department: "ICU",
    status: "Active",
    lastActive: "2 hours ago",
    location: "ICU Level 3",
    tags: ["Manager", "Active", "Administration"]
  },
  {
    id: 3,
    name: "Security Officer Mike Johnson",
    email: "mike.johnson@hospital.com",
    role: "Security Officer",
    department: "Security",
    status: "Active",
    lastActive: "2 hours ago",
    location: "ICU Level 3",
    tags: ["Security", "Active", "Pharmacy"]
  },
  {
    id: 4,
    name: "PharmD Lisa Davis",
    email: "lisa.davis@hospital.com",
    role: "Technician",
    department: "Pharmacy",
    status: "Active",
    lastActive: "2 hours ago",
    location: "ICU Level 3",
    tags: ["Technician", "Active", "ICU"]
  },
  {
    id: 5,
    name: "John Smith",
    email: "john.smith@hospital.com",
    role: "Staff",
    department: "Maintenance",
    status: "Pending",
    lastActive: "2 hours ago",
    location: "ICU Level 3",
    tags: ["Staff", "Pending", "Maintenance"]
  }
];

export const rolesData: Role[] = [
  {
    id: 1,
    name: "Admin",
    userCount: 1,
    permissions: [
      "View All",
      "Edit All",
      "Manage Alerts",
      "View Security",
      "Access Logs",
      "View Basic",
      "Edit Department",
      "View Department",
      "Edit Users",
      "Manage Inventory",
      "Delete Users"
    ]
  },
  {
    id: 2,
    name: "Manager",
    userCount: 1,
    permissions: [
      "Manage Alerts",
      "View Security",
      "Access Logs",
      "View Basic",
      "View Department",
      "Edit Users"
    ]
  },
  {
    id: 3,
    name: "Technician",
    userCount: 1,
    permissions: [
      "View All",
      "Manage Alerts",
      "View Security",
      "Access Logs",
      "View Basic",
      "Edit Users"
    ]
  },
  {
    id: 4,
    name: "Staff",
    userCount: 1,
    permissions: ["View Basic"]
  },
  {
    id: 5,
    name: "Security",
    userCount: 1,
    permissions: [
      "Manage Alerts",
      "View Security",
      "Access Logs",
      "View Basic"
    ]
  },
  {
    id: 6,
    name: "Viewer",
    userCount: 1,
    permissions: ["View Basic"]
  }
];

export const departmentsData: Department[] = [
  {
    id: 1,
    name: "ICU",
    description: "Intensive Care Unit"
  },
  {
    id: 2,
    name: "Emergency",
    description: "Emergency Department"
  },
  {
    id: 3,
    name: "Pharmacy",
    description: "Hospital Pharmacy"
  },
  {
    id: 4,
    name: "Security",
    description: "Security Department"
  },
  {
    id: 5,
    name: "Administration",
    description: "Administrative Services"
  },
  {
    id: 6,
    name: "Maintenance",
    description: "Facilities Maintenance"
  }
];

export const statsData = [
  {
    id: "total-users",
    title: "Total Users",
    value: 4,
    icon: Users,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600"
  },
  {
    id: "active-users",
    title: "Active Users",
    value: 6,
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    id: "departments",
    title: "Departments",
    value: 1,
    icon: Building,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    id: "online-now",
    title: "Online Now",
    value: 4,
    icon: Wifi,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  }
];

export const tabs = [
  { id: "users", label: "Users", href: "/users-and-roles" },
  {
    id: "roles",
    label: "Roles & Permissions",
    href: "/users-and-roles/roles-and-permissions",
  },
  {
    id: "departments",
    label: "Departments",
    href: "/users-and-roles/departments",
  },
];

export const filterOptions = [
  {
    label: "All Roles",
    options: [
      { label: "All Roles", value: "all" },
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "Technician", value: "technician" },
      { label: "Staff", value: "staff" },
      { label: "Security", value: "security" },
      { label: "Viewer", value: "viewer" },
    ],
    defaultValue: "all",
  },
  {
    label: "All Departments",
    options: [
      { label: "All Departments", value: "all" },
      { label: "ICU", value: "icu" },
      { label: "Emergency", value: "emergency" },
      { label: "Pharmacy", value: "pharmacy" },
      { label: "Security", value: "security" },
      { label: "Administration", value: "administration" },
      { label: "Maintenance", value: "maintenance" },
    ],
    defaultValue: "all",
  },
  {
    label: "All Status",
    options: [
      { label: "All Status", value: "all" },
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Inactive", value: "inactive" },
    ],
    defaultValue: "all",
  },
];

export const permissionsData = [
  { id: "viewAll", label: "View All", checked: true },
  { id: "viewSecurity", label: "View Security", checked: true },
  { id: "editBasic", label: "Edit Basic", checked: false },
  { id: "manageAlerts", label: "Manage Alerts", checked: false },
  { id: "accessLogs", label: "Access Logs", checked: false },
  { id: "viewDepartment", label: "View Department", checked: true },
  { id: "editAll", label: "Edit All", checked: true },
  { id: "editDepartment", label: "Edit Department", checked: false },
  { id: "deleteUsers", label: "Delete Users", checked: false },
  { id: "deleteBasic", label: "Delete Basic", checked: false },
  { id: "manageStaff", label: "Manage Staff", checked: false },
  { id: "manageInventory", label: "Manage Inventory", checked: false },
  { id: "exportData", label: "Export Data", checked: false },
];