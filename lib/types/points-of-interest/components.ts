export interface POIStatsProps {
  stats: any[];
}

export interface POISearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export interface POIHeaderProps {
  onCreateClick: () => void;
}

export interface POIGridProps {
  pois: any[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export type StatusFilter = "all" | "Active" | "Inactive" | "Maintenance";

export interface POICardProps {
  poi: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface POIDetailHeaderProps {
  poi: any;
}

export interface BasicInformationCardProps {
  poi: any;
}

export interface ContactInformationCardProps {
  poi: any;
}

export interface LocationPreviewCardProps {
  poi: any;
}

export interface StatusMetadataCardProps {
  poi: any;
}

export interface QuickActionsCardProps {
  poiId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export type Feature = {
  name: string;
  available: boolean;
};

export interface AccessibilityFeaturesCardProps {
  features: Feature[];
}
