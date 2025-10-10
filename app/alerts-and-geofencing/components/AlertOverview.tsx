"use client";

import { Alert, AlertOverviewStats } from "@/lib/alerts-and-geofencing/types";

interface AlertOverviewProps {
  stats: AlertOverviewStats;
  recentAlerts: Alert[];
}

export function AlertOverview({ stats, recentAlerts }: AlertOverviewProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "Medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-500";
      case "Acknowledged":
        return "bg-orange-500";
      case "Resolved":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          Alert Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Current alert status and statistics
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
            {stats.active}
          </div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {stats.acknowledged}
          </div>
          <div className="text-xs text-muted-foreground">Acknowledged</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {stats.resolved}
          </div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-card-foreground mb-3">
          Recent Alerts
        </h4>
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                index !== recentAlerts.length - 1 ? "border-border" : "border-transparent"
              }`}
            >
              <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${getStatusDotColor(alert.status)}`}></div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground font-medium mb-1 line-clamp-2">
                  {alert.title}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityStyles(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {alert.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
