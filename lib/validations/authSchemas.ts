import * as Yup from 'yup';
import { LoginFormValues } from '../types';
import { UserPreferencesFormValues } from '../types/validation';

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