import axiosInstance from "@/src/lib/axios";
import {
  ChangeUserAgent,
  GetModelUserAgent,
  PostUserAgent,
  PaginationResponseUserAgent,
  UserAgentResponseById,
  UserAgentApi,
} from "../../model/userAgent/userAgent.model";

export const getAllUserAgents = async (
  query: GetModelUserAgent
): Promise<PaginationResponseUserAgent> => {
  const response = await axiosInstance.get(`/api-backend/api/userAgent`, {
    params: {
      ...query,
    }
  });
  return response.data;
};

export const getAdminUserAgents = async (
  query: GetModelUserAgent
): Promise<PaginationResponseUserAgent> => {
  const response = await axiosInstance.get(`/api-backend/api/admin/userAgent`, {
    params: {
      ...query,
    }
  });
  return response.data;
};

export const getUserAgentById = async (
  id: string
): Promise<UserAgentResponseById> => {
  const response = await axiosInstance.get(`/api-backend/api/userAgent/${id}`);
  return response.data;
};

export const postUserAgent = async (
  data: PostUserAgent
): Promise<UserAgentResponseById> => {
  const response = await axiosInstance.post(`/api-backend/api/userAgent`, data);
  return response.data;
};

export const patchUserAgent = async (
  id: string,
  data: ChangeUserAgent
): Promise<UserAgentResponseById> => {
  const response = await axiosInstance.patch(`/api-backend/api/userAgent/${id}`, data);
  return response.data;
};

export const deleteUserAgent = async (
  id: string
): Promise<any> => {
  const response = await axiosInstance.delete(`/api-backend/api/userAgent/${id}`);
  return response.data;
};
