"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { menuOptions } from "@/lib/dashboard/data";
import { dashboardIcon } from "@/icons/Assets";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { Organization } from "@/lib/types/organization/organization";
import { OrganizationGridSkeleton } from "./OrganizationGridSkeleton";

export function OrganizationSelection() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const queryParams = debouncedSearch ? { search: debouncedSearch } : undefined;
  const {
    data: organizationsData,
    isFetching: isOrganizationsFetching,
    isLoading: isOrganizationsLoading,
    isError: isOrganizationsError,
    error: organizationsError,
    refetch: refetchOrganizations,
  } = useGetOrganizationsQuery(queryParams);

  const organizationList = useMemo(
    () => organizationsData?.data?.organizations ?? [],
    [organizationsData]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMenuOptions = useMemo(() => {
    if (!searchTerm) {
      return menuOptions;
    }

    return menuOptions.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleOrganizationSelect = (org: Organization) => {
    if (org?.id) {
      router.push(`/dashboard/${org.id}`);
    }
  };

  const isBusy = isOrganizationsLoading || isOrganizationsFetching;
  const hasOrganizations = organizationList.length > 0;

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
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search organizations"
                onFocus={() => setIsSearchMenuOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D8C6C] placeholder:text-foreground border-0"
              />
            </div>

            {isSearchMenuOpen && filteredMenuOptions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border p-2 z-50">
                {filteredMenuOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onMouseDown={() => {
                      setSearchTerm(option);
                      setIsSearchMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
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
