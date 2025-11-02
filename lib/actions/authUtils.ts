"use server";

import { getAuthToken } from './auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const token = await getAuthToken();
  if (!token) {
    redirect('/');
  }
  return { token };
}

export async function getServerAuthToken() {
  return await getAuthToken();
}

