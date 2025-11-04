"use client";

import { Department } from "@/lib/types/departments";
import { Button } from "@/components/ui/button";
import { Building2, Edit, Trash2 } from "@/icons/Icons";
import { useState } from "react";
import { DepartmentModal } from "./DepartmentModal";

interface DepartmentCardProps {
  department: Department;
  onEdit?: (departmentId: string) => void;
  onDelete?: (departmentId: string, departmentName: string) => void;
}

export function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
            onClick={() => {
              if (onEdit) {
                onEdit(department.id);
              } else {
                setIsEditModalOpen(true);
              }
            }}
            variant="outline"
            size="sm"
            className="flex-1 px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {onDelete && (
            <Button
              onClick={() => onDelete(department.id, department.name)}
              variant="outline"
              size="sm"
              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-muted transition-colors rounded-lg cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
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
