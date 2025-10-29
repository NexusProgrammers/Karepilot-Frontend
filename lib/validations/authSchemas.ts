import * as Yup from 'yup';
import { LoginFormValues } from '../types';
import { UserPreferencesFormValues } from '../types/validation';
import { ProfileFormData } from '../types/components';

export const loginValidationSchema = Yup.object<LoginFormValues>({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean(),
});

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