"use client";

import { Button } from "@/components/ui/button";
import {
  HospitalIcon,
  PlaneIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "@/icons/Icons";

interface VenueTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

export function VenueTemplateSelector({
  selectedTemplate,
  onTemplateSelect,
}: VenueTemplateSelectorProps) {
  const templates = [
    {
      id: "hospital",
      title: "Hospital Template",
      description: "Healthcare facilities and medical centers",
      features: [
        "Emergency tracking",
        "Patient navigation",
        "Equipment monitoring",
        "Staff coordination",
      ],
      icon: <HospitalIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      id: "airport",
      title: "Airport Template",
      description: "Airports and aviation facilities",
      features: [
        "Terminal navigation",
        "Gate tracking",
        "Baggage monitoring",
        "Flight information",
      ],
      icon: <PlaneIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      id: "shopping-mall",
      title: "Shopping Mall Template",
      description: "Retail centers and shopping complexes",
      features: [
        "Store locator",
        "Event tracking",
        "Customer flow",
        "Promotion zones",
      ],
      icon: <ShoppingBagIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      id: "open-place",
      title: "Open Place Template",
      description: "Parks, campuses, and public spaces",
      features: [
        "Area navigation",
        "Event management",
        "Visitor tracking",
        "Safety zones",
      ],
      icon: <MapPinIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Select Venue Type
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? "border-[#3D8C6C] bg-[#3D8C6C]/5"
                : "border-border bg-card hover:border-[#3D8C6C]/50"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#3D8C6C]/10 rounded-full flex items-center justify-center shrink-0">
                {template.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-card-foreground mb-1">
                  {template.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-xs font-medium text-card-foreground mb-1">
                Included Features:
              </h5>
              <ul className="space-y-0.5">
                {template.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <div className="w-2 h-2 bg-[#3D8C6C] rounded-full shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-border mb-3" />
            <Button
              variant="outline"
              className="w-full py-1.5 px-3 text-xs font-medium text-card-foreground bg-transparent border border-border rounded-lg transition-colors cursor-pointer"
            >
              Use this template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
