import { Map } from "@/icons/Icons";
import { PointOfInterest } from "@/lib/points-of-interest/types";

interface LocationPreviewCardProps {
  poi: PointOfInterest;
}

export function LocationPreviewCard({ poi }: LocationPreviewCardProps) {
  const latitude =
    poi.mapCoordinates?.latitude ?? poi.mapCoordinates?.y ?? null;
  const longitude =
    poi.mapCoordinates?.longitude ?? poi.mapCoordinates?.x ?? null;

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
        {latitude !== null && longitude !== null ? (
          <p className="text-xs text-muted-foreground">
            Latitude: {latitude}, Longitude: {longitude}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Coordinates not available
          </p>
        )}
      </div>
    </div>
  );
}
