"use client";

import { Suspense } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MapEditorContent } from "./components";
import { useSearchParams } from "next/navigation";

function MapEditorContentWrapper() {
  const searchParams = useSearchParams();
  const floorPlanId = searchParams.get("floorPlan") || undefined;

  return <MapEditorContent floorPlanId={floorPlanId} />;
}

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
      <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-120px)]">Loading...</div>}>
        <MapEditorContentWrapper />
      </Suspense>
    </DashboardLayout>
  );
}
