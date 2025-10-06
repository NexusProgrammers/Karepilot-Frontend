import NavigationTabs from "@/components/common/NavigationTabs";
import { organizationTabs } from "@/lib/organization/data";

export function OrganizationNav() {
  return (
    <NavigationTabs
      tabs={organizationTabs}
      maxWidth="max-w-[400px]"
      responsive={true}
    />
  );
}
