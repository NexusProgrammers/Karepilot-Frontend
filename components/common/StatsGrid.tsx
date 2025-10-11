"use client";

import Image, { StaticImageData } from "next/image";
import { LucideIcon } from "@/icons/Icons";

export type StatItem = {
  id: number | string;
  title: string;
  value: string | number;
  change?: string;
  note?: string;
  icon: StaticImageData | string;
  iconComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  showIcon?: boolean;
  iconColor?: string;
  iconBackgroundColor?: string;
};

type StatsGridProps = {
  stats: StatItem[];
  gridClassName?: string;
};

export default function StatsGrid({
  stats,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
}: StatsGridProps) {
  const renderIcon = (stat: StatItem) => {
    if (stat.showIcon && stat.iconComponent) {
      const IconComponent = stat.iconComponent;
      const iconStyle = {
        color: stat.iconColor || "currentColor",
      };

      return (
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: stat.iconBackgroundColor || "transparent" }}
        >
          <IconComponent 
            className="w-6 h-6" 
            style={iconStyle}
          />
        </div>
      );
    }

    return (
      <Image
        src={stat.icon as StaticImageData | string}
        alt={stat.title}
        width={40}
        height={40}
      />
    );
  };

  return (
    <div className={gridClassName}>
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card rounded-4xl border border-border p-5"
        >
          <div className="flex items-start justify-between">
            <span className="text-lg font-medium text-muted-foreground">
              {stat.title}
            </span>
            {renderIcon(stat)}
          </div>
          <p className="text-3xl font-bold text-card-foreground mb-1">
            {stat.value}
          </p>
          {stat.change && stat.note && (
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> {stat.note}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
