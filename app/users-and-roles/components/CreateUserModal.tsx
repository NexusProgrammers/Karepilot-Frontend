"use client";

import { X, UserPlus } from "@/icons/Icons";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/common/CustomInput";
import { CustomSelect } from "@/components/common/CustomSelect";
import { Formik, Form, Field } from "formik";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "@/lib/api/usersApi";
import { useGetAllDepartmentsQuery } from "@/lib/api/departmentsApi";
import toast from "react-hot-toast";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserFormValues,
  UpdateUserFormValues,
} from "@/lib/validations";
import { ModalMode, CreateUserModalProps } from "@/lib/types/users-and-roles";

const roles = ["Admin", "Manager", "Technician", "Staff", "Security", "Viewer"];

const shifts = ["Day Shift", "Night Shift", "Evening Shift", "24/7"];

export function CreateUserModal({
  isOpen,
  onClose,
  userId,
  mode = "create",
}: CreateUserModalProps) {
  const isEditMode = mode === "edit" && !!userId;
  const isViewMode = mode === "view" && !!userId;

  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(
    userId!,
    {
      skip: (!isEditMode && !isViewMode) || !userId,
    }
  );

  const { data: departmentsData } = useGetAllDepartmentsQuery({
    page: 1,
    limit: 100,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const departments = departmentsData?.data?.departments || [];

  const getDepartmentName = (id: string) => {
    if (!id) return "";
    const dept = departments.find((d) => d.id === id || (d as any)._id === id);
    return dept?.name || "";
  };

  const getDepartmentIdFromName = (name: string) => {
    const dept = departments.find((d) => d.name === name);
    return dept?.id || "";
  };

  const getInitialValues = (): CreateUserFormValues | UpdateUserFormValues => {
    if ((isEditMode || isViewMode) && userData?.data?.user) {
      const user = userData.data.user;
      return {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        department: user.department?._id || "",
        phoneNumber: user.phoneNumber || "",
        badgeNumber: user.badgeNumber || "",
        shift: user.shift || "",
        currentLocation: user.currentLocation || "",
      };
    }
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "Viewer",
      department: "",
      phoneNumber: "",
      badgeNumber: "",
      shift: "",
      currentLocation: "",
    };
  };

  const handleSubmit = async (
    values: CreateUserFormValues | UpdateUserFormValues
  ) => {
    try {
      const submitData = { ...values };

      if (isEditMode && !submitData.password) {
        delete submitData.password;
      }

      if (submitData.role === "Admin") {
        submitData.department = null;
      }

      Object.keys(submitData).forEach((key) => {
        if (submitData[key as keyof typeof submitData] === "") {
          delete submitData[key as keyof typeof submitData];
        }
      });

      if (isEditMode && userId) {
        await updateUser({
          id: userId,
          data: submitData as UpdateUserFormValues,
        }).unwrap();
        toast.success("User updated successfully");
      } else {
        await createUser(submitData as CreateUserFormValues).unwrap();
        toast.success("User created successfully");
      }
      onClose();
    } catch (error: any) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} user:`,
        error
      );
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        `Failed to ${isEditMode ? "update" : "create"} user`;
      toast.error(errorMessage);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const validationSchema = isEditMode ? updateUserSchema : createUserSchema;
  const isLoading = isCreating || isUpdating;
  const isLoadingData = isEditMode && isLoadingUser;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">
                {isViewMode
                  ? "View User"
                  : isEditMode
                  ? "Edit User"
                  : "Create New User"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isViewMode
                  ? "View user information"
                  : isEditMode
                  ? "Update user information"
                  : "Add a new staff member to your organization"}
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
            validationSchema={isViewMode ? undefined : validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={isEditMode || isViewMode}
          >
            {({ setFieldValue, values }) => (
              <Form className="flex flex-col flex-1">
                <div className="px-6 py-6 overflow-y-auto flex-1">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      User Details
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Provide information about the new user and their access
                      permissions.
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Field name="firstName">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomInput
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("firstName", value)
                                }
                                placeholder="e.g. John"
                                label="First Name"
                                required
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="lastName">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomInput
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("lastName", value)
                                }
                                placeholder="e.g. Doe"
                                label="Last Name"
                                required
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="email">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomInput
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("email", value)
                                }
                                placeholder="e.g. john@example.com"
                                label="Email Address"
                                required
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="password">
                          {({ field, meta }: any) => (
                            <div>
                              {!isViewMode && (
                                <CustomInput
                                  type="password"
                                  value={field.value}
                                  onChange={(value) =>
                                    setFieldValue("password", value)
                                  }
                                  placeholder={
                                    isEditMode
                                      ? "Leave empty to keep current"
                                      : "Enter password"
                                  }
                                  label={
                                    isEditMode
                                      ? "Password (Optional)"
                                      : "Password"
                                  }
                                  required={!isEditMode}
                                  error={meta.error}
                                  touched={meta.touched}
                                />
                              )}
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="role">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomSelect
                                value={field.value}
                                onChange={(value) => {
                                  setFieldValue("role", value);
                                  if (value === "Admin") {
                                    setFieldValue("department", "");
                                  }
                                }}
                                options={roles}
                                placeholder="Select role"
                                label="Role"
                                required
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="department">
                        {({ field, meta }: any) => (
                          <div>
                            <CustomSelect
                              value={
                                field.value
                                  ? getDepartmentName(field.value)
                                  : ""
                              }
                              onChange={(value) => {
                                const deptId = getDepartmentIdFromName(value);
                                setFieldValue("department", deptId);
                              }}
                              options={departments.map((d) => d.name)}
                              placeholder="Select department"
                              label="Department"
                              required={values.role !== "Admin"}
                              disabled={isViewMode || values.role === "Admin"}
                              error={meta.error}
                              touched={meta.touched}
                            />
                            {values.role === "Admin" && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Admin role cannot be assigned to a department
                              </p>
                            )}
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm mt-1 font-medium">
                                {meta.error}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Field name="phoneNumber">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomInput
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("phoneNumber", value)
                                }
                                placeholder="e.g. +1 (555) 123-4567"
                                label="Phone Number"
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="badgeNumber">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomInput
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("badgeNumber", value)
                                }
                                placeholder="e.g. EMP-001"
                                label="Badge Number"
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="shift">
                          {({ field, meta }: any) => (
                            <div>
                              <CustomSelect
                                value={field.value}
                                onChange={(value) =>
                                  setFieldValue("shift", value)
                                }
                                options={shifts}
                                placeholder="Select Shift"
                                label="Shift"
                                disabled={isViewMode}
                                error={meta.error}
                                touched={meta.touched}
                              />
                              {meta.touched && meta.error && (
                                <div className="text-red-500 text-sm mt-1 font-medium">
                                  {meta.error}
                                </div>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="currentLocation">
                        {({ field, meta }: any) => (
                          <div>
                            <CustomInput
                              value={field.value}
                              onChange={(value) =>
                                setFieldValue("currentLocation", value)
                              }
                              placeholder="e.g. ICU Level 3"
                              label="Current Location"
                              disabled={isViewMode}
                              error={meta.error}
                              touched={meta.touched}
                            />
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm mt-1 font-medium">
                                {meta.error}
                              </div>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>

                {!isViewMode && (
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
                      <UserPlus className="w-4 h-4" />
                      {isLoading
                        ? isEditMode
                          ? "Updating..."
                          : "Creating..."
                        : isEditMode
                        ? "Update User"
                        : "Create User"}
                    </Button>
                  </div>
                )}
                {isViewMode && (
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/50">
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="px-5 py-2.5 cursor-pointer text-sm font-medium text-muted-foreground bg-transparent border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Close
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
