export function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border border-border">
        <div className="flex items-center justify-center mb-3">
          <div className="w-32 h-10 bg-muted rounded animate-pulse"></div>
        </div>

        <div className="text-center mb-8">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse"></div>
        </div>

        <div className="space-y-6 animate-pulse">
          <div>
            <div className="h-4 bg-muted rounded w-16 mb-2"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>

          <div>
            <div className="h-4 bg-muted rounded w-20 mb-2"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-5 bg-muted rounded w-24"></div>
            <div className="h-5 bg-muted rounded w-32"></div>
          </div>

          <div className="h-12 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

