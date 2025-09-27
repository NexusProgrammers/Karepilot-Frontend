"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Building2,
  Map,
  MapPin,
  UserCheck,
  Package,
  Shield,
  ChartBar as BarChart3,
  Settings,
  House,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigationItems = [
  { name: "Dashboard", icon: House, path: "/" },
  { name: "Organizations", icon: Building2, path: "/organizations" },
  { name: "Map Manager", icon: Map, path: "/map-manager" },
  { name: "Points of Interest", icon: MapPin, path: "/points-of-interest" },
  { name: "User & Roles", icon: UserCheck, path: "/users-and-roles" },
  { name: "Asset Tracking", icon: Package, path: "/asset-tracking" },
  { name: "Alerts & Geofencing", icon: Shield, path: "/alerts-and-geofencing" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  className?: string;
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
      <div className="px-4 py-5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Karepilot</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-gray-400"
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

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-white"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
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
