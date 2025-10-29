"use server";

import { cookies } from "next/headers";
import { TOKEN_KEY } from "../utils/tokenManager";

export async function setAuthToken(token: string, rememberMe: boolean = false) {
  const cookieStore = await cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : undefined;
  const expires = rememberMe ? new Date(Date.now() + 60 * 60 * 24 * 7 * 1000) : undefined;

  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...(maxAge && { maxAge }),
    ...(expires && { expires }),
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;
  return token || null;
}

export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
}

export async function logoutAction() {
  await removeAuthToken();
}

export async function getAuthData() {
  const token = await getAuthToken();
  return token ? { token } : null;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "true";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://karepilot-backend.vercel.app/api/v1";
        const response = await fetch(`${apiUrl}/users/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, rememberMe }),
          cache: "no-store",
        });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    if (result.data?.token) {
      await setAuthToken(result.data.token, rememberMe);
      return {
        success: true,
        message: result.message || "Login successful",
        data: result.data,
      };
    }

    return {
      success: false,
      message: "No token received",
    };
  } catch (error) {
    console.error("Login server action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
}
