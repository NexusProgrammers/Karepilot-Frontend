"use client";

import {
  MapPin,
  DoorOpen,
  ArrowUpDown,
  Route,
  Shield,
  Tag,
  Ruler,
  MessageSquare,
  Eye,
  EyeOff,
} from "@/icons/Icons";
import { useState } from "react";
import { CustomCheckbox } from "@/components/common/CustomCheckbox";

interface Layer {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  visible: boolean;
  locked: boolean;
  count: number;
}

const layers: Layer[] = [
  {
    id: "floor-plan",
    name: "Floor Plan",
    icon: Route,
    visible: true,
    locked: false,
    count: 2,
  },
  {
    id: "poi",
    name: "POI",
    icon: MapPin,
    visible: true,
    locked: false,
    count: 8,
  },
  {
    id: "paths",
    name: "Paths",
    icon: ArrowUpDown,
    visible: true,
    locked: false,
    count: 12,
  },
  {
    id: "zones",
    name: "Zones",
    icon: Route,
    visible: true,
    locked: false,
    count: 6,
  },
  {
    id: "labels",
    name: "Labels",
    icon: Shield,
    visible: true,
    locked: false,
    count: 3,
  },
  {
    id: "entrances",
    name: "Entrances",
    icon: DoorOpen,
    visible: true,
    locked: false,
    count: 4,
  },
  {
    id: "tags",
    name: "Tags",
    icon: Tag,
    visible: true,
    locked: false,
    count: 5,
  },
  {
    id: "rulers",
    name: "Rulers",
    icon: Ruler,
    visible: false,
    locked: false,
    count: 2,
  },
  {
    id: "messages",
    name: "Messages",
    icon: MessageSquare,
    visible: true,
    locked: false,
    count: 7,
  },
];

export function LayersList() {
  const [layerStates, setLayerStates] = useState(layers);

  const toggleVisibility = (id: string) => {
    setLayerStates((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="space-y-2">
      {layerStates.map((layer) => (
        <div
          key={layer.id}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <layer.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {layer.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {layer.count} items
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CustomCheckbox
              checked={layer.visible}
              onChange={() => toggleVisibility(layer.id)}
              label={layer.name}
            />
            <button
              onClick={() => toggleVisibility(layer.id)}
              className="w-5 h-5 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              {layer.visible ? (
                <Eye className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
