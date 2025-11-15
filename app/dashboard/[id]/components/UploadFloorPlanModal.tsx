"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { X, CloudUpload } from "@/icons/Icons";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/api/uploadApi";
import { useCreateFloorPlanMutation, useGetAllFloorPlansQuery } from "@/lib/api/floorPlansApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import toast from "react-hot-toast";

interface UploadFloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const floorLabels = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "Basement",
  "Lower Level",
  "Upper Level",
];

export function UploadFloorPlanModal({
  isOpen,
  onClose,
  onSuccess,
}: UploadFloorPlanModalProps) {
  const params = useParams();
  const routeOrganizationId = params?.id as string;

  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [mapName, setMapName] = useState("");
  const [mapScale, setMapScale] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch organizations
  const { data: organizationsData } = useGetOrganizationsQuery();

  // Fetch buildings from floor plans API based on selected organization
  const { data: floorPlansData } = useGetAllFloorPlansQuery({
    page: 1,
    limit: 1,
    ...(selectedOrganizationId ? { organizationId: selectedOrganizationId } : {}),
  }, {
    skip: !selectedOrganizationId, // Skip query if no organization selected
  });

  const [createFloorPlan, { isLoading: isCreating }] = useCreateFloorPlanMutation();

  const organizations = organizationsData?.data?.organizations || [];
  const buildings = floorPlansData?.data.availableFilters.buildings || [];

  // Set default organization from route params if available
  useEffect(() => {
    if (routeOrganizationId && organizations.length > 0 && !selectedOrganizationId) {
      const orgExists = organizations.find((org) => org.id === routeOrganizationId);
      if (orgExists) {
        setSelectedOrganizationId(routeOrganizationId);
      }
    }
  }, [routeOrganizationId, organizations, selectedOrganizationId]);

  // Reset building when organization changes
  useEffect(() => {
    setSelectedBuildingId("");
  }, [selectedOrganizationId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOrganizationId("");
      setSelectedBuildingId("");
      setSelectedFloor("");
      setMapName("");
      setMapScale("");
      setDescription("");
      setSelectedFile(null);
      setIsUploading(false);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedOrganizationId) {
      toast.error("Please select an organization");
      return;
    }

    if (!selectedBuildingId) {
      toast.error("Please select a building");
      return;
    }

    if (!selectedFloor) {
      toast.error("Please select a floor");
      return;
    }

    if (!mapName.trim()) {
      toast.error("Please enter a map name");
      return;
    }

    if (!mapScale.trim()) {
      toast.error("Please enter a map scale");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      setIsUploading(true);
      toast.loading("Uploading file...");

      // Step 1: Upload the file
      const uploadResult = await uploadFile(selectedFile, "floor-plans");

      if (!uploadResult.success || !uploadResult.data.url) {
        throw new Error(uploadResult.message || "Failed to upload file");
      }

      toast.dismiss();
      toast.loading("Creating floor plan...");

      // Step 2: Create floor plan with uploaded file URL
      const floorPlanData = {
        organizationId: selectedOrganizationId,
        buildingId: selectedBuildingId,
        title: mapName.trim(),
        floorLabel: selectedFloor,
        floorNumber: extractFloorNumber(selectedFloor),
        status: "Draft" as const,
        media: {
          fileUrl: uploadResult.data.url,
          fileKey: uploadResult.data.publicId,
          thumbnailUrl: null,
          thumbnailKey: null,
        },
        metadata: {
          scale: mapScale.trim(),
          description: description.trim() || null,
          tags: [],
          highlights: [],
        },
        versionNotes: description.trim() || null,
      };

      const result = await createFloorPlan(floorPlanData).unwrap();

      toast.dismiss();
      toast.success(result.message || "Floor plan created successfully!");

      // Reset form and close modal
      setSelectedOrganizationId("");
      setSelectedBuildingId("");
      setSelectedFloor("");
      setMapName("");
      setMapScale("");
      setDescription("");
      setSelectedFile(null);
      setIsUploading(false);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error: any) {
      toast.dismiss();
      const errorMessage =
        error?.data?.message || error?.message || "Failed to create floor plan";
      toast.error(errorMessage);
      setIsUploading(false);
    }
  };

  const extractFloorNumber = (floorLabel: string): number | null => {
    const lower = floorLabel.toLowerCase();
    if (lower.includes("ground") || lower.includes("basement")) return 0;
    const match = floorLabel.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isLoading = isUploading || isCreating;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] relative">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-semibold text-card-foreground">
              Upload Floor Plan
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Add new maps to your Digital Map Navigation
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-card-foreground mb-1">
              Upload New Floor Plan
            </h3>
            <p className="text-xs text-muted-foreground">
              Upload PNG, PDF, or SVG floor plans to add to your building maps
            </p>
          </div>

          <div className="space-y-4">
            <CustomSelect
              value={selectedOrganizationId}
              onChange={setSelectedOrganizationId}
              options={organizations.map((org) => ({ name: org.name, value: org.id }))}
              placeholder="Select organization"
              label="Organization"
              required
              disabled={isLoading || organizations.length === 0}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                value={selectedBuildingId}
                onChange={setSelectedBuildingId}
                options={buildings.map((b) => ({ name: b.name, value: b.id }))}
                placeholder={selectedOrganizationId ? "Select building" : "Select organization first"}
                label="Building"
                required
                disabled={isLoading || !selectedOrganizationId || buildings.length === 0}
              />

              <CustomSelect
                value={selectedFloor}
                onChange={setSelectedFloor}
                options={floorLabels}
                placeholder="Select floor"
                label="Floor"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Map Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={mapName}
                onChange={(e) => setMapName(e.target.value)}
                placeholder="e.g. Main Building Floor 1"
                disabled={isLoading}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Map Scale <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={mapScale}
                onChange={(e) => setMapScale(e.target.value)}
                placeholder="1:100"
                disabled={isLoading}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-2.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description or notes about this floor plan"
                disabled={isLoading}
                rows={3}
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Floor Plan File <span className="text-red-500">*</span>
              </label>
              <div className="border-b border-border pb-3">
                <input
                  type="file"
                  id="floor-plan-upload"
                  accept=".pdf,.png,.jpg,.jpeg,.svg,.dwg,.cad"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <label
                  htmlFor="floor-plan-upload"
                  className={`cursor-pointer flex items-center gap-3 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-background rounded">
                    <CloudUpload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Choose File:</span>{" "}
                      <span className="text-muted-foreground">
                        {selectedFile
                          ? selectedFile.name
                          : "Chosen file name display here.png"}
                      </span>
                    </p>
                  </div>
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: PDF, PNG, JPG, SVG, DWG, CAD
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border rounded-b-2xl">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
            className="px-5 py-2.5 text-sm cursor-pointer font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-medium cursor-pointer text-white bg-[#3D8C6C] rounded-lg transition-colors flex items-center gap-2 hover:bg-[#3D8C6C]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isUploading ? "Uploading..." : "Creating..."}
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                Upload Floor Map
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadFloorPlanModal;
