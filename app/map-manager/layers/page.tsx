"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { LayersContent } from "./components";

export default function LayersPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/map-manager"
      breadcrumbs={[
        { label: "Map Manager", href: "/map-manager" },
        { label: "Layers" }
      ]}
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <LayersContent />
    </DashboardLayout>
  );
}
