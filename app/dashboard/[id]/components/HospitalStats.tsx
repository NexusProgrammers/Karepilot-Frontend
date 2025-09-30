"use client";

import Image from "next/image";
import activePatientsIcon from "@/assets/dashboard/central-medical-hospital/active-patients.svg";
import emergencyAlertsIcon from "@/assets/dashboard/central-medical-hospital/emergency-alerts.svg";
import equipmentTrackedIcon from "@/assets/dashboard/central-medical-hospital/equipment-tracked.svg";
import navigationRequestsIcon from "@/assets/dashboard/central-medical-hospital/navigation-requests.svg";

const stats = [
  {
    id: 1,
    title: "Active Patients",
    value: "432",
    change: "+12%",
    note: "from last week",
    icon: activePatientsIcon,
  },
  {
    id: 2,
    title: "Emergency Alerts",
    value: "450",
    change: "+3%",
    note: "from last week",
    icon: emergencyAlertsIcon,
  },
  {
    id: 3,
    title: "Equipment Tracked",
    value: "512",
    change: "+7%",
    note: "from last week",
    icon: equipmentTrackedIcon,
  },
  {
    id: 4,
    title: "Navigation Requests",
    value: "370",
    change: "+14%",
    note: "from last week",
    icon: navigationRequestsIcon,
  },
];

export default function HospitalStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-4xl border border-gray-200 p-5"
        >
          <div className="flex items-start justify-between">
            <span className="text-lg font-medium text-gray-500">
              {stat.title}
            </span>
            <Image src={stat.icon} alt={stat.title} width={40} height={40} />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
          <p className="text-sm text-gray-500">
            <span className="text-green-600">{stat.change}</span> {stat.note}
          </p>
        </div>
      ))}
    </div>
  );
}
