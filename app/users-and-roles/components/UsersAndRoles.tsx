"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import SearchAndFilters from "@/components/common/SearchAndFilters";
import StatsGridWithIcons from "@/components/common/StatsGridWithIcons";
import NavigationTabs from "@/components/common/NavigationTabs";
import {
  statsData,
  tabs,
  filterOptions,
} from "@/lib/users-and-roles/data";
import { useGetAllUsersQuery } from "@/lib/api/usersApi";
import { UsersAndRolesHeader } from "./UsersAndRolesHeader";
import { UsersList } from "./UsersList";
import { CreateUserModal } from "./CreateUserModal";
import { DepartmentModal } from "./DepartmentModal";


export default function UsersAndRoles() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [departmentFilter, setDepartmentFilter] = useState<string | undefined>(undefined);
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);

  const { data: usersData, isLoading, error } = useGetAllUsersQuery({
    search: searchQuery || undefined,
    role: roleFilter,
    department: departmentFilter,
    isActive: isActiveFilter,
    page: 1,
    limit: 100,
  });

  const calculatedStatsData = [
    {
      ...statsData[0],
      value: usersData?.data?.pagination?.total || 0,
    },
    {
      ...statsData[1],
      value: usersData?.data?.users?.filter((u) => u.isActive).length || 0,
    },
    statsData[2],
    {
      ...statsData[3],
      value: usersData?.data?.users?.filter((u) => u.lastActive !== "Never").length || 0,
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

        <StatsGridWithIcons stats={calculatedStatsData} />

        <NavigationTabs
          tabs={tabs}
          className="max-w-[400px]"
          responsive={true}
        />

        <SearchAndFilters
          searchPlaceholder="Search user..."
          filters={filterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
          onFilterChange={(label, value) => {
            if (label === "All Roles") {
              setRoleFilter(value === "all" ? undefined : value);
            } else if (label === "All Departments") {
              setDepartmentFilter(value === "all" ? undefined : value);
            } else if (label === "All Status") {
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
