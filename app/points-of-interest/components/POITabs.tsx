"use client";

import NavigationTabs from "@/components/common/NavigationTabs";
import { poiTabs } from "@/lib/points-of-interest/data";

export default function POITabs() {
  return <NavigationTabs tabs={poiTabs} responsive={true}/>;
}

