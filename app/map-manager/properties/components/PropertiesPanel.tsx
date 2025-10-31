"use client";

import { useState } from "react";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";
import { Button } from "@/components/ui/button";

interface Property {
  id: string;
  name: string;
  type: string;
  value: any;
  options?: { value: string; label: string }[];
}

const dummyProperties: Property[] = [
  {
    id: "name",
    name: "Name",
    type: "text",
    value: "Zone 1"
  },
  {
    id: "description",
    name: "Description",
    type: "textarea",
    value: "Main office zone with restricted access"
  },
  {
    id: "type",
    name: "Type",
    type: "select",
    value: "office",
    options: [
      { value: "office", label: "Office" },
      { value: "meeting", label: "Meeting Room" },
      { value: "storage", label: "Storage" },
      { value: "restricted", label: "Restricted" }
    ]
  },
  {
    id: "color",
    name: "Color",
    type: "color",
    value: "#D4EDDA"
  },
  {
    id: "visible",
    name: "Visible",
    type: "checkbox",
    value: true
  },
  {
    id: "locked",
    name: "Locked",
    type: "checkbox",
    value: false
  }
];

export function PropertiesPanel() {
  const [properties, setProperties] = useState(dummyProperties);

  const handlePropertyChange = (id: string, value: any) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === id ? { ...prop, value } : prop
      )
    );
  };

  const renderProperty = (property: Property) => {
    switch (property.type) {
      case "text":
        return (
          <CustomInput
            key={property.id}
            label={property.name}
            value={property.value}
            onChange={(value: string) => handlePropertyChange(property.id, value)}
            placeholder={property.name}
          />
        );
      case "textarea":
        return (
          <CustomTextarea
            key={property.id}
            label={property.name}
            value={property.value}
            onChange={(value: string) => handlePropertyChange(property.id, value)}
            rows={3}
            placeholder={property.name}
          />
        );
      case "select":
        return (
          <CustomSelect
            key={property.id}
            label={property.name}
            value={property.value}
            onChange={(value) => handlePropertyChange(property.id, value)}
            options={(property.options?.map(o => typeof o === "string" ? o : o.value) as string[]) || []}
            placeholder={property.name}
          />
        );
      case "checkbox":
        return (
          <div key={property.id} className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {property.name}
            </label>
            <CustomCheckbox
              checked={property.value}
              onChange={() => handlePropertyChange(property.id, !property.value)}
              label={property.name}
            />
          </div>
        );
      case "color":
        return (
          <div key={property.id} className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {property.name}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={property.value}
                onChange={(e) => handlePropertyChange(property.id, e.target.value)}
                className="w-8 h-8 rounded border border-border"
              />
              <span className="text-xs text-muted-foreground">
                {property.value}
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Element Properties
      </div>
      
      <div className="space-y-4">
        {properties.map(renderProperty)}
      </div>
      
      <div className="pt-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Reset
          </Button>
          <Button size="sm" className="flex-1 bg-[#3D8C6C] hover:bg-[#3D8C6C]/90">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
