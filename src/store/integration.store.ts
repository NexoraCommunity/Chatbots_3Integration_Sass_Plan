import { create } from "zustand";
import { getAllIntegration } from "../services/integration/integration.route";

interface IntegrationState {
  getAllIntegration: () => Promise<any>;
}

export const useIntegrationStore = create<IntegrationState>()((set) => ({
  getAllIntegration: async () => {
    try {
      const data = await getAllIntegration();
      return data;
    } catch (error) {
      throw error;
    }
  },
}));
