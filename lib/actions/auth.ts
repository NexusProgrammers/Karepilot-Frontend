"use server";

import { cookies } from "next/headers";
import { TOKEN_KEY } from "../utils/tokenManager";

export async function setAuthToken(token: string, rememberMe: boolean = false) {
  const cookieStore = await cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : undefined;
  const expires = rememberMe ? new Date(Date.now() + 60 * 60 * 24 * 7 * 1000) : undefined;

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
    (isProduction 
      ? "https://karepilot-backend.vercel.app/api/v1"
      : "http://localhost:4000/api/v1");
  
  const isCrossOrigin = apiUrl && (
    apiUrl.includes("vercel.app") || 
    apiUrl.includes("https://") ||
    (!apiUrl.includes("localhost") && !apiUrl.includes("127.0.0.1"))
  );
  
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: false, 
    secure: isCrossOrigin ? true : false, 
    sameSite: isCrossOrigin ? "none" : "lax",
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


