import { POI } from "@/lib/points-of-interest/types";

interface POIDetailHeaderProps {
  poi: POI;
}

export function POIDetailHeader({ poi }: POIDetailHeaderProps) {
  return (
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">
            {poi.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{poi.building}</span>
            <span>•</span>
            <span>{poi.floor}</span>
            <span>•</span>
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
              {poi.categoryType}
            </span>
          </div>
        </div>
  );
}
