/**
 * Global API wrapper for fetch with automatic 401 handling and token refresh.
 */

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include", // Ensure cookies are sent (HttpOnly)
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, defaultOptions);

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

      // Wait for the refresh to complete
      await refreshPromise;
      
      // Retry the original request
      return fetch(url, defaultOptions).then(async (res) => {
        const result = await res.json();
        if (!res.ok) throw result;
        return result;
      });
    }

    // Attempt to parse JSON even for non-ok responses to get error details
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    // If it's already our "Session expired" error, re-throw it
    if (error.message === "Session expired. Please log in again.") {
      // You might want to trigger a logout or redirect here if needed
      // window.location.href = '/login'; 
      throw error;
    }
    
    // Handle cases where response might not be JSON or other network errors
    throw error;
  }
};
