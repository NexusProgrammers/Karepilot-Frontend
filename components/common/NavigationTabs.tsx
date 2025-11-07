"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TabItem, NavigationTabsProps } from "@/lib/types/common/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type { TabItem };

export default function NavigationTabs({
  tabs,
  className = "",
  maxWidth = "max-w-[320px]",
  responsive = false,
}: NavigationTabsProps) {
  const pathname = usePathname();

  const isActive = (tab: TabItem) => {
    if (tab.href === "/analytics") {
      return pathname ===  "/analytics";
    }

    if (tab.href.startsWith("/analytics/")) {
      return pathname === tab.href;
    }

    if (tab.href === "/settings") {
      return pathname === "/settings";
    }

    if (tab.href.startsWith("/settings/")) {
      return pathname === tab.href;
    }

    if (
      tab.href === "/organizations" ||
      tab.href === "/map-manager" ||
      tab.href === "/alerts-and-geofencing"
    ) {
      return pathname === tab.href;
    }

    if (tab.href.startsWith("/users-and-roles")) {
      return pathname === tab.href;
    }

    if (tab.href.startsWith("/points-of-interest")) {
      return pathname === tab.href;
    }

    return pathname.startsWith(tab.href);
  };

  const baseClasses = `${maxWidth}`;
  const responsiveClasses = responsive
    ? "sm:gap-3 p-1 sm:p-2 overflow-x-auto scrollbar-hide"
    : "";
  const textClasses = responsive
    ? "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
    : "px-4 py-2 text-sm";

  return (
    <Tabs className={` ${baseClasses} ${className}`}>
      <TabsList className={`flex gap-1 mb-6 ${responsiveClasses}`}>
        {tabs.map((tab) => {
          const active = isActive(tab);
          return (
            <Link key={tab.id} href={tab.href} className={responsive ? "flex-shrink-0" : ""}>
              <TabsTrigger active={active} className={`${textClasses}`}>
                {tab.label}
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
