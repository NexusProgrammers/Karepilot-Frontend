"use client";

import { LayersList } from "./LayersList";

export function LayersContent() {
  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      <div className="w-80 bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Layers</h2>
        </div>
        
        <LayersList />
      </div>

      <div className="flex-1 bg-card border border-border rounded-xl p-4">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <p className="text-lg font-medium">Layer Management</p>
            <p className="text-sm mt-2">Manage and organize your map layers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
