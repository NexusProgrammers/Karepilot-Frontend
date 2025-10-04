"use client";

import { systemHealth } from "@/lib/dashboard/data";

export default function SystemHealth() {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-card-foreground mb-1">
          System Health
        </h2>
        <p className="text-sm text-muted-foreground">
          Service status for central Medical Hospital
        </p>
      </div>
      <div className="space-y-5 w-full">
        {systemHealth.map((system, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-card-foreground block">
                  {system.name}
                </span>
                <span className="text-xs text-muted-foreground">{system.time}</span>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs block ${
                    system.status === "Healthy"
                      ? "bg-muted p-2 rounded-xl text-foreground"
                      : system.status === "Warning"
                      ? "text-pink-700 bg-pink-200 p-2 rounded-xl"
                      : "text-muted-foreground"
                  }`}
                >
                  {system.status}
                </span>
                <span className="text-sm text-muted-foreground">{system.health}%</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  system.health >= 95
                    ? "bg-blue-500"
                    : system.health >= 90
                    ? "bg-blue-500"
                    : "bg-pink-500"
                }`}
                style={{ width: `${system.health}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}