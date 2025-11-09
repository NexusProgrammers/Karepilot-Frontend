"use client";

import type { Department } from "@/lib/types/users-and-roles/departments";
import { DepartmentCard } from "./DepartmentCard";
import { QueryErrorState } from "@/components/common/QueryErrorState";

interface DepartmentsListProps {
  departments: Department[];
  isLoading?: boolean;
  error?: any;
  onEdit?: (departmentId: string) => void;
  onDelete?: (departmentId: string, departmentName: string) => void;
  onRetry?: () => void;
}

export function DepartmentsList({
  departments,
  isLoading,
  error,
  onEdit,
  onDelete,
  onRetry,
}: DepartmentsListProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-6 animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-full mb-4"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        title="Failed to load departments"
        description={error?.data?.message}
        onRetry={onRetry}
        className="py-8"
      />
    );
  }

  if (departments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No departments found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <DepartmentCard 
          key={department.id} 
          department={department}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
