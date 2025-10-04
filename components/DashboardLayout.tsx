"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ProfileMenu } from "./ProfileMenu";
import { ArrowLeft, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backLink?: string;
  organizationName?: string;
  showOrganizationHeader?: boolean;
  pageTitle?: string;
}

export function DashboardLayout({
  children,
  showBackButton = false,
  backLink = "/",
  organizationName = "",
  showOrganizationHeader = false,
  pageTitle = "Dashboard",
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:ml-64">
        <header className="bg-card border-b border-border px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {showBackButton && (
                <>
                  <Link
                    href={backLink}
                    className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm font-medium hidden sm:inline sm:ml-4 lg:ml-0">
                      Back
                    </span>
                  </Link>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </>
              )}
              <h1 className="text-sm font-medium hidden md:flex text-muted-foreground truncate">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {showOrganizationHeader && organizationName && (
                <>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#3D8C6C]/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-[#3D8C6C]" />
                    </div>
                    <span className="text-sm font-medium text-foreground max-w-[200px] truncate">
                      {organizationName}
                    </span>
                  </div>
                  <div className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#3D8C6C]/10 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3D8C6C]" />
                  </div>
                </>
              )}
              <ProfileMenu />
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 bg-background">{children}</main>
      </div>
    </div>
  );
}
