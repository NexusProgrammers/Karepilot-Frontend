import { createApi } from "@reduxjs/toolkit/query/react";
import {
  DepartmentsListResponse,
  DepartmentResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
  DepartmentQuery,
} from "../types/organization/departments";
import { baseQuery } from "./baseConfig";

export const departmentsApi = createApi({
  reducerPath: "departmentsApi",
  baseQuery,
  tagTypes: ["Departments"],
  endpoints: (builder) => ({
    getAllDepartments: builder.query<DepartmentsListResponse, DepartmentQuery>({
      query: (params) => ({
        url: "/users/admin/user-management/departments",
        params,
      }),
      providesTags: ["Departments"],
    }),
    getDepartmentById: builder.query<DepartmentResponse, string>({
      query: (id) => `/users/admin/user-management/departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Departments", id }],
    }),
    createDepartment: builder.mutation<
      DepartmentResponse,
      CreateDepartmentRequest
    >({
      query: (data) => ({
        url: "/users/admin/user-management/departments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation<
      DepartmentResponse,
      { id: string; data: UpdateDepartmentRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/user-management/departments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Departments", id },
        "Departments",
      ],
    }),
    deleteDepartment: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/users/admin/user-management/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments"],
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;

