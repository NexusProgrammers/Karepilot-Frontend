import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorElevator,
  MapEditorElevatorListResponse,
  MapEditorElevatorResponse,
  MapEditorElevatorQuery,
  CreateMapEditorElevatorRequest,
  UpdateMapEditorElevatorRequest,
} from "../types/map-management/mapEditorElevator";
import { baseQuery } from "./baseConfig";

export const mapEditorElevatorApi = createApi({
  reducerPath: "mapEditorElevatorApi",
  baseQuery,
  tagTypes: ["MapEditorElevator"],
  endpoints: (builder) => ({
    getElevatorsByFloorPlan: builder.query<
      MapEditorElevator[],
      MapEditorElevatorQuery
    >({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/elevators",
        params,
      }),
      transformResponse: (response: MapEditorElevatorListResponse) =>
        response.data.elevators,
      providesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorElevator", id: floorPlanId },
        "MapEditorElevator",
      ],
    }),
    getElevatorById: builder.query<MapEditorElevator, string>({
      query: (id) => `/users/admin/map-management/map-editor/elevators/${id}`,
      transformResponse: (response: MapEditorElevatorResponse) =>
        response.data.elevator,
      providesTags: (result, error, id) => [{ type: "MapEditorElevator", id }],
    }),
    createElevator: builder.mutation<
      MapEditorElevator,
      CreateMapEditorElevatorRequest
    >({
      query: (data) => ({
        url: "/users/admin/map-management/map-editor/elevators",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: MapEditorElevatorResponse) =>
        response.data.elevator,
      invalidatesTags: (result, error, { floorPlanId }) => [
        { type: "MapEditorElevator", id: floorPlanId },
        "MapEditorElevator",
      ],
    }),
    updateElevator: builder.mutation<
      MapEditorElevator,
      { id: string; data: UpdateMapEditorElevatorRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/map-management/map-editor/elevators/${id}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: MapEditorElevatorResponse) =>
        response.data.elevator,
      invalidatesTags: (result, error, { id }) => [
        { type: "MapEditorElevator", id },
        "MapEditorElevator",
      ],
    }),
    deleteElevator: builder.mutation<void, { id: string; floorPlanId: string }>(
      {
        query: ({ id }) => ({
          url: `/users/admin/map-management/map-editor/elevators/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { floorPlanId }) => [
          { type: "MapEditorElevator", id: floorPlanId },
          "MapEditorElevator",
        ],
      }
    ),
  }),
});

export const {
  useGetElevatorsByFloorPlanQuery,
  useGetElevatorByIdQuery,
  useCreateElevatorMutation,
  useUpdateElevatorMutation,
  useDeleteElevatorMutation,
} = mapEditorElevatorApi;
