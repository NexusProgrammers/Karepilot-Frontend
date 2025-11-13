import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseConfig";
import {
  CreateMapManagerBuildingRequest,
  CreateMapManagerFloorRequest,
  MapLayerType,
  MapManagerBuilding,
  MapManagerBuildingQuery,
  MapManagerBuildingResponse,
  MapManagerBuildingsResponse,
  MapManagerBuildingStatsResponse,
  MapManagerFloor,
  MapManagerFloorQuery,
  MapManagerFloorResponse,
  MapManagerFloorsResponse,
  MapManagerFloorPlan,
  MapManagerFloorPlansResponse,
  MapManagerFloorPlanResponse,
  MapManagerFloorPlanQuery,
  MapManagerFloorPlanStatsResponse,
  CreateMapManagerFloorPlanRequest,
  UpdateMapManagerFloorPlanRequest,
  MapManagerSettings,
  MapManagerSettingsResponse,
  UpdateMapManagerBuildingRequest,
  UpdateMapManagerFloorRequest,
  UpdateMapManagerSettingsRequest,
} from "../types/map-manager";

const mapLayerDefaults: Record<MapLayerType, boolean> = {
  "floor-plan": true,
  poi: true,
  path: true,
  zone: true,
  label: true,
  entrance: true,
  elevator: true,
  "restricted-zone": false,
  tag: true,
  ruler: false,
  measurement: false,
  annotation: true,
  
  message: false,
  media: false,
};

const mapManagerBasePath = "/users/admin/map-manager";

const sanitizeQueryParams = (params: Record<string, unknown>) => {
  const query: Record<string, unknown> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    query[key] = value;
  });

  return query;
};

const normalizeBuilding = (building: any): MapManagerBuilding => ({
  id: building.id || building._id,
  organization: building.organization,
  name: building.name,
  code: building.code ?? "",
  description: building.description ?? "",
  tags: Array.isArray(building.tags) ? building.tags : [],
  address: building.address ?? undefined,
  geoLocation: building.geoLocation ?? undefined,
  metadata: building.metadata ?? undefined,
  floorCount: typeof building.floorCount === "number" ? building.floorCount : 0,
  defaultFloor: building.defaultFloor ?? null,
  isActive: building.isActive ?? true,
  createdAt: building.createdAt,
  updatedAt: building.updatedAt,
});

const normalizeFloor = (floor: any): MapManagerFloor => {
  const building = floor.building;

  return {
    id: floor.id || floor._id,
    organization: floor.organization,
    building:
      typeof building === "object" && building !== null
        ? {
            id: building.id || building._id,
            name: building.name,
            code: building.code,
          }
        : building,
    name: floor.name,
    code: floor.code ?? "",
    level: Number(floor.level),
    sequence: Number(floor.sequence),
    description: floor.description ?? "",
    isBasement: floor.isBasement ?? false,
    isDefault: floor.isDefault ?? false,
    tags: Array.isArray(floor.tags) ? floor.tags : [],
    attributes: floor.attributes ?? undefined,
    mapCount: floor.mapCount,
    publishedMapCount: floor.publishedMapCount,
    isActive: floor.isActive ?? true,
    createdAt: floor.createdAt,
    updatedAt: floor.updatedAt,
  };
};

const normalizeFloorPlan = (floorPlan: any): MapManagerFloorPlan => {
  const building = floorPlan.building;
  const floor = floorPlan.floor;

  return {
    id: floorPlan.id || floorPlan._id,
    organization: floorPlan.organization,
    building:
      typeof building === "object" && building !== null
        ? {
            id: building.id || building._id,
            name: building.name,
            code: building.code,
          }
        : {
            id: building,
            name: "",
          },
    floor:
      typeof floor === "object" && floor !== null
        ? {
            id: floor.id || floor._id,
            name: floor.name,
            code: floor.code,
            level: floor.level,
          }
        : {
            id: floor,
            name: "",
          },
    name: floorPlan.name,
    status: floorPlan.status,
    description: floorPlan.description ?? "",
    scale: floorPlan.scale ?? "",
    tags: Array.isArray(floorPlan.tags) ? floorPlan.tags : [],
    file: floorPlan.file
      ? {
          fileName: floorPlan.file.fileName,
          mimeType: floorPlan.file.mimeType,
          fileSizeInBytes: floorPlan.file.fileSizeInBytes,
          url: floorPlan.file.url,
        }
      : null,
    previewUrl: floorPlan.preview?.url ?? undefined,
    versionNumber: floorPlan.versionNumber ?? 1,
    lastPublishedAt: floorPlan.lastPublishedAt ?? undefined,
    createdAt: floorPlan.createdAt,
    updatedAt: floorPlan.updatedAt,
  };
};

