export interface GeneralSettings {
  _id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
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
  theme?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
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
