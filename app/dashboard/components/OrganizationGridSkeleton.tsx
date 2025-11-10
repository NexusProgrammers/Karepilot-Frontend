"use client";

interface OrganizationGridSkeletonProps {
  count?: number;
}

export function OrganizationGridSkeleton({
  count = 6,
}: OrganizationGridSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`organization-skeleton-${index}`}
          className="bg-card rounded-3xl border border-border p-10"
        >
          <div className="animate-pulse space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-muted" />
            <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-3 bg-muted rounded w-2/3 mx-auto" />
            <div className="h-6 bg-muted rounded w-full" />
          </div>
        </div>
      ))}
    </>
  );
}

