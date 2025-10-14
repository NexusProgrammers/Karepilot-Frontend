"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DrawingToolsList } from "./DrawingToolsList";
import { AddToolModal } from "./AddToolModal";

export function DrawingToolsContent() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      <div className="w-80 bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Drawing Tools</h2>
        </div>
        
        <DrawingToolsList />
        
        <Button 
          onClick={() => setShowAddModal(true)}
          className="w-full mt-4 bg-[#3D8C6C] hover:bg-[#3D8C6C]/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Tool
        </Button>
      </div>

      <div className="flex-1 bg-card border border-border rounded-xl p-4">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
              <Plus className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium">Canvas Area</p>
            <p className="text-sm mt-2">Select a drawing tool to start creating</p>
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddToolModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
