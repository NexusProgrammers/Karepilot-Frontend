"use client";

interface PerformanceStatItem {
  id: number;
  value: string;
  label: string;
  color: string;
}

interface PerformanceStatisticsProps {
  title: string;
  stats: PerformanceStatItem[];
  className?: string;
}

export function PerformanceStatistics({ title, stats, className = "" }: PerformanceStatisticsProps) {
  return (
    <div className={`bg-background border border-border rounded-3xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-background border border-border rounded-3xl p-4 text-center">
            <div 
              className="text-2xl font-bold mb-2"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
