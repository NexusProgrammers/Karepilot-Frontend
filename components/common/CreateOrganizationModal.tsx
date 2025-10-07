"use client";

import { useState } from "react";
import { X, Building2 } from "lucide-react";
import { CustomInput } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { VenueTemplateSelector } from "./VenueTemplateSelector";
import { Button } from "@/components/ui/button";

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOrganizationModal({ 
  isOpen, 
  onClose 
}: CreateOrganizationModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("hospital");
  const [formData, setFormData] = useState({
    organizationName: "",
    contactEmail: "",
    contactPhone: "+1-555-012-4353",
    country: "United States",
    city: "",
    timezone: "Eastern Time (UTC-5)",
    fullAddress: ""
  });

  const countries = [
    "United States",
    "Canada", 
    "United Kingdom",
    "Germany",
    "France"
  ];

  const timezones = [
    "Eastern Time (UTC-5)",
    "Pacific Time (UTC-8)",
    "Mountain Time (UTC-7)",
    "Central Time (UTC-6)",
    "Eastern European Time (UTC+2)"
  ];

  const handleSubmit = () => {
    console.log("Creating organization:", {
      template: selectedTemplate,
      ...formData
    });
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
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Create New Organization
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Set up a new venue for indoor navigation and positioning
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
          <VenueTemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
          />

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Organization Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  value={formData.organizationName}
                  onChange={(value) => setFormData({...formData, organizationName: value})}
                  placeholder="e.g. Central Medical hospital"
                  label="Organization Name"
                  required
                />
                <CustomInput
                  value={formData.contactEmail}
                  onChange={(value) => setFormData({...formData, contactEmail: value})}
                  placeholder="e.g. admin@organization.com"
                  label="Contact Email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  value={formData.contactPhone}
                  onChange={(value) => setFormData({...formData, contactPhone: value})}
                  placeholder="+1-555-012-4353"
                  label="Contact Phone"
                  required
                />
                <CustomSelect
                  value={formData.country}
                  onChange={(value) => setFormData({...formData, country: value})}
                  options={countries}
                  placeholder="Select Country"
                  label="Country"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  value={formData.city}
                  onChange={(value) => setFormData({...formData, city: value})}
                  placeholder="e.g. New York"
                  label="City"
                  required
                />
                <CustomSelect
                  value={formData.timezone}
                  onChange={(value) => setFormData({...formData, timezone: value})}
                  options={timezones}
                  placeholder="Select Timezone"
                  label="Timezone"
                  required
                />
              </div>

              <CustomInput
                value={formData.fullAddress}
                onChange={(value) => setFormData({...formData, fullAddress: value})}
                placeholder="Address"
                label="Full Address"
                required
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
            Create Organization
          </Button>
        </div>
      </div>
    </div>
  );
}