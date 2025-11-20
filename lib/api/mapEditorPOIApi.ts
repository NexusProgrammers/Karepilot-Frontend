import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorPOI,
  MapEditorPOIListResponse,
  MapEditorPOIResponse,
  MapEditorPOIQuery,
  CreateMapEditorPOIRequest,
  UpdateMapEditorPOIRequest,
} from "../types/map-management/mapEditorPOI";
import { baseQuery } from "./baseConfig";

export const mapEditorPOIApi = createApi({
  reducerPath: "mapEditorPOIApi",
  baseQuery,
  tagTypes: ["MapEditorPOI"],
  endpoints: (builder) => ({
    getPOIsByFloorPlan: builder.query<MapEditorPOI[], MapEditorPOIQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/pois",
        params,
      }),
      transformResponse: (response: MapEditorPOIListResponse) => response.data.pois,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPOI", id: floorPlanId },
        "MapEditorPOI",
      ],
    }),
    getPOIById: builder.query<MapEditorPOI, string>({
      query: (id) => `/users/admin/map-management/map-editor/pois/${id}`,
      transformResponse: (response: MapEditorPOIResponse) => response.data.poi,
      providesTags: (result, error, id) => [{ type: "MapEditorPOI", id }],
    }),
    createPOI: builder.mutation<MapEditorPOI, CreateMapEditorPOIRequest>({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/pois",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorPOIResponse) => response.data.poi,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPOI", id: floorPlanId },
        "MapEditorPOI",
      ],
    }),
    updatePOI: builder.mutation<
      MapEditorPOI,
      { id: string; data: UpdateMapEditorPOIRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/pois/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorPOIResponse) => response.data.poi,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorPOI", id },
        "MapEditorPOI",
      ],
    }),
    deletePOI: builder.mutation<void, { id: string; floorPlanId: string }>({
      query: ({ id }) => ({
        url: `/users/admin/map-management/map-editor/pois/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorPOI", id: floorPlanId },
        "MapEditorPOI",
      ],
    }),
  }),
});

export const {
  useGetPOIsByFloorPlanQuery,
  useGetPOIByIdQuery,
  useCreatePOIMutation,
  useUpdatePOIMutation,
  useDeletePOIMutation,
} = mapEditorPOIApi;

