"use client";

import { Button } from "@/components/ui/button";
import {
  HospitalIcon,
  PlaneIcon,
  ShoppingBagIcon,
  MapPinIcon,
  Building2,
} from "@/icons/Icons";
import { VenueTemplate } from "@/lib/types/organization/venueTemplates";

interface VenueTemplateSelectorProps {
  templates: VenueTemplate[];
  selectedTemplateId?: string;
  onTemplateSelect: (templateId: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const getTemplateIcon = (templateName: string) => {
  const lowerName = templateName.toLowerCase();

  if (lowerName.includes("hospital")) {
    return <HospitalIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }

  if (lowerName.includes("airport")) {
    return <PlaneIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }

  if (lowerName.includes("mall") || lowerName.includes("shopping")) {
    return <ShoppingBagIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }

  if (lowerName.includes("open") || lowerName.includes("park")) {
    return <MapPinIcon className="w-6 h-6 text-[#3D8C6C]" />;
  }

  return <Building2 className="w-6 h-6 text-[#3D8C6C]" />;
};

const TemplateSkeleton = () => (
  <div className="p-4 rounded-xl border-2 border-border bg-muted/40 animate-pulse space-y-4">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-muted rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted rounded-md w-2/3" />
        <div className="h-3 bg-muted rounded-md w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-muted rounded-md w-full" />
      <div className="h-3 bg-muted rounded-md w-5/6" />
      <div className="h-3 bg-muted rounded-md w-4/6" />
    </div>
    <div className="h-7 bg-muted rounded-md w-full" />
  </div>
);

export function VenueTemplateSelector({
  templates,
  selectedTemplateId,
  onTemplateSelect,
  disabled = false,
  loading = false,
}: VenueTemplateSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">
          Select Venue Template
        </h3>
        <span className="text-xs text-muted-foreground">
          Choose the layout that matches your organization type
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <TemplateSkeleton key={index} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
          No venue templates available. Create a template first to assign it to an organization.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => {
            const isSelected = selectedTemplateId === template.id;

            return (
              <div
                key={template.id}
                onClick={() => !disabled && onTemplateSelect(template.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-[#3D8C6C] bg-[#3D8C6C]/5"
                    : "border-border bg-card hover:border-[#3D8C6C]/50"
                } ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#3D8C6C]/10 rounded-full flex items-center justify-center shrink-0">
                    {getTemplateIcon(template.name)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-card-foreground mb-1">
                      {template.name}
                    </h4>
                    {template.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    )}
                  </div>
                </div>

                {template.includedFeatures && template.includedFeatures.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-medium text-card-foreground mb-1">
                      Included Features:
                    </h5>
                    <ul className="space-y-0.5">
                      {template.includedFeatures.slice(0, 4).map((feature, index) => (
                        <li
                          key={feature + index}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-[#3D8C6C] rounded-full shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                      {template.includedFeatures.length > 4 && (
                        <li className="text-xs text-muted-foreground">
                          +{template.includedFeatures.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <hr className="border-border mb-3" />
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className="w-full py-1.5 px-3 text-xs font-medium text-card-foreground bg-transparent border border-border rounded-lg transition-colors cursor-pointer"
                >
                  {isSelected ? "Selected" : "Use this template"}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
