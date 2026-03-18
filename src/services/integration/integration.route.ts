import axios from "axios";
import { Integration } from "../../model/integration/integration.model";

export const getAllIntegration = async (): Promise<Integration[]> => {
  try {
    const response = await axios.get<Integration[]>(`/api-backend/api/integration`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
