export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  department: string;
  phoneNumber: string;
  badgeNumber: string;
  shift: string;
  isActive: boolean;
  lastLogin: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
