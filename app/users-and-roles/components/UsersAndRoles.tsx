"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import SearchAndFilters from "@/components/common/SearchAndFilters";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import StatsGridSkeleton from "@/components/common/StatsGridSkeleton";
import NavigationTabs from "@/components/common/NavigationTabs";
import {
  statsData,
  tabs,
  filterOptions,
} from "@/lib/users-and-roles/data";
import { useGetAllUsersQuery, useGetUsersStatsQuery } from "@/lib/api/usersApi";
import { UsersAndRolesHeader } from "./UsersAndRolesHeader";
import { UsersList } from "./UsersList";
import { CreateUserModal } from "./CreateUserModal";
import { DepartmentModal } from "./DepartmentModal";

const usersFilterOptions = filterOptions.filter(
  (filter) => filter.label === "All Status"
);


export default function UsersAndRoles() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);

  const { data: usersData, isLoading, error } = useGetAllUsersQuery({
    search: searchQuery || undefined,
    isActive: isActiveFilter,
    page: 1,
    limit: 100,
  });

  const { data: statsDataResponse, isLoading: isLoadingStats } = useGetUsersStatsQuery();

  console.log(statsDataResponse, "statsDataResponse");

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
          searchPlaceholder="Search user..."
          filters={usersFilterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
          onFilterChange={(label, value) => {
            if (label === "All Status") {
              setIsActiveFilter(value === "active" ? true : value === "inactive" ? false : undefined);
            }
          }}
        />

        <div className="mt-6">
          <UsersList
            users={usersData?.data?.users || []}
            isLoading={isLoading}
            error={error}
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
