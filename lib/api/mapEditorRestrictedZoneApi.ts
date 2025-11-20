import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorRestrictedZone,
  MapEditorRestrictedZoneListResponse,
  MapEditorRestrictedZoneResponse,
  MapEditorRestrictedZoneQuery,
  CreateMapEditorRestrictedZoneRequest,
  UpdateMapEditorRestrictedZoneRequest,
} from "../types/map-management/mapEditorRestrictedZone";
import { baseQuery } from "./baseConfig";

export const mapEditorRestrictedZoneApi = createApi({
  reducerPath: "mapEditorRestrictedZoneApi",
  baseQuery,
  tagTypes: ["MapEditorRestrictedZone"],
  endpoints: (builder) => ({
    getRestrictedZonesByFloorPlan: builder.query<
      MapEditorRestrictedZone[],
      MapEditorRestrictedZoneQuery
    >({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/restricted-zones",
        params,
      }),
      transformResponse: (response: MapEditorRestrictedZoneListResponse) =>
        response.data.restrictedZones,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorRestrictedZone", id: floorPlanId },
        "MapEditorRestrictedZone",
      ],
    }),
    getRestrictedZoneById: builder.query<MapEditorRestrictedZone, string>({
      query: (id) => `/users/admin/map-management/map-editor/restricted-zones/${id}`,
      transformResponse: (response: MapEditorRestrictedZoneResponse) =>
        response.data.restrictedZone,
      providesTags: (result, error, id) => [{ type: "MapEditorRestrictedZone", id }],
    }),
    createRestrictedZone: builder.mutation<
      MapEditorRestrictedZone,
      CreateMapEditorRestrictedZoneRequest
    >({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/restricted-zones",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorRestrictedZoneResponse) =>
        response.data.restrictedZone,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorRestrictedZone", id: floorPlanId },
        "MapEditorRestrictedZone",
      ],
    }),
    updateRestrictedZone: builder.mutation<
      MapEditorRestrictedZone,
      { id: string; data: UpdateMapEditorRestrictedZoneRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/restricted-zones/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorRestrictedZoneResponse) =>
        response.data.restrictedZone,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorRestrictedZone", id },
        "MapEditorRestrictedZone",
      ],
    }),
    deleteRestrictedZone: builder.mutation<
      void,
      { id: string; floorPlanId: string }
    >({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/restricted-zones/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorRestrictedZone", id: floorPlanId },
        "MapEditorRestrictedZone",
      ],
    }),
  }),
});

export const {
  useGetRestrictedZonesByFloorPlanQuery,
  useGetRestrictedZoneByIdQuery,
  useCreateRestrictedZoneMutation,
  useUpdateRestrictedZoneMutation,
  useDeleteRestrictedZoneMutation,
} = mapEditorRestrictedZoneApi;

