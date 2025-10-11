"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationTabsProps {
  tabs: TabItem[];
  className?: string;
  maxWidth?: string;
  responsive?: boolean;
}

export default function NavigationTabs({
  tabs,
  className = "",
  maxWidth = "max-w-[320px]",
  responsive = false,
}: NavigationTabsProps) {
  const pathname = usePathname();

  const isActive = (tab: TabItem) => {
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

  const baseClasses = `flex gap-1 mb-6 bg-muted rounded-full p-2 ${maxWidth}`;
  const responsiveClasses = responsive
    ? "sm:gap-3 p-1 sm:p-2 overflow-x-auto scrollbar-hide"
    : "";
  const textClasses = responsive
    ? "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
    : "px-4 py-2 text-sm";

  return (
    <div className={`${baseClasses} ${responsiveClasses} ${className}`}>
      {tabs.map((tab) => {
        const active = isActive(tab);

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`whitespace-nowrap transition cursor-pointer rounded-full ${
              responsive ? "flex-shrink-0" : ""
            } ${textClasses} ${
              active
                ? "bg-background text-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
