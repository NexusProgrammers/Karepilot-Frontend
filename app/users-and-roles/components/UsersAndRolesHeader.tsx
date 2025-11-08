import { Button } from "@/components/ui/button";
import {  Building2, User } from "@/icons/Icons";

interface UsersAndRolesHeaderProps {
  onCreateUserClick: () => void;
  onCreateDepartmentClick: () => void;
  showUserButton?: boolean;
  showDepartmentButton?: boolean;
}

export function UsersAndRolesHeader({
  onCreateUserClick,
  onCreateDepartmentClick,
  showUserButton = true,
  showDepartmentButton = true,
}: UsersAndRolesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-card-foreground">
          Users & Roles
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage staff members and their access permissions for your
          organization
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {showDepartmentButton && (
          <Button
            onClick={onCreateDepartmentClick}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Building2 className="w-4 h-4" />
            Add Department
          </Button>
        )}
        {showUserButton && (
          <Button
            onClick={onCreateUserClick}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-white bg-[#3D8C6C] rounded-lg hover:bg-[#3D8C6C]/90 transition-colors"
          >
            <User className="w-4 h-4" />
            Add New User
          </Button>
        )}
      </div>
    </div>
  );
}
