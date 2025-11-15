"use client";

import { useEffect } from "react";
import { Formik, Form } from "formik";
import { X } from "@/icons/Icons";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { Button } from "@/components/ui/button";
import { useCreateBuildingMutation } from "@/lib/api/buildingsApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { useGetAllVenueTemplatesQuery } from "@/lib/api/venueTemplatesApi";
import { MapBuildingStatus } from "@/lib/types/map-management/buildings";
import {
  createBuildingSchema,
  CreateBuildingFormValues,
} from "@/lib/validations";
import toast from "react-hot-toast";

interface AddBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const statusOptions = [
  { name: "Active", value: MapBuildingStatus.ACTIVE },
  { name: "Inactive", value: MapBuildingStatus.INACTIVE },
  { name: "Archived", value: MapBuildingStatus.ARCHIVED },
];

export function AddBuildingModal({
  isOpen,
  onClose,
  onSuccess,
}: AddBuildingModalProps) {
  const { data: organizationsData } = useGetOrganizationsQuery();
  const { data: venueTemplatesData } = useGetAllVenueTemplatesQuery({});
  const [createBuilding, { isLoading: isCreating }] =
    useCreateBuildingMutation();

  const organizations = organizationsData?.data?.organizations || [];
  const venueTemplates = venueTemplatesData?.data?.venueTemplates || [];

  const initialValues: CreateBuildingFormValues = {
    organizationId: "",
    buildingName: "",
    buildingCode: "",
    description: "",
    status: MapBuildingStatus.ACTIVE,
    venueTemplateId: "",
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] relative">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                Add Building
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Create a new building for your organization
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1 h-auto"
              disabled={isCreating}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Formik
          key={isOpen ? "open" : "closed"}
          initialValues={initialValues}
          validationSchema={createBuildingSchema}
          enableReinitialize
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={async (values, { setSubmitting, resetForm, setTouched }) => {
            setTouched({
              organizationId: true,
              buildingName: true,
              buildingCode: true,
              description: true,
              status: true,
              venueTemplateId: true,
            });

            try {
              toast.loading("Creating building...", { id: "create-toast" });

              const buildingData = {
                organizationId: values.organizationId,
                name: values.buildingName.trim(),
                code: values.buildingCode.trim() || null,
                description: values.description.trim() || null,
                status: values.status || null,
                venueTemplateId: values.venueTemplateId || null,
                isActive: values.status === MapBuildingStatus.ACTIVE,
              };

              const result = await createBuilding(buildingData).unwrap();
              toast.dismiss("create-toast");
              toast.success(result.message || "Building created successfully!");

              resetForm();
              onSuccess?.();
              onClose();
            } catch (error: any) {
              toast.dismiss("create-toast");
              const errorMessage =
                error?.data?.message ||
                error?.message ||
                "Failed to create building";
              toast.error(errorMessage);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
            resetForm,
          }) => {
            const isLoading = isSubmitting || isCreating;

            return (
              <Form>
                <div className="px-6 pb-6">
                  <div className="space-y-4 mt-3">
                    <CustomSelect
                      value={values.organizationId}
                      onChange={(value) =>
                        setFieldValue("organizationId", value)
                      }
                      options={organizations.map((org) => ({
                        name: org.name,
                        value: org.id,
                      }))}
                      placeholder="Select organization"
                      label="Organization"
                      required
                      disabled={isLoading || organizations.length === 0}
                      error={
                        touched.organizationId
                          ? errors.organizationId
                          : undefined
                      }
                      touched={touched.organizationId}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomInput
                        value={values.buildingName}
                        onChange={(value) =>
                          setFieldValue("buildingName", value)
                        }
                        placeholder="Enter building name"
                        label="Building Name"
                        required
                        disabled={isLoading}
                        error={
                          touched.buildingName ? errors.buildingName : undefined
                        }
                        touched={touched.buildingName}
                      />
                      <CustomInput
                        value={values.buildingCode}
                        onChange={(value) =>
                          setFieldValue("buildingCode", value)
                        }
                        placeholder="Enter building code"
                        label="Building Code"
                        required
                        disabled={isLoading}
                        error={
                          touched.buildingCode ? errors.buildingCode : undefined
                        }
                        touched={touched.buildingCode}
                      />
                    </div>

                    <CustomSelect
                      value={values.status}
                      onChange={(value) => setFieldValue("status", value)}
                      options={statusOptions}
                      placeholder="Select status"
                      label="Status"
                      disabled={isLoading}
                      error={touched.status ? errors.status : undefined}
                      touched={touched.status}
                    />

                    <CustomSelect
                      value={values.venueTemplateId}
                      onChange={(value) =>
                        setFieldValue("venueTemplateId", value)
                      }
                      options={venueTemplates.map((template) => ({
                        name: template.name,
                        value: template.id,
                      }))}
                      placeholder="Select venue template"
                      label="Venue Template"
                      required
                      disabled={isLoading}
                      error={touched.venueTemplateId ? errors.venueTemplateId : undefined}
                      touched={touched.venueTemplateId}
                    />

                    <CustomTextarea
                      value={values.description}
                      onChange={(value) => setFieldValue("description", value)}
                      placeholder="Enter building description"
                      label="Description"
                      required
                      disabled={isLoading}
                      error={touched.description ? errors.description : undefined}
                      touched={touched.description}
                    />
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    disabled={isLoading}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#3D8C6C] hover:bg-[#2D6B4F] text-white cursor-pointer"
                  >
                    {isLoading ? "Creating..." : "Create Building"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
