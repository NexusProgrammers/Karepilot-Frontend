"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Upload, Plus } from "@/icons/Icons";
import { UploadFloorPlanModal } from "../../dashboard/[id]/components/UploadFloorPlanModal";
import { AddBuildingModal } from "./AddBuildingModal";

export default function MapManagerHeader() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const pathname = usePathname();
  
  const isFloorPlansTab = pathname === "/map-manager";
  const isBuildingsTab = pathname === "/map-manager/buildings";

  return (
    <>
      <div className="flex items-start flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Map Management
          </h1>
          <p className="text-muted-foreground">
            Upload, edit, and manage floor plans for Central Medical Hospital
          </p>
        </div>
        {isFloorPlansTab && (
          <Button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer mt-4 md:mt-0"
          >
            <Upload className="w-4 h-4" />
            Upload Floor Plan
          </Button>
        )}
        {isBuildingsTab && (
          <Button 
            onClick={() => setIsAddBuildingModalOpen(true)}
            className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer mt-4 md:mt-0"
          >
            <Plus className="w-4 h-4" />
            Add Building
          </Button>
        )}
      </div>

      <UploadFloorPlanModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      <AddBuildingModal
        isOpen={isAddBuildingModalOpen}
        onClose={() => setIsAddBuildingModalOpen(false)}
      />
    </>
  );
}
