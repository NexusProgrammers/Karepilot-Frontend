"use client";

import { useState } from "react";
import { X, Building2 } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomTextarea } from "@/components/common/CustomTextarea";

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDepartmentModal({ isOpen, onClose }: CreateDepartmentModalProps) {
  const [formData, setFormData] = useState({
    departmentName: "",
    description: ""
  });

  const handleSubmit = () => {
    console.log("Creating department:", formData);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Create New Department
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new department to your organization
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              Department Details
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Provide information about this new department
            </p>
            
            <div className="space-y-4">
              <CustomInput
                value={formData.departmentName}
                onChange={(value) => setFormData({...formData, departmentName: value})}
                placeholder="e.g. Emergency"
                label="Department Name"
                required
              />
              
              <CustomTextarea
                value={formData.description}
                onChange={(value) => setFormData({...formData, description: value})}
                placeholder="e.g. write description here"
                label="Description"
                required
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/50">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-5 flex gap-2 py-2.5 text-sm cursor-pointer font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90"
          >
            <Building2 className="w-4 h-4" />
            Create Department
          </Button>
        </div>
      </div>
    </div>
  );
}
