"use client";

import { poiStats } from "@/lib/points-of-interest/data";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";

export default function POIStats() {
  return <StatsGridWithIcons stats={poiStats} />;
}

