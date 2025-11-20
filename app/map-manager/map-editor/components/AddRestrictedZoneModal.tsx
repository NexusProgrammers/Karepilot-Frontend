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
import { X, Shield } from "@/icons/Icons";
import { useCreateRestrictedZoneMutation } from "@/lib/api/mapEditorRestrictedZoneApi";
import toast from "react-hot-toast";

interface AddRestrictedZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  floorPlanId?: string;
  coordinates?: { x: number; y: number; width: number; height: number };
}

export function AddRestrictedZoneModal({
  isOpen,
  onClose,
  floorPlanId,
  coordinates,
}: AddRestrictedZoneModalProps) {
  const [createRestrictedZone, { isLoading }] = useCreateRestrictedZoneMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    restrictionType: "Staff Only",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!floorPlanId) {
      toast.error("Floor plan ID is required");
      return;
    }

    if (!coordinates) {
      toast.error("Please draw a zone on the map first");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Zone name is required");
      return;
    }

    try {
      await createRestrictedZone({
        floorPlanId,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        restrictionType: formData.restrictionType as "Staff Only" | "Authorized Personnel" | "Emergency Access Only",
        coordinates,
        color: "#EF4444",
      }).unwrap();

      toast.success("Restricted zone created successfully");
      setFormData({
        name: "",
        description: "",
        restrictionType: "Staff Only",
      });
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create restricted zone");
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
            Restricted Zone
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Configure the restricted access area.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Zone Name"
            placeholder="e.g. Staff Only Area"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />

          <CustomInput
            label="Description"
            placeholder="Optional description"
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
          />

          <CustomSelect
            label="Restriction Type"
            placeholder="Select Restriction Type"
            value={formData.restrictionType}
            onChange={(value) => handleChange("restrictionType", value)}
            options={[
              "Staff Only",
              "Authorized Personnel",
              "Emergency Access Only",
            ]}
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
              <Shield />
              {isLoading ? "Creating..." : "Add Zone"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
