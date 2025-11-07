"use client";

import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Organization } from "@/lib/types/organization";
import {
  useGetOrganizationsQuery,
  useUpdateOrganizationMutation,
  useDeleteOrganizationPermanentlyMutation,
} from "@/lib/api/organizationsApi";
import SearchAndFilter from "./SearchAndFilter";
import OrganizationCard from "./OrganizationCard";
import { DeleteConfirmationDialog } from "@/components/common/DeleteConfirmationDialog";
import { Button } from "@/components/ui/button";

type OrganizationsListProps = {
  onView: (organization: Organization) => void;
  onEdit: (organization: Organization) => void;
  onCreate?: () => void;
};

const FILTER_TO_TYPE: Record<string, string | undefined> = {
  all: undefined,
  hospital: "Hospital",
  airport: "Airport",
  mall: "Shopping Mall",
  open_place: "Open Place",
};

function useDebounce<T>(value: T, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function OrganizationsList({
  onView,
  onEdit,
  onCreate,
}: OrganizationsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    organization: Organization | null;
  }>({
    isOpen: false,
    organization: null,
  });

  const debouncedSearch = useDebounce(searchTerm);
  const limit = 10;

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: currentPage,
      limit,
    };

    const organizationType = FILTER_TO_TYPE[selectedFilter];
    if (organizationType) {
      params.organizationType = organizationType;
    }

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }

    return params;
  }, [currentPage, debouncedSearch, selectedFilter]);

  const {
    data,
    isLoading,
    isFetching,
  } = useGetOrganizationsQuery(queryParams);

  const [updateOrganization] = useUpdateOrganizationMutation();
  const [deleteOrganizationPermanently, { isLoading: isDeleting }] =
    useDeleteOrganizationPermanentlyMutation();

  const organizations = data?.data?.organizations ?? [];
  const pagination = data?.data?.pagination;
  const totalPages = pagination?.pages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setCurrentPage(1);
  };

  const handleToggleStatus = async (
    organization: Organization,
    nextStatus: boolean,
  ) => {
    setStatusUpdatingId(organization.id);
    try {
      await updateOrganization({
        id: organization.id,
        data: { isActive: nextStatus },
      }).unwrap();
      toast.success(
        `Organization ${nextStatus ? "activated" : "deactivated"} successfully`,
      );
    } catch (error: any) {
      console.error("Error updating organization status:", error);
      const errorMessage =
        error?.data?.message || error?.message || "Failed to update organization";
      toast.error(errorMessage);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialogState.organization) return;
    const organization = deleteDialogState.organization;
    setDeletingId(organization.id);
    try {
      await deleteOrganizationPermanently(organization.id).unwrap();
      toast.success("Organization deleted successfully");
      setDeleteDialogState({ isOpen: false, organization: null });
    } catch (error: any) {
      console.error("Error deactivating organization:", error);
      throw error;
    } finally {
      setDeletingId(null);
    }
  };

  const openDeleteDialog = (organization: Organization) => {
    setDeleteDialogState({ isOpen: true, organization });
  };

  const closeDeleteDialog = () => {
    setDeleteDialogState({ isOpen: false, organization: null });
  };

  const isListEmpty = !isLoading && organizations.length === 0;

  return (
    <>
      <SearchAndFilter
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        searchValue={searchTerm}
        isLoading={isFetching}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 animate-pulse space-y-4"
            >
              <div className="h-8 bg-muted rounded-md w-2/3" />
              <div className="h-4 bg-muted rounded-md w-1/2" />
              <div className="h-3 bg-muted rounded-md w-full" />
              <div className="h-3 bg-muted rounded-md w-5/6" />
              <div className="h-3 bg-muted rounded-md w-4/6" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
                onView={onView}
                onEdit={onEdit}
                onDelete={openDeleteDialog}
                onToggleStatus={handleToggleStatus}
                isStatusUpdating={statusUpdatingId === organization.id}
                isDeleting={deletingId === organization.id || isDeleting}
              />
            ))}
          </div>

          {isListEmpty && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-muted-foreground"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No organizations found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              {onCreate && (
                <Button
                  type="button"
                  onClick={onCreate}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90"
                >
                  Add Organization
                </Button>
              )}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-3 mt-8">
              <span className="text-sm text-muted-foreground">
                Page {pagination?.current ?? currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentPage === 1 || isFetching}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 text-sm"
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={currentPage === totalPages || isFetching}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages),
                    )
                  }
                  className="px-4 py-2 text-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <DeleteConfirmationDialog
        isOpen={deleteDialogState.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Organization"
        description="This will permanently remove the organization and its associations. This action cannot be undone."
        itemName={deleteDialogState.organization?.name}
        itemType="organization"
        isLoading={isDeleting || deletingId === deleteDialogState.organization?.id}
      />
    </>
  );
}