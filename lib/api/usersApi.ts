import { createApi } from "@reduxjs/toolkit/query/react";
import {
  UsersListResponse,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
  UserQuery,
  UsersStatsResponse,
  DeleteUserResponse,
} from "../types/users";
import { baseQuery } from "./baseConfig";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<UsersListResponse, UserQuery>({
      query: (params) => ({
        url: "/users/admin/user-management/users",
        params,
      }),
      providesTags: ["Users"],
    }),
    getUserById: builder.query<UserResponse, string>({
      query: (id) => `/users/admin/user-management/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation<UserResponse, CreateUserRequest>({
      query: (data) => ({
        url: "/users/admin/user-management/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<
      UserResponse,
      { id: string; data: UpdateUserRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/user-management/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        "Users",
      ],
    }),
    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/users/admin/user-management/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getUsersStats: builder.query<UsersStatsResponse, void>({
      query: () => "/users/admin/user-management/users/stats",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersStatsQuery,
} = usersApi;

