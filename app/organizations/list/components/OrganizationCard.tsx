"use client";

import { useState } from "react";
import { OrganizationItem } from "@/lib/organization/types";
import Image from "next/image";
import { DashboardIcon, airportIcon, shoppingIcon, openPlaceIcon } from "@/icons/Assets";
import { mailIcon, phoneIcon, clockIcon, deleteIcon } from "@/icons/Svg";
import { Button } from "@/components/ui/button";

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
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Image
            src={getTypeIcon(organization.type)}
            alt={organization.type}
            width={40}
            height={40}
          />
          <div>
            <h3 className="font-bold text-card-foreground text-lg mb-1">
              {organization.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {organization.primaryAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isActive ? "text-green-700" : "text-red-500"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
          <button
            onClick={handleToggleStatus}
            className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
              isActive ? "bg-green-700" : "bg-muted"
            }`}
            aria-label={`Toggle organization status to ${
              isActive ? "inactive" : "active"
            }`}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-background rounded-full transition-transform ${
                isActive ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {organization.type}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{organization.detailedAddress}</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 text-sm">
          {mailIcon({}) as React.ReactNode}
          <span className="font-semibold text-muted-foreground">
            {organization.email}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {phoneIcon({}) as React.ReactNode}
          <span className="text-muted-foreground">{organization.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>Created {organization.createdAt}</span>
        <div className="flex items-center gap-1">
          {clockIcon({}) as React.ReactNode}
          <span>{organization.operatingHours}</span>
        </div>
      </div>

      <div className="border-t border-border mb-4 w-full"></div>

      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <Button
          variant="outline"
          className={`py-2 px-3 sm:px-4 md:px-6 lg:px-[186px] text-sm font-medium rounded-lg border transition-colors cursor-pointer w-full sm:w-auto ${
            organization.hasNotification
              ? "bg-background border-border text-muted-foreground hover:bg-accent relative"
              : "bg-background border-border text-muted-foreground hover:bg-accent"
          }`}
        >
          Select
        </Button>
        <Button
          variant="outline"
          className="py-2 px-3 sm:px-4 md:px-6 lg:px-12 text-sm font-medium text-muted-foreground bg-background border cursor-pointer border-border rounded-lg hover:bg-accent transition-colors w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          variant="outline"
          className="py-2 px-3 sm:px-4 md:px-6 lg:px-12 text-sm font-medium text-muted-foreground bg-background border cursor-pointer border-border rounded-lg hover:bg-accent transition-colors w-full sm:w-auto"
        >
          View
        </Button>
        <Button
          variant="outline"
          className="py-2 px-3 text-red-500 bg-background border border-border rounded-lg hover:bg-red-50 transition-colors cursor-pointer w-full sm:w-auto sm:max-w-[60px]"
        >
          {deleteIcon({}) as React.ReactNode}
        </Button>
      </div>
    </div>
  );
}