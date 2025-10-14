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
  Info
} from "@/icons/Icons";
import { useState } from "react";

interface DrawingTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const drawingTools: DrawingTool[] = [
  {
    id: "poi",
    name: "Add POI",
    description: "Add points of interest to the map",
    icon: MapPin,
    count: 8
  },
  {
    id: "entrance",
    name: "Mark Entrance",
    description: "Mark building entrances and exits",
    icon: DoorOpen,
    count: 4
  },
  {
    id: "path",
    name: "Add Path",
    description: "Draw navigation paths and corridors",
    icon: ArrowUpDown,
    count: 12
  },
  {
    id: "zone",
    name: "Add Zone",
    description: "Define restricted access areas",
    icon: Route,
    count: 6
  },
  {
    id: "label",
    name: "Add Label",
    description: "Add text labels and signage",
    icon: Shield,
    count: 3
  },
  {
    id: "floor-plan",
    name: "Add Floor Plan",
    description: "Add floor plan elements",
    icon: Tag,
    count: 2
  },
  {
    id: "measure",
    name: "Measure Distance",
    description: "Measure distances between points",
    icon: Ruler,
    count: 5
  },
  {
    id: "comment",
    name: "Add Comment",
    description: "Add notes and comments",
    icon: MessageSquare,
    count: 7
  },
];

export function DrawingToolsList() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {drawingTools.map((tool) => (
        <div
          key={tool.id}
          className="relative flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer group"
          onMouseEnter={() => setHoveredTool(tool.id)}
          onMouseLeave={() => setHoveredTool(null)}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-[#3D8C6C]/10 transition-colors">
              <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-[#3D8C6C] transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {tool.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {tool.count} items
              </span>
            </div>
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
      ))}
    </div>
  );
}
