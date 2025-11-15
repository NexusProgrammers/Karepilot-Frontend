import { createApi } from "@reduxjs/toolkit/query/react";
import {
  FloorPlansListResponse,
  FloorPlanResponse,
  FloorPlanQuery,
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
  }),
});

export const {
  useGetAllFloorPlansQuery,
  useGetFloorPlanByIdQuery,
} = floorPlansApi;

