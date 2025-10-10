"use client";

import { useState } from "react";
import { X, Bell } from "lucide-react";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { Button } from "@/components/ui/button";
import { CreateAlertData } from "@/lib/alerts-and-geofencing/types";
import { alertTypes, priorityLevels, departments } from "@/lib/alerts-and-geofencing/data";

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAlertData) => void;
}

export function CreateAlertModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateAlertModalProps) {
  const [formData, setFormData] = useState<CreateAlertData>({
    name: "",
    description: "",
    alertType: "SOS Notifications",
    priority: "High",
    email: "xyz@mail.com",
    phone: "923-021...",
    department: "IT Department"
  });

  const handleSubmit = () => {
    onSubmit(formData);
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Create Alert
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Set up a new alert with custom rules and recipients
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
          <div className="space-y-6">
            <div>
              <CustomInput
                value={formData.name}
                onChange={(value) => setFormData({...formData, name: value})}
                placeholder="e.g. Emergency Exit Alert"
                label="Alert Name"
                required
              />
            </div>

            <div>
              <CustomTextarea
                value={formData.description}
                onChange={(value) => setFormData({...formData, description: value})}
                placeholder="Describe the alert conditions and triggers..."
                label="Description"
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomSelect
                  value={formData.alertType}
                  onChange={(value) => setFormData({...formData, alertType: value})}
                  options={alertTypes.map(type => type.label)}
                  placeholder="Select Alert Type"
                  label="Alert Type"
                  required
                />
              </div>
              
              <div>
                <CustomSelect
                  value={formData.priority}
                  onChange={(value) => setFormData({...formData, priority: value})}
                  options={priorityLevels.map(level => level.label)}
                  placeholder="Select Priority"
                  label="Priority"
                  required
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Recipients
              </h3>
              <div className="space-y-4">
                <CustomInput
                  value={formData.email}
                  onChange={(value) => setFormData({...formData, email: value})}
                  placeholder="recipient@email.com"
                  label="Email"
                  required
                  type="email"
                />
                
                <CustomInput
                  value={formData.phone}
                  onChange={(value) => setFormData({...formData, phone: value})}
                  placeholder="+1-555-012-3456"
                  label="Phone"
                  required
                  type="tel"
                />
                
                <CustomSelect
                  value={formData.department}
                  onChange={(value) => setFormData({...formData, department: value})}
                  options={departments.map(dept => dept.label)}
                  placeholder="Select Department"
                  label="Department"
                  required
                />
              </div>
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
            <Bell className="w-4 h-4" />
            Create Alert
          </Button>
        </div>
      </div>
    </div>
  );
}
