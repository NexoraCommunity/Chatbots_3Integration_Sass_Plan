import axiosInstance from "@/src/lib/axios";
import {
  ChangeProduct,
  GetModelProduct,
  PostProduct,
  ProductResponse,
  SingleProductResponse,
} from "../../model/product/product.model";

export const getAllProducts = async (
  query: GetModelProduct
): Promise<ProductResponse> => {
  const { categoryId, name, isActive, price, sku, page, limit, userId } = query;

  const response = await axiosInstance.get(`/api-backend/api/product`, {
    params: {
      ...query,
      q: name || undefined,
      search: name || undefined,
      name: name || undefined,
      category_id: categoryId || undefined,
      is_active: isActive || undefined,
      isActive: isActive || undefined,
      status: isActive || undefined,
    }
  });
  return response.data;
};

export const getProductById = async (
  id: string
): Promise<SingleProductResponse> => {
  const response = await axiosInstance.get(`/api-backend/api/product/${id}`);
  return response.data;
};

export const postProduct = async (
  data: PostProduct
): Promise<SingleProductResponse> => {
  const response = await axiosInstance.post(`/api-backend/api/product`, data);
  return response.data;
};

export const patchProduct = async (
  id: string,
  data: ChangeProduct
): Promise<SingleProductResponse> => {
  const response = await axiosInstance.patch(`/api-backend/api/product/${id}`, data);
  return response.data;
};

export const deleteProduct = async (
  id: string
): Promise<any> => {
  const response = await axiosInstance.delete(`/api-backend/api/product/${id}`);
  return response.data;
};

export const updateProductStatus = async (
  id: string,
  isActive: boolean
): Promise<SingleProductResponse> => {
  const response = await axiosInstance.patch(`/api-backend/api/product/status`, {
    id,
    isActive,
  });
  return response.data;
};
