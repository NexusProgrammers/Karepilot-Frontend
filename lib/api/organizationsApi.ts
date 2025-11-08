import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateOrganizationRequest,
  DeleteOrganizationResponse,
  OrganizationQuery,
  OrganizationResponse,
  OrganizationsListResponse,
  UpdateOrganizationRequest,
} from "../types/organization/organization";
import { OrganizationOverviewResponse } from "../types/organization/overview";
import { baseQuery } from "./baseConfig";

export const organizationsApi = createApi({
  reducerPath: "organizationsApi",
  baseQuery,
  tagTypes: ["Organizations"],
  endpoints: (builder) => ({
    getOrganizations: builder.query<OrganizationsListResponse, OrganizationQuery | void>({
      query: (params) => ({
        url: "/users/admin/organization",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.organizations
          ? [
              ...result.data.organizations.map((organization) => ({
                type: "Organizations" as const,
                id: organization.id,
              })),
              "Organizations",
            ]
          : ["Organizations"],
    }),
    getOrganizationById: builder.query<OrganizationResponse, string>({
      query: (id) => `/users/admin/organization/${id}`,
      providesTags: (result, error, id) => [{ type: "Organizations", id }],
    }),
    createOrganization: builder.mutation<
      OrganizationResponse,
      CreateOrganizationRequest
    >({
      query: (data) => ({
        url: "/users/admin/organization",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Organizations"],
    }),
    updateOrganization: builder.mutation<
      OrganizationResponse,
      { id: string; data: UpdateOrganizationRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/organization/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Organizations", id },
        "Organizations",
      ],
    }),
    deleteOrganization: builder.mutation<DeleteOrganizationResponse, string>({
      query: (id) => ({
        url: `/users/admin/organization/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organizations"],
    }),
    deleteOrganizationPermanently: builder.mutation<DeleteOrganizationResponse, string>({
      query: (id) => ({
        url: `/users/admin/organization/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: ["Organizations"],
    }),
    getOrganizationsOverview: builder.query<OrganizationOverviewResponse, void>({
      query: () => ({
        url: "/users/admin/organization/overview",
      }),
      providesTags: ["Organizations"],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetOrganizationByIdQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  useDeleteOrganizationPermanentlyMutation,
  useGetOrganizationsOverviewQuery,
} = organizationsApi;


