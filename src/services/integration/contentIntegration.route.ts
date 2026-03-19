import {
  ContentIntegrationConfig,
  ContentIntegrationRequest,
  ContentIntegrationResponse,
} from "../../model/integration/contentIntegration.model";
import { apiFetch } from "@/src/lib/api";

export const getContentIntegrationById = async (
  id: string
): Promise<ContentIntegrationResponse> => {
  return apiFetch(`/api-backend/api/contentIntegration/${id}`, {
    method: "GET",
  });
};

export const postContentIntegration = async (
  data: ContentIntegrationRequest
): Promise<ContentIntegrationResponse> => {
  return apiFetch(`/api-backend/api/contentIntegration/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const patchContentIntegration = async (
  id: string,
  data: ContentIntegrationRequest
): Promise<ContentIntegrationResponse> => {
  return apiFetch(`/api-backend/api/contentIntegration/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteContentIntegration = async (
  id: string
): Promise<any> => {
  return apiFetch(`/api-backend/api/contentIntegration/${id}`, {
    method: "DELETE",
  });
};

