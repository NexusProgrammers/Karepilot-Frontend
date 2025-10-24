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
import { X, Tag } from "@/icons/Icons";

interface LabelData {
  name: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}

interface AddLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLabel: (labelData: LabelData) => void;
}

export function AddLabelModal({
  isOpen,
  onClose,
  onAddLabel,
}: AddLabelModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    fontSize: "16px",
    fontWeight: "Normal",
    color: "#000000",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLabel(formData);
    onClose();
    setFormData({
      name: "",
      fontSize: "16px",
      fontWeight: "Normal",
      color: "#000000",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const colors = [
    "#000000",
    "#007bff",
    "#28a745",
    "#fd7e14",
    "#e83e8c",
    "#6f42c1",
    "#20c997",
    "#17a2b8",
    "#6c757d",
    "#dc3545",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Text Label
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a text label to the map
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Label Text"
            placeholder="e.g. Enter label text"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />

          <CustomSelect
            label="Font size"
            placeholder="Select font size"
            value={formData.fontSize}
            onChange={(value) => handleChange("fontSize", value)}
            options={[
              "10px",
              "12px",
              "14px",
              "16px",
              "18px",
              "24px",
              "32px",
              "48px",
            ]}
          />

          <CustomSelect
            label="Font Weight"
            placeholder="Select font weight"
            value={formData.fontWeight}
            onChange={(value) => handleChange("fontWeight", value)}
            options={["Normal", "Bold"]}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Text Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange("color", color)}
                  className={`w-8 h-8 rounded border-2 ${
                    formData.color === color
                      ? "border-white ring-2 ring-gray-400"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

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
              <Tag />
              Add Label
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
