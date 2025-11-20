import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapEditorAnnotation,
  CreateMapEditorAnnotationRequest,
  UpdateMapEditorAnnotationRequest,
  MapEditorAnnotationQuery,
  MapEditorAnnotationResponse,
  MapEditorAnnotationListResponse,
} from "../types/map-management/mapEditorAnnotation";
import { baseQuery } from "./baseConfig";

export const mapEditorAnnotationApi = createApi({
  reducerPath: "mapEditorAnnotationApi",
  baseQuery,
  tagTypes: ["Annotation"],
  endpoints: (builder) => ({
    getAnnotationsByFloorPlan: builder.query<
      MapEditorAnnotation[],
      MapEditorAnnotationQuery
    >({
      query: (params) => ({
        url: "/users/admin/map-management/map-editor/annotations",
        params,
      }),
      transformResponse: (response: MapEditorAnnotationListResponse) =>
        response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Annotation" as const,
                id,
              })),
              { type: "Annotation", id: "LIST" },
            ]
          : [{ type: "Annotation", id: "LIST" }],
    }),
    getAnnotationById: builder.query<MapEditorAnnotation, string>({
      query: (id) => `/users/admin/map-management/map-editor/annotations/${id}`,
      transformResponse: (response: MapEditorAnnotationResponse) =>
        response.data,
      providesTags: (result, error, id) => [{ type: "Annotation", id }],
    }),
    createAnnotation: builder.mutation<
      MapEditorAnnotation,
      CreateMapEditorAnnotationRequest
    >({
      query: (body) => ({
        url: "/users/admin/map-management/map-editor/annotations",
        method: "POST",
        body,
      }),
      transformResponse: (response: MapEditorAnnotationResponse) =>
        response.data,
      invalidatesTags: [{ type: "Annotation", id: "LIST" }],
    }),
    updateAnnotation: builder.mutation<
      MapEditorAnnotation,
      { id: string; body: UpdateMapEditorAnnotationRequest }
    >({
      query: ({ id, body }) => ({
        url: `/users/admin/map-management/map-editor/annotations/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: MapEditorAnnotationResponse) =>
        response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: "Annotation", id },
        { type: "Annotation", id: "LIST" },
      ],
    }),
    deleteAnnotation: builder.mutation<MapEditorAnnotation, string>({
      query: (id) => ({
        url: `/users/admin/map-management/map-editor/annotations/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: MapEditorAnnotationResponse) =>
        response.data,
      invalidatesTags: (result, error, id) => [
        { type: "Annotation", id },
        { type: "Annotation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAnnotationsByFloorPlanQuery,
  useGetAnnotationByIdQuery,
  useCreateAnnotationMutation,
  useUpdateAnnotationMutation,
  useDeleteAnnotationMutation,
} = mapEditorAnnotationApi;

