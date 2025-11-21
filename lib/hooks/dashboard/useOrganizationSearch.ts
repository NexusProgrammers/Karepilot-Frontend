import { useState, useEffect, useMemo, useRef } from "react";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { Organization } from "@/lib/types/organization/organization";

export interface UseOrganizationSearchReturn {
  searchTerm: string;
  debouncedSearch: string;
  isSearchMenuOpen: boolean;
  searchContainerRef: React.RefObject<HTMLDivElement>;
  
  organizationList: Organization[];
  searchSuggestions: Organization[];
  isOrganizationsFetching: boolean;
  isOrganizationsLoading: boolean;
  isOrganizationsError: boolean;
  organizationsError: any;
  
  isBusy: boolean;
  hasOrganizations: boolean;
  
  setSearchTerm: (term: string) => void;
  setIsSearchMenuOpen: (isOpen: boolean) => void;
  refetchOrganizations: () => void;
  handleSearchSelect: (orgName: string) => void;
}

export const useOrganizationSearch = (): UseOrganizationSearchReturn => {
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

  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 1) {
      return [];
    }
    
    return organizationList.slice(0, 10);
  }, [searchTerm, organizationList]);

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

  const handleSearchSelect = (orgName: string) => {
    setSearchTerm(orgName);
    setIsSearchMenuOpen(false);
  };

  const isBusy = isOrganizationsLoading || isOrganizationsFetching;
  const hasOrganizations = organizationList.length > 0;

  return {
    searchTerm,
    debouncedSearch,
    isSearchMenuOpen,
    searchContainerRef: searchContainerRef as React.RefObject<HTMLDivElement>,
    
    organizationList,
    searchSuggestions,
    isOrganizationsFetching,
    isOrganizationsLoading,
    isOrganizationsError,
    organizationsError,
    
    isBusy,
    hasOrganizations,
    
    setSearchTerm,
    setIsSearchMenuOpen,
    refetchOrganizations,
    handleSearchSelect,
  };
};

