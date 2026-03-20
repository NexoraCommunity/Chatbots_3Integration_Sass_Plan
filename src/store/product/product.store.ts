import { create } from "zustand";
import {
  ChangeProduct,
  GetModelProduct,
  PostProduct,
  ProductApi,
} from "../../model/product/product.model";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  patchProduct,
  postProduct,
  updateProductStatus,
} from "../../services/product/product.route";

interface ProductState {
  products: ProductApi[];
  currentProduct: ProductApi | null;
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  fetchProducts: (query: GetModelProduct) => Promise<any>;
  fetchProductById: (id: string) => Promise<any>;
  addProduct: (data: PostProduct) => Promise<any>;
  updateProduct: (id: string, data: ChangeProduct) => Promise<any>;
  updateStatus: (id: string, isActive: boolean) => Promise<any>;
  removeProduct: (id: string) => Promise<any>;
}

export const useProductStore = create<ProductState>()((set) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  fetchProducts: async (query: GetModelProduct) => {
    set({ isLoading: true });
    try {
      const response = await getAllProducts(query) as any;
      
      // Extract pagination details from various possible sources
      const paginationData = response.pagination || response;
      const products = Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
      
      set({
        products: products,
        pagination: {
          page: Number(paginationData?.page || paginationData?.current_page || query.page || 1),
          pageSize: Number(paginationData?.pageSize || paginationData?.page_size || paginationData?.limit || query.limit || 10),
          totalItems: Number(paginationData?.totalItems || paginationData?.total_items || paginationData?.total || products.length || 0),
          totalPages: Number(paginationData?.totalPages || paginationData?.total_pages || paginationData?.last_page || (products.length > 0 ? 1 : 0)),
        },
      });
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await getProductById(id);
      set({ currentProduct: response.data });
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (data: PostProduct) => {
    set({ isLoading: true });
    try {
      const response = await postProduct(data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id: string, data: ChangeProduct) => {
    set({ isLoading: true });
    try {
      const response = await patchProduct(id, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeProduct: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateStatus: async (id: string, isActive: boolean) => {
    set({ isLoading: true });
    try {
      const response = await updateProductStatus(id, isActive);
      // Update local state to reflect change immediately
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, isActive } : p
        ),
      }));
      return response;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
