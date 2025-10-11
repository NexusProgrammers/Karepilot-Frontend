"use client";

import { ReportTemplate } from "@/lib/analytics/types";

interface AvailableReportsProps {
  title: string;
  subtitle: string;
  templates: ReportTemplate[];
  onTemplateSelect: (templateId: number) => void;
  className?: string;
}

export function AvailableReports({
  title,
  subtitle,
  templates,
  onTemplateSelect,
  className = "",
}: AvailableReportsProps) {
  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`bg-background border rounded-xl p-4 cursor-pointer transition-all ${
              template.isSelected
                ? "border-green-500 bg-green-50"
                : "border-border hover:border-green-300"
            }`}
          >
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {template.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {template.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    template.isSelected
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
