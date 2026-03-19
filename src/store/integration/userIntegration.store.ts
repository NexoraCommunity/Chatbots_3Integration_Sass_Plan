import { create } from "zustand";
import {
  PatchUserIntegration,
  PostUserIntegration,
  UserIntegration,
} from "../../model/integration/userIntegration.model";
import {
  getUserIntegration,
  patchUserIntegration,
  postUserIntegration,
} from "../../services/integration/userIntegration.route";
import { refreshToken } from "../../services/api-auth/authentication.route";

interface UserIntegrationState {
  userIntegrations: UserIntegration[];
  isLoading: boolean;

  getAllIntegration: (userId: string) => Promise<any>;
  toggleUserIntegration: (id: string, isconnected: boolean) => Promise<any>;
}

export const useUserIntegrationStore = create<UserIntegrationState>()(
  (set, get) => ({
    userIntegrations: [],
    isLoading: false,

    getAllIntegration: async (userId: string) => {
      set({ isLoading: true });
      try {
        const response: any = await getUserIntegration(userId);

        let rawData = response.data || response;
        if (!Array.isArray(rawData) && response && typeof response === 'object') {
          rawData = response.items || response.integrations || [];
        }

        const mappedData: UserIntegration[] = (Array.isArray(rawData) ? rawData : []).map((item: any) => {
          let type = item.type;
          if (!type) {
            const name = (item.name || item.provider || "").toLowerCase();
            if (name.includes("whatsapp") || name.includes("baileys") || name.includes("botfather") || name.includes("telegram") || name.includes("website")) {
              type = "chatPlatform";
            } else if (name.includes("xendit") || name.includes("midtrans")) {
              type = "paymentGateway";
            } else if (name.includes("rajaongkir") || name.includes("jnt") || name.includes("shipping")) {
              type = "shipping";
            }
          }

          return {
            ...item,
            id: String(item.id),
            type: type || item.type,
            name: item.name || item.provider || "Unknown",
          };
        });

        set({
          userIntegrations: mappedData,
        });
        return response;
      } catch (error: any) {
        if (error?.status === 401 || error?.statusCode === 401 || error?.message?.includes("401")) {
          try {
            await refreshToken();
            const retryResponse: any = await getUserIntegration(userId);
            let rawData = retryResponse.data || retryResponse;
            if (!Array.isArray(rawData) && retryResponse && typeof retryResponse === 'object') {
              rawData = retryResponse.items || retryResponse.integrations || [];
            }
            const mappedData: UserIntegration[] = (Array.isArray(rawData) ? rawData : []).map((item: any) => {
              let type = item.type;
              if (!type) {
                const name = (item.name || item.provider || "").toLowerCase();
                if (name.includes("whatsapp") || name.includes("baileys") || name.includes("botfather") || name.includes("telegram") || name.includes("website")) type = "chatPlatform";
                else if (name.includes("xendit") || name.includes("midtrans")) type = "paymentGateway";
                else if (name.includes("rajaongkir") || name.includes("jnt") || name.includes("shipping")) type = "shipping";
              }
              return { ...item, id: String(item.id), type: type || item.type, name: item.name || item.provider || "Unknown" };
            });
            set({ userIntegrations: mappedData });
            return retryResponse;
          } catch (refreshError) {
            throw refreshError;
          }
        }
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    toggleUserIntegration: async (id: string, isconnected: boolean) => {
      set({ isLoading: true });
      try {
        const data = await patchUserIntegration(id, { isconnected });
        set((state) => ({
          userIntegrations: state.userIntegrations.map((item) =>
            item.id === id ? { ...item, isconnected } : item
          ),
        }));
        return data;
      } catch (error) {
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
