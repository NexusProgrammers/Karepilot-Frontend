"use client";

import { SystemHealthComponent } from "@/components/common/SystemHealthComponent";
import { performanceSystemHealth } from "@/lib/analytics/data";

export function PerformanceSystemHealth({ className = "" }: { className?: string }) {
  return (
    <SystemHealthComponent
      title="System Health"
      subtitle="Real-time system performance metrics"
      data={performanceSystemHealth}
      className={className}
    />
  );
}
