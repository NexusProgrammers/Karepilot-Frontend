export interface UserPreferencesFormValues {
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  autoRefresh: boolean;
  refreshInterval: string;
}

export interface NotificationSettingsFormValues {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
  securityAlerts: boolean;
  emergencyAlerts: boolean;
  weeklyReports: boolean;
}

