import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { GeneralSettingsResponse, UpdateGeneralSettingsRequest, UpdatePreferencesRequest } from '../types';
import { tokenManager } from '../utils/tokenManager';

const API_BASE_URL = 'https://karepilot-backend.vercel.app/api/v1';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      // Try to get token from Redux state first
      const state = getState() as RootState;
      let token = state.auth.token;
      
      // If no token in state, try to get from cookies
      if (!token) {
        const cookieToken = tokenManager.getToken();
        token = cookieToken || null;
      }
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({
    getGeneralSettings: builder.query<GeneralSettingsResponse, void>({
      query: () => '/users/admin/settings/general',
      providesTags: ['Settings'],
    }),
    updateGeneralSettings: builder.mutation<GeneralSettingsResponse, UpdateGeneralSettingsRequest>({
      query: (data) => ({
        url: '/users/admin/settings/general',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
    updatePreferences: builder.mutation<GeneralSettingsResponse, UpdatePreferencesRequest>({
      query: (data) => ({
        url: '/users/admin/settings/general/preferences',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGetGeneralSettingsQuery, useUpdateGeneralSettingsMutation, useUpdatePreferencesMutation } = settingsApi;
