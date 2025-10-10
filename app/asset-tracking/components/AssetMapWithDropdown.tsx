import { FilterOption } from "@/lib/asset-tracking/types";
import { FilterDropdown } from "./FilterDropdown";

interface AssetMapWithDropdownProps {
  selectedBuilding: string;
  onBuildingChange: (value: string) => void;
  buildingFilters: FilterOption[];
}

export function AssetMapWithDropdown({
  selectedBuilding,
  onBuildingChange,
  buildingFilters,
}: AssetMapWithDropdownProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Real-time Asset Map
          </h3>
          <p className="text-sm text-muted-foreground">
            Live tracking of assets across hospital buildings
          </p>
        </div>
      </div>

      <div className="relative bg-muted/30 rounded-lg h-[400px] border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-muted-foreground/40 rounded"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive asset tracking map
            </p>
          </div>
        </div>
        <FilterDropdown
          label="All Buildings"
          options={buildingFilters}
          selectedValue={selectedBuilding}
          onSelectionChange={onBuildingChange}
          className="absolute top-6 left-6 z-10 w-[180px]"
        />

        <div className="absolute top-20 left-6">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="absolute top-16 right-12">
          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/3">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="absolute top-1/2 right-8">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        <div className="absolute bottom-12 right-1/4">
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
