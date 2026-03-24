import { create } from "zustand";
import { businessInfoService } from "@/src/services/information_business/information.bussiness.route";
import { BusinessInfoRequest, BusinessInfoResponse } from "@/src/model/information_business/business.model";

interface BusinessInfoState {
  businessInfo: BusinessInfoResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchBusinessInfo: () => Promise<void>;
  updateBusinessInfo: (data: BusinessInfoRequest) => Promise<void>;
}

export const useBusinessInfoStore = create<BusinessInfoState>((set) => ({
  businessInfo: null,
  isLoading: false,
  error: null,

  fetchBusinessInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await businessInfoService.getBusinessInfo();
      set({ businessInfo: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch business information", isLoading: false });
    }
  },

  updateBusinessInfo: async (data: BusinessInfoRequest) => {
    set({ isLoading: true, error: null });
    try {
      const updatedData = await businessInfoService.updateBusinessInfo(data);
      set({ businessInfo: updatedData, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to update business information", isLoading: false });
    }
  },
}));
