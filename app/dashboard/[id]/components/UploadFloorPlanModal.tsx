/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { X, CloudUpload } from "@/icons/Icons";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/api/uploadApi";
import { useCreateFloorPlanMutation, useGetAllFloorPlansQuery } from "@/lib/api/floorPlansApi";
import { useGetOrganizationsQuery } from "@/lib/api/organizationsApi";
import { createFloorPlanSchema, CreateFloorPlanFormValues } from "@/lib/validations";
import toast from "react-hot-toast";

interface UploadFloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const floorLabels = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "4th Floor",
  "5th Floor",
  "Basement",
  "Lower Level",
  "Upper Level",
];

export function UploadFloorPlanModal({
  isOpen,
  onClose,
  onSuccess,
}: UploadFloorPlanModalProps) {
  const params = useParams();
  const routeOrganizationId = params?.id as string;

  const { data: organizationsData } = useGetOrganizationsQuery();
  const [createFloorPlan, { isLoading: isCreating }] = useCreateFloorPlanMutation();

  const organizations = organizationsData?.data?.organizations || [];
  const [selectedOrganizationId, setSelectedOrganizationId] = useState("");
  const [tagInput, setTagInput] = useState("");

  const { data: floorPlansData } = useGetAllFloorPlansQuery(
    {
      page: 1,
      limit: 1,
      ...(selectedOrganizationId ? { organizationId: selectedOrganizationId } : {}),
    },
    {
      skip: !selectedOrganizationId,
    }
  );

  const buildings = floorPlansData?.data.availableFilters.buildings || [];

  const initialValues: CreateFloorPlanFormValues = {
    organizationId: "",
    buildingId: "",
    floorLabel: "",
    mapName: "",
    mapScale: "",
    description: "",
    tags: [],
    selectedFile: null,
  };

  const extractFloorNumber = (floorLabel: string): number | null => {
    const lower = floorLabel.toLowerCase();
    if (lower.includes("ground") || lower.includes("basement")) return 0;
    const match = floorLabel.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (routeOrganizationId && organizations.length > 0 && !selectedOrganizationId) {
      const orgExists = organizations.find((org) => org.id === routeOrganizationId);
      if (orgExists) {
        setSelectedOrganizationId(routeOrganizationId);
      }
    }
  }, [routeOrganizationId, organizations, selectedOrganizationId]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedOrganizationId("");
      setTagInput("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[700px] relative max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex-shrink-0 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-semibold text-card-foreground">
              Upload Floor Plan
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              disabled={isCreating}
              className="text-muted-foreground hover:text-foreground transition-colors -mt-1 cursor-pointer p-1 h-auto disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Add new maps to your Digital Map Navigation
          </p>
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <Formik
            key={isOpen ? "open" : "closed"}
            initialValues={{
              ...initialValues,
              organizationId: selectedOrganizationId,
            }}
            validationSchema={createFloorPlanSchema}
            enableReinitialize
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting, resetForm, setTouched }) => {
            // Mark all fields as touched to show validation errors
            setTouched({
              organizationId: true,
              buildingId: true,
              floorLabel: true,
              mapName: true,
              mapScale: true,
              description: true,
              tags: true,
              selectedFile: true,
            });

            try {
              if (!values.selectedFile) {
                toast.error("Please select a file to upload");
                setSubmitting(false);
                return;
              }

              toast.loading("Uploading file...", { id: "upload-toast" });

              const uploadResult = await uploadFile(values.selectedFile, "floor-plans");

              if (!uploadResult.success || !uploadResult.data.url) {
                throw new Error(uploadResult.message || "Failed to upload file");
              }

              toast.dismiss("upload-toast");
              toast.loading("Creating floor plan...", { id: "create-toast" });

              const floorPlanData = {
                organizationId: values.organizationId,
                buildingId: values.buildingId,
                title: values.mapName.trim(),
                floorLabel: values.floorLabel,
                floorNumber: extractFloorNumber(values.floorLabel),
                status: "Draft" as const,
                media: {
                  fileUrl: uploadResult.data.url,
                  fileKey: uploadResult.data.publicId,
                },
                metadata: {
                  scale: values.mapScale.trim(),
                  description: values.description.trim() || null,
                  tags: values.tags && values.tags.length > 0 ? values.tags : [],
                },
                versionNotes: values.description.trim() || null,
              };

              const result = await createFloorPlan(floorPlanData).unwrap();

              toast.dismiss("create-toast");
              toast.success(result.message || "Floor plan created successfully!");

              resetForm();
              setSelectedOrganizationId("");
              setTagInput("");
              onSuccess?.();
              onClose();
            } catch (error: any) {
              toast.dismiss("upload-toast");
              toast.dismiss("create-toast");
              const errorMessage =
                error?.data?.message || error?.message || "Failed to create floor plan";
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
            setFieldTouched,
            isSubmitting,
            resetForm,
          }) => {
            if (values.organizationId !== selectedOrganizationId) {
              setSelectedOrganizationId(values.organizationId);
              if (values.buildingId) {
                setFieldValue("buildingId", "");
              }
            }

            const isLoading = isSubmitting || isCreating;

            return (
              <Form className="flex flex-col h-full min-h-0">
                <div className="px-6 pt-6 pb-4 overflow-y-auto flex-1 min-h-0">
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-card-foreground mb-1">
                      Upload New Floor Plan
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Upload PNG, PDF, or SVG floor plans to add to your building maps
                    </p>
                  </div>

                  <div className="space-y-4">
                    <CustomSelect
                      value={values.organizationId}
                      onChange={(value) => {
                        setFieldValue("organizationId", value);
                        setSelectedOrganizationId(value);
                        setFieldValue("buildingId", "");
                      }}
                      options={organizations.map((org) => ({ name: org.name, value: org.id }))}
                      placeholder="Select organization"
                      label="Organization"
                      required
                      disabled={isLoading || organizations.length === 0}
                      error={touched.organizationId ? errors.organizationId : undefined}
                      touched={touched.organizationId}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomSelect
                        value={values.buildingId}
                        onChange={(value) => setFieldValue("buildingId", value)}
                        options={buildings.map((b) => ({ name: b.name, value: b.id }))}
                        placeholder={values.organizationId ? "Select building" : "Select organization first"}
                        label="Building"
                        required
                        disabled={isLoading || !values.organizationId || buildings.length === 0}
                        error={touched.buildingId ? errors.buildingId : undefined}
                        touched={touched.buildingId}
                      />

                      <CustomSelect
                        value={values.floorLabel}
                        onChange={(value) => setFieldValue("floorLabel", value)}
                        options={floorLabels.map((label) => ({ name: label, value: label }))}
                        placeholder="Select floor"
                        label="Floor"
                        required
                        disabled={isLoading}
                        error={touched.floorLabel ? errors.floorLabel : undefined}
                        touched={touched.floorLabel}
                      />
                    </div>

                    <CustomInput
                      value={values.mapName}
                      onChange={(value) => setFieldValue("mapName", value)}
                      placeholder="e.g. Main Building Floor 1"
                      label="Map Name"
                      required
                      disabled={isLoading}
                      error={touched.mapName ? errors.mapName : undefined}
                      touched={touched.mapName}
                    />

                    <CustomInput
                      value={values.mapScale}
                      onChange={(value) => setFieldValue("mapScale", value)}
                      placeholder="1:100"
                      label="Map Scale"
                      required
                      disabled={isLoading}
                      error={touched.mapScale ? errors.mapScale : undefined}
                      touched={touched.mapScale}
                    />

                    <Field name="description">
                      {({ field, meta }: any) => {
                        const hasError = meta.touched && meta.error;
                        return (
                          <div>
                            <label className={`block text-xs font-medium mb-2.5 ${hasError ? 'text-red-500' : 'text-muted-foreground'}`}>
                              Description
                            </label>
                            <textarea
                              {...field}
                              value={field.value || ""}
                              placeholder="Optional description or notes about this floor plan"
                              rows={3}
                              disabled={isLoading}
                              className={`w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none ${
                                hasError
                                  ? 'border-red-500 focus:border-red-500'
                                  : 'border-border focus:border-foreground'
                              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            />
                            {hasError && (
                              <p className="text-xs text-red-500 mt-1">{meta.error}</p>
                            )}
                          </div>
                        );
                      }}
                    </Field>

                    <div>
                      <label className="block text-xs font-medium mb-2.5 text-muted-foreground">
                        Tags
                      </label>
                      <div className="border-b border-border pb-3">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                              e.preventDefault();
                              const newTag = tagInput.trim();
                              if (newTag.length > 40) {
                                toast.error("Tag cannot exceed 40 characters");
                                return;
                              }
                              if (!values.tags?.includes(newTag)) {
                                const updatedTags = [...(values.tags || []), newTag];
                                setFieldValue("tags", updatedTags);
                                setTagInput("");
                              } else {
                                toast.error("Tag already exists");
                                setTagInput("");
                              }
                            }
                          }}
                          placeholder="Type tag and press Enter or comma to add"
                          disabled={isLoading}
                          className="w-full px-0 py-2.5 bg-transparent border-0 border-b text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors focus:border-foreground"
                        />
                      </div>
                      {values.tags && values.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {values.tags.map((tag, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground"
                            >
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedTags = values.tags?.filter((_, i) => i !== index) || [];
                                  setFieldValue("tags", updatedTags);
                                }}
                                disabled={isLoading}
                                className="hover:text-foreground transition-colors disabled:opacity-50"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      {touched.tags && errors.tags && (
                        <p className="text-xs text-red-500 mt-1">{errors.tags}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Press Enter or comma to add tags. Each tag can be up to 40 characters.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Floor Plan File <span className="text-red-500">*</span>
                      </label>
                      <div className="border-b border-border pb-3">
                        <input
                          type="file"
                          id="floor-plan-upload"
                          accept=".pdf,.png,.jpg,.jpeg,.svg,.dwg,.cad"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFieldValue("selectedFile", file);
                          }}
                          disabled={isLoading}
                          className="hidden"
                        />
                        <label
                          htmlFor="floor-plan-upload"
                          className={`cursor-pointer flex items-center gap-3 ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center w-10 h-10 bg-background rounded">
                            <CloudUpload className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm text-foreground">
                              <span className="font-medium">Choose File:</span>{" "}
                              <span className="text-muted-foreground">
                                {values.selectedFile
                                  ? values.selectedFile.name
                                  : "Chosen file name display here.png"}
                              </span>
                            </p>
                          </div>
                        </label>
                      </div>
                      {touched.selectedFile && errors.selectedFile && (
                        <p className="text-xs text-red-500 mt-1">{errors.selectedFile}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: PDF, PNG, JPG, SVG, DWG, CAD
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border rounded-b-2xl flex-shrink-0 bg-card">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    disabled={isLoading}
                    className="px-5 py-2.5 text-sm cursor-pointer font-medium text-muted-foreground bg-background border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 text-sm font-medium cursor-pointer text-white bg-[#3D8C6C] rounded-lg transition-colors flex items-center gap-2 hover:bg-[#3D8C6C]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <CloudUpload className="w-4 h-4" />
                        Upload Floor Map
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            );
          }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UploadFloorPlanModal;
