"use client";

import { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { X, Map as MapIcon, UploadCloud } from "@/icons/Icons";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import {
  useCreateMapManagerFloorPlanMutation,
  useUpdateMapManagerFloorPlanMutation,
  useGetMapManagerFloorsQuery,
} from "@/lib/api/mapManagerApi";
import {
  MapManagerBuilding,
  MapManagerFloor,
  MapManagerFloorPlan,
  FloorPlanStatus,
  CreateMapManagerFloorPlanRequest,
} from "@/lib/types/map-manager";
import {
  MapManagerFloorPlanFormValues,
  mapManagerFloorPlanSchema,
} from "@/lib/validations";

interface ManageFloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  buildings: MapManagerBuilding[];
  floorPlan?: MapManagerFloorPlan | null;
}

const statusOptions: { name: string; value: FloorPlanStatus }[] = [
  { name: "Draft", value: "Draft" },
  { name: "In Progress", value: "Building" },
  { name: "Published", value: "Published" },
  { name: "Archived", value: "Archived" },
  { name: "New", value: "New" },
];

const toInitialValues = (
  organizationId: string,
  buildings: MapManagerBuilding[],
  floorPlan?: MapManagerFloorPlan | null,
): MapManagerFloorPlanFormValues => {
  const defaultBuildingId = floorPlan?.building.id ?? buildings[0]?.id ?? "";
  const defaultFloorId = floorPlan?.floor.id ?? "";

  return {
    organization: organizationId,
    building: defaultBuildingId,
    floor: defaultFloorId,
    name: floorPlan?.name ?? "",
    status: floorPlan?.status ?? "Draft",
    description: floorPlan?.description ?? "",
    scale: floorPlan?.scale ?? "",
    tags: (floorPlan?.tags ?? []).join(", "),
    fileName: floorPlan?.file?.fileName ?? "",
    mimeType: floorPlan?.file?.mimeType ?? "",
    fileSizeInBytes: floorPlan?.file?.fileSizeInBytes ?? 0,
    fileUrl: floorPlan?.file?.url ?? "",
    previewUrl: floorPlan?.previewUrl ?? "",
  };
};

