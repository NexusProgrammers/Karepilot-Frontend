"use client";

import { RecentActivityProps } from "@/lib/dashboard/types";
import { MoveRight } from "lucide-react";

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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button
          onClick={buttonAction}
          className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {buttonText}
        </button>
      </div>
      <div className="space-y-0">
        {displayActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 py-4 group cursor-pointer hover:bg-gray-50 transition-colors ${
              index !== displayActivities.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full mt-2 shrink-0 ${activity.color}`}
            ></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium mb-1">
                {activity.text}
              </p>
              <p className="text-xs text-gray-500">
                by {activity.author} · {activity.time}
              </p>
            </div>
            <MoveRight className="text-gray-600 w-5 h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
