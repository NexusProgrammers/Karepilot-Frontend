"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "@/icons/Icons";
import { LogoIcon } from "@/icons/Svg";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setToken, setLoading } from "@/lib/store/slices/authSlice";
import { useLoginMutation } from "@/lib/api/authApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/lib/validations/authSchemas";
import { LoginFormValues, ApiError } from "@/lib/types";
import toast from "react-hot-toast";
import { ButtonLoading } from "@/components/common";
import { setAuthToken } from "@/lib/actions";

export default function KarepilotLogin({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      dispatch(setLoading(true)); 
      const result = await login({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      }).unwrap();

      if (result.success && result.data.token) {
        await setAuthToken(result.data.token, values.rememberMe);
        dispatch(setToken(result.data.token));
        dispatch(setLoading(false)); 
        toast.success(result.message || "Login successful!");
        onLogin();
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (error && typeof error === 'object' && 'data' in error) {
        const err = error as ApiError;
        if (err.data?.message) {
          toast.error(err.data.message);
        } else if (err.status === 401) {
          toast.error("Invalid email or password");
        } else if (err.status === 400) {
          toast.error("Please check your email and password");
        } else if (err.status === 500) {
          toast.error("Server error. Please try again later");
        } else if (err.status === 'FETCH_ERROR') {
          toast.error("Network error. Please check your connection");
        } else {
          toast.error("Login failed. Please try again");
        }
      } else {
        toast.error("Login failed. Please try again");
      }
      dispatch(setLoading(false)); 
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border border-border">
        <div className="flex items-center justify-center mb-3">
          <LogoIcon />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Access your Karepilot admin dashboard</p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false,
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-3 bg-background border-b border-border focus:outline-none focus:border-b-primary text-foreground placeholder-muted-foreground"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-3 py-3 pr-10 bg-background border-b border-border focus:outline-none focus:border-b-primary text-foreground placeholder-muted-foreground"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground cursor-pointer p-1 h-auto"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 cursor-pointer" />
                    ) : (
                      <Eye className="h-5 w-5 cursor-pointer" />
                    )}
                  </Button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <Field
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 text-[#3D8C6C] focus:ring-green-500 border-border cursor-pointer rounded"
                  />
                  <span className="ml-2 text-sm text-[#3D8C6C]">Remember me</span>
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-sm text-[#3D8C6C] hover:text-green-700 font-medium cursor-pointer p-0 h-auto"
                >
                  Forget Password?
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3D8C6C] hover:bg-green-700 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <ButtonLoading /> : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
