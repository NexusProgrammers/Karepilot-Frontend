"use client";

import { Department } from "@/lib/types/departments";
import { DepartmentCard } from "./DepartmentCard";

interface DepartmentsListProps {
  departments: Department[];
  isLoading?: boolean;
  error?: any;
}

export function DepartmentsList({ departments, isLoading, error }: DepartmentsListProps) {

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
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load departments</p>
      </div>
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
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
}
