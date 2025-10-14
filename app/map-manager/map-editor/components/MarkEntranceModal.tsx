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

interface EntranceData {
  name: string;
  description: string;
  category: string;
  isAccessible: boolean;
}

interface MarkEntranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntrance: (entranceData: EntranceData) => void;
}

export function MarkEntranceModal({
  isOpen,
  onClose,
  onAddEntrance,
}: MarkEntranceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Main Entrance",
    isAccessible: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntrance(formData);
    onClose();
    setFormData({
      name: "",
      description: "",
      category: "Main Entrance",
      isAccessible: true,
    });
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
            >
              <MapPin />
              Add Entrance
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
