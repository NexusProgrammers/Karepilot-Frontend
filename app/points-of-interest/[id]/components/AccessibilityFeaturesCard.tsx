import { Eye, Ear } from "@/icons/Icons";
import { GrWheelchairActive } from "react-icons/gr";
import { PointOfInterest } from "@/lib/points-of-interest/types";
import clsx from "clsx";

interface AccessibilityFeaturesCardProps {
  poi: PointOfInterest;
}

type Feature = {
  label: string;
  available: boolean;
  icon: React.ReactNode;
};

export function AccessibilityFeaturesCard({ poi }: AccessibilityFeaturesCardProps) {
  const features: Feature[] = [
    {
      label: "Wheelchair Access",
      available: poi.accessibility?.wheelchairAccessible ?? false,
      icon: (
        <GrWheelchairActive className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
      ),
    },
    {
      label: "Hearing Loop",
      available: poi.accessibility?.hearingLoop ?? false,
      icon: (
        <Ear className="w-8 h-8 mb-2 text-yellow-600 dark:text-yellow-400" />
      ),
    },
    {
      label: "Visual Aid",
      available: poi.accessibility?.visualAidSupport ?? false,
      icon: (
        <Eye className="w-8 h-8 mb-2 text-amber-700 dark:text-amber-400" />
      ),
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Accessibility Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature) => {
          const available = feature.available;
          return (
            <div
              key={feature.label}
              className={clsx(
                "flex flex-col items-center p-4 rounded-2xl",
                available
                  ? "bg-green-50 dark:bg-green-950/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {feature.icon}
              <p className="text-base font-medium text-card-foreground mb-1">
                {feature.label}
              </p>
              <p
                className={clsx(
                  "text-sm",
                  available
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground"
                )}
              >
                {available ? "Available" : "Not Available"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
