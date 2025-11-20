"use client";

import { useState } from "react";
import { DrawingTools } from "./DrawingTools";
import { Layers } from "./Layers";
import { Properties } from "./Properties";
import { MapCanvas } from "./MapCanvas";
import { ActionButtons } from "./ActionButtons";
import { AddPOIModal } from "./AddPOIModal";
import { AddLabelModal } from "./AddLabelModal";
import { MarkEntranceModal } from "./MarkEntranceModal";
import { AddElevatorModal } from "./AddElevatorModal";
import { AddRestrictedZoneModal } from "./AddRestrictedZoneModal";
import { AddAnnotationModal } from "./AddAnnotationModal";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { MapEditorContentProps } from "@/lib/types/map-editor/components";

export function MapEditorContent({ floorPlanId }: MapEditorContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPOIModal, setShowPOIModal] = useState(false);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [showEntranceModal, setShowEntranceModal] = useState(false);
  const [showElevatorModal, setShowElevatorModal] = useState(false);
  const [showRestrictedZoneModal, setShowRestrictedZoneModal] = useState(false);
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [poiCoordinates, setPoiCoordinates] = useState<{ x: number; y: number } | undefined>();
  const [entranceCoordinates, setEntranceCoordinates] = useState<{ x: number; y: number } | undefined>();
  const [elevatorCoordinates, setElevatorCoordinates] = useState<{ x: number; y: number } | undefined>();
  const [restrictedZoneCoordinates, setRestrictedZoneCoordinates] = useState<{ x: number; y: number; width: number; height: number } | undefined>();
  const [labelCoordinates, setLabelCoordinates] = useState<{ x: number; y: number } | undefined>();
  const [annotationCoordinates, setAnnotationCoordinates] = useState<{ x: number; y: number } | undefined>();

  return (
    <div className="flex h-[calc(100vh-120px)] relative gap-4">
      <div className="lg:hidden absolute top-1 left-2 z-50 cursor-pointer">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:relative inset-y-0 left-0 z-40
          w-80 lg:w-80 xl:w-96
          bg-background border-r border-border
          flex flex-col
          transition-transform duration-300 ease-in-out
          overflow-y-auto
        `}
      >
        <div className="flex-1 p-4 space-y-4 lg:space-y-6 mt-32 lg:mt-0">
          <DrawingTools 
            selectedTool={selectedTool}
            onToolSelect={(toolId) => {
              setSelectedTool(toolId);
              if (toolId === "poi") {
              } else if (toolId === "label") {
              } else if (toolId === "entrance") {
              } else if (toolId === "elevator") {
              } else if (toolId === "restricted") {
              } else if (toolId === "annotation") {
              }
            }}
          />
          <Layers />
          <Properties />
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <MapCanvas 
          floorPlanId={floorPlanId}
          selectedTool={selectedTool}
          onPOIClick={(coordinates) => {
            if (selectedTool === "poi") {
              setPoiCoordinates(coordinates);
              setShowPOIModal(true);
            } else if (selectedTool === "entrance") {
              setEntranceCoordinates(coordinates);
              setShowEntranceModal(true);
            } else if (selectedTool === "elevator") {
              setElevatorCoordinates(coordinates);
              setShowElevatorModal(true);
            } else if (selectedTool === "label") {
              setLabelCoordinates(coordinates);
              setShowLabelModal(true);
            } else if (selectedTool === "annotation") {
              setAnnotationCoordinates(coordinates);
              setShowAnnotationModal(true);
            }
          }}
          onRestrictedZoneDraw={(coordinates) => {
            setRestrictedZoneCoordinates(coordinates);
            setShowRestrictedZoneModal(true);
          }}
        />
        <ActionButtons />
      </div>

      <AddPOIModal
        isOpen={showPOIModal}
        onClose={() => {
          setShowPOIModal(false);
          setPoiCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId}
        coordinates={poiCoordinates}
      />
      
      <AddLabelModal
        isOpen={showLabelModal}
        onClose={() => {
          setShowLabelModal(false);
          setLabelCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId}
        coordinates={labelCoordinates}
      />
      
      <MarkEntranceModal
        isOpen={showEntranceModal}
        onClose={() => {
          setShowEntranceModal(false);
          setEntranceCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId}
        coordinates={entranceCoordinates}
      />
      
      <AddElevatorModal
        isOpen={showElevatorModal}
        onClose={() => {
          setShowElevatorModal(false);
          setElevatorCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId}
        coordinates={elevatorCoordinates}
      />
      
      <AddRestrictedZoneModal
        isOpen={showRestrictedZoneModal}
        onClose={() => {
          setShowRestrictedZoneModal(false);
          setRestrictedZoneCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId}
        coordinates={restrictedZoneCoordinates}
      />
      
      <AddAnnotationModal
        isOpen={showAnnotationModal}
        onClose={() => {
          setShowAnnotationModal(false);
          setAnnotationCoordinates(undefined);
          setSelectedTool(null);
        }}
        floorPlanId={floorPlanId || ""}
        coordinates={annotationCoordinates}
      />
    </div>
  );
}
