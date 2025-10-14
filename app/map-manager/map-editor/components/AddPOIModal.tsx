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

interface POIData {
  name: string;
  description: string;
  category: string;
  isAccessible: boolean;
}

interface AddPOIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPOI: (poiData: POIData) => void;
}

export function AddPOIModal({ isOpen, onClose, onAddPOI }: AddPOIModalProps) {
  const [formData, setFormData] = useState({
    name: "e.g. Emergency Department",
    description: "",
    category: "Small",
    isAccessible: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPOI(formData);
    onClose();
    setFormData({
      name: "Add POI",
      description: "",
      category: "Small",
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
          <DialogTitle>Add Point of Interest</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="POI Name"
            placeholder="`e.g. Emergency Department"
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
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 cursor-pointer"
            >
              <MapPinIcon />
              Add POI
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
