export interface NotificationSetting {
  id: number;
  title: string;
  description: string;
  checked: boolean;
}

export interface SecuritySetting {
  id: number;
  name: string;
  value: string | number | boolean;
  type: "input" | "toggle";
  label: string;
  description?: string;
  required?: boolean;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export interface UserPreference {
  id: number;
  label: string;
  value: string;
  options: string[];
}
