"use client";

import { Alert, FilterOption } from "@/lib/alerts-and-geofencing/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AlertLogProps {
  alerts: Alert[];
  tabs: FilterOption[];
}

export function AlertLog({ alerts, tabs }: AlertLogProps) {
  const [activeTab, setActiveTab] = useState("all");

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

  const filteredAlerts = activeTab === "all" 
    ? alerts 
    : alerts.filter(alert => alert.status.toLowerCase() === activeTab);

  const getActionButtonText = (status: string) => {
    switch (status) {
      case "Active":
        return "Acknowledge";
      case "Acknowledged":
        return "Resolve";
      default:
        return "View Details";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          Alert Log
        </h3>
      </div>

      <div className="flex gap-1 mb-6 bg-muted rounded-full p-2 max-w-[500px]">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm transition cursor-pointer rounded-full ${
              activeTab === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-0">
        {filteredAlerts.map((alert, index) => (
          <div
            key={alert.id}
            className={`flex items-start gap-4 py-4 ${
              index !== filteredAlerts.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${getStatusDotColor(alert.status)}`}></div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-card-foreground font-medium mb-1">
                {alert.title}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityStyles(alert.severity)}`}>
                  {alert.severity}
                </span>
                <span className="text-xs text-muted-foreground">
                  {alert.location}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {alert.timestamp}
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              {alert.status === "Resolved" ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                >
                  View Details
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    {getActionButtonText(alert.status)}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    View Details
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
