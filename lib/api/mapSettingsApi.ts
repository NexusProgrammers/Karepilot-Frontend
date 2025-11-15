import { createApi } from "@reduxjs/toolkit/query/react";
import {
  MapManagementSettingsResponse,
  UpdateMapManagementSettingsRequest,
  MapManagementSettingsQuery,
} from "../types/map-management/settings";
import { baseQuery } from "./baseConfig";

export const mapSettingsApi = createApi({
  reducerPath: "mapSettingsApi",
  baseQuery,
  tagTypes: ["MapSettings"],
  endpoints: (builder) => ({
    getMapSettings: builder.query<MapManagementSettingsResponse, MapManagementSettingsQuery>({
      query: (params) => ({
        url: "/users/admin/map-management/settings",
        params,
      }),
      providesTags: (result, error, { organizationId }) => [
        { type: "MapSettings", id: organizationId },
      ],
    }),
    updateMapSettings: builder.mutation<
      MapManagementSettingsResponse,
      UpdateMapManagementSettingsRequest
    >({
      query: (data) => ({
        url: "/users/admin/map-management/settings",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetMapSettingsQuery,
  useUpdateMapSettingsMutation,
} = mapSettingsApi;

