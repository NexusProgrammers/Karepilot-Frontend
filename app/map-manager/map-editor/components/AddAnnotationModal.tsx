"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomSelect } from "@/components/common/CustomSelect";
import { X, MessageSquare } from "@/icons/Icons";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { useCreateAnnotationMutation } from "@/lib/api/mapEditorAnnotationApi";
import { AddAnnotationModalProps } from "@/lib/types/map-editor/components";
import toast from "react-hot-toast";

export function AddAnnotationModal({
  isOpen,
  onClose,
  floorPlanId,
  coordinates,
}: AddAnnotationModalProps) {
  const [createAnnotation, { isLoading }] = useCreateAnnotationMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "POI",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Please enter annotation name");
      return;
    }

    if (!coordinates) {
      toast.error("Please click on the canvas to set annotation location");
      return;
    }

    if (!floorPlanId) {
      toast.error("Floor plan is required");
      return;
    }

    try {
      await createAnnotation({
        floorPlanId,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        coordinates,
        color: "#F59E0B",
      }).unwrap();

      toast.success("Annotation added successfully");
      onClose();
      setFormData({
        name: "",
        description: "",
        type: "POI",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add annotation");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Annotation
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a note or comment to the map
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Name"
            placeholder="Enter annotation name"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />

          <CustomTextarea
            label="Description"
            placeholder="Enter annotation description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            rows={3}
          />

          <CustomSelect
            label="Type"
            placeholder="Select Type"
            value={formData.type}
            onChange={(value) => handleChange("type", value)}
            options={["POI", "Safety", "Accessibility", "Amenity", "Medical", "Note"]}
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
              disabled={isLoading}
            >
              <MessageSquare />
              {isLoading ? "Adding..." : "Add Annotation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
