import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../api/authApi';
import { settingsApi } from '../api/settingsApi';
import { departmentsApi } from '../api/departmentsApi';
import { rolesApi } from '../api/rolesApi';
import { usersApi } from '../api/usersApi';
import { venueTemplatesApi } from '../api/venueTemplatesApi';
import { organizationsApi } from '../api/organizationsApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [venueTemplatesApi.reducerPath]: venueTemplatesApi.reducer,
    [organizationsApi.reducerPath]: organizationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      authApi.middleware,
      settingsApi.middleware,
      departmentsApi.middleware,
      rolesApi.middleware,
      usersApi.middleware,
      venueTemplatesApi.middleware,
      organizationsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
