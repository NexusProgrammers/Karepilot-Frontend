"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { OrganizationNav } from "../components/OrganizationNav";
import OrganizationsList from "./components/OrganizationsList";
import { OrganizationHeader } from "@/components/common/OrganizationHeader";
import { CreateOrganizationModal } from "@/components/common/CreateOrganizationModal";
import { Organization } from "@/lib/types/organization/organization";
import { OrganizationFormMode } from "@/lib/validations";

interface ModalState {
  isOpen: boolean;
  mode: OrganizationFormMode;
  organizationId?: string | null;
}

export default function OrganizationsListPage() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
    organizationId: null,
  });

  const openModal = (mode: OrganizationFormMode, organization?: Organization) => {
    setModalState({
      isOpen: true,
      mode,
      organizationId: organization?.id ?? null,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "create",
      organizationId: null,
    });
  };

  return (
    <DashboardLayout pageTitle="Organizations">
      <OrganizationHeader onButtonClick={() => openModal("create")} />
      <OrganizationNav />
      <OrganizationsList
        onView={(organization) => openModal("view", organization)}
        onEdit={(organization) => openModal("edit", organization)}
        onCreate={() => openModal("create")}
      />
      <CreateOrganizationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        organizationId={modalState.organizationId ?? undefined}
        mode={modalState.mode}
      />
    </DashboardLayout>
  );
}