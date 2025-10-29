import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { tokenManager } from '../utils/tokenManager';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://karepilot-backend.vercel.app/api/v1';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    const state = getState() as RootState;
    let token = state.auth.token;
    
    if (!token) {
      const cookieToken = tokenManager.getToken();
      token = cookieToken || null;
    }
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

