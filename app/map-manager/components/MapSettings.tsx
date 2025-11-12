'use client';

import { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import { CustomInput } from "@/components/common/CustomInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetMapManagerSettingsQuery,
  useUpdateMapManagerSettingsMutation,
} from "@/lib/api/mapManagerApi";
import {
  MapLayerType,
  MapManagerSettings,
} from "@/lib/types/map-manager";
import {
  MapManagerSettingsFormValues,
  mapManagerSettingsSchema,
} from "@/lib/validations";

interface MapSettingsProps {
  organizationId?: string;
}

const MAP_LAYER_OPTIONS: { label: string; value: MapLayerType }[] = [
  { label: "Floor Plan", value: "floor-plan" },
  { label: "Points of Interest", value: "poi" },
  { label: "Paths", value: "path" },
  { label: "Zones", value: "zone" },
  { label: "Labels", value: "label" },
  { label: "Entrances", value: "entrance" },
  { label: "Elevators", value: "elevator" },
  { label: "Restricted Zones", value: "restricted-zone" },
  { label: "Tags", value: "tag" },
  { label: "Ruler", value: "ruler" },
  { label: "Measurements", value: "measurement" },
  { label: "Annotations", value: "annotation" },
  { label: "Messages", value: "message" },
  { label: "Media", value: "media" },
];

const getInitialValues = (
  organizationId: string,
  settings?: MapManagerSettings,
): MapManagerSettingsFormValues => {
  const defaultVisibility: Record<MapLayerType, boolean> = MAP_LAYER_OPTIONS.reduce(
    (acc, item) => {
      acc[item.value] = settings?.defaultLayerVisibility?.[item.value] ?? false;
      return acc;
    },
    {} as Record<MapLayerType, boolean>,
  );

  return {
    organization: organizationId,
    autoPublishUpdates: settings?.autoPublishUpdates ?? false,
    highResThumbnails: settings?.highResThumbnails ?? true,
    enableVersionControl: settings?.enableVersionControl ?? true,
    defaultGridSize: settings?.defaultGridSize ?? 20,
    defaultGridUnit: settings?.defaultGridUnit ?? "px",
    defaultSnapToGrid: settings?.defaultSnapToGrid ?? true,
    defaultShowGrid: settings?.defaultShowGrid ?? true,
    defaultZoom: settings?.defaultZoom ?? 100,
    defaultMapScale: settings?.defaultMapScale ?? "",
    allowedFileTypes: (settings?.allowedFileTypes ?? []).join(", "),
    maxUploadSizeMb: settings?.maxUploadSizeMb ?? 50,
    defaultLayerVisibility: defaultVisibility,
    notificationPublishSuccess:
      settings?.notificationPreferences?.publishSuccess ?? true,
    notificationPublishFailure:
      settings?.notificationPreferences?.publishFailure ?? true,
    notificationApprovalRequired:
      settings?.notificationPreferences?.approvalRequired ?? true,
    retentionDraftVersions: settings?.retentionPolicy?.keepDraftVersions ?? 10,
    retentionPublishedSnapshots:
      settings?.retentionPolicy?.keepPublishedSnapshots ?? 5,
  };
};

const SettingsSkeleton = () => (
  <div className="bg-card rounded-3xl border border-border p-6 animate-pulse space-y-6">
    <div className="space-y-2">
      <div className="h-6 w-40 bg-muted rounded" />
      <div className="h-4 w-80 bg-muted rounded" />
    </div>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-12 bg-muted rounded" />
    ))}
  </div>
);

