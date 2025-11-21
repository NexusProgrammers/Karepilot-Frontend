"use client";

import { CustomSelect } from "@/components/common/CustomSelect";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { ChevronDown, Grid3x3 } from "@/icons/Icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setGridSize, setSnapToGrid, setShowGrid, resetProperties } from "@/lib/store/slices/mapEditorSlice";
import toast from "react-hot-toast";

const gridSizeOptions = [
  { value: "5", label: "5px - Very Fine" },
  { value: "10", label: "10px - Fine" },
  { value: "15", label: "15px - Medium" },
  { value: "20", label: "20px - Coarse" },
  { value: "25", label: "25px - Large" },
  { value: "30", label: "30px - Very Large" },
  { value: "50", label: "50px - Extra Large" },
];

export function Properties() {
  const dispatch = useDispatch();
  const properties = useSelector((state: RootState) => state.mapEditor.properties);

  const handleGridSizeChange = (value: string) => {
    const size = parseInt(value, 10);
    if (!isNaN(size)) {
      dispatch(setGridSize(size));
      toast.success(`Grid size set to ${size}px`);
    }
  };

  const handleSnapToGridChange = (value: boolean) => {
    dispatch(setSnapToGrid(value));
    toast.success(value ? "Snap to grid enabled" : "Snap to grid disabled");
  };

  const handleShowGridChange = (value: boolean) => {
    dispatch(setShowGrid(value));
    toast.success(value ? "Grid lines visible" : "Grid lines hidden");
  };

  const handleResetProperties = () => {
    dispatch(resetProperties());
    toast.success("All properties reset to default");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Grid3x3 className="w-5 h-5 text-[#3D8C6C]" />
        <h3 className="text-lg font-semibold text-foreground">Properties</h3>
      </div>
      
      <div className="space-y-4" suppressHydrationWarning>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Grid Size
          </label>
          <CustomSelect
            value={properties.gridSize.toString()}
            onChange={handleGridSizeChange}
            options={gridSizeOptions.map(opt => opt.value)}
            placeholder="Select grid size"
            label=""
            icon={<ChevronDown className="w-4 h-4 text-muted-foreground" />}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Current: {properties.gridSize}px
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <ToggleSwitch
            checked={properties.snapToGrid}
            onChange={handleSnapToGridChange}
            label="Snap to Grid"
            description="Automatically align elements to grid when placing or moving"
          />
          
          <ToggleSwitch
            checked={properties.showGrid}
            onChange={handleShowGridChange}
            label="Show Grid"
            description="Display grid lines on canvas for better alignment"
          />
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={handleResetProperties}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}
