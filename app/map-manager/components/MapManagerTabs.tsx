import NavigationTabs from "@/components/common/NavigationTabs";
import { mapManagerTabs } from "@/lib/map-manager/data";

export default function MapManagerTabs() {
  return <NavigationTabs tabs={mapManagerTabs} />;
}
