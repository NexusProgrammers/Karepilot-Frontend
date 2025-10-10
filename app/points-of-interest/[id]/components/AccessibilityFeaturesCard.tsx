import { Eye, Ear } from "@/icons/Icons";
import { GrWheelchairActive } from "react-icons/gr";
import { POI } from "@/lib/points-of-interest/types";

interface AccessibilityFeaturesCardProps {
  poi: POI;
}

export function AccessibilityFeaturesCard({
  poi,
}: AccessibilityFeaturesCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Accessibility Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex flex-col items-center p-4 rounded-2xl bg-green-50 dark:bg-green-950/20">
          <GrWheelchairActive className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
          <p className="text-base font-medium text-card-foreground mb-1">
            Wheelchair Access
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">Available</p>
        </div>
        
        <div className="flex flex-col items-center p-4 rounded-2xl bg-green-50 dark:bg-green-950/20">
          <Ear className="w-8 h-8 mb-2 text-yellow-600 dark:text-yellow-400" />
          <p className="text-base font-medium text-card-foreground mb-1">
            Hearing Loop
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">Available</p>
        </div>
        
        <div className="flex flex-col items-center p-4 rounded-2xl bg-muted">
          <Eye className="w-8 h-8 mb-2 text-amber-700 dark:text-amber-400" />
          <p className="text-base font-medium text-card-foreground mb-1">
            Visual Aid
          </p>
          <p className="text-sm text-muted-foreground">Not Available</p>
        </div>
      </div>
    </div>
  );
}
