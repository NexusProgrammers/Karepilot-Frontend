import { createApi } from "@reduxjs/toolkit/query/react";
import {
  VenueTemplatesListResponse,
  VenueTemplateResponse,
  CreateVenueTemplateRequest,
  UpdateVenueTemplateRequest,
  VenueTemplateQuery,
} from "../types/organization/venueTemplates";
import { baseQuery } from "./baseConfig";

export const venueTemplatesApi = createApi({
  reducerPath: "venueTemplatesApi",
  baseQuery,
  tagTypes: ["VenueTemplates"],
  endpoints: (builder) => ({
    getAllVenueTemplates: builder.query<VenueTemplatesListResponse, VenueTemplateQuery>({
      query: (params) => ({
        url: "/users/admin/organization/venue-templates",
        params,
      }),
      providesTags: ["VenueTemplates"],
    }),
    getVenueTemplateById: builder.query<VenueTemplateResponse, string>({
      query: (id) => `/users/admin/organization/venue-templates/${id}`,
      providesTags: (result, error, id) => [{ type: "VenueTemplates", id }],
    }),
    createVenueTemplate: builder.mutation<
      VenueTemplateResponse,
      CreateVenueTemplateRequest
    >({
      query: (data) => ({
        url: "/users/admin/organization/venue-templates",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["VenueTemplates"],
    }),
    updateVenueTemplate: builder.mutation<
      VenueTemplateResponse,
      { id: string; data: UpdateVenueTemplateRequest }
    >({
      query: ({ id, data }) => ({
        url: `/users/admin/organization/venue-templates/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "VenueTemplates", id },
        "VenueTemplates",
      ],
    }),
    deleteVenueTemplate: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/users/admin/organization/venue-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["VenueTemplates"],
    }),
  }),
});

export const {
  useGetAllVenueTemplatesQuery,
  useGetVenueTemplateByIdQuery,
  useCreateVenueTemplateMutation,
  useUpdateVenueTemplateMutation,
  useDeleteVenueTemplateMutation,
} = venueTemplatesApi;

