import { create } from "zustand";
import {
  PostUserIntegration,
  UserIntegration,
} from "../../model/integration/userIntegration.model";
import {
  getUserIntegration,
  postUserIntegration,
} from "../../services/integration/userIntegration.route";

interface UserIntegrationState {
  userIntegrations: UserIntegration[];
  isLoading: boolean;

  fetchUserIntegrations: (userId: string) => Promise<any>;
  updateUserIntegration: (req: PostUserIntegration) => Promise<any>;
}

export const useUserIntegrationStore = create<UserIntegrationState>()((set, get) => ({
  userIntegrations: [],
  isLoading: false,

  fetchUserIntegrations: async (userId: string) => {
    set({ isLoading: true });
    try {
      const response: any = await getUserIntegration(userId);
      
      const mappedData: UserIntegration[] = response?.data?.map((item: any) => {
        // Determine type based on contentIntegrations or provider name
        let type = item.contentIntegrations?.[0]?.type;
        
        if (!type) {
          const provider = item.provider?.toLowerCase() || "";
          if (provider.includes("whatsapp") || provider === "baileys" || provider === "botfather" || provider === "website") {
            type = "chatPlatform";
          } else if (provider === "xendit" || provider === "midtrans") {
            type = "paymentGateway";
          } else if (provider === "rajaongkir" || provider === "jnt") {
            type = "shipping";
          } else {
            type = "unknown";
          }
        }

        return {
          ...item,
          name: item.provider, // Map provider to name for UI usage
          type: type,          // Map type for UI filtering
        };
      }) || [];

      set({
        userIntegrations: mappedData,
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserIntegration: async (req: PostUserIntegration) => {
    if (req.isconnected === false) {
      throw new Error("Cannot deactivate when the integration is active.");
    }

    set({ isLoading: true });
    try {
      const data = await postUserIntegration(req);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
