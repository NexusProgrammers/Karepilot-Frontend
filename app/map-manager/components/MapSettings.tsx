"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { CustomSelect } from "@/components/common/CustomSelect";
import {
  useGetMapSettingsQuery,
  useUpdateMapSettingsMutation,
} from "@/lib/api/mapSettingsApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import toast from "react-hot-toast";

function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function MapSettings() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [autoPublish, setAutoPublish] = useState(false);
  const [highResThumbnails, setHighResThumbnails] = useState(false);
  const [versionControl, setVersionControl] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const lastSavedValues = useRef<{
    autoPublishUpdates: boolean;
    highResolutionThumbnails: boolean;
    enableVersionControl: boolean;
  } | null>(null);

  const { data: organizationsData } = useGetOrganizationsQuery();

  const {
    data: settingsData,
    isLoading,
    error,
    refetch,
  } = useGetMapSettingsQuery(
    { organizationId: selectedOrganizationId },
    {
      skip: !selectedOrganizationId,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateMapSettingsMutation();

  const organizations = organizationsData?.data?.organizations || [];
  const settings = settingsData?.data?.settings;

  useEffect(() => {
    setIsInitialized(false);
    lastSavedValues.current = null;
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (settings && !isInitialized) {
      setAutoPublish(settings.autoPublishUpdates);
      setHighResThumbnails(settings.highResolutionThumbnails);
      setVersionControl(settings.enableVersionControl);
      lastSavedValues.current = {
        autoPublishUpdates: settings.autoPublishUpdates,
        highResolutionThumbnails: settings.highResolutionThumbnails,
        enableVersionControl: settings.enableVersionControl,
      };
      setIsInitialized(true);
    }
  }, [settings, isInitialized]);

  const debouncedAutoPublish = useDebounce(autoPublish, 1000);
  const debouncedHighResThumbnails = useDebounce(highResThumbnails, 1000);
  const debouncedVersionControl = useDebounce(versionControl, 1000);

  const handleUpdateSettings = useCallback(
    async (updates: {
      autoPublishUpdates?: boolean;
      highResolutionThumbnails?: boolean;
      enableVersionControl?: boolean;
    }) => {
      if (!selectedOrganizationId || !lastSavedValues.current) return;

       try {
         const result = await updateSettings({
           organizationId: selectedOrganizationId,
           ...updates,
         }).unwrap();

         lastSavedValues.current = {
           autoPublishUpdates:
             updates.autoPublishUpdates ??
             lastSavedValues.current.autoPublishUpdates,
           highResolutionThumbnails:
             updates.highResolutionThumbnails ??
             lastSavedValues.current.highResolutionThumbnails,
           enableVersionControl:
             updates.enableVersionControl ??
             lastSavedValues.current.enableVersionControl,
         };
         toast.success(result.message || "Map settings updated successfully");
       } catch (error: any) {
         const errorMessage =
           error?.data?.message || error?.message || "Failed to update settings";
         toast.error(errorMessage);
       }
    },
    [selectedOrganizationId, updateSettings]
  );

  useEffect(() => {
    if (!selectedOrganizationId || !isInitialized || !lastSavedValues.current)
      return;

    const hasChanged =
      debouncedAutoPublish !== lastSavedValues.current.autoPublishUpdates ||
      debouncedHighResThumbnails !==
        lastSavedValues.current.highResolutionThumbnails ||
      debouncedVersionControl !== lastSavedValues.current.enableVersionControl;

    if (hasChanged) {
      handleUpdateSettings({
        autoPublishUpdates: debouncedAutoPublish,
        highResolutionThumbnails: debouncedHighResThumbnails,
        enableVersionControl: debouncedVersionControl,
      });
    }
  }, [
    debouncedAutoPublish,
    debouncedHighResThumbnails,
    debouncedVersionControl,
    selectedOrganizationId,
    isInitialized,
    handleUpdateSettings,
  ]);

  const handleAutoPublishChange = (checked: boolean) => {
    setAutoPublish(checked);
  };

  const handleHighResThumbnailsChange = (checked: boolean) => {
    setHighResThumbnails(checked);
  };

  const handleVersionControlChange = (checked: boolean) => {
    setVersionControl(checked);
  };

  if (error && selectedOrganizationId) {
    return (
      <div className="bg-card rounded-3xl border border-border p-6">
        <QueryErrorState
          error={error}
          title="Failed to load map settings"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          Map Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure map display and processing options
        </p>
      </div>

      <div className="space-y-6">
        <CustomSelect
          value={selectedOrganizationId}
          onChange={setSelectedOrganizationId}
          options={organizations.map((org) => ({
            name: org.name,
            value: org.id,
          }))}
          placeholder="Select organization"
          label="Organization"
          required
          disabled={isLoading || organizations.length === 0}
        />

        {selectedOrganizationId && (
          <>
            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                <div className="border-b border-border pb-6">
                  <div className="h-16 bg-muted rounded"></div>
                </div>
                <div className="border-b border-border pb-6">
                  <div className="h-16 bg-muted rounded"></div>
                </div>
                <div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-border pb-6">
                  <ToggleSwitch
                    checked={autoPublish}
                    onChange={handleAutoPublishChange}
                    label="Auto-publish updates"
                    description="Automatically publish maps after editing"
                  />
                </div>

                <div className="border-b border-border pb-6">
                  <ToggleSwitch
                    checked={highResThumbnails}
                    onChange={handleHighResThumbnailsChange}
                    label="High-res thumbnails"
                    description="Generate high-resolution preview images"
                  />
                </div>

                <div>
                  <ToggleSwitch
                    checked={versionControl}
                    onChange={handleVersionControlChange}
                    label="Version control"
                    description="Keep previous versions of maps"
                  />
                </div>
              </div>
            )}
          </>
        )}

        {!selectedOrganizationId && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">
              Please select an organization to view and manage settings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
