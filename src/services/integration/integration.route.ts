import { Integration } from "../../model/integration/integration.model";
import { apiFetch } from "@/src/lib/api";

export const getAllIntegration = async (): Promise<Integration[]> => {
  return apiFetch(`/api-backend/api/integration`, {
    method: "GET",
  });
};

