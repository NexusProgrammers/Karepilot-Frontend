import { tokenManager } from '../utils/tokenManager';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://karepilot-backend.vercel.app/api/v1';

export const getAuthHeaders = () => {
  const token = tokenManager.getToken();
  return {
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
};

