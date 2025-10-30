import { SkeletonComponentProps } from "@/lib/types/settings/skeletonComponents";

export function ProfileSettingsSkeleton({
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
        <div className="w-20 h-20 rounded-full bg-muted"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-10 bg-muted rounded"></div>
        <div className="h-10 bg-muted rounded"></div>
      </div>
    </div>
  );
}