export default function MapSettings({ organizationId }: MapSettingsProps) {
  const isOrganizationReady = Boolean(organizationId);

  const {
    data: settingsData,
    isFetching,
    isLoading,
    refetch,
  } = useGetMapManagerSettingsQuery(organizationId!, {
    skip: !isOrganizationReady,
  });

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateMapManagerSettingsMutation();

  const settings = settingsData?.data?.settings;

  const initialValues = useMemo(
    () =>
      isOrganizationReady
        ? getInitialValues(organizationId!, settings)
        : undefined,
    [organizationId, settings, isOrganizationReady],
  );

  if (!isOrganizationReady) {
    return (
      <div className="bg-card rounded-3xl border border-border p-6 text-center">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          Select an organization
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose an organization to configure map manager settings.
        </p>
      </div>
    );
  }

  if (isLoading || isFetching || !initialValues) {
    return <SettingsSkeleton />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mapManagerSettingsSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const allowedFileTypes = values.allowedFileTypes
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

          await updateSettings({
            organization: values.organization,
            autoPublishUpdates: values.autoPublishUpdates,
            highResThumbnails: values.highResThumbnails,
            enableVersionControl: values.enableVersionControl,
            defaultGridSize: values.defaultGridSize,
            defaultGridUnit: values.defaultGridUnit,
            defaultSnapToGrid: values.defaultSnapToGrid,
            defaultShowGrid: values.defaultShowGrid,
            defaultZoom: values.defaultZoom,
            defaultMapScale: values.defaultMapScale || null,
            allowedFileTypes,
            maxUploadSizeMb: values.maxUploadSizeMb,
            defaultLayerVisibility: values.defaultLayerVisibility,
            notificationPreferences: {
              publishSuccess: values.notificationPublishSuccess,
              publishFailure: values.notificationPublishFailure,
              approvalRequired: values.notificationApprovalRequired,
            },
            retentionPolicy: {
              keepDraftVersions: values.retentionDraftVersions,
              keepPublishedSnapshots: values.retentionPublishedSnapshots,
            },
          }).unwrap();

          toast.success("Map settings updated successfully");
          refetch();
        } catch (error: any) {
          const message =
            error?.data?.message || error?.message || "Failed to update settings";
          toast.error(message);
          console.error("Error updating map settings:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="bg-card rounded-3xl border border-border p-6 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground mb-2">
              Map Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure map display, processing, and publishing options for your
              organization.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Processing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToggleSwitch
                checked={values.autoPublishUpdates}
                onChange={(value) => setFieldValue("autoPublishUpdates", value)}
                label="Auto-publish updates"
                description="Automatically publish maps immediately after changes are saved."
              />
              <ToggleSwitch
                checked={values.highResThumbnails}
                onChange={(value) =>
                  setFieldValue("highResThumbnails", value)
                }
                label="High-resolution thumbnails"
                description="Generate high quality thumbnails for previews and listings."
              />
              <ToggleSwitch
                checked={values.enableVersionControl}
                onChange={(value) =>
                  setFieldValue("enableVersionControl", value)
                }
                label="Version control"
                description="Keep previous versions of each floor plan."
              />
              <ToggleSwitch
                checked={values.defaultSnapToGrid}
                onChange={(value) => setFieldValue("defaultSnapToGrid", value)}
                label="Snap to grid"
                description="Align map elements to the grid by default."
              />
              <ToggleSwitch
                checked={values.defaultShowGrid}
                onChange={(value) => setFieldValue("defaultShowGrid", value)}
                label="Show grid"
                description="Display the design grid by default in the editor."
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Design Defaults
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="defaultGridSize">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={String(field.value)}
                    onChange={(value) =>
                      setFieldValue("defaultGridSize", Number(value))
                    }
                    placeholder="e.g. 20"
                    label="Grid size"
                    type="number"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="defaultGridUnit">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={field.value}
                    onChange={(value) => setFieldValue("defaultGridUnit", value)}
                    placeholder="px, ft, m"
                    label="Grid unit"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="defaultZoom">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={String(field.value)}
                    onChange={(value) =>
                      setFieldValue("defaultZoom", Number(value))
                    }
                    placeholder="e.g. 150"
                    label="Default zoom (%)"
                    type="number"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="defaultMapScale">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={field.value}
                    onChange={(value) =>
                      setFieldValue("defaultMapScale", value)
                    }
                    placeholder="e.g. 1:150"
                    label="Map scale"
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Upload settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="allowedFileTypes">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={field.value}
                    onChange={(value) =>
                      setFieldValue("allowedFileTypes", value)
                    }
                    placeholder="e.g. pdf, png, svg"
                    label="Allowed file types"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
              <Field name="maxUploadSizeMb">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={String(field.value)}
                    onChange={(value) =>
                      setFieldValue("maxUploadSizeMb", Number(value))
                    }
                    placeholder="e.g. 100"
                    label="Max upload size (MB)"
                    type="number"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Layer visibility
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MAP_LAYER_OPTIONS.map((layer) => (
                <ToggleSwitch
                  key={layer.value}
                  checked={values.defaultLayerVisibility[layer.value]}
                  onChange={(value) =>
                    setFieldValue(`defaultLayerVisibility.${layer.value}`, value)
                  }
                  label={layer.label}
                  description={`Show ${layer.label.toLowerCase()} layer by default`}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Notifications & Retention
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ToggleSwitch
                checked={values.notificationPublishSuccess}
                onChange={(value) =>
                  setFieldValue("notificationPublishSuccess", value)
                }
                label="Notify publish success"
                description="Send a notification when a floor plan is published successfully."
              />
              <ToggleSwitch
                checked={values.notificationPublishFailure}
                onChange={(value) =>
                  setFieldValue("notificationPublishFailure", value)
                }
                label="Notify publish failure"
                description="Alert when publishing fails due to validation or processing issues."
              />
              <ToggleSwitch
                checked={values.notificationApprovalRequired}
                onChange={(value) =>
                  setFieldValue("notificationApprovalRequired", value)
                }
                label="Require approval"
                description="Require manual approval before a map is published."
              />

              <Field name="retentionDraftVersions">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={String(field.value)}
                    onChange={(value) =>
                      setFieldValue("retentionDraftVersions", Number(value))
                    }
                    placeholder="e.g. 10"
                    label="Draft versions to keep"
                    type="number"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>

              <Field name="retentionPublishedSnapshots">
                {({ field, meta }: any) => (
                  <CustomInput
                    value={String(field.value)}
                    onChange={(value) =>
                      setFieldValue("retentionPublishedSnapshots", Number(value))
                    }
                    placeholder="e.g. 5"
                    label="Published snapshots to keep"
                    type="number"
                    required
                    error={meta.error}
                    touched={meta.touched}
                  />
                )}
              </Field>
            </div>
          </section>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
              disabled={isSubmitting || isUpdating}
            >
              {(isSubmitting || isUpdating) && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save Settings
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
