import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapBuildingListResponse,
  MapBuildingResponse,
  MapBuildingQuery,
  CreateMapBuildingRequest,
} from "../types/map-management/buildings";
import { baseQuery } from "./baseConfig";

export const buildingsApi = createApi({
  reducerPath: "buildingsApi",
  baseQuery,
  tagTypes: ["Buildings"],
  endpoints: (builder) => ({
    getAllBuildings: builder.query<MapBuildingListResponse, MapBuildingQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/buildings",
        params,
      }),
      providesTags: ["Buildings"],
    }),
    getBuildingById: builder.query<MapBuildingResponse, string>({
      query: (id) => `/users/admin/map-management/buildings/${id}`,
      providesTags: (result, error, id) => [{ type: "Buildings", id }],
    }),
    createBuilding: builder.mutation<MapBuildingResponse, CreateMapBuildingRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/buildings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Buildings"],
    }),
  }),
});

export const {
  useGetAllBuildingsQuery,
  useGetBuildingByIdQuery,
  useCreateBuildingMutation,
} = buildingsApi;

