"use client";

import { VenueTemplateCard } from "./VenueTemplateCard";
import { VenueTemplatesGridSkeleton } from "./VenueTemplatesGridSkeleton";
import { useGetAllVenueTemplatesQuery } from "@/lib/api/venueTemplatesApi";
import {
  HospitalIcon,
  PlaneIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "@/icons/Icons";
import { VenueTemplate } from "@/lib/types/organization/venueTemplates";
import { useMemo } from "react";

const getTemplateIcon = (templateName: string) => {
  const name = templateName.toLowerCase();
  if (name.includes("hospital")) {
    return <HospitalIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }
  if (name.includes("airport")) {
    return <PlaneIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }
  if (name.includes("shopping") || name.includes("mall")) {
    return <ShoppingBagIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }
  if (name.includes("open") || name.includes("place")) {
    return <MapPinIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }
  return <MapPinIcon className="w-6 h-6 text-[#3D8C6C]" />;
};

export function VenueTemplatesGrid() {
  const { data, isLoading, isError, error } = useGetAllVenueTemplatesQuery({
    page: 1,
    limit: 100,
  });

  const templates = useMemo(() => {
    if (!data?.data?.venueTemplates) return [];
    return data.data.venueTemplates;
  }, [data]);

  if (isLoading) {
    return <VenueTemplatesGridSkeleton />;
  }

  if (isError) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="text-center py-8">
          <p className="text-destructive mb-2">Error loading venue templates</p>
          <p className="text-sm text-muted-foreground">
            {error && "message" in error
              ? (error.message as string)
              : "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-2">
            Venue Templates & Configurations
          </h2>
          <p className="text-muted-foreground">
            Pre-configured templates for different venue types with specific POI
            categories and settings
          </p>
        </div>
        <div className="text-center py-8">
          <p className="text-muted-foreground">No venue templates found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          Venue Templates & Configurations
        </h2>
        <p className="text-muted-foreground">
          Pre-configured templates for different venue types with specific POI
          categories and settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template: VenueTemplate) => (
          <VenueTemplateCard
            key={template.id}
            title={template.name}
            description={template.description || ""}
            features={template.includedFeatures}
            poiCategories={template.defaultPOICategories}
            icon={getTemplateIcon(template.name)}
          />
        ))}
      </div>
    </div>
  );
}
