import { Integration } from "../../model/integration/integration.model";

export const getAllIntegration = async (): Promise<Integration[]> => {
  try {
    const response = await fetch(`/api-backend/api/integration`, {
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
