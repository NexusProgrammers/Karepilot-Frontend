import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorPath,
  MapEditorPathListResponse,
  MapEditorPathResponse,
  MapEditorPathQuery,
  CreateMapEditorPathRequest,
  UpdateMapEditorPathRequest,
} from "../types/map-management/mapEditorPath";
import { baseQuery } from "./baseConfig";

export const mapEditorPathApi = createApi({
  reducerPath: "mapEditorPathApi",
  baseQuery,
  tagTypes: ["MapEditorPath"],
  endpoints: (builder) => ({
    getPathsByFloorPlan: builder.query<MapEditorPath[], MapEditorPathQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/paths",
        params,
      }),
      transformResponse: (response: MapEditorPathListResponse) => response.data.paths,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPath", id: floorPlanId },
        "MapEditorPath",
      ],
    }),
    getPathById: builder.query<MapEditorPath, string>({
      query: (id) => `/users/admin/map-management/map-editor/paths/${id}`,
      transformResponse: (response: MapEditorPathResponse) => response.data.path,
      providesTags: (result, error, id) => [{ type: "MapEditorPath", id }],
    }),
    createPath: builder.mutation<MapEditorPath, CreateMapEditorPathRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/paths",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorPathResponse) => response.data.path,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPath", id: floorPlanId },
        "MapEditorPath",
      ],
    }),
    updatePath: builder.mutation<
      MapEditorPath,
      { id: string; data: UpdateMapEditorPathRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/paths/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorPathResponse) => response.data.path,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorPath", id },
        "MapEditorPath",
      ],
    }),
    deletePath: builder.mutation<void, { id: string; floorPlanId: string }>({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/paths/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPath", id: floorPlanId },
        "MapEditorPath",
      ],
    }),
  }),
});

export const {
  useGetPathsByFloorPlanQuery,
  useGetPathByIdQuery,
  useCreatePathMutation,
  useUpdatePathMutation,
  useDeletePathMutation,
} = mapEditorPathApi;

