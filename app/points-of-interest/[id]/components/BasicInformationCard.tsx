import { PointOfInterest } from "@/lib/points-of-interest/types";

interface BasicInformationCardProps {
  poi: PointOfInterest;
}

export function BasicInformationCard({ poi }: BasicInformationCardProps) {
  const tags = poi.tags && poi.tags.length > 0 ? poi.tags : [poi.category].filter(Boolean);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Basic Information
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Room</p>
            <p className="text-base font-medium text-card-foreground">
              {poi.roomNumber || "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <p className="text-base font-medium text-card-foreground">
              {poi.categoryType ?? poi.category ?? "—"}
            </p>
          </div>
        </div>
        {poi.description && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            <p className="text-base text-card-foreground">{poi.description}</p>
          </div>
        )}
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
