import { getAuthToken } from '@/lib/actions/auth';

export async function syncServerAuthToken() {
  const token = await getAuthToken();
  return token;
}

