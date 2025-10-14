"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/common/CustomSelect";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { ChevronDown } from "@/icons/Icons";

export function Properties() {
  const [gridSize, setGridSize] = useState("10px");
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const gridSizeOptions = ["5px", "10px", "15px", "20px", "25px", "30px"];

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Grid Size
          </label>
          <CustomSelect
            value={gridSize}
            onChange={setGridSize}
            options={gridSizeOptions}
            placeholder="Select grid size"
            label=""
            icon={<ChevronDown className="w-4 h-4 text-muted-foreground" />}
          />
        </div>

        <div className="space-y-4">
          <ToggleSwitch
            checked={snapToGrid}
            onChange={setSnapToGrid}
            label="Snap to Grid"
            description="Automatically align elements to grid"
          />
          
          <ToggleSwitch
            checked={showGrid}
            onChange={setShowGrid}
            label="Show Grid"
            description="Display grid lines on canvas"
          />
        </div>
      </div>
    </div>
  );
}
