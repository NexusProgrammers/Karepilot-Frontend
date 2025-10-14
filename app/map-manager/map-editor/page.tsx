"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { MapEditorContent } from "./components";

export default function MapEditorPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/map-manager"
      breadcrumbs={[
        { label: "Map Manager", href: "/map-manager" },
        { label: "Map Editor" }
      ]}
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <MapEditorContent />
    </DashboardLayout>
  );
}
