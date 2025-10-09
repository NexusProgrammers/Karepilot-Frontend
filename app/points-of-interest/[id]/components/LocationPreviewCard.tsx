import { Map } from "lucide-react";
import { POI } from "@/lib/points-of-interest/types";

interface LocationPreviewCardProps {
  poi: POI;
}

export function LocationPreviewCard({ poi }: LocationPreviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Location Preview
      </h3>
      <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
        <Map className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium text-muted-foreground mb-1">
          Map Preview
        </p>
        {poi.coordinates && (
          <p className="text-xs text-muted-foreground">
            x: {poi.coordinates.x}, y: {poi.coordinates.y}
          </p>
        )}
      </div>
    </div>
  );
}
