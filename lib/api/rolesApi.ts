import { createApi } from "@reduxjs/toolkit/query/react";
import {
  RolesListResponse,
  RoleResponse,
  UpdateRoleRequest,
  RoleQuery,
} from "../types/users-and-roles/roles";
import { baseQuery } from "./baseConfig";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery,
  tagTypes: ["Roles"],
  endpoints: (builder) => ({
    getAllRoles: builder.query<RolesListResponse, RoleQuery>({
      query: (params) => ({
        url: "/users/admin/user-management/roles-permissions",
        params,
      }),
      providesTags: ["Roles"],
    }),
    getRoleById: builder.query<RoleResponse, string>({
      query: (id) => `/users/admin/user-management/roles-permissions/${id}`,
      providesTags: (result, error, id) => [{ type: "Roles", id }],
    }),
    updateRole: builder.mutation<
      RoleResponse,
      { id: string; data: UpdateRoleRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/user-management/roles-permissions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Roles", id },
        "Roles",
      ],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} = rolesApi;

