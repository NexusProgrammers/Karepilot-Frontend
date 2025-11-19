export interface AssetListProps {
  assets: any[];
}

export interface AssetCardProps {
  asset: any;
}

export interface AssetListWithDropdownProps {
  assets: any[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  typeFilters: any[];
}

export interface AssetMapWithDropdownProps {
  selectedBuilding: string;
  onBuildingChange: (building: string) => void;
  buildingFilters: any[];
}

export interface FilterDropdownProps {
  label: string;
  options: any[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}
