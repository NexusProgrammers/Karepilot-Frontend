import { Map } from "@/icons/Icons";
import { PoiMapPreview } from "@/components/maps/PoiMapPreview";
import { PointOfInterest } from "@/lib/points-of-interest/types";

interface LocationPreviewCardProps {
  poi: PointOfInterest;
}

export function LocationPreviewCard({ poi }: LocationPreviewCardProps) {
  const latitude = poi.mapCoordinates?.latitude ?? poi.mapCoordinates?.y ?? null;
  const longitude = poi.mapCoordinates?.longitude ?? poi.mapCoordinates?.x ?? null;

  const hasCoordinates = latitude !== null && longitude !== null;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Location Preview</h3>

      {hasCoordinates ? (
        <div className="space-y-4">
          <PoiMapPreview latitude={Number(latitude)} longitude={Number(longitude)} />
          <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Map className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Selected Coordinates</p>
              <p className="text-xs text-muted-foreground">
                Latitude: {Number(latitude).toFixed(6)} • Longitude: {Number(longitude).toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
          <Map className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground mb-1">Map Preview</p>
          <p className="text-xs text-muted-foreground">Coordinates not available</p>
        </div>
      )}
    </div>
  );
}
