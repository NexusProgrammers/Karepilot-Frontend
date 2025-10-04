"use client";

import { useState } from "react";
import { OrganizationItem } from "@/lib/organization/types";
import Image from "next/image";
import DashboardIcon from "@/assets/dashboard/dashboard.svg";
import airportIcon from "@/assets/organization/jkf-international-airport.svg";
import shoppingIcon from "@/assets/organization/shopping.svg";
import openPlaceIcon from "@/assets/organization/one.svg";
import { mailIcon, phoneIcon, clockIcon, deleteIcon } from "@/icons/dashboard";

type OrganizationCardProps = {
  organization: OrganizationItem;
};

export default function OrganizationCard({
  organization,
}: OrganizationCardProps) {
  const [isActive, setIsActive] = useState(organization.status === "active");

  const handleToggleStatus = () => {
    setIsActive(!isActive);
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "hospital":
        return DashboardIcon;
      case "airport":
        return airportIcon;
      case "mall":
      case "shopping mall":
        return shoppingIcon;
      case "open place":
        return openPlaceIcon;
      default:
        return openPlaceIcon;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Image
            src={getTypeIcon(organization.type)}
            alt={organization.type}
            width={40}
            height={40}
          />
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              {organization.name}
            </h3>
            <p className="text-sm text-gray-600">
              {organization.primaryAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isActive ? "text-green-600" : "text-red-500"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
          <button
            onClick={handleToggleStatus}
            className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
              isActive ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-label={`Toggle organization status to ${
              isActive ? "inactive" : "active"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                isActive ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
          {organization.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">{organization.detailedAddress}</p>
      </div>

      <div className="mb-4 flex gap-2 items-center">
        <div className="flex items-center gap-2 text-sm">
          {mailIcon({}) as React.ReactNode}
          <span className="font-semibold text-gray-500">
            {organization.email}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {phoneIcon({}) as React.ReactNode}
          <span className="">{organization.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Created {organization.createdAt}</span>
        <div className="flex items-center gap-1">
          {clockIcon({}) as React.ReactNode}
          <span>{organization.operatingHours}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 mb-4 w-full"></div>

      <div className="flex gap-2 justify-end">
        <button
          className={`py-2 px-[186px] text-sm font-medium rounded-lg border transition-colors ${
            organization.hasNotification
              ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 relative"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          Select
        </button>
        <button className="py-2 px-12 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          Edit
        </button>
        <button className="py-2 px-12 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          View
        </button>
        <button className="py-2 px-3 text-red-500 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
          {deleteIcon({}) as React.ReactNode}
        </button>
      </div>
    </div>
  );
}
