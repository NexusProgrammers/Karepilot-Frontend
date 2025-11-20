import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorLabel,
  MapEditorLabelListResponse,
  MapEditorLabelResponse,
  MapEditorLabelQuery,
  CreateMapEditorLabelRequest,
  UpdateMapEditorLabelRequest,
} from "../types/map-management/mapEditorLabel";
import { baseQuery } from "./baseConfig";

export const mapEditorLabelApi = createApi({
  reducerPath: "mapEditorLabelApi",
  baseQuery,
  tagTypes: ["MapEditorLabel"],
  endpoints: (builder) => ({
    getLabelsByFloorPlan: builder.query<MapEditorLabel[], MapEditorLabelQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/labels",
        params,
      }),
      transformResponse: (response: MapEditorLabelListResponse) => response.data.labels,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorLabel", id: floorPlanId },
        "MapEditorLabel",
      ],
    }),
    getLabelById: builder.query<MapEditorLabel, string>({
      query: (id) => `/users/admin/map-management/map-editor/labels/${id}`,
      transformResponse: (response: MapEditorLabelResponse) => response.data.label,
      providesTags: (result, error, id) => [{ type: "MapEditorLabel", id }],
    }),
    createLabel: builder.mutation<MapEditorLabel, CreateMapEditorLabelRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/labels",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorLabelResponse) => response.data.label,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorLabel", id: floorPlanId },
        "MapEditorLabel",
      ],
    }),
    updateLabel: builder.mutation<
      MapEditorLabel,
      { id: string; data: UpdateMapEditorLabelRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/labels/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorLabelResponse) => response.data.label,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorLabel", id },
        "MapEditorLabel",
      ],
    }),
    deleteLabel: builder.mutation<void, { id: string; floorPlanId: string }>({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/labels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorLabel", id: floorPlanId },
        "MapEditorLabel",
      ],
    }),
  }),
});

export const {
  useGetLabelsByFloorPlanQuery,
  useGetLabelByIdQuery,
  useCreateLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = mapEditorLabelApi;

