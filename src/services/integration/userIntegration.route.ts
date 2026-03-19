import {
  PatchUserIntegration,
  PostUserIntegration,
  UserIntegrationResponse,
} from "../../model/integration/userIntegration.model";
import { apiFetch } from "@/src/lib/api";

export const getUserIntegration = async (
  userId: string
): Promise<UserIntegrationResponse> => {
  return apiFetch(`/api-backend/api/userIntegration?userId=${userId}`, {
    method: "GET",
  });
};

export const postUserIntegration = async (
  req: PostUserIntegration
): Promise<any> => {
  return apiFetch(`/api-backend/api/userIntegration`, {
    method: "POST",
    body: JSON.stringify(req),
  });
};

export const patchUserIntegration = async (
  id: string,
  req: PatchUserIntegration
): Promise<any> => {
  return apiFetch(`/api-backend/api/userIntegration/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
};