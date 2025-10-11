"use client";

import { Button } from "@/components/ui/button";
import { QuickExportItem } from "@/lib/analytics/types";

interface QuickExportProps {
  title: string;
  subtitle: string;
  exports: QuickExportItem[];
  className?: string;
}

export function QuickExport({
  title,
  subtitle,
  exports,
  className = "",
}: QuickExportProps) {
  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exports.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="bg-background border border-border rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center">
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: item.iconColor || "#6b7280" }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 rounded-lg"
                >
                  Export
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
