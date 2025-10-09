import { Department } from "@/lib/users-and-roles/types";
import { Button } from "@/components/ui/button";
import { Building2, Edit, Trash2 } from "lucide-react";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
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
              {department.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
