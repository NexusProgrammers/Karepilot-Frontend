"use client";

import Image, { StaticImageData } from "next/image";

export type VenueTypeItem = {
  id: number | string;
  title: string;
  count: string | number;
  description: string;
  icon: StaticImageData | string;
  iconColor: string;
};

type VenueTypeCardProps = {
  venue: VenueTypeItem;
};

export default function VenueTypeCard({ venue }: VenueTypeCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <span className="text-lg font-medium text-gray-500">{venue.title}</span>
        <Image src={venue.icon} alt={venue.title} width={40} height={40} />
      </div>
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-900">{venue.count}</span>
      </div>
      <p className="text-sm text-gray-600 max-w-[180px]">{venue.description}</p>
    </div>
  );
}
