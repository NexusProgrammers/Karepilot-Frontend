"use client";

export function POIDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-1/3 bg-muted rounded animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
          <div className="h-3 w-1/3 bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-16 bg-muted rounded-full" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
          <div className="h-4 w-1/3 bg-muted rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
          <div className="h-4 w-1/2 bg-muted rounded" />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 animate-pulse">
          <div className="h-6 w-1/3 bg-muted rounded" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

