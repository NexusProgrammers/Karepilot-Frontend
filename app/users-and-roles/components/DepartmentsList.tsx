import { Department } from "@/lib/users-and-roles/types";
import { DepartmentCard } from "./DepartmentCard";

interface DepartmentsListProps {
  departments: Department[];
}

export function DepartmentsList({ departments }: DepartmentsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <DepartmentCard key={department.id} department={department} />
      ))}
    </div>
  );
}
