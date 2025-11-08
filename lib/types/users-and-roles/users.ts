export interface UserDepartment {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: UserDepartment | null;
  phoneNumber?: string;
  badgeNumber?: string;
  shift?: string;
  profileImage?: string;
  isActive: boolean;
  lastLogin?: string;
  lastActive: string;
  currentLocation?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: {
      current: number;
      pages: number;
      total: number;
      limit: number;
    };
  };
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  department?: string | null | undefined;
  phoneNumber?: string;
  badgeNumber?: string;
  shift?: string;
  currentLocation?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  department?: string | null;
  phoneNumber?: string;
  badgeNumber?: string;
  shift?: string;
  currentLocation?: string;
  profileImage?: string;
  isActive?: boolean;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  department?: string;
  isActive?: boolean;
  status?: string;
}

export interface UsersStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
    activeUsers: number;
    totalDepartments: number;
    onlineNow: number;
  };
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      isActive: boolean;
    };
  };
}

export type Department = UserDepartment;

