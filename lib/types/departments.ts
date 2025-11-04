export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentResponse {
  success: boolean;
  message: string;
  data: {
    department: Department;
  };
}

export interface DepartmentsListResponse {
  success: boolean;
  message: string;
  data: {
    departments: Department[];
    pagination: {
      current: number;
      pages: number;
      total: number;
      limit: number;
    };
  };
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateDepartmentRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface DepartmentQuery {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
  isActive?: boolean;
}

