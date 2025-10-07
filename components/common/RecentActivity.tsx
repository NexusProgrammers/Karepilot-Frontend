"use client";

import { RecentActivityProps } from "@/lib/dashboard/types";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecentActivity({
  title = "Recent Activity",
  subtitle = "Latest updates",
  buttonText = "View All",
  buttonAction,
  activities,
  maxItems,
}: RecentActivityProps) {
  const displayActivities = maxItems
    ? activities.slice(0, maxItems)
    : activities;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground mb-1">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button
          onClick={buttonAction}
          variant="outline"
          className="whitespace-nowrap px-4 py-2 text-sm text-muted-foreground hover:text-foreground font-medium border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer"
        >
          {buttonText}
        </Button>
      </div>
      <div className="space-y-0">
        {displayActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 py-4 group cursor-pointer hover:bg-accent transition-colors ${
              index !== displayActivities.length - 1
                ? "border-b border-border"
                : ""
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full mt-2 shrink-0 ${activity.color}`}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-card-foreground font-medium mb-1">
                {activity.text}
              </p>
              <p className="text-xs text-muted-foreground">
                by {activity.author} · {activity.time}
              </p>
            </div>
            <MoveRight className="text-muted-foreground w-5 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}