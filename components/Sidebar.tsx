"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LogoIcon } from "@/icons/Svg";
import { logoImg } from "@/icons/Assets";
import Image from "next/image";
import { navigationItems } from "@/lib/sidebar/data";
import { Menu } from "@/icons/Icons";

interface SidebarProps {
  className?: string;
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:shadow-[2px_0_5px_-2px_rgba(255,255,255,0.1)]">
      <div className="px-4 py-5">
        <div className="flex items-center">
          <LogoIcon />
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive =
              item.path === "/"
                ? pathname === "/" || pathname.startsWith("/dashboard")
                : pathname === item.path ||
                  pathname.startsWith(item.path + "/");

            const IconComponent = item.icon;

            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#3D8C6C] text-white"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "shrink-0 w-5 h-5",
                      isActive ? "text-white" : "text-muted-foreground"
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
            className="lg:hidden fixed top-4 left-4 z-50 bg-background border-border cursor-pointer"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64 [&>button]:cursor-pointer [&>button]:top-5 [&>button]:right-4 bg-background border-border"
        >
          <div className="flex flex-col h-full">
            <div className="px-4 py-3 border-b border-border shrink-0">
              <Image
                src={logoImg}
                alt="logo"
                width={160}
                height={200}
                className="w-auto h-auto"
              />
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
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "shrink-0 w-5 h-5",
                            isActive ? "text-white" : "text-muted-foreground"
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
          "hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 bg-card border-r border-border",
          className
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
