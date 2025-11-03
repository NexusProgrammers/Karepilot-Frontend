"use client";

import { Role } from "@/lib/types/roles";

interface RoleCardProps {
  role: Role;
}

// Helper function to convert permission keys to readable labels
const getPermissionLabel = (key: string): string => {
  const labels: Record<string, string> = {
    viewUsers: "View Users",
    createUsers: "Create Users",
    editUsers: "Edit Users",
    deleteUsers: "Delete Users",
    viewRoles: "View Roles",
    createRoles: "Create Roles",
    editRoles: "Edit Roles",
    deleteRoles: "Delete Roles",
    viewDepartments: "View Departments",
    createDepartments: "Create Departments",
    editDepartments: "Edit Departments",
    deleteDepartments: "Delete Departments",
    viewAll: "View All",
    editAll: "Edit All",
    manageAlerts: "Manage Alerts",
    viewSecurity: "View Security",
    accessLogs: "Access Logs",
    viewBasic: "View Basic",
    editDepartment: "Edit Department",
    viewDepartment: "View Department",
    manageInventory: "Manage Inventory",
  };
  return labels[key] || key;
};

export function RoleCard({ role }: RoleCardProps) {
  // Get all active permissions
  const activePermissions = Object.entries(role.permissions)
    .filter(([_, value]) => value === true)
    .map(([key]) => getPermissionLabel(key));

  return (
    <div className="bg-card border border-border rounded-4xl p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {role.role}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {activePermissions.length} permission{activePermissions.length !== 1 ? 's' : ''}
          </p>
        </div>
        {role.isActive ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            Inactive
          </span>
        )}
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-card-foreground mb-2">
          Permissions
        </h4>
        <div className="flex flex-wrap gap-2">
          {activePermissions.length > 0 ? (
            activePermissions.map((permission, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {permission}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No permissions assigned</span>
          )}
        </div>
      </div>
    </div>
  );
}
