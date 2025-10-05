"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { tabs } from "@/lib/map-manager/data";

export default function MapManagerTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 mb-6 bg-muted max-w-[300px] rounded-full p-2">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/map-manager"
            ? pathname === "/map-manager"
            : pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`whitespace-nowrap transition cursor-pointer rounded-full px-4 py-2 text-sm ${
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
