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

interface AnnotationData {
  note: string;
  priority: string;
}

interface AddAnnotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnnotation: (annotationData: AnnotationData) => void;
}

export function AddAnnotationModal({
  isOpen,
  onClose,
  onAddAnnotation,
}: AddAnnotationModalProps) {
  const [formData, setFormData] = useState({
    note: "",
    priority: "Medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnotation(formData);
    onClose();
    setFormData({
      note: "",
      priority: "Medium",
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
            Add Annotation
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Add a note or comment to the map
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomInput
            label="Note"
            placeholder="Enter your note or comment"
            value={formData.note}
            onChange={(value) => handleChange("note", value)}
            required
          />

          <CustomSelect
            label="Priority"
            placeholder="Select Priority"
            value={formData.priority}
            onChange={(value) => handleChange("priority", value)}
            options={["Low", "Medium", "High", "Critical"]}
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
              <MessageSquare />
              Add Annotation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
