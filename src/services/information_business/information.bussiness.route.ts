import axiosInstance from "@/src/lib/axios";
import { BusinessInfoRequest, BusinessInfoResponse } from "@/src/model/information_business/business.model";

export const businessInfoService = {
  getBusinessInfo: async (): Promise<BusinessInfoResponse> => {
    const response = await axiosInstance.get("/api-backend/api/business-info");
    return response.data.data;
  },

  updateBusinessInfo: async (data: BusinessInfoRequest): Promise<BusinessInfoResponse> => {
    const response = await axiosInstance.patch("/api-backend/api/business-info", data);
    return response.data.data;
  },
};
