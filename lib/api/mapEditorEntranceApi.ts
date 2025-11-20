import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorEntrance,
  MapEditorEntranceListResponse,
  MapEditorEntranceResponse,
  MapEditorEntranceQuery,
  CreateMapEditorEntranceRequest,
  UpdateMapEditorEntranceRequest,
} from "../types/map-management/mapEditorEntrance";
import { baseQuery } from "./baseConfig";

export const mapEditorEntranceApi = createApi({
  reducerPath: "mapEditorEntranceApi",
  baseQuery,
  tagTypes: ["MapEditorEntrance"],
  endpoints: (builder) => ({
    getEntrancesByFloorPlan: builder.query<MapEditorEntrance[], MapEditorEntranceQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/entrances",
        params,
      }),
      transformResponse: (response: MapEditorEntranceListResponse) => response.data.entrances,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorEntrance", id: floorPlanId },
        "MapEditorEntrance",
      ],
    }),
    getEntranceById: builder.query<MapEditorEntrance, string>({
      query: (id) => `/users/admin/map-management/map-editor/entrances/${id}`,
      transformResponse: (response: MapEditorEntranceResponse) => response.data.entrance,
      providesTags: (result, error, id) => [{ type: "MapEditorEntrance", id }],
    }),
    createEntrance: builder.mutation<MapEditorEntrance, CreateMapEditorEntranceRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/entrances",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorEntranceResponse) => response.data.entrance,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorEntrance", id: floorPlanId },
        "MapEditorEntrance",
      ],
    }),
    updateEntrance: builder.mutation<
      MapEditorEntrance,
      { id: string; data: UpdateMapEditorEntranceRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/entrances/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorEntranceResponse) => response.data.entrance,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorEntrance", id },
        "MapEditorEntrance",
      ],
    }),
    deleteEntrance: builder.mutation<void, { id: string; floorPlanId: string }>({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/entrances/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorEntrance", id: floorPlanId },
        "MapEditorEntrance",
      ],
    }),
  }),
});

export const {
  useGetEntrancesByFloorPlanQuery,
  useGetEntranceByIdQuery,
  useCreateEntranceMutation,
  useUpdateEntranceMutation,
  useDeleteEntranceMutation,
} = mapEditorEntranceApi;

