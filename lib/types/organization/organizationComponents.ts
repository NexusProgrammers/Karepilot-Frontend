import { Organization } from "./organization";
import { VenueTypeItem } from "../../organization/types";

export type VenueTypeCardProps = {
  venue: VenueTypeItem;
};

export type VenueTypeDistributionProps = {
  venues: VenueTypeItem[];
};

export type SearchAndFilterProps = {
  onSearchChange: (searchTerm: string) => void;
  onFilterChange: (filterValue: string) => void;
  selectedFilter: string;
  searchValue: string;
  isLoading?: boolean;
};

export type OrganizationCardProps = {
  organization: Organization;
  onView: (organization: Organization) => void;
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
  onToggleStatus: (organization: Organization, nextStatus: boolean) => void;
  isStatusUpdating?: boolean;
  isDeleting?: boolean;
};

export type DeleteDialogState = {
  isOpen: boolean;
  organization: Organization | null;
};

export type OrganizationsListProps = {
  onView: (organization: Organization) => void;
  onEdit: (organization: Organization) => void;
  onCreate?: () => void;
};


