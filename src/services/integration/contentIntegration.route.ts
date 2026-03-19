import {
  ContentIntegrationConfig,
  ContentIntegrationRequest,
  ContentIntegrationResponse,
} from "../../model/integration/contentIntegration.model";

export const getContentIntegrationById = async (
  id: string
): Promise<ContentIntegrationResponse> => {
  try {
    const response = await fetch(`/api-backend/api/contentIntegration/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const postContentIntegration = async (
  data: ContentIntegrationRequest
): Promise<ContentIntegrationResponse> => {
  try {
    const response = await fetch(`/api-backend/api/contentIntegration/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const patchContentIntegration = async (
  id: string,
  data: ContentIntegrationRequest
): Promise<ContentIntegrationResponse> => {
  try {
    const response = await fetch(`/api-backend/api/contentIntegration/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const deleteContentIntegration = async (
  id: string
): Promise<any> => {
  try {
    const response = await fetch(`/api-backend/api/contentIntegration/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};
