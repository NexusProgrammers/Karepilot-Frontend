"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { MapPinIcon, X } from "@/icons/Icons";
import { useCreatePOIMutation } from "@/lib/api/mapEditorPOIApi";
import toast from "react-hot-toast";

interface AddPOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: { x: number; y: number };
}

export function AddPOIModal({ isOpen, onClose, floorPlanId, coordinates }: AddPOIModalProps) {
  const [createPOI, { isLoading }] = useCreatePOIMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Room",
    isAccessible: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!floorPlanId) {
      toast.error("Floor plan ID is required");
      return;
    }

    if (!coordinates) {
      toast.error("Please click on the map to select a location");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("POI name is required");
      return;
    }

    const getPOIColor = (category: string): string => {
      const colorMap: Record<string, string> = {
        Room: "#3D8C6C", 
        Reception: "#2563EB", 
        Toilet: "#DC2626", 
        Elevator: "#7C3AED", 
        "Emergency Exit": "#F59E0B", 
        Cafeteria: "#10B981", 
        Pharmacy: "#EC4899", 
        Laboratory: "#06B6D4", 
      };
      return colorMap[category] || "#6B7280";
    };

    try {
      await createPOI({
        floorPlanId,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim() || undefined,
        coordinates,
        color: getPOIColor(formData.category),
        isAccessible: formData.isAccessible,
      }).unwrap();

      toast.success("POI created successfully");
      setFormData({
        name: "",
        description: "",
        category: "Room",
        isAccessible: true,
      });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create POI");
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Point of Interest</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="POI Name"
            placeholder="e.g. Emergency Department"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />

          <CustomSelect
            label="POI Type"
            placeholder="Select POI Type"
            value={formData.category}
            onChange={(value) => handleChange("category", value)}
            options={[
              "Room",
              "Reception",
              "Toilet",
              "Elevator",
              "Emergency Exit",
              "Cafeteria",
              "Pharmacy",
              "Laboratory",
            ]}
          />

          <CustomInput
            label="Description"
            placeholder="Add description about your place or the location"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
          />

          <div className="flex justify-between gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              <X />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !floorPlanId || !coordinates}
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 cursor-pointer disabled:opacity-50"
            >
              <MapPinIcon />
              {isLoading ? "Adding..." : "Add POI"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
