export interface Organization {
  id: string;
  name: string;
  location: string;
  type: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSelectionProps {
  onSelect?: (organization: Organization) => void;
  selectedOrganization?: Organization | null;
}
