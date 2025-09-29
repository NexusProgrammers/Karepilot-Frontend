"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DashboardIcon,
  OrganizationIcon,
  MapManagerIcon,
  PointsOfInterestIcon,
  UserAndRolesIcon,
  AssetTrackingIcon,
  AlertsAndGeofencingIcon,
  AnalyticsIcon,
  SettingsIcon,
  LogoIcon,
} from "@/icons/dashboard";
import logoImg from "@/assets/common/logo.svg"
import Image from "next/image";

const navigationItems = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/",
  },
  {
    name: "Organizations",
    icon: OrganizationIcon,
    path: "/organizations",
  },
  {
    name: "Map Manager",
    icon: MapManagerIcon,
    path: "/map-manager",
  },
  {
    name: "Points of Interest",
    icon: PointsOfInterestIcon,
    path: "/points-of-interest",
  },
  {
    name: "User & Roles",
    icon: UserAndRolesIcon,
    path: "/users-and-roles",
  },
  {
    name: "Asset Tracking",
    icon: AssetTrackingIcon,
    path: "/asset-tracking",
  },
  {
    name: "Alerts & Geofencing",
    icon: AlertsAndGeofencingIcon,
    path: "/alerts-and-geofencing",
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,
    path: "/analytics",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/settings",
  },
];

interface SidebarProps {
  className?: string;
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
      <div className="px-4 py-5">
        <div className="flex items-center">
          <LogoIcon />
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.path;
            const IconComponent = item.icon;
            
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#3D8C6C] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "shrink-0 w-5 h-5",
                      isActive ? "text-white" : "text-gray-600"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-white cursor-pointer"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 [&>button]:cursor-pointer [&>button]:top-5 [&>button]:right-4">
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-gray-100 shrink-0">
              <Image src={logoImg} alt="logo" width={160} height={200} />
            </div>
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
              <ul className="space-y-1">
                {navigationItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  const IconComponent = item.icon;
                  
                  return (
                    <li key={index}>
                      <Link
                        href={item.path}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                          isActive
                            ? "bg-[#3D8C6C] text-white"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "shrink-0 w-5 h-5",
                            isActive ? "text-white" : "text-gray-600"
                          )}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-white border-r border-gray-100",
          className
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}