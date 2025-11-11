"use strict";

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseConfig";
import {
  PointOfInterestResponse,
  PointsOfInterestListResponse,
  PointsOfInterestQuery,
  CreatePointOfInterestRequest,
  UpdatePointOfInterestRequest,
} from "../types/points-of-interest/api";

export const pointsOfInterestApi = createApi({
  reducerPath: "pointsOfInterestApi",
  baseQuery,
  tagTypes: ["PointsOfInterest"],
  endpoints: (builder) => ({
    getPointsOfInterest: builder.query<
      PointsOfInterestListResponse,
      PointsOfInterestQuery | void
    >({
      query: (params) => ({
        url: "/users/admin/points-of-interest",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result?.data?.pointsOfInterest
          ? [
              ...result.data.pointsOfInterest.map((poi) => ({
                type: "PointsOfInterest" as const,
                id: poi.id,
              })),
              "PointsOfInterest",
            ]
          : ["PointsOfInterest"],
    }),
    getPointOfInterestById: builder.query<PointOfInterestResponse, string>({
      query: (id) => `/users/admin/points-of-interest/${id}`,
      providesTags: (result, error, id) => [{ type: "PointsOfInterest", id }],
    }),
    createPointOfInterest: builder.mutation<
      PointOfInterestResponse,
      CreatePointOfInterestRequest
    >({
      query: (data) => ({
        url: "/users/admin/points-of-interest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PointsOfInterest"],
    }),
    updatePointOfInterest: builder.mutation<
      PointOfInterestResponse,
      { id: string; data: UpdatePointOfInterestRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/points-of-interest/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PointsOfInterest", id },
        "PointsOfInterest",
      ],
    }),
  }),
});

export const {
  useGetPointsOfInterestQuery,
  useGetPointOfInterestByIdQuery,
  useCreatePointOfInterestMutation,
  useUpdatePointOfInterestMutation,
} = pointsOfInterestApi;

