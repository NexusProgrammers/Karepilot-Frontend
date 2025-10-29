import { SkeletonComponentProps } from "@/lib/types/skeletonComponents";

export function NotificationSettingsSkeleton({
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
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="h-20 bg-muted rounded-xl"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
        </div>
        <div className="h-10 bg-muted rounded w-48"></div>
      </div>
    </div>
  );
}

