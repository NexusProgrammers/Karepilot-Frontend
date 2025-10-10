"use client";

import { useState } from "react";
import { X, UserPlus } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { permissionsData } from "@/lib/users-and-roles/data";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    department: "",
    phoneNumber: "",
    badgeNumber: "",
    shift: "",
  });

  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => {
    const initialPermissions: Record<string, boolean> = {};
    permissionsData.forEach((permission) => {
      initialPermissions[permission.id] = permission.checked;
    });
    return initialPermissions;
  });

  const roles = [
    "Admin",
    "Manager",
    "Technician",
    "Staff",
    "Security",
    "Viewer",
  ];
  const departments = [
    "ICU",
    "Emergency",
    "Pharmacy",
    "Security",
    "Administration",
    "Maintenance",
  ];
  const shifts = ["Day Shift", "Night Shift", "Evening Shift", "24/7"];

  const handleSubmit = () => {
    console.log("Creating user:", { ...formData, permissions });
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePermissionChange = (permissionId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Create New User
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new staff member to your organization
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              User Details
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide information about the new user and their access
              permissions.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  value={formData.fullName}
                  onChange={(value) =>
                    setFormData({ ...formData, fullName: value })
                  }
                  placeholder="e.g. Dr. Sarah Chen"
                  label="Full Name"
                  required
                />

                <CustomInput
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  placeholder="e.g. mail@example.com"
                  label="Email Address"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect
                  value={formData.role}
                  onChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                  options={roles}
                  placeholder="Select role"
                  label="Role"
                  required
                />

                <CustomSelect
                  value={formData.department}
                  onChange={(value) =>
                    setFormData({ ...formData, department: value })
                  }
                  options={departments}
                  placeholder="Select department"
                  label="Department"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CustomInput
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    setFormData({ ...formData, phoneNumber: value })
                  }
                  placeholder="e.g. +1 (555) 123-4567"
                  label="Phone Number"
                  required
                />

                <CustomInput
                  value={formData.badgeNumber}
                  onChange={(value) =>
                    setFormData({ ...formData, badgeNumber: value })
                  }
                  placeholder="e.g. MD10012"
                  label="Badge Number"
                  required
                />

                <CustomSelect
                  value={formData.shift}
                  onChange={(value) =>
                    setFormData({ ...formData, shift: value })
                  }
                  options={shifts}
                  placeholder="Select Shift"
                  label="Shift"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Permissions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {permissionsData.map((permission) => (
                <CustomCheckbox
                  key={permission.id}
                  id={permission.id}
                  checked={permissions[permission.id]}
                  onChange={() => handlePermissionChange(permission.id)}
                  label={permission.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/50">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-5 flex gap-2 py-2.5 text-sm cursor-pointer font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90"
          >
            <UserPlus className="w-4 h-4" />
            Create User
          </Button>
        </div>
      </div>
    </div>
  );
}