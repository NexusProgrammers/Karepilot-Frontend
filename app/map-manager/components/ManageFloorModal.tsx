"use client";

import { Formik, Form, Field } from "formik";
import { Button } from "@/components/ui/button";
import { X, Grid3x3 } from "@/icons/Icons";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import toast from "react-hot-toast";
import {
  useCreateMapManagerFloorMutation,
  useUpdateMapManagerFloorMutation,
} from "@/lib/api/mapManagerApi";
import {
  MapManagerBuilding,
  MapManagerFloor,
} from "@/lib/types/map-manager";
import {
  MapManagerFloorFormValues,
  mapManagerFloorSchema,
} from "@/lib/validations";

interface ManageFloorModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  buildings: MapManagerBuilding[];
  floor?: MapManagerFloor | null;
  initialBuildingId?: string;
}

const getInitialValues = (
  organizationId: string,
  buildings: MapManagerBuilding[],
  floor?: MapManagerFloor | null,
  initialBuildingId?: string,
): MapManagerFloorFormValues => {
  const defaultBuildingId =
    typeof floor?.building === "object" && floor.building !== null
      ? floor.building.id
      : typeof floor?.building === "string"
      ? floor.building
      : initialBuildingId
      ? initialBuildingId
      : buildings[0]?.id ?? "";

  return {
    organization: organizationId,
    building: defaultBuildingId,
    name: floor?.name ?? "",
    code: floor?.code ?? "",
    level: floor?.level ?? 0,
    sequence: floor?.sequence ?? 0,
    description: floor?.description ?? "",
    isBasement: floor?.isBasement ?? false,
    isDefault: floor?.isDefault ?? false,
    tags: (floor?.tags ?? []).join(", "),
    isActive: floor?.isActive ?? true,
  };
};

export default function ManageFloorModal({
  isOpen,
  onClose,
  organizationId,
  buildings,
  floor,
  initialBuildingId,
}: ManageFloorModalProps) {
  const [createFloor, { isLoading: isCreating }] =
    useCreateMapManagerFloorMutation();
  const [updateFloor, { isLoading: isUpdating }] =
    useUpdateMapManagerFloorMutation();

  if (!isOpen) {
    return null;
  }

  const buildingOptions = buildings.map((building) => ({
    name: building.code ? `${building.name} (${building.code})` : building.name,
    value: building.id,
  }));

  const initialValues = getInitialValues(
    organizationId,
    buildings,
    floor,
    initialBuildingId,
  );
  const isEditMode = Boolean(floor);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (buildingOptions.length === 0) {
    return (
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 text-center space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            No buildings available
          </h3>
          <p className="text-sm text-muted-foreground">
            Create a building before adding floors.
          </p>
          <Button onClick={onClose} className="cursor-pointer">
            Close
          </Button>
        </div>
      </div>
    );
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
              <Grid3x3 className="w-5 h-5 text-[#3D8C6C]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {isEditMode ? "Edit Floor" : "Create Floor"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isEditMode
                  ? "Update floor details and defaults."
                  : "Add a new floor and associate it with a building."}
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
          initialValues={initialValues}
          validationSchema={mapManagerFloorSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const tags = values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

              const payload = {
                organization: organizationId,
                building: values.building,
                name: values.name,
                code: values.code || undefined,
                level: Number(values.level),
                sequence: Number(values.sequence),
                description: values.description || undefined,
                isBasement: values.isBasement,
                isDefault: values.isDefault,
                tags,
                isActive: values.isActive,
              };

              if (isEditMode && floor) {
                await updateFloor({
                  id: floor.id,
                  data: {
                    ...payload,
                    attributes: floor.attributes ?? null,
                  },
                }).unwrap();
                toast.success("Floor updated successfully");
              } else {
                await createFloor({
                  ...payload,
                }).unwrap();
                toast.success("Floor created successfully");
              }

              onClose();
            } catch (error: any) {
              const message =
                error?.data?.message ||
                error?.message ||
                `Failed to ${isEditMode ? "update" : "create"} floor`;
              toast.error(message);
              console.error(
                `Error ${isEditMode ? "updating" : "creating"} floor:`,
                error,
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col flex-1">
              <div className="px-6 py-6 overflow-y-auto flex-1 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    Floor information
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Provide general information and link the floor to a building.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field name="building">
                      {({ field, meta }: any) => (
                        <CustomSelect
                          value={field.value}
                          onChange={(value) => setFieldValue("building", value)}
                          options={buildingOptions}
                          placeholder="Select building"
                          label="Building"
                          required
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="name">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("name", value)}
                          placeholder="e.g. Intensive Care"
                          label="Floor name"
                          required
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="code">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("code", value)}
                          placeholder="e.g. NT-L5"
                          label="Code"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) =>
                            setFieldValue("description", value)
                          }
                          placeholder="Short description"
                          label="Description"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="level">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={String(field.value)}
                          onChange={(value) =>
                            setFieldValue("level", Number(value))
                          }
                          placeholder="e.g. 5"
                          label="Level"
                          type="number"
                          required
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="sequence">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={String(field.value)}
                          onChange={(value) =>
                            setFieldValue("sequence", Number(value))
                          }
                          placeholder="e.g. 50"
                          label="Sequence"
                          type="number"
                          required
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="tags">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("tags", value)}
                          placeholder="Comma separated tags"
                          label="Tags"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                  </div>
                </section>

                <section className="space-y-4">
                  <ToggleSwitch
                    checked={values.isBasement}
                    onChange={(value) => setFieldValue("isBasement", value)}
                    label="Basement level"
                    description="Mark this floor as a basement level."
                  />
                  <ToggleSwitch
                    checked={values.isDefault}
                    onChange={(value) => setFieldValue("isDefault", value)}
                    label="Default floor"
                    description="Set this floor as the default for its building."
                  />
                  <ToggleSwitch
                    checked={values.isActive}
                    onChange={(value) => setFieldValue("isActive", value)}
                    label="Floor is active"
                    description="Inactive floors will not appear in navigation."
                  />
                </section>
              </div>

              <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  type="button"
                  onClick={onClose}
                  disabled={isCreating || isUpdating || isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white rounded-xl cursor-pointer"
                  disabled={isCreating || isUpdating || isSubmitting}
                >
                  {(isCreating || isUpdating || isSubmitting) && (
                    <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em]" />
                  )}
                  {isEditMode ? "Update Floor" : "Create Floor"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


