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
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { useDeleteUserMutation } from "@/lib/api/usersApi";
import toast from "react-hot-toast";

const usersFilterOptions = filterOptions.filter(
  (filter) => filter.label === "All Status"
);


export default function UsersAndRoles() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteUserName, setDeleteUserName] = useState<string>("");
  
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const {
    data: usersData,
    isLoading,
    error,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({
    search: searchQuery || undefined,
    isActive: isActiveFilter,
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
          onCreateUserClick={() => {
            setSelectedUserId(null);
            setModalMode("create");
            setIsCreateUserModalOpen(true);
          }}
          onCreateDepartmentClick={() => setIsCreateDepartmentModalOpen(true)}
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
            onRetry={refetchUsers}
            onView={(userId) => {
              setSelectedUserId(userId);
              setModalMode("view");
              setIsCreateUserModalOpen(true);
            }}
            onEdit={(userId) => {
              setSelectedUserId(userId);
              setModalMode("edit");
              setIsCreateUserModalOpen(true);
            }}
            onDelete={(userId, userName) => {
              setDeleteUserId(userId);
              setDeleteUserName(userName);
              setIsDeleteDialogOpen(true);
            }}
          />
        </div>

        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => {
            setIsCreateUserModalOpen(false);
            setSelectedUserId(null);
            setModalMode("create");
          }}
          userId={selectedUserId}
          mode={modalMode}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setDeleteUserId(null);
            setDeleteUserName("");
          }}
          onConfirm={async () => {
            if (!deleteUserId) return;
            await deleteUser(deleteUserId).unwrap();
            toast.success("User deleted successfully");
          }}
          title="Delete User"
          description="Are you sure you want to delete this user? This action cannot be undone."
          itemName={deleteUserName}
          itemType="user"
          isLoading={isDeletingUser}
        />

        <DepartmentModal
          isOpen={isCreateDepartmentModalOpen}
          onClose={() => setIsCreateDepartmentModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
