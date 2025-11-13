"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "@/icons/Icons";
import OrganizationSwitcher from "./OrganizationSwitcher";

interface MapManagerHeaderProps {
  organizationName?: string;
  description?: string;
  actionLabel?: string;
  onPrimaryAction?: (() => void) | null;
  extraActions?: ReactNode;
  organizationOptions: Array<{ label: string; value: string }>;
  selectedOrganizationId?: string;
  onOrganizationChange: (organizationId: string) => void;
  isOrganizationsLoading?: boolean;
}

export default function MapManagerHeader({
  organizationName = "Central Medical Hospital",
  description,
  actionLabel = "Upload Floor Plan",
  onPrimaryAction,
  extraActions,
  organizationOptions,
  selectedOrganizationId,
  onOrganizationChange,
  isOrganizationsLoading,
}: MapManagerHeaderProps) {
  return (
    <div className="flex items-start flex-col xl:flex-row justify-between gap-6">
      <div className="space-y-4 flex-1">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Map Management
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {description ??
              `Upload, edit, and manage floor plans, buildings, and layers for ${organizationName}.`}
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <OrganizationSwitcher
            options={organizationOptions}
            value={selectedOrganizationId}
            onChange={onOrganizationChange}
            isLoading={isOrganizationsLoading}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {extraActions}
        {onPrimaryAction && (
          <Button
            onClick={onPrimaryAction}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
