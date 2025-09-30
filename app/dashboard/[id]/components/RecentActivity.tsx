"use client";

import { MoveRight } from "lucide-react";

const recentActivity = [
  {
    id: 1,
    text: "Patient transfer completed to Recovery Room",
    author: "Dr. Michael Smith",
    time: "30 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 2,
    text: "Emergency alert cleared: ICU Ward",
    author: "Dr. Sarah Chen",
    time: "45 minutes ago",
    color: "bg-red-500",
  },
  {
    id: 3,
    text: "New patient check-in: Room 204",
    author: "Reception",
    time: "55 minutes ago",
    color: "bg-blue-500",
  },
  {
    id: 4,
    text: "Medication dosage updated: Level 2",
    author: "Dr. Kevin Roberts",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    id: 5,
    text: "Surgery scheduled: Patient Monitor Today, 2:30PM - RM203",
    author: "Dr. Jenifer Wu",
    time: "10 minutes ago",
    color: "bg-yellow-500",
  },
  {
    id: 6,
    text: "Latest updates for Central Medical Hospital",
    author: "James Smiths",
    time: "10 minutes ago",
    color: "bg-green-500",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Recent Activity
          </h2>
          <p className="text-sm text-gray-500">
            Latest updates for Central Medical Hospital
          </p>
        </div>
        <button className="whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-0">
        {recentActivity.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-4 py-4 group cursor-pointer hover:bg-gray-50 transition-colors ${
              index !== recentActivity.length - 1
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
