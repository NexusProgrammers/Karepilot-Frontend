"use client";

import { floorPlans } from "@/lib/map-manager/data";
import { MapPin, Settings } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FloorPlanGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {floorPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-card rounded-4xl shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow p-6"
        >
          <div className="relative h-48 md:h-80 bg-muted flex items-center justify-center rounded-3xl border border-dashed border-gray-200">
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
            <hr className="mb-6" />
            <div className="flex gap-2 w-full">
              <Link href="/map-manager/map-editor" className="w-full">
                <Button
                  variant="outline"
                  className="flex cursor-pointer w-full items-center justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                >
                  Preview
                </Button>
              </Link>
              <Link href="/map-manager/map-editor" className="w-full">
                <Button
                  variant="outline"
                  className="flex cursor-pointer items-center w-full justify-center gap-2 flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground hover:bg-accent transition-colors"
                >
                  Edit
                </Button>
              </Link>
              <Link href="/map-manager/map-editor">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex cursor-pointer items-center justify-center w-10 h-10 bg-background border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
