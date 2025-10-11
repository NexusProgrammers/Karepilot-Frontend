"use client";

export interface PerformanceStatItem {
  id: number;
  value: string;
  label: string;
  color: string;
}

export interface PerformanceStatisticsProps {
  title?: string;
  stats: PerformanceStatItem[];
  className?: string;
  showBorder?: boolean;
  gridClassName?: string;
}

export function PerformanceStatistics({
  title = "",
  stats,
  className = "",
  showBorder = true,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4",
}: PerformanceStatisticsProps) {
  const containerClasses = showBorder
    ? "bg-background border border-border rounded-3xl p-6"
    : "bg-background rounded-3xl";

  return (
    <div className={`${containerClasses} ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      )}

      <div className={gridClassName}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-background border border-border rounded-3xl p-4 text-center"
          >
            <div
              className="text-2xl font-bold mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}