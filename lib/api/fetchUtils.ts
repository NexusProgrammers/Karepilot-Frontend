const DEFAULT_DEV_API_URL = "http://localhost:4000/api/v1";
const DEFAULT_PROD_API_URL = "https://karepilot-backend.vercel.app/api/v1";

export const resolveApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined") {
    const { hostname } = window.location;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return DEFAULT_DEV_API_URL;
    }
  }

  return process.env.NODE_ENV === "production"
    ? DEFAULT_PROD_API_URL
    : DEFAULT_DEV_API_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const isFormData = options.body instanceof FormData;
  
  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include', 
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });
};

