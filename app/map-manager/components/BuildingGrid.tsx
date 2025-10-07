"use client";

import { buildings } from "@/lib/map-manager/data";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuildingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {buildings.map((building) => (
        <div
          key={building.id}
          className="bg-card rounded-4xl border border-border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-card-foreground">
              {building.name}
            </h3>
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="flex items-center gap-6 mb-6 justify-between px-24 text-center">
            <div>
              <div className="text-2xl font-bold text-card-foreground">
                {building.totalMaps}
              </div>
              <div className="text-sm text-muted-foreground">Total Maps</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {building.publishedMaps}
              </div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Floors
            </h4>
            <div className="flex flex-wrap gap-2">
              {building.floors.map((floor) => (
                <Button
                  key={floor}
                  variant="ghost"
                  size="sm"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-muted text-muted-foreground hover:bg-muted/80 cursor-pointer"
                >
                  {floor}
                </Button>
              ))}
            </div>
          </div>
          <hr className="mb-6" />
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Use This Template
            </Button>
            <Button
              variant="outline"
              className="flex-1 cursor-pointer px-4 py-2 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Add Floor
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
