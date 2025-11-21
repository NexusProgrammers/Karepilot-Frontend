import { createApi } from "@reduxjs/toolkit/query/react";
import {
  FloorPlansListResponse,
  FloorPlanResponse,
  FloorPlanQuery,
  CreateFloorPlanRequest,
} from "../types/map-management/floorPlans";
import { baseQuery } from "./baseConfig";

export const floorPlansApi = createApi({
  reducerPath: "floorPlansApi",
  baseQuery,
  tagTypes: ["FloorPlans"],
  endpoints: (builder) => ({
    getAllFloorPlans: builder.query<FloorPlansListResponse, FloorPlanQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/floor-plans",
        params,
      }),
      providesTags: ["FloorPlans"],
    }),
    getFloorPlanById: builder.query<FloorPlanResponse, string>({
      query: (id) => `/users/admin/map-management/floor-plans/${id}`,
      providesTags: (result, error, id) => [{ type: "FloorPlans", id }],
    }),
    createFloorPlan: builder.mutation<FloorPlanResponse, CreateFloorPlanRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/floor-plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FloorPlans"],
    }),
    updateFloorPlan: builder.mutation<
      FloorPlanResponse,
      { id: string; data: CreateFloorPlanRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/floor-plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FloorPlans", id },
        "FloorPlans",
      ],
    }),
    updateFloorPlanStatus: builder.mutation<
      FloorPlanResponse,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/users/admin/map-management/floor-plans/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "FloorPlans", id },
        "FloorPlans",
      ],
    }),
  }),
});

export const {
  useGetAllFloorPlansQuery,
  useGetFloorPlanByIdQuery,
  useCreateFloorPlanMutation,
  useUpdateFloorPlanMutation,
  useUpdateFloorPlanStatusMutation,
} = floorPlansApi;

