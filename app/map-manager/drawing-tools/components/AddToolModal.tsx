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
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { MapPin, DoorOpen, ArrowUpDown, Route, Shield, Tag, Ruler, MessageSquare } from "@/icons/Icons";

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddToolModal({ isOpen, onClose }: AddToolModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    icon: "",
    color: "#3D8C6C",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setFormData({
      name: "",
      description: "",
      category: "",
      icon: "",
      color: "#3D8C6C",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Drawing Tool</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Tool Name"
            placeholder="Enter tool name"
            value={formData.name}
            onChange={(value: string) => handleChange("name", value)}
            required
          />

          <CustomTextarea
            label="Description"
            placeholder="Enter tool description"
            value={formData.description}
            onChange={(value: string) => handleChange("description", value)}
            rows={3}
          />

          <CustomSelect
            label="Category"
            placeholder="Select category"
            value={formData.category}
            onChange={(value) => handleChange("category", value)}
            options={[
              "Basic Tools",
              "Advanced Tools", 
              "Measurement",
              "Annotation"
            ]}
          />

          <CustomSelect
            label="Icon"
            placeholder="Select icon"
            value={formData.icon}
            onChange={(value) => handleChange("icon", value)}
            options={[
              { name: "Map Pin", icon: MapPin },
              { name: "Door", icon: DoorOpen },
              { name: "Arrow", icon: ArrowUpDown },
              { name: "Route", icon: Route },
              { name: "Shield", icon: Shield },
              { name: "Tag", icon: Tag },
              { name: "Ruler", icon: Ruler },
              { name: "Message", icon: MessageSquare },
            ]}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90"
            >
              Add Tool
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
