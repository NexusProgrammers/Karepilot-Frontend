import { POI } from "@/lib/points-of-interest/types";

interface BasicInformationCardProps {
  poi: POI;
}

export function BasicInformationCard({ poi }: BasicInformationCardProps) {
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
              {poi.roomNumber}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <p className="text-base font-medium text-card-foreground">
              {poi.categoryType}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Description</p>
          <p className="text-base text-card-foreground">{poi.description}</p>
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
