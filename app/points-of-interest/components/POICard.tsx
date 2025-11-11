"use client";

import { PointOfInterest } from "@/lib/points-of-interest/types";
import { MapPin, Settings, Ear } from "@/icons/Icons";
import { GrWheelchairActive } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import { PointOfInterestModal } from "@/app/dashboard/[id]/components/CreatePOIModal";
import { useMemo, useState } from "react";
import Link from "next/link";

interface POICardProps {
  poi: PointOfInterest;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export default function POICard({ poi }: POICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const displayTags = useMemo(() => {
    if (poi.tags && poi.tags.length > 0) {
      return poi.tags;
    }
    return poi.category ? [poi.category] : [];
  }, [poi.tags, poi.category]);

  const lastUpdated = poi.updatedAt ?? poi.createdAt;
  const formattedUpdatedAt = lastUpdated
    ? dateFormatter.format(new Date(lastUpdated))
    : "";

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-start flex-col sm:flex-row justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-card-foreground mb-1">
              {poi.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {poi.building} • {poi.floor}
            </p>
          </div>
          {poi.categoryType && (
            <span className="text-xs bg-muted px-3 py-1 rounded-md text-muted-foreground">
              {poi.categoryType}
            </span>
          )}
        </div>

        <div className="mb-4">
          <p className="text-base font-normal text-card-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {poi.roomNumber || "—"}
          </p>
          {poi.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {poi.description}
            </p>
          )}
        </div>

        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {poi.accessibility?.wheelchairAccessible && (
              <GrWheelchairActive className="w-4 h-4 text-blue-500" />
            )}
            {poi.accessibility?.hearingLoop && (
              <Ear className="w-4 h-4 text-yellow-500" />
            )}
          </div>
          {formattedUpdatedAt && (
            <span className="text-xs text-muted-foreground">
              Updated {formattedUpdatedAt}
            </span>
          )}
        </div>
      </div>

      <div className="px-6 py-4 flex items-center gap-3 border-t border-border">
        <Link href={`/points-of-interest/${poi.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full cursor-pointer px-4 py-3 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
          >
            View
          </Button>
        </Link>
        <Button
          onClick={handleEditClick}
          variant="outline"
          className="flex-1 cursor-pointer px-4 py-3 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-10 h-10 cursor-pointer flex items-center justify-center text-card-foreground bg-card border border-border rounded-2xl hover:bg-muted transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <PointOfInterestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pointOfInterest={poi}
      />
    </div>
  );
}
