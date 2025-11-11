import { Edit3, MapPin, Compass, Trash2 } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { PointOfInterest } from "@/lib/points-of-interest/types";

interface QuickActionsCardProps {
  poi: PointOfInterest;
  onEditClick: () => void;
  onViewOnMapClick: () => void;
  onGetDirectionsClick: () => void;
  onDeleteClick: () => void;
}

export function QuickActionsCard({
  onEditClick,
  onViewOnMapClick,
  onGetDirectionsClick,
  onDeleteClick,
}: QuickActionsCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Button
          onClick={onEditClick}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 text-left text-card-foreground hover:bg-accent"
        >
          <Edit3 className="w-4 h-4 text-muted-foreground" />
          Edit POI
        </Button>
        <Button
          onClick={onViewOnMapClick}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 text-left text-card-foreground hover:bg-accent"
        >
          <MapPin className="w-4 h-4 text-muted-foreground" />
          View on Map
        </Button>
        <Button
          onClick={onGetDirectionsClick}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 text-left text-card-foreground hover:bg-accent"
        >
          <Compass className="w-4 h-4 text-muted-foreground" />
          Get Directions
        </Button>
        <div className="border-t border-border" />
        <Button
          onClick={onDeleteClick}
          variant="ghost"
          className="w-full justify-start gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
          Delete POI
        </Button>
      </div>
    </div>
  );
}