const normalizeSettings = (settings: any): MapManagerSettings => ({
  organization: settings.organization,
  autoPublishUpdates: settings.autoPublishUpdates ?? false,
  highResThumbnails: settings.highResThumbnails ?? false,
  enableVersionControl: settings.enableVersionControl ?? false,
  defaultGridSize: settings.defaultGridSize ?? 20,
  defaultGridUnit: settings.defaultGridUnit ?? "px",
  defaultSnapToGrid: settings.defaultSnapToGrid ?? true,
  defaultShowGrid: settings.defaultShowGrid ?? true,
  defaultZoom: settings.defaultZoom ?? 100,
  defaultMapScale: settings.defaultMapScale ?? "",
  allowedFileTypes: Array.isArray(settings.allowedFileTypes)
    ? settings.allowedFileTypes
    : [],
  maxUploadSizeMb: settings.maxUploadSizeMb ?? 50,
  defaultLayerVisibility: {
    ...mapLayerDefaults,
    ...(settings.defaultLayerVisibility ?? {}),
  },
  notificationPreferences: settings.notificationPreferences ?? {
    publishSuccess: true,
    publishFailure: true,
    approvalRequired: true,
  },
  retentionPolicy: settings.retentionPolicy ?? {
    keepDraftVersions: 10,
    keepPublishedSnapshots: 5,
  },
  createdAt: settings.createdAt,
  updatedAt: settings.updatedAt,
});

