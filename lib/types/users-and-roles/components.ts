export interface UsersListProps {
  users: any[];
}

export interface UsersAndRolesHeaderProps {
  activeTab: string;
}

export interface UserCardProps {
  user: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export interface RolesListProps {
  roles: any[];
}

export interface RoleCardProps {
  role: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface DepartmentsListProps {
  departments: any[];
}

export interface DepartmentCardProps {
  department: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId?: string | null;
  mode?: "create" | "edit";
}

export type ModalMode = "create" | "edit" | "view";

export interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
  mode?: ModalMode;
}
