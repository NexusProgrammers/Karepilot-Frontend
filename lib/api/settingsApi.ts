import { createApi } from '@reduxjs/toolkit/query/react';
import { GeneralSettingsResponse, UpdateGeneralSettingsRequest, UpdatePreferencesRequest, UpdateProfileSettingsRequest } from '../types';
import { baseQuery } from './baseConfig';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery,
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
    updateProfileSettings: builder.mutation<GeneralSettingsResponse, UpdateProfileSettingsRequest>({
      query: (data) => ({
        url: '/users/admin/settings/general/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { 
  useGetGeneralSettingsQuery, 
  useUpdateGeneralSettingsMutation, 
  useUpdatePreferencesMutation,
  useUpdateProfileSettingsMutation 
} = settingsApi;
