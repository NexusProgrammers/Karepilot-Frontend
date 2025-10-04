"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function OrganizationNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/organizations") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex gap-1 sm:gap-3 mb-6 bg-gray-100 max-w-[400px] rounded-full p-1 sm:p-2 overflow-x-auto scrollbar-hide">
      <Link
        href="/organizations"
        className={`whitespace-nowrap transition cursor-pointer rounded-full 
          px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
          ${
            isActive("/organizations")
              ? "bg-white text-black shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
      >
        Overview
      </Link>
      <Link
        href="/organizations/list"
        className={`whitespace-nowrap transition cursor-pointer rounded-full 
          px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
          ${
            isActive("/organizations/list")
              ? "bg-white text-black shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
      >
        Organizations
      </Link>
      <Link
        href="/organizations/venue-templates"
        className={`whitespace-nowrap transition cursor-pointer rounded-full 
          px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
          ${
            isActive("/organizations/venue-templates")
              ? "bg-white text-black shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
      >
        Venue Templates
      </Link>
    </div>
  );
}