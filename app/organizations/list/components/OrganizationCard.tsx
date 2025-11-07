"use client";

import { Organization } from "@/lib/types/organization";
import Image from "next/image";
import {
  DashboardIcon,
  airportIcon,
  shoppingIcon,
  openPlaceIcon,
} from "@/icons/Assets";
import { mailIcon, phoneIcon, clockIcon, deleteIcon } from "@/icons/Svg";
import { Button } from "@/components/ui/button";

type OrganizationCardProps = {
  organization: Organization;
  onView: (organization: Organization) => void;
  onEdit: (organization: Organization) => void;
  onDelete: (organization: Organization) => void;
  onToggleStatus: (organization: Organization, nextStatus: boolean) => void;
  isStatusUpdating?: boolean;
  isDeleting?: boolean;
};

const getTypeIcon = (type?: string) => {
  switch ((type || "").toLowerCase()) {
    case "hospital":
      return DashboardIcon;
    case "airport":
      return airportIcon;
    case "mall":
    case "shopping mall":
      return shoppingIcon;
    case "open place":
    case "open-place":
      return openPlaceIcon;
    default:
      return openPlaceIcon;
  }
};

const formatDate = (date?: string) => {
  if (!date) return "-";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function OrganizationCard({
  organization,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  isStatusUpdating = false,
  isDeleting = false,
}: OrganizationCardProps) {
  const locationSummary = [organization.city, organization.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <Image
            src={getTypeIcon(organization.organizationType)}
            alt={organization.organizationType}
            width={40}
            height={40}
          />
          <div>
            <h3 className="font-bold text-card-foreground text-lg mb-1">
              {organization.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {organization.address || locationSummary || "Address not available"}
            </p>
            {locationSummary && (
              <p className="text-xs text-muted-foreground mt-1">
                {locationSummary}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              organization.isActive ? "text-green-700" : "text-red-500"
            }`}
          >
            {organization.isActive ? "Active" : "Inactive"}
          </span>
          <button
            onClick={() =>
              !isStatusUpdating &&
              onToggleStatus(organization, !organization.isActive)
            }
            className={`w-12 h-6 rounded-full relative transition-colors ${
              isStatusUpdating ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            } ${organization.isActive ? "bg-green-700" : "bg-muted"}`}
            aria-label={`Toggle organization status to ${
              organization.isActive ? "inactive" : "active"
            }`}
            disabled={isStatusUpdating}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 bg-background rounded-full transition-transform ${
                organization.isActive ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2 items-center">
        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
          {organization.organizationType || "Not specified"}
        </span>
        {organization.venueTemplate && (
          <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            Template: {typeof organization.venueTemplate === "string"
              ? organization.venueTemplate
              : organization.venueTemplate.name}
          </span>
        )}
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {mailIcon({}) as React.ReactNode}
            <span className="font-medium">
              {organization.email || "No email provided"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {phoneIcon({}) as React.ReactNode}
            <span>{organization.phone || "No phone provided"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {clockIcon({}) as React.ReactNode}
          <span>Timezone: {organization.timezone || "Not specified"}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>Created: {formatDate(organization.createdAt)}</span>
        <span>Updated: {formatDate(organization.updatedAt)}</span>
      </div>

      <div className="border-t border-border mb-4 w-full" />

      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => onView(organization)}
          className="py-2 px-3 text-sm font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer w-full sm:w-auto"
        >
          View
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onEdit(organization)}
          className="py-2 px-3 text-sm font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onDelete(organization)}
          disabled={isDeleting}
          className="py-2 px-3 text-sm font-medium text-red-500 bg-background border border-border rounded-lg hover:bg-red-50 transition-colors cursor-pointer w-full sm:w-auto sm:max-w-[120px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="flex items-center gap-2">
            {deleteIcon({}) as React.ReactNode}
            {isDeleting ? "Deleting" : "Delete"}
          </span>
        </Button>
      </div>
    </div>
  );
}