"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { dashboardIcon } from "@/icons/Assets";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { Organization } from "@/lib/types/organization/organization";
import { OrganizationGridSkeleton } from "./OrganizationGridSkeleton";
import { useOrganizationSearch } from "@/lib/hooks/dashboard";

export function OrganizationSelection() {
  const router = useRouter();

  const {
    searchTerm,
    isSearchMenuOpen,
    searchContainerRef,
    
    organizationList,
    searchSuggestions,
    isOrganizationsError,
    organizationsError,
    
    isBusy,
    hasOrganizations,
    
    setSearchTerm,
    setIsSearchMenuOpen,
    refetchOrganizations,
    handleSearchSelect,
  } = useOrganizationSearch();

  const handleOrganizationSelect = (org: Organization) => {
    if (org?.id) {
      router.push(`/dashboard/${org.id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-7">
          <div className="flex w-full items-center justify-center">
            <Image width={60} height={60} src={dashboardIcon} alt="img" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select an Organization
          </h1>
          <p className="text-muted-foreground">
            Choose an organization to access the admin dashboard
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto" ref={searchContainerRef}>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.58464 1.29175C4.55756 1.29175 1.29297 4.55634 1.29297 8.58342C1.29297 12.6105 4.55756 15.8751 8.58464 15.8751C12.6117 15.8751 15.8763 12.6105 15.8763 8.58342C15.8763 4.55634 12.6117 1.29175 8.58464 1.29175ZM0.0429688 8.58342C0.0429688 3.86598 3.8672 0.041748 8.58464 0.041748C13.3021 0.041748 17.1263 3.86598 17.1263 8.58342C17.1263 10.7172 16.3439 12.6682 15.0504 14.1653L17.7766 16.8915C18.0207 17.1356 18.0207 17.5313 17.7766 17.7754C17.5325 18.0194 17.1368 18.0194 16.8927 17.7754L14.1665 15.0491C12.6694 16.3427 10.7184 17.1251 8.58464 17.1251C3.8672 17.1251 0.0429688 13.3008 0.0429688 8.58342Z"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  if (event.target.value) {
                    setIsSearchMenuOpen(true);
                  }
                }}
                placeholder="Search organizations by name, city, or type..."
                onFocus={() => {
                  if (searchTerm) {
                    setIsSearchMenuOpen(true);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D8C6C] placeholder:text-muted-foreground border-0"
              />
            </div>

            {isSearchMenuOpen && isBusy && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border p-4 z-50 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching organizations...
                </div>
              </div>
            )}
            
            {isSearchMenuOpen && !isBusy && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border p-2 z-50 max-h-[300px] overflow-y-auto">
                <div className="px-3 py-2 text-xs text-muted-foreground font-medium">
                  Recent Organizations ({searchSuggestions.length})
                </div>
                {searchSuggestions.map((org) => (
                  <button
                    key={org.id}
                    type="button"
                    onMouseDown={() => handleSearchSelect(org.name)}
                    className="w-full text-left px-4 py-3 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3D8C6C]/10 flex items-center justify-center mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#3D8C6C]"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {org.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {[org.city, org.country].filter(Boolean).join(", ") || "No location"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        <span className="inline-block px-1.5 py-0.5 bg-muted rounded">
                          {org.organizationType}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {isSearchMenuOpen && searchTerm && searchSuggestions.length === 0 && !isBusy && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border p-4 z-50 text-center text-sm text-muted-foreground">
                No organizations found matching &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {isOrganizationsError && !isBusy && !hasOrganizations && (
            <div className="col-span-full">
              <QueryErrorState
                error={organizationsError}
                onRetry={() => refetchOrganizations()}
                retryLabel="Retry"
              />
            </div>
          )}

          {isBusy && !hasOrganizations && <OrganizationGridSkeleton />}

          {!isBusy && !isOrganizationsError && !hasOrganizations && (
            <div className="col-span-full text-center text-muted-foreground">
              No organizations found.
            </div>
          )}

          {organizationList.map((org) => {
            const location =
              [org.address, org.city, org.country].filter(Boolean).join(", ") ||
              "—";

            return (
              <div
                key={org.id}
                className="bg-card rounded-3xl border border-border p-10 hover:border-[#3D8C6C] transition-shadow relative"
              >
                <div className="text-center mb-4">
                  <div className="flex w-full items-center justify-center">
                    <Image width={60} height={60} src={dashboardIcon} alt="img" />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-1">
                    {org.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">{location}</p>
                  <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    {org.organizationType}
                  </span>
                </div>
                <div className="relative">
                  <Button
                    onClick={() => handleOrganizationSelect(org)}
                    className="w-full bg-blue-100 hover:bg-[#3B73B5] text-[#3B73B5] hover:text-white cursor-pointer"
                  >
                    Select
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