export const mapManagerApi = createApi({
  reducerPath: "mapManagerApi",
  baseQuery,
  tagTypes: [
    "MapManagerBuildings",
    "MapManagerBuildingStats",
    "MapManagerFloors",
    "MapManagerSettings",
    "MapManagerFloorPlans",
    "MapManagerFloorPlanStats",
  ],
  endpoints: (builder) => ({
    getMapManagerBuildings: builder.query<
      MapManagerBuildingsResponse,
      MapManagerBuildingQuery | void
    >({
      query: (params) => ({
        url: `${mapManagerBasePath}/buildings`,
        params: sanitizeQueryParams(params as Record<string, unknown> ?? {}),
      }),
      providesTags: (result) =>
        result?.data?.buildings
          ? [
              ...result.data.buildings.map((building) => ({
                type: "MapManagerBuildings" as const,
                id: building.id,
              })),
              { type: "MapManagerBuildings" as const, id: "LIST" },
            ]
          : [{ type: "MapManagerBuildings" as const, id: "LIST" }],
      transformResponse: (response: MapManagerBuildingsResponse) => ({
        ...response,
        data: {
          ...response.data,
          buildings: response.data.buildings.map(normalizeBuilding),
        },
      }),
    }),
    getMapManagerBuildingById: builder.query<MapManagerBuildingResponse, string>({
      query: (id) => ({
        url: `${mapManagerBasePath}/buildings/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "MapManagerBuildings", id }],
      transformResponse: (response: MapManagerBuildingResponse) => ({
        ...response,
        data: {
          building: normalizeBuilding(response.data.building),
        },
      }),
    }),
    createMapManagerBuilding: builder.mutation<
      MapManagerBuildingResponse,
      CreateMapManagerBuildingRequest
    >({
      query: (data) => ({
        url: `${mapManagerBasePath}/buildings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerBuildingResponse) => ({
        ...response,
        data: {
          building: normalizeBuilding(response.data.building),
        },
      }),
    }),
    updateMapManagerBuilding: builder.mutation<
      MapManagerBuildingResponse,
      { id: string; data: UpdateMapManagerBuildingRequest }
    >({
      query: ({ id, data }) => ({
        url: `${mapManagerBasePath}/buildings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MapManagerBuildings", id },
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerBuildingResponse) => ({
        ...response,
        data: {
          building: normalizeBuilding(response.data.building),
        },
      }),
    }),
    deleteMapManagerBuilding: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `${mapManagerBasePath}/buildings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
    }),
    getMapManagerBuildingStats: builder.query<
      MapManagerBuildingStatsResponse,
      { organization?: string; isActive?: boolean; tag?: string } | void
    >({
      query: (params) => ({
        url: `${mapManagerBasePath}/buildings/stats`,
        params: sanitizeQueryParams(params ?? {}),
      }),
      providesTags: [{ type: "MapManagerBuildingStats", id: "STATS" }],
    }),
    getMapManagerFloors: builder.query<
      MapManagerFloorsResponse,
      MapManagerFloorQuery | void
    >({
      query: (params) => ({
        url: `${mapManagerBasePath}/floors`,
        params: sanitizeQueryParams(params as Record<string, unknown> ?? {}),
      }),
      providesTags: (result) =>
        result?.data?.floors
          ? [
              ...result.data.floors.map((floor) => ({
                type: "MapManagerFloors" as const,
                id: floor.id,
              })),
              { type: "MapManagerFloors" as const, id: "LIST" },
            ]
          : [{ type: "MapManagerFloors" as const, id: "LIST" }],
      transformResponse: (response: MapManagerFloorsResponse) => ({
        ...response,
        data: {
          ...response.data,
          floors: response.data.floors.map(normalizeFloor),
        },
      }),
    }),
    getMapManagerFloorById: builder.query<MapManagerFloorResponse, string>({
      query: (id) => ({
        url: `${mapManagerBasePath}/floors/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "MapManagerFloors", id }],
      transformResponse: (response: MapManagerFloorResponse) => ({
        ...response,
        data: {
          floor: normalizeFloor(response.data.floor),
        },
      }),
    }),
    createMapManagerFloor: builder.mutation<
      MapManagerFloorResponse,
      CreateMapManagerFloorRequest
    >({
      query: (data) => ({
        url: `${mapManagerBasePath}/floors`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "MapManagerFloors", id: "LIST" },
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerFloorResponse) => ({
        ...response,
        data: {
          floor: normalizeFloor(response.data.floor),
        },
      }),
    }),
    updateMapManagerFloor: builder.mutation<
      MapManagerFloorResponse,
      { id: string; data: UpdateMapManagerFloorRequest }
    >({
      query: ({ id, data }) => ({
        url: `${mapManagerBasePath}/floors/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MapManagerFloors", id },
        { type: "MapManagerFloors", id: "LIST" },
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerFloorResponse) => ({
        ...response,
        data: {
          floor: normalizeFloor(response.data.floor),
        },
      }),
    }),
    deleteMapManagerFloor: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `${mapManagerBasePath}/floors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "MapManagerFloors", id: "LIST" },
        { type: "MapManagerBuildings", id: "LIST" },
        { type: "MapManagerBuildingStats", id: "STATS" },
      ],
    }),
    getMapManagerFloorPlans: builder.query<
      MapManagerFloorPlansResponse,
      MapManagerFloorPlanQuery | void
    >({
      query: (params) => ({
        url: `${mapManagerBasePath}/floor-plans`,
        params: sanitizeQueryParams(params as Record<string, unknown> ?? {}),
      }),
      providesTags: (result) =>
        result?.data?.floorPlans
          ? [
              ...result.data.floorPlans.map((plan) => ({
                type: "MapManagerFloorPlans" as const,
                id: plan.id,
              })),
              { type: "MapManagerFloorPlans" as const, id: "LIST" },
            ]
          : [{ type: "MapManagerFloorPlans" as const, id: "LIST" }],
      transformResponse: (response: MapManagerFloorPlansResponse) => ({
        ...response,
        data: {
          ...response.data,
          floorPlans: response.data.floorPlans.map(normalizeFloorPlan),
        },
      }),
    }),
    getMapManagerFloorPlanById: builder.query<MapManagerFloorPlanResponse, string>({
      query: (id) => ({
        url: `${mapManagerBasePath}/floor-plans/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "MapManagerFloorPlans", id }],
      transformResponse: (response: MapManagerFloorPlanResponse) => ({
        ...response,
        data: {
          floorPlan: normalizeFloorPlan(response.data.floorPlan),
        },
      }),
    }),
    createMapManagerFloorPlan: builder.mutation<
      MapManagerFloorPlanResponse,
      CreateMapManagerFloorPlanRequest
    >({
      query: (data) => ({
        url: `${mapManagerBasePath}/floor-plans`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "MapManagerFloorPlans", id: "LIST" },
        { type: "MapManagerFloorPlanStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerFloorPlanResponse) => ({
        ...response,
        data: {
          floorPlan: normalizeFloorPlan(response.data.floorPlan),
        },
      }),
    }),
    updateMapManagerFloorPlan: builder.mutation<
      MapManagerFloorPlanResponse,
      { id: string; data: UpdateMapManagerFloorPlanRequest }
    >({
      query: ({ id, data }) => ({
        url: `${mapManagerBasePath}/floor-plans/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MapManagerFloorPlans", id },
        { type: "MapManagerFloorPlans", id: "LIST" },
        { type: "MapManagerFloorPlanStats", id: "STATS" },
      ],
      transformResponse: (response: MapManagerFloorPlanResponse) => ({
        ...response,
        data: {
          floorPlan: normalizeFloorPlan(response.data.floorPlan),
        },
      }),
    }),
    deleteMapManagerFloorPlan: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `${mapManagerBasePath}/floor-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "MapManagerFloorPlans", id: "LIST" },
        { type: "MapManagerFloorPlanStats", id: "STATS" },
      ],
    }),
    getMapManagerFloorPlanStats: builder.query<
      MapManagerFloorPlanStatsResponse,
      { organization?: string; building?: string; floor?: string } | void
    >({
      query: (params) => ({
        url: `${mapManagerBasePath}/floor-plans/stats`,
        params: sanitizeQueryParams(params ?? {}),
      }),
      providesTags: [{ type: "MapManagerFloorPlanStats", id: "STATS" }],
    }),
    getMapManagerSettings: builder.query<MapManagerSettingsResponse, string>({
      query: (organizationId) => ({
        url: `${mapManagerBasePath}/settings/${organizationId}`,
      }),
      providesTags: [{ type: "MapManagerSettings", id: "SETTINGS" }],
      transformResponse: (response: MapManagerSettingsResponse) => ({
        ...response,
        data: {
          settings: normalizeSettings(response.data.settings),
        },
      }),
    }),
    updateMapManagerSettings: builder.mutation<
      MapManagerSettingsResponse,
      UpdateMapManagerSettingsRequest
    >({
      query: (data) => ({
        url: `${mapManagerBasePath}/settings`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "MapManagerSettings", id: "SETTINGS" }],
      transformResponse: (response: MapManagerSettingsResponse) => ({
        ...response,
        data: {
          settings: normalizeSettings(response.data.settings),
        },
      }),
    }),
  }),
});

export const {
  useGetMapManagerBuildingsQuery,
  useGetMapManagerBuildingByIdQuery,
  useCreateMapManagerBuildingMutation,
  useUpdateMapManagerBuildingMutation,
  useDeleteMapManagerBuildingMutation,
  useGetMapManagerBuildingStatsQuery,
  useGetMapManagerFloorsQuery,
  useGetMapManagerFloorByIdQuery,
  useCreateMapManagerFloorMutation,
  useUpdateMapManagerFloorMutation,
  useDeleteMapManagerFloorMutation,
  useGetMapManagerFloorPlansQuery,
  useGetMapManagerFloorPlanByIdQuery,
  useCreateMapManagerFloorPlanMutation,
  useUpdateMapManagerFloorPlanMutation,
  useDeleteMapManagerFloorPlanMutation,
  useGetMapManagerFloorPlanStatsQuery,
  useGetMapManagerSettingsQuery,
  useUpdateMapManagerSettingsMutation,
} = mapManagerApi;


