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
    updateBuilding: builder.mutation<
      MapBuildingResponse,
      { id: string; data: Partial<CreateMapBuildingRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/buildings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Buildings", id },
        "Buildings",
      ],
    }),
    deleteBuilding: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/users/admin/map-management/buildings/${id}/permanent`,
        method: "DELETE",
      }),
      invalidatesTags: ["Buildings"],
    }),
    archiveBuilding: builder.mutation<
      MapBuildingResponse,
      string
    >({
      query: (id) => ({
        url: `/users/admin/map-management/buildings/${id}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Buildings", id },
        "Buildings",
      ],
    }),
  }),
});

export const {
  useGetAllBuildingsQuery,
  useGetBuildingByIdQuery,
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
  useDeleteBuildingMutation,
  useArchiveBuildingMutation,
} = buildingsApi;

