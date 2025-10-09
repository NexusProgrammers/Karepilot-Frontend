import { Role } from "@/lib/users-and-roles/types";

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <div className="bg-card border border-border rounded-4xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          {role.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {role.userCount} user{role.userCount !== 1 ? 's' : ''} with this role
        </p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-card-foreground mb-2">
          Typical Permissions
        </h4>
        <div className="flex flex-wrap gap-2">
          {role.permissions.map((permission, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
            >
              {permission}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
