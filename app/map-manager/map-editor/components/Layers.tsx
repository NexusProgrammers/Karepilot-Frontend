"use client";

import { Eye, EyeOff } from "@/icons/Icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { toggleLayer, resetLayers, LayerVisibility } from "@/lib/store/slices/mapEditorSlice";

interface LayerItem {
  id: keyof LayerVisibility;
  name: string;
  description: string;
}

const layerItems: LayerItem[] = [
  { id: "floorPlan", name: "Floor Plan", description: "Base floor plan image" },
  { id: "pois", name: "POIs", description: "Points of Interest, Entrances, Elevators" },
  { id: "paths", name: "Paths", description: "Navigation paths and routes" },
  { id: "zones", name: "Zones", description: "Restricted and marked zones" },
  { id: "labels", name: "Labels", description: "Text labels and annotations" },
];

export function Layers() {
  const dispatch = useDispatch();
  const layerVisibility = useSelector((state: RootState) => state.mapEditor.layerVisibility);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Layers</h3>
      
      <div className="space-y-1" suppressHydrationWarning>
        {layerItems.map((layer) => {
          const isVisible = layerVisibility[layer.id];
          
          return (
            <div
              key={layer.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => dispatch(toggleLayer(layer.id))}
                  className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-all hover:scale-105"
                  title={isVisible ? "Hide layer" : "Show layer"}
                  suppressHydrationWarning
                >
                  {isVisible ? (
                    <Eye className="w-5 h-5 text-[#3D8C6C]" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium transition-colors ${
                      isVisible ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {layer.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={() => dispatch(resetLayers())}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
