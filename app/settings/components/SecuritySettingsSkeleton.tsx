import { SkeletonComponentProps } from "@/lib/types/skeletonComponents";

export function SecuritySettingsSkeleton({
  title,
  subtitle,
  className = "",
}: SkeletonComponentProps) {
  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="animate-pulse space-y-6">
        <div className="h-20 bg-muted rounded-xl"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-20 bg-muted rounded-xl"></div>
        <div className="h-10 bg-muted rounded w-48"></div>
      </div>
    </div>
  );
}


