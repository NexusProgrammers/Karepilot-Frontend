"use client";

import { Formik, Form, Field } from "formik";
import { X, Building2, MapPin as MapPinIcon } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { ToggleSwitch } from "@/components/common/ToggleSwitch";
import toast from "react-hot-toast";
import {
  useCreateMapManagerBuildingMutation,
  useUpdateMapManagerBuildingMutation,
} from "@/lib/api/mapManagerApi";
import {
  MapManagerBuilding,
  MapManagerBuildingAddress,
} from "@/lib/types/map-manager";
import {
  MapManagerBuildingFormValues,
  mapManagerBuildingSchema,
} from "@/lib/validations";

interface ManageBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  building?: MapManagerBuilding | null;
}

const getInitialValues = (
  organizationId: string,
  building?: MapManagerBuilding | null,
): MapManagerBuildingFormValues => {
  const address: MapManagerBuildingAddress = building?.address ?? {};
  return {
    organization: organizationId,
    name: building?.name ?? "",
    code: building?.code ?? "",
    description: building?.description ?? "",
    tags: (building?.tags ?? []).join(", "),
    addressLine1: address.line1 ?? "",
    addressLine2: address.line2 ?? "",
    city: address.city ?? "",
    state: address.state ?? "",
    postalCode: address.postalCode ?? "",
    country: address.country ?? "",
    latitude:
      building?.geoLocation?.latitude !== undefined
        ? String(building.geoLocation.latitude)
        : "",
    longitude:
      building?.geoLocation?.longitude !== undefined
        ? String(building.geoLocation.longitude)
        : "",
    isActive: building?.isActive ?? true,
  };
};

export default function ManageBuildingModal({
  isOpen,
  onClose,
  organizationId,
  building,
}: ManageBuildingModalProps) {
  const [createBuilding, { isLoading: isCreating }] =
    useCreateMapManagerBuildingMutation();
  const [updateBuilding, { isLoading: isUpdating }] =
    useUpdateMapManagerBuildingMutation();

  if (!isOpen) {
    return null;
  }

  const initialValues = getInitialValues(organizationId, building);
  const isEditMode = Boolean(building);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3D8C6C]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#3D8C6C]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {isEditMode ? "Edit Building" : "Create Building"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isEditMode
                  ? "Update building information, address, and display options."
                  : "Add a new building to manage its floors and floor plans."}
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
          validationSchema={mapManagerBuildingSchema}
          enableReinitialize
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const tags = values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean);

              const payload = {
                organization: organizationId,
                name: values.name,
                code: values.code || undefined,
                description: values.description || undefined,
                tags,
                address: {
                  line1: values.addressLine1 || undefined,
                  line2: values.addressLine2 || undefined,
                  city: values.city || undefined,
                  state: values.state || undefined,
                  postalCode: values.postalCode || undefined,
                  country: values.country || undefined,
                },
                geoLocation:
                  values.latitude || values.longitude
                    ? {
                        latitude: values.latitude
                          ? Number(values.latitude)
                          : undefined,
                        longitude: values.longitude
                          ? Number(values.longitude)
                          : undefined,
                      }
                    : undefined,
                isActive: values.isActive,
              };

              if (isEditMode && building) {
                await updateBuilding({
                  id: building.id,
                  data: {
                    ...payload,
                    // ensure null is sent when fields are cleared
                    address:
                      values.addressLine1 ||
                      values.addressLine2 ||
                      values.city ||
                      values.state ||
                      values.postalCode ||
                      values.country
                        ? payload.address
                        : null,
                    geoLocation:
                      values.latitude || values.longitude
                        ? payload.geoLocation
                        : null,
                  },
                }).unwrap();
                toast.success("Building updated successfully");
              } else {
                await createBuilding({
                  ...payload,
                  organization: organizationId,
                }).unwrap();
                toast.success("Building created successfully");
              }

              onClose();
            } catch (error: any) {
              const message =
                error?.data?.message ||
                error?.message ||
                `Failed to ${isEditMode ? "update" : "create"} building`;
              toast.error(message);
              console.error(
                `Error ${isEditMode ? "updating" : "creating"} building:`,
                error,
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="flex flex-col flex-1">
              <div className="px-6 py-6 overflow-y-auto flex-1 space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    Building Details
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Provide general information about the building.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field name="name">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("name", value)}
                          placeholder="e.g. North Tower"
                          label="Building name"
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
                          placeholder="e.g. NT-01"
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
                  <div className="mt-4">
                    <ToggleSwitch
                      checked={values.isActive}
                      onChange={(value) => setFieldValue("isActive", value)}
                      label="Building is active"
                      description="Inactive buildings will not appear in selection lists."
                    />
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                    Address & Location
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optional: Provide address and geo-location for navigation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field name="addressLine1">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) =>
                            setFieldValue("addressLine1", value)
                          }
                          placeholder="Address line 1"
                          label="Address line 1"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="addressLine2">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) =>
                            setFieldValue("addressLine2", value)
                          }
                          placeholder="Address line 2"
                          label="Address line 2"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="city">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("city", value)}
                          placeholder="City"
                          label="City"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="state">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("state", value)}
                          placeholder="State / Province"
                          label="State / Province"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="postalCode">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) =>
                            setFieldValue("postalCode", value)
                          }
                          placeholder="Postal code"
                          label="Postal code"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="country">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("country", value)}
                          placeholder="Country"
                          label="Country"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="latitude">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) => setFieldValue("latitude", value)}
                          placeholder="Latitude (-90 to 90)"
                          label="Latitude"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                    <Field name="longitude">
                      {({ field, meta }: any) => (
                        <CustomInput
                          value={field.value}
                          onChange={(value) =>
                            setFieldValue("longitude", value)
                          }
                          placeholder="Longitude (-180 to 180)"
                          label="Longitude"
                          error={meta.error}
                          touched={meta.touched}
                        />
                      )}
                    </Field>
                  </div>
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
                  {isEditMode ? "Update Building" : "Create Building"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


