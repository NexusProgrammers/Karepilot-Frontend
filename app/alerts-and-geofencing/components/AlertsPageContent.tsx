"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  AlertsAndGeofencingHeader,
  AlertStatsCards,
  RealTimeAssetMap,
  AlertOverview,
  AlertLog,
  CreateGeofenceZoneModal,
  CreateAlertModal,
} from "./index";
import {
  alertStats,
  alertOverviewStats,
  geofenceZones,
  recentAlerts,
  allAlerts,
  alertTabs,
} from "@/lib/alerts-and-geofencing/data";
import {
  GeofenceZone,
  CreateGeofenceZoneData,
  CreateAlertData,
  Alert,
} from "@/lib/alerts-and-geofencing/types";

interface AlertsPageContentProps {
  filterStatus?: "all" | "active" | "acknowledged" | "resolved";
}

export function AlertsPageContent({
  filterStatus = "all",
}: AlertsPageContentProps) {
  const [isCreateZoneModalOpen, setIsCreateZoneModalOpen] = useState(false);
  const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
  const [zones, setZones] = useState<GeofenceZone[]>(geofenceZones);

  const handleCreateZone = () => {
    setIsCreateZoneModalOpen(true);
  };

  const handleCreateAlert = () => {
    setIsCreateAlertModalOpen(true);
  };

  const handleCreateZoneSubmit = (data: CreateGeofenceZoneData) => {

    const newZone: GeofenceZone = {
      id: Date.now().toString(),
      name: data.name,
      location: "Main Hospital • New Floor",
      description: data.description,
      
      alertType: data.type as "Restricted" | "Alert" | "Notification",
      alertDescription: "Alert on entry",
      isActive: true,
    };

    setZones((prev) => [...prev, newZone]);
  };

  const handleCreateAlertSubmit = (data: CreateAlertData) => {
    console.log("Creating alert:", data);
  };

  const handleEditZone = (zone: GeofenceZone) => {
    console.log("Editing zone:", zone);
  };

  const handleViewZoneInMap = (zone: GeofenceZone) => {
    console.log("Viewing zone in map:", zone);
  };

  const handleToggleZone = (zone: GeofenceZone) => {
    console.log("Toggling zone:", zone);
    setZones((prev) =>
      prev.map((z) => (z.id === zone.id ? { ...z, isActive: !z.isActive } : z))
    );
  };

  const filteredAlerts: Alert[] =
    filterStatus === "all"
      ? allAlerts
      : allAlerts.filter(
          (alert) => alert.status.toLowerCase() === filterStatus
        );

  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/users-and-roles"
      pageTitle="Alerts & Geofencing"
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <div className="">
        <AlertsAndGeofencingHeader
          onCreateZone={handleCreateZone}
          onCreateAlert={handleCreateAlert}
        />

        <AlertStatsCards stats={alertStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RealTimeAssetMap
            zones={zones}
            onEditZone={handleEditZone}
            onViewZoneInMap={handleViewZoneInMap}
            onToggleZone={handleToggleZone}
          />

          <AlertOverview
            stats={alertOverviewStats}
            recentAlerts={recentAlerts}
          />
        </div>

        <AlertLog
          alerts={filteredAlerts}
          tabs={alertTabs}
          currentFilter={filterStatus}
        />

        <CreateGeofenceZoneModal
          isOpen={isCreateZoneModalOpen}
          onClose={() => setIsCreateZoneModalOpen(false)}
          onSubmit={handleCreateZoneSubmit}
        />

        <CreateAlertModal
          isOpen={isCreateAlertModalOpen}
          onClose={() => setIsCreateAlertModalOpen(false)}
          onSubmit={handleCreateAlertSubmit}
        />
      </div>
    </DashboardLayout>
  );
}
