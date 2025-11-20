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
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { X, MapPin } from "@/icons/Icons";
import { useCreateEntranceMutation } from "@/lib/api/mapEditorEntranceApi";
import { MarkEntranceModalProps } from "@/lib/types/map-editor/components";
import toast from "react-hot-toast";

export function MarkEntranceModal({
  isOpen,
  onClose,
  floorPlanId,
  coordinates,
}: MarkEntranceModalProps) {
  const [createEntrance, { isLoading }] = useCreateEntranceMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Entrance",
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
      toast.error("Entrance name is required");
      return;
    }

    const getEntranceColor = (category: string): string => {
      const colorMap: Record<string, string> = {
        "Main Entrance": "#F59E0B",
        "Emergency Exit": "#DC2626",
        "Side Entrance": "#3D8C6C",
        "Staff Entrance": "#2563EB",
      };
      return colorMap[category] || "#6B7280";
    };

    try {
      await createEntrance({
        floorPlanId,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim() || undefined,
        coordinates,
        color: getEntranceColor(formData.category),
        isAccessible: formData.isAccessible,
      }).unwrap();

      toast.success("Entrance created successfully");
      setFormData({
        name: "",
        description: "",
        category: "Main Entrance",
        isAccessible: true,
      });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create entrance");
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mark Entrance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Entrance Name"
            placeholder="e.g. Main Entrance"
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
              "Main Entrance",
              "Emergency Exit",
              "Side Entrance",
              "Staff Entrance",
            ]}
          />

          <ToggleSwitch
            checked={formData.isAccessible}
            onChange={(value) => handleChange("isAccessible", value)}
            label="Wheelchair Accessible"
            description="Full wheelchair accessibility"
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
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 cursor-pointer"
              disabled={isLoading || !floorPlanId || !coordinates}
            >
              <MapPin />
              {isLoading ? "Adding..." : "Add Entrance"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
