import { SecuritySetting } from '../settings/types';
import { UserPreference } from '../settings/types';
import { NotificationSetting } from '../settings/types';

export interface BaseSettingsProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface ProfileSettingsProps extends BaseSettingsProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export interface UserPreferencesProps extends BaseSettingsProps {
  preferences: UserPreference[];
}

export interface SecuritySettingsProps extends BaseSettingsProps {
  settings: SecuritySetting[];
}

export interface SecuritySettingsState {
  [key: string]: boolean | string;
}

export interface PasswordSettingsProps extends BaseSettingsProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettingsProps extends BaseSettingsProps {
  settings: NotificationSetting[];
}

