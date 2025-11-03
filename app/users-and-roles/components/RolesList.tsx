"use client";

import { Role } from "@/lib/types/roles";
import { RoleCard } from "./RoleCard";

interface RolesListProps {
  roles: Role[];
  isLoading?: boolean;
  error?: any;
}

export function RolesList({ roles, isLoading, error }: RolesListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-4xl p-6 animate-pulse"
          >
            <div className="h-5 bg-muted rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-6 bg-muted rounded-full w-20"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load roles</p>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No roles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  );
}
