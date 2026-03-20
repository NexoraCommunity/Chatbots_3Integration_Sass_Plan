/**
 * Global API wrapper for fetch with automatic 401 handling and token refresh.
 */

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const isFormData = options.body instanceof FormData;

  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include", // Ensure cookies are sent (HttpOnly)
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  };


  console.log(`🌐 apiFetch Request: ${options.method || 'GET'} ${url}`, options.body ? "(with body)" : "");
  try {
    const parseResponse = async (res: Response) => {
      const text = await res.text();
      let result;
      try {
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        result = text;
      }
      if (!res.ok) throw result;
      return result;
    };

    const response = await fetch(url, defaultOptions);
    console.log(`📡 apiFetch Response: ${response.status} ${url}`);

    // If unauthorized, attempt to refresh token
    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = fetch("/api-backend/auth/refresh", {
          method: "GET",
          credentials: "include",
        }).then(async (res) => {
          isRefreshing = false;
          if (!res.ok) {
            // Refresh failed, likely session has truly expired
            throw new Error("Session expired. Please log in again.");
          }
          return res.json();
        }).catch((err) => {
          isRefreshing = false;
          refreshPromise = null;
          throw err;
        });
      }

      await refreshPromise;

      const retryResponse = await fetch(url, defaultOptions);
      return parseResponse(retryResponse);
    }

    return parseResponse(response);
  } catch (error: any) {
    if (error.message === "Session expired. Please log in again.") {
      throw error;
    }

    throw error;
  }
};
