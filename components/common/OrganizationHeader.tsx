"use client";

import { useState } from "react";
import { OrganizationIcon } from "@/icons/dashboard";
import { CreateOrganizationModal } from "./CreateOrganizationModal";

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
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-0">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-foreground">{title}</h1>
          <p className="text-muted-foreground mb-6">
            {description}
          </p>
        </div>
        <button 
          onClick={handleButtonClick}
          className="bg-[#3D8C6C] p-3 rounded-full text-white flex gap-2 items-center cursor-pointer"
        >
          <OrganizationIcon />
          {buttonText}
        </button>
      </div>

      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}