"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/icons/icons";
import { Button } from "@/components/ui/button";

export default function KarepilotLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login attempt:", { email, password, rememberMe });
    onLogin();
    setRememberMe(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-3">
          <LogoIcon />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Access your Karepilot admin dashboard</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-3 border-b border-b-gray-300 focus:outline-none focus:border-b-black placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-3 pr-10 border-b border-b-gray-300 focus:outline-none focus:border-b-black placeholder-gray-400"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer p-1 h-auto"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 cursor-pointer" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#3D8C6C] focus:ring-green-500 border-gray-300 cursor-pointer rounded"
              />
              <span className="ml-2 text-sm text-[#3D8C6C]">Remember me</span>
            </label>
            <Button
              variant="ghost"
              className="text-sm text-[#3D8C6C] hover:text-green-700 font-medium cursor-pointer p-0 h-auto"
            >
              Forget Password?
            </Button>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-[#3D8C6C] cursor-pointer text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition duration-200"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
