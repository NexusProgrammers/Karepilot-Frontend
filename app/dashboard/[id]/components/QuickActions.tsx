'use client';

import { useState } from 'react';
import Image from "next/image";
import uploadFloorPlanIcon from "@/assets/dashboard/quick-actions/upload-floor-plan.svg";
import trackEquipmentIcon from "@/assets/dashboard/quick-actions/track-equipment.svg";
import assignNurseStaffZoneIcon from "@/assets/dashboard/quick-actions/assign-nurse-staff-zone.svg";
import downloadDailyReportIcon from "@/assets/dashboard/quick-actions/download-daily-report.svg";
import addMedicalPoiIcon from "@/assets/dashboard/quick-actions/add-medical-poi.svg";
import emergencyAlertsIcon from "@/assets/dashboard/quick-actions/emergency-alerts.svg";
import addWardLocationIcon from "@/assets/dashboard/quick-actions/add-ward-location.svg";
import markEmergencyExitIcon from "@/assets/dashboard/quick-actions/mark-emergency-exist-location.svg";
import { UploadFloorPlanModal } from "./UploadFloorPlanModal";
import { CreatePOIModal } from "./CreatePOIModal";

const quickActions = [
  {
    id: 1,
    title: "Upload Floor Plan",
    description: "Import a floor plan for a hospital in PDF, PNG, or CAD",
    icon: uploadFloorPlanIcon,
    action: "upload-floor-plan",
  },
  {
    id: 2,
    title: "Track Equipment",
    description:
      "Track live location of staff, visitors, or equipment on floors",
    icon: trackEquipmentIcon,
    action: "add-medical-poi",
  },
  {
    id: 3,
    title: "Assign a Nurse or Staff to a Zone",
    description:
      "Allocate medical or support staff to specific layer or geofenced zones",
    icon: assignNurseStaffZoneIcon,
  },
  {
    id: 4,
    title: "Download Daily Report",
    description:
      "View and export live reports showing hospital events and departments",
    icon: downloadDailyReportIcon,
  },
  {
    id: 5,
    title: "Add Medical POI",
    description: "Edit key reports, Crisis, ERs, Pharmacists, Waiting Areas",
    icon: addMedicalPoiIcon,
  },
  {
    id: 6,
    title: "Emergency Alerts",
    description: "Set alerts for unauthorized access to critical areas",
    icon: emergencyAlertsIcon,
  },
  {
    id: 7,
    title: "Add Ward Locations",
    description:
      "Create markers for patient wards and assign floor/ward numbers",
    icon: addWardLocationIcon,
  },
  {
    id: 8,
    title: "Mark Emergency Exit Location",
    description: "Define and label safe exit routes for emergencies",
    icon: markEmergencyExitIcon,
  },
];

export default function QuickActions() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPOIModalOpen, setIsPOIModalOpen] = useState(false);

  const handleActionClick = (action?: string) => {
    if (action === "upload-floor-plan") {
      setIsUploadModalOpen(true);
    } else if (action === "add-medical-poi") {
      setIsPOIModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Quick Actions
          </h2>
          <p className="text-sm text-gray-500">
            Common hospital management tasks
          </p>
        </div>
        <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              onClick={() => handleActionClick(action.action)}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                <Image
                  src={action.icon}
                  alt={action.title}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-0.5">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UploadFloorPlanModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      
      <CreatePOIModal
        isOpen={isPOIModalOpen}
        onClose={() => setIsPOIModalOpen(false)}
      />
    </>
  );
}