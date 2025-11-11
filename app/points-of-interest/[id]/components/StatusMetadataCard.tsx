import { PointOfInterest } from "@/lib/points-of-interest/types";

interface StatusMetadataCardProps {
  poi: PointOfInterest;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function StatusMetadataCard({ poi }: StatusMetadataCardProps) {
  const tags = poi.tags && poi.tags.length > 0 ? poi.tags : [poi.category].filter(Boolean);
  const updatedAt = poi.updatedAt ?? poi.createdAt;
  const formattedUpdatedAt = updatedAt
    ? dateFormatter.format(new Date(updatedAt))
    : "—";

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Status & Metadata
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Status</p>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300">
            {poi.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <p className="text-base text-card-foreground">{formattedUpdatedAt}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">POI ID</p>
          <p className="text-base text-card-foreground">{poi.id}</p>
        </div>
        {tags.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
