"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "@/icons/Icons";
import { UploadFloorPlanModal } from "../../dashboard/[id]/components/UploadFloorPlanModal";

interface MapManagerHeaderProps {
  organizationName?: string;
  description?: string;
  actionLabel?: string;
  onPrimaryAction?: () => void;
  extraActions?: ReactNode;
}

export default function MapManagerHeader({
  organizationName = "Central Medical Hospital",
  description,
  actionLabel = "Upload Floor Plan",
  onPrimaryAction,
  extraActions,
}: MapManagerHeaderProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
      return;
    }
    setIsUploadModalOpen(true);
  };

  return (
    <>
      <div className="flex items-start flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Map Management
          </h1>
          <p className="text-muted-foreground">
            {description ??
              `Upload, edit, and manage floor plans for ${organizationName}.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {extraActions}
          <Button
            onClick={handlePrimaryAction}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            {actionLabel}
          </Button>
        </div>
      </div>

      {!onPrimaryAction && (
        <UploadFloorPlanModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
      )}
    </>
  );
}
