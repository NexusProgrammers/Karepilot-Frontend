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
import {
  UsersAndRolesHeader,
  DepartmentsList,
  CreateUserModal,
  DepartmentModal,
} from "../../components";
import {
  useGetAllDepartmentsQuery,
  useDeleteDepartmentMutation,
} from "@/lib/api/departmentsApi";
import { useGetUsersStatsQuery } from "@/lib/api/usersApi";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import toast from "react-hot-toast";

const departmentsFilterOptions = filterOptions.filter(
  (filter) => filter.label === "All Departments"
);

export default function Departments() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState<string | null>(null);
  const [deleteDepartmentName, setDeleteDepartmentName] = useState<string>("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [deleteDepartment, { isLoading: isDeletingDepartment }] = useDeleteDepartmentMutation();

  const getDepartmentFilterValue = (value: string | undefined): string | undefined => {
    if (!value || value === "all") return undefined;
    const nameMap: Record<string, string> = {
      icu: "ICU",
      emergency: "Emergency",
      pharmacy: "Pharmacy",
      security: "Security",
      administration: "Administration",
      maintenance: "Maintenance",
    };
    return nameMap[value.toLowerCase()] || value;
  };

  const {
    data: departmentsData,
    isLoading,
    error,
    refetch: refetchDepartments,
  } = useGetAllDepartmentsQuery({
    search: searchQuery || undefined,
    name: getDepartmentFilterValue(departmentFilter),
    page: 1,
    limit: 100,
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
          searchPlaceholder="Search departments..."
          filters={departmentsFilterOptions}
          onSearchChange={(query) => setSearchQuery(query)}
          onFilterChange={(label, value) => {
            if (label === "All Departments") {
              setDepartmentFilter(value === "all" ? undefined : value);
            }
          }}
        />

        <div className="mt-6">
          <DepartmentsList
            departments={departmentsData?.data?.departments || []}
            isLoading={isLoading}
            error={error}
            onRetry={refetchDepartments}
            onEdit={(departmentId) => {
              setSelectedDepartmentId(departmentId);
              setIsEditModalOpen(true);
            }}
            onDelete={(departmentId, departmentName) => {
              setDeleteDepartmentId(departmentId);
              setDeleteDepartmentName(departmentName);
              setIsDeleteDialogOpen(true);
            }}
          />
        </div>

        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
        />

        <DepartmentModal
          isOpen={isCreateDepartmentModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateDepartmentModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedDepartmentId(null);
          }}
          departmentId={selectedDepartmentId}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteDepartmentId(null);
            setDeleteDepartmentName("");
          }}
          onConfirm={async () => {
            if (!deleteDepartmentId) return;
            await deleteDepartment(deleteDepartmentId).unwrap();
            toast.success("Department deleted successfully");
          }}
          title="Delete Department"
          description="Are you sure you want to delete this department? This action cannot be undone."
          itemName={deleteDepartmentName}
          itemType="department"
          isLoading={isDeletingDepartment}
        />
      </div>
    </DashboardLayout>
  );
}
