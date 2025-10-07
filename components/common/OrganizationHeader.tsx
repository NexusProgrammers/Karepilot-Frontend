"use client";

import { useState } from "react";
import { OrganizationIcon } from "@/icons/dashboard";
import { CreateOrganizationModal } from "./CreateOrganizationModal";
import { Button } from "@/components/ui/button";

interface OrganizationHeaderProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function OrganizationHeader({
  title = "Organization Management",
  description = "Manage multiple venues across different organization types",
  buttonText = "Add Organization",
  onButtonClick
}: OrganizationHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">{title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 md:mb-4">
            {description}
          </p>
        </div>
        <Button 
          onClick={handleButtonClick}
          className="flex items-center cursor-pointer max-w-[200px] justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-sm sm:text-base w-full sm:w-auto mb-4 sm:mb-0"
        >
          <OrganizationIcon />
          <span className="inline">{buttonText}</span>
        </Button>
      </div>

      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}