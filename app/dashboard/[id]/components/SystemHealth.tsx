"use client";

import { SystemHealthComponent } from "@/components/common/SystemHealthComponent";
import { systemHealth } from "@/lib/dashboard/data";

export default function SystemHealth() {
  return (
    <SystemHealthComponent
      title="System Health"
      subtitle="Service status for central Medical Hospital"
      data={systemHealth}
    />
  );
}