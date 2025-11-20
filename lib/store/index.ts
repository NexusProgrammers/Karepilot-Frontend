import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../api/authApi';
import { settingsApi } from '../api/settingsApi';
import { departmentsApi } from '../api/departmentsApi';
import { rolesApi } from '../api/rolesApi';
import { usersApi } from '../api/usersApi';
import { venueTemplatesApi } from '../api/venueTemplatesApi';
import { organizationsApi } from '../api/organizationsApi';
import { pointsOfInterestApi } from '../api/pointsOfInterestApi';
import { floorPlansApi } from '../api/floorPlansApi';
import { mapSettingsApi } from '../api/mapSettingsApi';
import { buildingsApi } from '../api/buildingsApi';
import { mapEditorPOIApi } from '../api/mapEditorPOIApi';
import { mapEditorEntranceApi } from '../api/mapEditorEntranceApi';
import { mapEditorElevatorApi } from '../api/mapEditorElevatorApi';

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
    [pointsOfInterestApi.reducerPath]: pointsOfInterestApi.reducer,
    [floorPlansApi.reducerPath]: floorPlansApi.reducer,
    [mapSettingsApi.reducerPath]: mapSettingsApi.reducer,
    [buildingsApi.reducerPath]: buildingsApi.reducer,
    [mapEditorPOIApi.reducerPath]: mapEditorPOIApi.reducer,
    [mapEditorEntranceApi.reducerPath]: mapEditorEntranceApi.reducer,
    [mapEditorElevatorApi.reducerPath]: mapEditorElevatorApi.reducer,
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
      organizationsApi.middleware,
      pointsOfInterestApi.middleware,
      floorPlansApi.middleware,
      mapSettingsApi.middleware,
      buildingsApi.middleware,
      mapEditorPOIApi.middleware,
      mapEditorEntranceApi.middleware,
      mapEditorElevatorApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
