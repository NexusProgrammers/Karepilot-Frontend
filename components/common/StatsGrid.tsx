"use client";

import Image, { StaticImageData } from "next/image";

export type StatItem = {
  id: number | string;
  title: string;
  value: string | number;
  change?: string;
  note?: string;
  icon: StaticImageData | string;
};

type StatsGridProps = {
  stats: StatItem[];
  gridClassName?: string;
};

export default function StatsGrid({
  stats,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
}: StatsGridProps) {
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
            <Image src={stat.icon} alt={stat.title} width={40} height={40} />
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
