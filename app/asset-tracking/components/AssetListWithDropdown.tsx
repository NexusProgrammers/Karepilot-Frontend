import { Asset, FilterOption } from "@/lib/asset-tracking/types";
import { FilterDropdown } from "./FilterDropdown";
import { AssetList } from "./AssetList";

interface AssetListWithDropdownProps {
  assets: Asset[];
  selectedType: string;
  onTypeChange: (value: string) => void;
  typeFilters: FilterOption[];
}

export function AssetListWithDropdown({ 
  assets, 
  selectedType, 
  onTypeChange, 
  typeFilters 
}: AssetListWithDropdownProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col mb-5">
        <div className="flex">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Asset List
          </h3>
        </div>
        <FilterDropdown
          label="All Types"
          options={typeFilters}
          selectedValue={selectedType}
          onSelectionChange={onTypeChange}
        />
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        <AssetList assets={assets} />
      </div>
    </div>
  );
}
