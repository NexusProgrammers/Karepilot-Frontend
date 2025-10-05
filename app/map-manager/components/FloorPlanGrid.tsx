"use client";

import { MapPin, Eye, Edit, Settings } from "lucide-react";

const floorPlans = [
  {
    id: 1,
    title: "Main Building Floor 1",
    subtitle: "Main Building • Ground Floor",
    status: "Published",
    fileType: "PNG",
    fileSize: "3.4 MB",
    modifiedDate: "2025-07-30 14:30",
    scale: "1:100",
    version: "V2",
    hasPreview: false,
  },
  {
    id: 2,
    title: "Emergency Wing Floor 2",
    subtitle: "Emergency Wing • 2nd Floor",
    status: "Published",
    fileType: "PDF",
    fileSize: "1.8 MB",
    modifiedDate: "2025-07-16 09:15",
    scale: "1:150",
    version: "V2",
    hasPreview: true,
  },
  {
    id: 3,
    title: "Diagnostic Center Ground",
    subtitle: "Diagnostic Center • Ground Floor",
    status: "Building",
    fileType: "SVG",
    fileSize: "3.1 MB",
    modifiedDate: "2025-07-12 10:45",
    scale: "1:75",
    version: "V2",
    hasPreview: false,
  },
  {
    id: 4,
    title: "Main Building Floor 1",
    subtitle: "Main Building • Ground Floor",
    status: "New",
    fileType: "PNG",
    fileSize: "2.4 MB",
    modifiedDate: "2025-07-30 14:30",
    scale: "1:100",
    version: "V2",
    hasPreview: false,
  },
];

export default function FloorPlanGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {floorPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="relative h-48 bg-muted flex items-center justify-center">
            {plan.hasPreview ? (
              <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Map Preview</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">No Preview</p>
              </div>
            )}

            <div className="absolute top-3 right-3">
              {plan.status === "Published" && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                  {plan.status}
                </span>
              )}
              {plan.status === "Building" && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                  {plan.status}
                </span>
              )}
              {plan.status === "New" && (
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-medium rounded-full">
                  {plan.status}
                </span>
              )}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-card-foreground text-base mb-2">
              {plan.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              {plan.subtitle}
            </p>

            <div className="space-y-1 mb-4">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>
                  {plan.fileType} • {plan.fileSize}
                </span>
                <span>{plan.version}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modified: {plan.modifiedDate}
              </p>
              <p className="text-sm text-muted-foreground">
                Scale: {plan.scale}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors">
                <Eye className="w-4 h-4 text-muted-foreground" />
                Preview
              </button>
              <button className="flex items-center justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors">
                <Edit className="w-4 h-4 text-muted-foreground" />
                Edit
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
