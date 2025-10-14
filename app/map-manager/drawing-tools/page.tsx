"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DrawingToolsContent } from "./components";

export default function DrawingToolsPage() {
  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/map-manager"
      breadcrumbs={[
        { label: "Map Manager", href: "/map-manager" },
        { label: "Drawing Tools" }
      ]}
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <DrawingToolsContent />
    </DashboardLayout>
  );
}
