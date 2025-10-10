"use client";

import { LucideIcon } from "@/icons/Icons";

export type StatItemWithIcon = {
  id: number | string;
  title: string;
  value: string | number;
  change?: string;
  note?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

type StatsGridWithIconsProps = {
  stats: StatItemWithIcon[];
};

export default function StatsGridWithIcons({ stats }: StatsGridWithIconsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-card rounded-4xl border border-border p-6 max-h-[120px]"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </span>
              <div
                className={`w-10 h-10 rounded-full ${stat.iconBg} flex items-center justify-center`}
              >
                <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-card-foreground">
              {stat.value}
            </p>
            {stat.change && stat.note && (
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> {stat.note}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

