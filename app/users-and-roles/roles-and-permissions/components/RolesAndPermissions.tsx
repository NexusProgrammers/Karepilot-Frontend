"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import SearchAndFilters from "@/components/common/SearchAndFilters";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import NavigationTabs from "@/components/common/NavigationTabs";
import {
  filterOptions,
  statsData,
  tabs,
} from "@/lib/users-and-roles/data";
import { CreateUserModal, DepartmentModal, RolesList, UsersAndRolesHeader } from "../../components";
import { useGetAllRolesQuery } from "@/lib/api/rolesApi";


export default function RolesAndPermissions() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: rolesData, isLoading, error } = useGetAllRolesQuery();

  // Filter roles based on search query
  const filteredRoles = rolesData?.data?.filter((role) =>
    role.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Calculate stats from API data
  const calculatedStatsData = [
    {
      ...statsData[0],
      value: rolesData?.data?.length || 0,
    },
    {
      ...statsData[1],
      value: rolesData?.data?.filter((r) => r.isActive).length || 0,
    },
    statsData[2],
    statsData[3],
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

        <StatsGridWithIcons stats={calculatedStatsData} />

        <NavigationTabs
          tabs={tabs}
          className="max-w-[400px]"
          responsive={true}
        />

        <SearchAndFilters
          searchPlaceholder="Search roles..."
          filters={filterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
        />

        <div className="mt-6">
          <RolesList
            roles={filteredRoles}
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
