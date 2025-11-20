"use client";

import { useState } from "react";
import { Eye, HeartCrack } from "@/icons/Icons";
import { Layer } from "@/lib/types/map-editor/components";

const initialLayers: Layer[] = [
  { id: "floor-plan", name: "Floor Plan", visible: true },
  { id: "pois", name: "POIs", visible: true },
  { id: "paths", name: "Paths", visible: true },
  { id: "zones", name: "Zones", visible: true },
  { id: "labels", name: "Labels", visible: true },
];

export function Layers() {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);

  const toggleVisibility = (layerId: string) => {
    setLayers(prev => 
      prev.map(layer => 
        layer.id === layerId 
          ? { ...layer, visible: !layer.visible }
          : layer
      )
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Layers</h3>
      
      <div className="space-y-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleVisibility(layer.id)}
                className="w-5 h-5 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              >
                <Eye className={`w-5 h-5 ${layer.visible ? 'text-[#3D8C6C]' : 'text-muted-foreground'}`} />
              </button>
              <span className="text-sm font-medium text-foreground">{layer.name}</span>
            </div>
            <button className="w-5 h-5 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
              <HeartCrack className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
