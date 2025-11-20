import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorMeasurement,
  MapEditorMeasurementListResponse,
  MapEditorMeasurementResponse,
  MapEditorMeasurementQuery,
  CreateMapEditorMeasurementRequest,
  UpdateMapEditorMeasurementRequest,
} from "../types/map-management/mapEditorMeasurement";
import { baseQuery } from "./baseConfig";

export const mapEditorMeasurementApi = createApi({
  reducerPath: "mapEditorMeasurementApi",
  baseQuery,
  tagTypes: ["MapEditorMeasurement"],
  endpoints: (builder) => ({
    getMeasurementsByFloorPlan: builder.query<MapEditorMeasurement[], MapEditorMeasurementQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/measurements",
        params,
      }),
      transformResponse: (response: MapEditorMeasurementListResponse) => response.data.measurements,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorMeasurement", id: floorPlanId },
        "MapEditorMeasurement",
      ],
    }),
    getMeasurementById: builder.query<MapEditorMeasurement, string>({
      query: (id) => `/users/admin/map-management/map-editor/measurements/${id}`,
      transformResponse: (response: MapEditorMeasurementResponse) => response.data.measurement,
      providesTags: (result, error, id) => [{ type: "MapEditorMeasurement", id }],
    }),
    createMeasurement: builder.mutation<MapEditorMeasurement, CreateMapEditorMeasurementRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/measurements",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorMeasurementResponse) => response.data.measurement,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorMeasurement", id: floorPlanId },
        "MapEditorMeasurement",
      ],
    }),
    updateMeasurement: builder.mutation<
      MapEditorMeasurement,
      { id: string; data: UpdateMapEditorMeasurementRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/measurements/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorMeasurementResponse) => response.data.measurement,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorMeasurement", id },
        "MapEditorMeasurement",
      ],
    }),
    deleteMeasurement: builder.mutation<void, { id: string; floorPlanId: string }>({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/measurements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorMeasurement", id: floorPlanId },
        "MapEditorMeasurement",
      ],
    }),
  }),
});

export const {
  useGetMeasurementsByFloorPlanQuery,
  useGetMeasurementByIdQuery,
  useCreateMeasurementMutation,
  useUpdateMeasurementMutation,
  useDeleteMeasurementMutation,
} = mapEditorMeasurementApi;

