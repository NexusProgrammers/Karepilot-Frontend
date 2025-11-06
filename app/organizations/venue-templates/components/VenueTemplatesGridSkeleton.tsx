"use client";

export function VenueTemplatesGridSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <div className="h-7 bg-muted rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border p-6 animate-pulse"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-muted rounded-full shrink-0"></div>
              <div className="flex-1">
                <div className="h-6 bg-muted rounded w-40 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="h-4 bg-muted rounded w-40 mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border mb-4"></div>
            <div className="h-10 bg-muted rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

