"use client";

export function POIGridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`poi-skeleton-${index}`}
          className="bg-card border border-border rounded-2xl p-6 space-y-4 animate-pulse"
        >
          <div className="h-6 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
          </div>
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}

