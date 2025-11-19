export interface OrganizationsListPageProps {
  organizations: any[];
}

export interface ModalState {
  isOpen: boolean;
  mode: "create" | "edit" | "view";
  organizationId: string | null;
}
