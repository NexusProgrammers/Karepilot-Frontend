"use client";

import { useState } from "react";
import { DrawingTools } from "./DrawingTools";
import { Layers } from "./Layers";
import { Properties } from "./Properties";
import { MapCanvas } from "./MapCanvas";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";

export function MapEditorContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-120px)] relative">
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
          <DrawingTools />
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
        <MapCanvas />
        <ActionButtons />
      </div>
    </div>
  );
}
