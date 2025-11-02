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
import {
  UsersAndRolesHeader,
  DepartmentsList,
  CreateUserModal,
  DepartmentModal,
} from "../../components";
import {
  useGetAllDepartmentsQuery,
} from "@/lib/api/departmentsApi";

export default function Departments() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);

  const { data: departmentsData, isLoading, error } = useGetAllDepartmentsQuery({
    search: searchQuery || undefined,
    isActive: isActiveFilter,
    page: 1,
    limit: 100,
  });

  const calculatedStatsData = [
    {
      ...statsData[0],
      value: departmentsData?.data?.pagination?.total || 0,
    },
    {
      ...statsData[1],
      value: departmentsData?.data?.departments?.filter((d) => d.isActive).length || 0,
    },
    {
      ...statsData[2],
      value: departmentsData?.data?.pagination?.total || 0,
    },
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
          searchPlaceholder="Search departments..."
          filters={filterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
          onFilterChange={(label, value) => {
            if (label === "All Status") {
              setIsActiveFilter(value === "active" ? true : value === "inactive" ? false : undefined);
            }
          }}
        />

        <div className="mt-6">
          <DepartmentsList
            departments={departmentsData?.data?.departments || []}
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
