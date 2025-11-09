import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseConfig';
import { LoginRequest, LoginResponse } from '../types/authentication/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/admin/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation } = authApi;
