import { POI } from "@/lib/points-of-interest/types";

interface StatusMetadataCardProps {
  poi: POI;
}

export function StatusMetadataCard({ poi }: StatusMetadataCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Status & Metadata
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Room</p>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300">
            {poi.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="text-base text-card-foreground">{poi.updatedDate}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">POI ID</p>
          <p className="text-base text-card-foreground">{poi.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {poi.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
