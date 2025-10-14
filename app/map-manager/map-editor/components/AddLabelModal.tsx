"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";

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

export function AddLabelModal({ isOpen, onClose, onAddLabel }: AddLabelModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    fontSize: "Plan",
    fontWeight: "Normal",
    color: "#000000"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLabel(formData);
    onClose();
    setFormData({
      name: "",
      fontSize: "Plan",
      fontWeight: "Normal",
      color: "#000000"
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const colors = [
    "#000000", 
    "#007bff", 
    "#28a745", 
    "#dc3545", 
    "#fd7e14", 
    "#e83e8c", 
    "#6f42c1", 
    "#20c997", 
    "#6c757d", 
    "#343a40" 
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Text Label</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Label Name"
            placeholder="e.g. Enter label name"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />
          
          <CustomSelect
            label="Font Size"
            placeholder="Select font size"
            value={formData.fontSize}
            onChange={(value) => handleChange("fontSize", value)}
            options={[
              "Plan",
              "Small",
              "Medium",
              "Large",
              "Extra Large"
            ]}
          />
          
          <CustomSelect
            label="Font Weight"
            placeholder="Select font weight"
            value={formData.fontWeight}
            onChange={(value) => handleChange("fontWeight", value)}
            options={[
              "Normal",
              "Bold",
              "Light",
              "Medium"
            ]}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange("color", color)}
                  className={`w-8 h-8 rounded border-2 ${
                    formData.color === color ? "border-gray-800" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#3D8C6C] hover:bg-[#3D8C6C]/90">
              Add Label
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
