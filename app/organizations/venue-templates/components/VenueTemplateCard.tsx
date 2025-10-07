"use client";

import { Button } from "@/components/ui/button";
import { VenueTemplateCardProps } from "@/lib/organization/types";

export function VenueTemplateCard({
  title,
  description,
  features,
  poiCategories,
  icon,
}: VenueTemplateCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-[#3D8C6C]/10 rounded-full flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">
          Included Features:
        </h4>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <div className="w-2 h-2 bg-[#3D8C6C] rounded-full shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">
          Default POI Categories:
        </h4>
        <div className="flex flex-wrap gap-2">
          {poiCategories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-shadow-muted-foreground text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <hr className="border-border mb-4" />
      <Button className="w-full py-2 px-4 text-sm font-medium text-card-foreground bg-transparent border border-border hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors cursor-pointer">
        Use This Template
      </Button>
    </div>
  );
}
