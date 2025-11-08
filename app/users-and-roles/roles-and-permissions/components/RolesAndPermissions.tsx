"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import SearchAndFilters from "@/components/common/SearchAndFilters";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import NavigationTabs from "@/components/common/NavigationTabs";
import {
  filterOptions,
  statsData,
  tabs,
} from "@/lib/users-and-roles/data";
import { CreateUserModal, DepartmentModal, RolesList, UsersAndRolesHeader } from "../../components";
import { useGetAllRolesQuery } from "@/lib/api/rolesApi";
import { useGetUsersStatsQuery } from "@/lib/api/usersApi";

const rolesFilterOptions = filterOptions.filter(
  (filter) => filter.label === "All Roles"
);


export default function RolesAndPermissions() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);

  const getRoleFilterValue = (value: string | undefined): string | undefined => {
    if (!value || value === "all") return undefined;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const {
    data: rolesData,
    isLoading,
    error,
    refetch: refetchRoles,
  } = useGetAllRolesQuery({
    search: searchQuery || undefined,
    role: getRoleFilterValue(roleFilter),
    isActive: true,
  });
  const { data: statsDataResponse, isLoading: isLoadingStats } = useGetUsersStatsQuery();

  const calculatedStatsData = [
    {
      ...statsData[0],
      value: statsDataResponse?.data?.totalUsers || 0,
    },
    {
      ...statsData[1],
      value: statsDataResponse?.data?.activeUsers || 0,
    },
    {
      ...statsData[2],
      value: statsDataResponse?.data?.totalDepartments || 0,
    },
    {
      ...statsData[3],
      value: statsDataResponse?.data?.onlineNow || 0,
    },
  ];

  return (
    <DashboardLayout
      showBackButton={true}
      backLink="/"
      pageTitle="Users & Roles"
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
    >
      <div className="space-y-6">
        <UsersAndRolesHeader
          onCreateUserClick={() => setIsCreateUserModalOpen(true)}
          onCreateDepartmentClick={() => setIsCreateDepartmentModalOpen(true)}
          showUserButton={false}
          showDepartmentButton={false}
        />

        {isLoadingStats ? (
          <StatsGridSkeleton />
        ) : (
          <StatsGridWithIcons stats={calculatedStatsData} />
        )}

        <NavigationTabs
          tabs={tabs}
          className="max-w-[400px]"
          responsive={true}
        />

        <SearchAndFilters
          searchPlaceholder="Search roles..."
          filters={rolesFilterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
          onFilterChange={(label, value) => {
            if (label === "All Roles") {
              setRoleFilter(value === "all" ? undefined : value);
            }
          }}
        />

        <div className="mt-6">
          <RolesList
            roles={rolesData?.data || []}
            isLoading={isLoading}
            error={error}
            onRetry={refetchRoles}
          />
        </div>

        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
        />

        <DepartmentModal
          isOpen={isCreateDepartmentModalOpen}
          onClose={() => setIsCreateDepartmentModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
