"use client";

import { User } from "@/lib/types/users-and-roles/users";
import { UserCard } from "./UserCard";
import { QueryErrorState } from "@/components/common/QueryErrorState";

interface UsersListProps {
  users: User[];
  isLoading?: boolean;
  error?: any;
  onView?: (userId: string) => void;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string, userName: string) => void;
  onRetry?: () => void;
}

export function UsersList({
  users,
  isLoading,
  error,
  onView,
  onEdit,
  onDelete,
  onRetry,
}: UsersListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-4 sm:p-6 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-6 bg-muted rounded-full w-20"></div>
                  <div className="h-6 bg-muted rounded-full w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-muted rounded w-16"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <QueryErrorState
        error={error}
        title="Failed to load users"
        description={error?.data?.message}
        onRetry={onRetry}
        className="py-8"
      />
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