export default function ManageFloorPlanModal({
  isOpen,
  onClose,
  organizationId,
  buildings,
  floorPlan,
}: ManageFloorPlanModalProps) {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(
    floorPlan?.building.id ?? buildings[0]?.id ?? "",
  );

  useEffect(() => {
    if (floorPlan?.building.id) {
      setSelectedBuildingId(floorPlan.building.id);
    } else if (buildings[0]?.id) {
      setSelectedBuildingId(buildings[0].id);
    }
  }, [floorPlan, buildings]);

  const { data: floorsData, isFetching: isFetchingFloors } = useGetMapManagerFloorsQuery(
    {
      organization: organizationId,
      building: selectedBuildingId || undefined,
      limit: 100,
    },
    {
      skip: !organizationId || !selectedBuildingId,
    },
  );

  const floors: MapManagerFloor[] = useMemo(
    () => floorsData?.data?.floors ?? [],
    [floorsData?.data?.floors],
  );

  const [createFloorPlan, { isLoading: isCreating }] =
    useCreateMapManagerFloorPlanMutation();
  const [updateFloorPlan, { isLoading: isUpdating }] =
    useUpdateMapManagerFloorPlanMutation();

  const isEditMode = Boolean(floorPlan);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const buildingOptions = useMemo(
    () =>
      buildings.map((building) => {
        const label = building.code ? `${building.name} (${building.code})` : building.name;
        return {
          name: label,
          label,
          value: building.id,
        };
      }),
    [buildings],
  );

  const floorOptions = useMemo(
    () =>
      floors.map((floor) => {
        const label = floor.code ? `${floor.name} (${floor.code})` : floor.name;
        return {
          name: label,
          label,
          value: floor.id,
        };
      }),
    [floors],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3D8C6C]/10 flex items-center justify-center">
              <MapIcon className="w-5 h-5 text-[#3D8C6C]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {isEditMode ? "Edit Floor Plan" : "Upload Floor Plan"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isEditMode
                  ? "Update metadata, status, and preview details for this floor plan."
                  : "Upload a new floor plan and link it to a building and floor."}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Formik
          enableReinitialize
          initialValues={toInitialValues(organizationId, buildings, floorPlan)}
          validationSchema={mapManagerFloorPlanSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const tags = values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

              const payload: CreateMapManagerFloorPlanRequest = {
                organization: organizationId,
                building: values.building,
                floor: values.floor,
                name: values.name,
                status: values.status,
                description: values.description || undefined,
                scale: values.scale || undefined,
                tags,
                file:
                  values.fileName && values.mimeType
                    ? {
                        fileName: values.fileName,
                        mimeType: values.mimeType,
                        fileSizeInBytes: Number(values.fileSizeInBytes) || 0,
                        url: values.fileUrl || undefined,
                      }
                    : undefined,
                previewUrl: values.previewUrl || undefined,
              };

              if (isEditMode && floorPlan) {
                await updateFloorPlan({
                  id: floorPlan.id,
                  data: {
                    name: payload.name,
                    status: payload.status,
                    description: payload.description,
                    scale: payload.scale,
                    tags: payload.tags,
                    file:
                      payload.file ??
                      (values.fileName || values.mimeType ? undefined : null),
                    previewUrl:
                      values.previewUrl !== undefined && values.previewUrl.length === 0
                        ? null
                        : payload.previewUrl,
                  },
                }).unwrap();
                toast.success("Floor plan updated successfully");
              } else {
                await createFloorPlan(payload).unwrap();
                toast.success("Floor plan uploaded successfully");
              }

              onClose();
            } catch (error: any) {
              const message =
                error?.data?.message ||
                error?.message ||
                `Failed to ${isEditMode ? "update" : "create"} floor plan`;
              toast.error(message);
              console.error("Error saving floor plan:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="flex flex-col flex-1 overflow-y-auto">
              <div className="px-6 py-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Building"
                    placeholder="Select building"
                    options={buildingOptions}
                    value={values.building}
                    onChange={(value) => {
                      void setFieldValue("building", value);
                      setSelectedBuildingId(value);
                      void setFieldValue("floor", "");
                    }}
                    error={touched.building ? errors.building : undefined}
                  />
                  <CustomSelect
                    label="Floor"
                    placeholder={isFetchingFloors ? "Loading floors..." : "Select floor"}
                    options={floorOptions}
                    value={values.floor}
                    onChange={(value) => {
                      void setFieldValue("floor", value);
                    }}
                    disabled={isFetchingFloors || floorOptions.length === 0}
                    error={touched.floor ? errors.floor : undefined}
                  />
                </div>

                <CustomInput
                  name="name"
                  label="Floor plan name"
                  placeholder="e.g. Emergency Wing Layout"
                  value={values.name}
                  onChange={(value) => {
                    void setFieldValue("name", value);
                  }}
                  error={touched.name ? errors.name : undefined}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Status"
                    placeholder="Select status"
                    options={statusOptions}
                    value={values.status}
                    onChange={(value) => {
                      void setFieldValue("status", value as FloorPlanStatus);
                    }}
                    error={touched.status ? errors.status : undefined}
                  />
                  <CustomInput
                    name="scale"
                    label="Scale"
                    placeholder="e.g. 1:200"
                    value={values.scale}
                    onChange={(value) => {
                      void setFieldValue("scale", value);
                    }}
                    error={touched.scale ? errors.scale : undefined}
                  />
                </div>

                <CustomInput
                  name="description"
                  label="Description"
                  placeholder="Brief summary of this floor plan"
                  value={values.description}
                  onChange={(value) => {
                    void setFieldValue("description", value);
                  }}
                  error={touched.description ? errors.description : undefined}
                  as="textarea"
                  rows={3}
                />

                <CustomInput
                  name="tags"
                  label="Tags"
                  placeholder="Comma separated tags (e.g. emergency, triage)"
                  value={values.tags}
                  onChange={(value) => {
                    void setFieldValue("tags", value);
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomInput
                    name="fileName"
                    label="File name"
                    placeholder="floor-plan.pdf"
                    value={values.fileName}
                    onChange={(value) => {
                      void setFieldValue("fileName", value);
                    }}
                    error={touched.fileName ? errors.fileName : undefined}
                  />
                  <CustomInput
                    name="mimeType"
                    label="File type"
                    placeholder="application/pdf"
                    value={values.mimeType}
                    onChange={(value) => {
                      void setFieldValue("mimeType", value);
                    }}
                    error={touched.mimeType ? errors.mimeType : undefined}
                  />
                  <CustomInput
                    name="fileSizeInBytes"
                    label="File size (bytes)"
                    placeholder="2100000"
                    type="number"
                    value={values.fileSizeInBytes}
                    onChange={(value) => {
                      void setFieldValue("fileSizeInBytes", value ? Number(value) : 0);
                    }}
                    error={touched.fileSizeInBytes ? errors.fileSizeInBytes : undefined}
                  />
                  <CustomInput
                    name="fileUrl"
                    label="File URL"
                    placeholder="https://example.com/floor-plan.pdf"
                    value={values.fileUrl}
                    onChange={(value) => {
                      void setFieldValue("fileUrl", value);
                    }}
                    error={touched.fileUrl ? errors.fileUrl : undefined}
                  />
                </div>

                <CustomInput
                  name="previewUrl"
                  label="Preview image URL"
                  placeholder="https://example.com/preview.jpg"
                  value={values.previewUrl}
                  onChange={(value) => {
                    void setFieldValue("previewUrl", value);
                  }}
                  error={touched.previewUrl ? errors.previewUrl : undefined}
                />

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-xl px-4 py-3">
                  <UploadCloud className="w-5 h-5 text-[#3D8C6C]" />
                  <p>
                    Upload functionality is simulated with URLs for now. Integrate your
                    storage provider to enable direct uploads.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
                  disabled={isSubmitting || isCreating || isUpdating}
                >
                  {isEditMode ? "Save Changes" : "Create Floor Plan"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


