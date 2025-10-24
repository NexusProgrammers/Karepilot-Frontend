import Cookies from "js-cookie";

export const TOKEN_KEY = "auth-token";

export const tokenManager = {
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  },

  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },

  clearAuth: () => {
    tokenManager.removeToken();
  },

  isAuthenticated: () => {
    return !!tokenManager.getToken();
  },
};
