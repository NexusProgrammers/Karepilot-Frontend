"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { PropertiesContent } from "./components";

export default function PropertiesPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/map-manager"
      breadcrumbs={[
        { label: "Map Manager", href: "/map-manager" },
        { label: "Properties" }
      ]}
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <PropertiesContent />
    </DashboardLayout>
  );
}
