"use client";

interface SystemHealthItem {
  name: string;
  time: string;
  status: string;
  health: number;
}

interface SystemHealthComponentProps {
  title: string;
  subtitle: string;
  data: SystemHealthItem[];
  className?: string;
}

export function SystemHealthComponent({
  title,
  subtitle,
  data,
  className = "",
}: SystemHealthComponentProps) {
  return (
    <div className={`bg-background border border-border rounded-xl p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-5 w-full">
        {data.map((system, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-foreground block">
                  {system.name}
                </span>
                <span className="text-xs text-muted-foreground">{system.time}</span>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs block ${
                    system.status === "Healthy"
                      ? "bg-muted p-2 rounded-xl text-foreground"
                      : system.status === "Warning"
                      ? "text-pink-700 bg-pink-200 p-2 rounded-xl"
                      : "text-red-700 bg-red-200 p-2 rounded-xl"
                  }`}
                >
                  {system.status}
                </span>
                <span className="text-sm text-muted-foreground">{system.health}%</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  system.health >= 95
                    ? "bg-blue-500"
                    : system.health >= 90
                    ? "bg-blue-500"
                    : "bg-pink-500"
                }`}
                style={{ width: `${system.health}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
