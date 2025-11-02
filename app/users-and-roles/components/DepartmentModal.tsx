"use client";

import { X, Building2 } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomTextarea } from "@/components/common/CustomTextarea";
import { Formik, Form, Field } from "formik";
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentByIdQuery,
} from "@/lib/api/departmentsApi";
import toast from "react-hot-toast";
import { 
  createDepartmentSchema, 
  updateDepartmentSchema,
  CreateDepartmentFormValues,
  UpdateDepartmentFormValues 
} from "@/lib/validations";

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId?: string | null; 
}

export function DepartmentModal({ isOpen, onClose, departmentId }: DepartmentModalProps) {
  const isEditMode = !!departmentId;
  
  const { data: departmentData, isLoading: isLoadingDepartment } = useGetDepartmentByIdQuery(
    departmentId!,
    {
      skip: !isEditMode || !departmentId,
    }
  );
  
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();

  const getInitialValues = (): CreateDepartmentFormValues | UpdateDepartmentFormValues => {
    if (isEditMode && departmentData?.data?.department) {
      return {
        name: departmentData.data.department.name || "",
        description: departmentData.data.department.description || "",
        isActive: departmentData.data.department.isActive ?? true,
      };
    }
    return {
      name: "",
      description: "",
      isActive: true,
    };
  };

  const handleSubmit = async (values: CreateDepartmentFormValues | UpdateDepartmentFormValues) => {
    try {
      if (isEditMode && departmentId) {
        await updateDepartment({ id: departmentId, data: values as UpdateDepartmentFormValues }).unwrap();
        toast.success("Department updated successfully");
      } else {
        await createDepartment(values as CreateDepartmentFormValues).unwrap();
        toast.success("Department created successfully");
      }
      onClose();
    } catch (error: any) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} department:`, error);
      const errorMessage = error?.data?.message || error?.message || `Failed to ${isEditMode ? 'update' : 'create'} department`;
      toast.error(errorMessage);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const validationSchema = isEditMode ? updateDepartmentSchema : createDepartmentSchema;
  const isLoading = isCreating || isUpdating;
  const isLoadingData = isEditMode && isLoadingDepartment;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {isEditMode ? "Edit Department" : "Create New Department"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isEditMode 
                  ? "Update department information" 
                  : "Add a new department to your organization"}
              </p>
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
        </div>

        {isLoadingData ? (
          <div className="px-6 py-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <Formik
            initialValues={getInitialValues()}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={isEditMode}
          >
            {({  setFieldValue }) => (
              <Form className="flex flex-col flex-1">
                <div className="px-6 py-6 overflow-y-auto flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      Department Details
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {isEditMode 
                        ? "Update department information" 
                        : "Provide information about this new department"}
                    </p>

                    <div className="space-y-4">
                      <Field name="name">
                        {({ field, meta }: any) => (
                          <div>
                            <CustomInput
                              value={field.value}
                              onChange={(value) => setFieldValue("name", value)}
                              placeholder="e.g. Emergency"
                              label="Department Name"
                              required={!isEditMode}
                            />
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm mt-1">
                                {meta.error}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="description">
                        {({ field, meta }: any) => (
                          <div>
                            <CustomTextarea
                              value={field.value}
                              onChange={(value) => setFieldValue("description", value)}
                              placeholder="e.g. write description here"
                              label="Description"
                              rows={3}
                            />
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm mt-1">
                                {meta.error}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-muted/50">
                  <Button
                    type="button"
                    onClick={onClose}
                    variant="outline"
                    className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 flex gap-2 py-2.5 text-sm cursor-pointer font-medium text-white bg-[#3D8C6C] rounded-lg transition-colors hover:bg-[#3D8C6C]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Building2 className="w-4 h-4" />
                    {isLoading
                      ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                      : isEditMode
                      ? "Update Department"
                      : "Create Department"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

