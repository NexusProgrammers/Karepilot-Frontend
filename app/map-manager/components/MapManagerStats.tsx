"use client";

import { mapStats } from "@/lib/map-manager/data";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";

export default function MapManagerStats() {
  return <StatsGridWithIcons stats={mapStats} />;
}
