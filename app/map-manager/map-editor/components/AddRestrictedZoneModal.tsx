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

interface RestrictedZoneData {
  label: string;
  restrictionType: string;
}

interface AddRestrictedZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRestrictedZone: (zoneData: RestrictedZoneData) => void;
}

export function AddRestrictedZoneModal({
  isOpen,
  onClose,
  onAddRestrictedZone,
}: AddRestrictedZoneModalProps) {
  const [formData, setFormData] = useState({
    label: "",
    restrictionType: "Staff Only",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddRestrictedZone(formData);
    onClose();
    setFormData({
      label: "",
      restrictionType: "Staff Only",
    });
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
            label="Zone Label"
            placeholder="e.g. Staff Only Area"
            value={formData.label}
            onChange={(value) => handleChange("label", value)}
            required
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
            >
              <Shield />
              Add Zone
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
