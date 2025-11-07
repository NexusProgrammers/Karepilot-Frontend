export interface Permission {
  viewUsers?: boolean;
  createUsers?: boolean;
  editUsers?: boolean;
  deleteUsers?: boolean;
  viewRoles?: boolean;
  createRoles?: boolean;
  editRoles?: boolean;
  deleteRoles?: boolean;
  viewDepartments?: boolean;
  createDepartments?: boolean;
  editDepartments?: boolean;
  deleteDepartments?: boolean;
  viewAll?: boolean;
  editAll?: boolean;
  manageAlerts?: boolean;
  viewSecurity?: boolean;
  accessLogs?: boolean;
  viewBasic?: boolean;
  editDepartment?: boolean;
  viewDepartment?: boolean;
  manageInventory?: boolean;
}

export interface Role {
  id: string;
  role: string;
  permissions: Permission;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RolesListResponse {
  success: boolean;
  message: string;
  data: Role[];
}

export interface RoleResponse {
  success: boolean;
  message: string;
  data: {
    role: Role;
  };
}

export interface UpdateRoleRequest {
  permissions?: Permission;
  isActive?: boolean;
}

export interface RoleQuery {
  search?: string;
  role?: string;
  isActive?: boolean;
}

