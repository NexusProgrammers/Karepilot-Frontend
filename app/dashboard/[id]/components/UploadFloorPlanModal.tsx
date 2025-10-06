"use client";

import { useState } from "react";
import { X, CloudUpload } from "lucide-react";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";

interface UploadFloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const buildings = ["Main Building", "Emergency Wing", "Diagnostic Center"];
const floors = ["Ground Floor", "1st Floor", "2nd Floor"];

export function UploadFloorPlanModal({
  isOpen,
  onClose,
}: UploadFloorPlanModalProps) {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [mapName, setMapName] = useState("");
  const [mapScale, setMapScale] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({
      building: selectedBuilding,
      floor: selectedFloor,
      mapName,
      mapScale,
      description,
      file: selectedFile,
    });
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
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] relative">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-semibold text-card-foreground">
              Upload Floor Plan
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomSelect
                value={selectedBuilding}
                onChange={setSelectedBuilding}
                options={buildings}
                placeholder="Select building"
                label="Building"
                required
              />

              <CustomSelect
                value={selectedFloor}
                onChange={setSelectedFloor}
                options={floors}
                placeholder="Select floor"
                label="Floor"
                required
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
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
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
                className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <CustomTextarea
              value={description}
              onChange={setDescription}
              placeholder="Optional description or notes about this floor plan"
              label="Description"
            />

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
                  className="hidden"
                />
                <label
                  htmlFor="floor-plan-upload"
                  className="cursor-pointer flex items-center gap-3"
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
                Supported formats: PDF, Vector, CAD
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm cursor-pointer font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-medium cursor-pointer text-white bg-[#3D8C6C] rounded-lg transition-colors flex items-center gap-2"
          >
            <CloudUpload className="w-4 h-4" />
            Upload Floor Map
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background p-8">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
      >
        Open Modal
      </button>
      <UploadFloorPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}