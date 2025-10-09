import { Role } from "@/lib/users-and-roles/types";
import { RoleCard } from "./RoleCard";

interface RolesListProps {
  roles: Role[];
}

export function RolesList({ roles }: RolesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {roles.map((role) => (
        <RoleCard key={role.id} role={role} />
      ))}
    </div>
  );
}
