import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MapEditorPreferences, UpdateMapEditorPreferencesRequest } from "../types/map-management/mapEditorPreferences";
import { TOKEN_KEY } from "../utils/tokenManager";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === "production" 
    ? "https://karepilot-backend.vercel.app/api/v1"
    : "http://localhost:4000/api/v1");

const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const mapEditorPreferencesApi = createApi({
  reducerPath: "mapEditorPreferencesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/users/admin/map-management/map-editor/preferences`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      if (typeof window !== 'undefined') {
        const token = getCookie(TOKEN_KEY);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["MapEditorPreferences"],
  endpoints: (builder) => ({
    getMapEditorPreferences: builder.query<MapEditorPreferences, void>({
      query: () => "/",
      transformResponse: (response: any) => response.data,
      providesTags: ["MapEditorPreferences"],
    }),
    updateMapEditorPreferences: builder.mutation<MapEditorPreferences, UpdateMapEditorPreferencesRequest>({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["MapEditorPreferences"],
    }),
    resetMapEditorPreferences: builder.mutation<MapEditorPreferences, void>({
      query: () => ({
        url: "/reset",
        method: "POST",
      }),
      transformResponse: (response: any) => response.data,
      invalidatesTags: ["MapEditorPreferences"],
    }),
  }),
});

export const {
  useGetMapEditorPreferencesQuery,
  useUpdateMapEditorPreferencesMutation,
  useResetMapEditorPreferencesMutation,
} = mapEditorPreferencesApi;
