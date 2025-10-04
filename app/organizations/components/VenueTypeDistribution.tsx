"use client";

import VenueTypeCard, { VenueTypeItem } from "./VenueTypeCard";

type VenueTypeDistributionProps = {
  venues: VenueTypeItem[];
};

export default function VenueTypeDistribution({ venues }: VenueTypeDistributionProps) {
  return (
    <div className="mb-6 border border-gray-200 rounded-4xl mt-6 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Venue Type Distribution
        </h2>
        <p className="text-gray-600">
          Overview of different venue types in your system
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <VenueTypeCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}