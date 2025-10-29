export interface GeneralSettings {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  autoRefresh: boolean;
  refreshInterval: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface GeneralSettingsResponse {
  success: boolean;
  message: string;
  data: GeneralSettings;
}

export interface UpdateGeneralSettingsRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
  theme?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export interface UpdateProfileSettingsRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  profileImage?: string;
}

export interface UpdatePreferencesRequest {
  theme?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  autoRefresh?: boolean;
  refreshInterval?: number | string;
}

export interface NotificationSettings {
  _id?: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
  securityAlerts: boolean;
  emergencyAlerts: boolean;
  weeklyReports: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface NotificationSettingsResponse {
  success: boolean;
  message: string;
  data: NotificationSettings;
}

export interface UpdateNotificationSettingsRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsAlerts?: boolean;
  securityAlerts?: boolean;
  emergencyAlerts?: boolean;
  weeklyReports?: boolean;
}
