import {
  PatchUserIntegration,
  PostUserIntegration,
  UserIntegrationResponse,
} from "../../model/integration/userIntegration.model";

export const getUserIntegration = async (
  userId: string
): Promise<UserIntegrationResponse> => {
  try {
    const response = await fetch(`/api-backend/api/userIntegration?userId=${userId}`, {
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

export const postUserIntegration = async (
  req: PostUserIntegration
): Promise<any> => {
  try {
    const response = await fetch(`/api-backend/api/userIntegration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const patchUserIntegration = async (
  id: string,
  req: PatchUserIntegration
): Promise<any> => {
  try {
    const response = await fetch(`/api-backend/api/userIntegration/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};