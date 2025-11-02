"use client";

import { Department } from "@/lib/types/departments";
import { Button } from "@/components/ui/button";
import { Building2, Edit, Trash2 } from "@/icons/Icons";
import { useState } from "react";
import { DepartmentModal } from "./DepartmentModal";
import {
  useDeleteDepartmentMutation,
} from "@/lib/api/departmentsApi";
import toast from "react-hot-toast";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteDepartment, { isLoading: isDeleting }] = useDeleteDepartmentMutation();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this department?")) {
      return;
    }

      try {
      await deleteDepartment(department.id).unwrap();
      toast.success("Department deleted successfully");
    } catch (error: any) {
      console.error("Error deleting department:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to delete department";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#3D8C6C]/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#3D8C6C]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-1">
                {department.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {department.description || "No description"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="outline"
            size="sm"
            className="flex-1 px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="outline"
            size="sm"
            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-muted transition-colors rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <DepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        departmentId={department.id}
      />
    </>
  );
}
