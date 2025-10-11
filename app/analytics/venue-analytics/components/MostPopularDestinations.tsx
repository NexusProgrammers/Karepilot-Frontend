"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "@/icons/Icons";

interface DestinationItem {
  id: number;
  name: string;
  count: string;
  trend: "up" | "down" | "neutral";
  trendColor: string;
}

interface MostPopularDestinationsProps {
  title: string;
  subtitle: string;
  destinations: DestinationItem[];
  className?: string;
}

export function MostPopularDestinations({
  title,
  subtitle,
  destinations,
  className = "",
}: MostPopularDestinationsProps) {
  const getTrendIcon = (trend: string, color: string) => {
    if (trend === "up") {
      return <TrendingUp className="w-4 h-4" style={{ color }} />;
    } else if (trend === "down") {
      return <TrendingDown className="w-4 h-4" style={{ color }} />;
    }
    return <ArrowRight className="w-4 h-4" style={{ color }} />;
  };

  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {getTrendIcon(destination.trend, destination.trendColor)}
              </div>
              <span className="text-sm font-medium text-foreground">
                {destination.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {destination.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
