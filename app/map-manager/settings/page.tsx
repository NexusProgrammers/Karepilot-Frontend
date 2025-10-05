"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

export default function page() {
  return (
    <DashboardLayout>
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">
          Map Settings
        </h2>
        <p className="text-muted-foreground">
          Configure map display and management settings
        </p>
      </div>
    </DashboardLayout>
  );
}
