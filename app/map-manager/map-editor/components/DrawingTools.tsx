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
  Info,
} from "@/icons/Icons";
import { useState } from "react";

interface DrawingTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const drawingTools: DrawingTool[] = [
  {
    id: "poi",
    name: "Add POI",
    description: "Add points of interest to the map",
    icon: MapPin,
  },
  {
    id: "entrance",
    name: "Mark Entrance",
    description: "Mark building entrances and exits",
    icon: DoorOpen,
  },
  {
    id: "elevator",
    name: "Add Elevator",
    description: "Add elevator locations and connection",
    icon: ArrowUpDown,
  },
  {
    id: "path",
    name: "Draw Path",
    description: "Draw navigation paths and corridors",
    icon: Route,
  },
  {
    id: "restricted",
    name: "Restricted Zone",
    description: "Define restricted access areas",
    icon: Shield,
  },
  {
    id: "label",
    name: "Add Label",
    description: "Add text labels and signage",
    icon: Tag,
  },
  {
    id: "measure",
    name: "Measure",
    description: "Measure distances between points",
    icon: Ruler,
  },
  {
    id: "annotation",
    name: "Annotation",
    description: "Add notes and comments",
    icon: MessageSquare,
  },
];

interface DrawingToolsProps {
  onToolSelect?: (toolId: string) => void;
  selectedTool?: string | null;
}

export function DrawingTools({ onToolSelect, selectedTool }: DrawingToolsProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Drawing Tools
      </h3>

      <div className="space-y-1">
        {drawingTools.map((tool) => {
          const isActive = selectedTool === tool.id;
          return (
            <div
              key={tool.id}
              className={`relative flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer group ${
                isActive
                  ? "bg-[#3D8C6C]/10 border border-[#3D8C6C]/20"
                  : "hover:bg-accent/50"
              }`}
              onClick={() => onToolSelect?.(tool.id)}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-[#3D8C6C]/20"
                      : "group-hover:bg-[#3D8C6C]/10"
                  }`}
                >
                  <tool.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-[#3D8C6C]"
                        : "text-muted-foreground group-hover:text-[#3D8C6C]"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-[#3D8C6C]" : "text-foreground"
                  }`}
                >
                  {tool.name}
                </span>
              </div>

            {hoveredTool === tool.id && (
              <div className="absolute left-1/2 top-full mt-1 transform -translate-x-1/2 z-50">
                <div className="bg-popover border border-border rounded-lg shadow-lg p-3 min-w-[200px] text-center">
                  <div className="text-sm font-medium text-popover-foreground mb-1">
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tool.description}
                  </div>
                  <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-popover"></div>
                </div>
              </div>
            )}

              <button className="w-5 cursor-pointer h-5 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <Info className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
