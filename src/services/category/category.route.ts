import axiosInstance from "@/src/lib/axios";
import {
  CategoryApi,
  GetModelCategory,
  PaginationResponseCategory,
  SingleCategoryResponse
} from "../../model/category/category.model";

export const postCategory = async (data: CategoryApi): Promise<SingleCategoryResponse> => {
  const response = await axiosInstance.post(`/api-backend/api/admin/category`, data);
  return response.data;
};

export const getAllCategories = async (query: GetModelCategory): Promise<PaginationResponseCategory> => {
  const response = await axiosInstance.get(`/api-backend/api/category`, {
    params: query
  });
  return response.data;
};

export const patchCategory = async (id: string, data: CategoryApi): Promise<SingleCategoryResponse> => {
  const response = await axiosInstance.patch(`/api-backend/api/admin/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<any> => {
  const response = await axiosInstance.delete(`/api-backend/api/admin/category/${id}`);
  return response.data;
};
