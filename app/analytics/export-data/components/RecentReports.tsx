"use client";

import { Button } from "@/components/ui/button";
import { FileText, Clock } from "@/icons/Icons";
import { RecentReport } from "@/lib/analytics/types";

interface RecentReportsProps {
  title: string;
  subtitle: string;
  reports: RecentReport[];
  className?: string;
}

export function RecentReports({
  title,
  subtitle,
  reports,
  className = "",
}: RecentReportsProps) {
  return (
    <div
      className={`bg-background border border-border rounded-xl p-4 sm:p-6 ${className}`}
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-background border border-border rounded-xl p-3 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                    {report.filename}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {report.size} • {report.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  {report.status === "Processing" && (
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                  )}
                  <span
                    className={`text-xs font-medium ${report.statusColor} whitespace-nowrap`}
                  >
                    {report.status}
                  </span>
                </div>

                {report.status === "Ready" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background cursor-pointer hover:bg-accent hover:text-accent-foreground border-border text-foreground flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-8"
                  >
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
