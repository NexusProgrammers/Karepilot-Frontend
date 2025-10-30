import * as Yup from 'yup';
import { UserPreferencesFormValues, NotificationSettingsFormValues } from '../types/validations/validation';
import { ProfileFormData } from '../types/components';

export const userPreferencesValidationSchema = Yup.object<UserPreferencesFormValues>({
    theme: Yup.string().required('Theme is required'),
    language: Yup.string().required('Language is required'),
    timezone: Yup.string().required('Timezone is required'),
    dateFormat: Yup.string().required('Date format is required'),
    timeFormat: Yup.string().required('Time format is required'),
    autoRefresh: Yup.boolean().required(),
    refreshInterval: Yup.string().required('Refresh interval is required'),
  });
  
  export const profileSettingsValidationSchema = Yup.object<ProfileFormData>({
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    profileImage: Yup.string().optional(),
  });
  
  export const notificationSettingsValidationSchema = Yup.object<NotificationSettingsFormValues>({
    emailNotifications: Yup.boolean().required(),
    pushNotifications: Yup.boolean().required(),
    smsAlerts: Yup.boolean().required(),
    securityAlerts: Yup.boolean().required(),
    emergencyAlerts: Yup.boolean().required(),
    weeklyReports: Yup.boolean().required(),
  });