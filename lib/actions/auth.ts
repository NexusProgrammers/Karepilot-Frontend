"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = cookies();
  (await cookieStore).delete("auth-token");
  redirect("/");
}

export async function getAuthData() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth-token")?.value;

  if (!token) {
    return null;
  }

  return { token };
}
