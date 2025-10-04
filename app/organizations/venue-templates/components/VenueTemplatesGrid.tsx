"use client";

import { VenueTemplateCard } from "./VenueTemplateCard";
import {
  HospitalIcon,
  PlaneIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "lucide-react";

export function VenueTemplatesGrid() {
  const templates = [
    {
      title: "Hospital Template",
      description: "Healthcare facilities and medical centers",
      features: [
        "Emergency tracking",
        "Patient navigation",
        "Equipment monitoring",
        "Staff coordination",
      ],
      poiCategories: ["Emergency", "Pharmacy", "Lab", "ICU", "Surgery"],
      icon: <HospitalIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      title: "Airport Template",
      description: "Airports and transportation hubs",
      features: [
        "Terminal navigation",
        "Gate tracking",
        "Baggage monitoring",
        "Flight information",
      ],
      poiCategories: ["Gates", "Security", "Baggage", "Food Court", "Shops"],
      icon: <PlaneIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      title: "Shopping Mall Template",
      description: "Retail centers and shopping complexes",
      features: [
        "Store locator",
        "Event tracking",
        "Customer flow",
        "Promotion zones",
      ],
      poiCategories: ["Stores", "Food Court", "Parking", "Restrooms", "ATM"],
      icon: <ShoppingBagIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
    {
      title: "Open Place Template",
      description: "Public spaces and outdoor venues",
      features: [
        "Area navigation",
        "Event management",
        "Visitor tracking",
        "Safety zones",
      ],
      poiCategories: ["Entrance", "Info", "Facilities", "Events", "Emergency"],
      icon: <MapPinIcon className="w-6 h-6 text-[#3D8C6C]" />,
    },
  ];

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
        {templates.map((template, index) => (
          <VenueTemplateCard
            key={index}
            title={template.title}
            description={template.description}
            features={template.features}
            poiCategories={template.poiCategories}
            icon={template.icon}
          />
        ))}
      </div>
    </div>
  );
}
