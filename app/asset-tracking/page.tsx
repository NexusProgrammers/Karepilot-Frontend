"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import { 
  assetsData, 
  statsData, 
  typeFilters, 
  buildingFilters 
} from "@/lib/asset-tracking/data";
import {
  AssetTrackingHeader,
  AssetMapWithDropdown,
  AssetListWithDropdown,
} from "./components";

export default function AssetTrackingPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedBuilding, setSelectedBuilding] = useState("all");

  const filteredAssets = assetsData.filter((asset) => {
    const typeMatch = selectedType === "all" || asset.type === selectedType;
    const buildingMatch = selectedBuilding === "all" || 
      (selectedBuilding === "main-hospital" && asset.building === "Main Hospital") ||
      (selectedBuilding === "emergency-wing" && asset.building === "Annex Building") ||
      (selectedBuilding === "diagnostic-wing" && asset.building === "Diagnostic Wing");
    
    return typeMatch && buildingMatch;
  });

  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/"
      pageTitle="Asset Tracking"
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <div className="space-y-6">
        <AssetTrackingHeader />

        <StatsGridWithIcons stats={statsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AssetMapWithDropdown 
              selectedBuilding={selectedBuilding}
              onBuildingChange={setSelectedBuilding}
              buildingFilters={buildingFilters}
            />
          </div>

          <div className="lg:col-span-1">
            <AssetListWithDropdown 
              assets={filteredAssets}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              typeFilters={typeFilters}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
