import { NotificationSetting, SecuritySetting, UserPreference } from "./types";

export const settingsTabs = [
  { id: "general", label: "General", href: "/settings" },
  { id: "notifications", label: "Notifications", href: "/settings/notifications" },
  { id: "security", label: "Security", href: "/settings/security" },
];

export const notificationSettings: NotificationSetting[] = [
  {
    id: 1,
    title: "Email Notifications",
    description: "Receive notification via email",
    checked: false,
  },
  {
    id: 2,
    title: "Push Notifications",
    description: "Browser and mobile notifications",
    checked: false,
  },
  {
    id: 3,
    title: "SMS Alerts",
    description: "Critical alerts via SMS",
    checked: true,
  },
  {
    id: 4,
    title: "Security Alerts",
    description: "Login and security notification",
    checked: true,
  },
  {
    id: 5,
    title: "Emergency Alerts",
    description: "Critical emergency notifications",
    checked: true,
  },
  {
    id: 6,
    title: "Weekly Reports",
    description: "Summary reports via email",
    checked: true,
  },
];

export const securitySettings: SecuritySetting[] = [
  {
    id: 1,
    name: "twoFactorAuth",
    value: false,
    type: "toggle",
    label: "Two-Factor Authentication",
    description: "Require 2FA for enhanced security",
  },
  {
    id: 2,
    name: "sessionTimeout",
    value: "30",
    type: "input",
    label: "Session Timeout (minutes)*",
    required: true,
  },
  {
    id: 3,
    name: "maxLoginAttempts",
    value: "5",
    type: "input",
    label: "Max Login Attempts*",
    required: true,
  },
  {
    id: 4,
    name: "passwordExpiry",
    value: "90",
    type: "input",
    label: "Password Expiry (days)*",
    required: true,
  },
  {
    id: 5,
    name: "auditLogs",
    value: true,
    type: "toggle",
    label: "Audit Logs",
    description: "Keep details logs of user actions",
  },
];

export const userPreferences: UserPreference[] = [
  {
    id: 1,
    label: "Theme",
    value: "System",
    options: ["Light", "Dark", "System"],
  },
  {
    id: 2,
    label: "Language",
    value: "English",
    options: ["English", "Spanish", "French", "German"],
  },
  {
    id: 3,
    label: "Timezone",
    value: "UTC-5 (Eastern)",
    options: ["UTC-5 (Eastern)", "UTC-6 (Central)", "UTC-7 (Mountain)", "UTC-8 (Pacific)"],
  },
  {
    id: 4,
    label: "Date Format",
    value: "DD/MM/YYYY",
    options: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
  },
  {
    id: 5,
    label: "Time Format",
    value: "24 Hours",
    options: ["12 Hours", "24 Hours"],
  },
  {
    id: 6,
    label: "Refresh Interval (seconds)",
    value: "30",
    options: ["15", "30", "60", "120"],
  },
];

export const profileData = {
  firstName: "Ezekiel",
  lastName: "Olayiwola",
  email: "ezeydesign1@gmail.com",
  profileImage: "/api/placeholder/100/100",
};
