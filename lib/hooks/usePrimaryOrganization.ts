import { useGetOrganizationsQuery } from "../api/organizationsApi";

export const usePrimaryOrganization = () => {
  const { data, isLoading, isFetching, error, refetch } =
    useGetOrganizationsQuery({
      page: 1,
      limit: 50,
    });

  const organizations = data?.data?.organizations ?? [];
  const organization = organizations[0];

  return {
    organizationId: organization?.id,
    organizationName: organization?.name ?? "",
    organizations,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
};


