import { create } from "zustand";
import { 
  Category, 
  CategoryApi, 
  GetModelCategory 
} from "../../model/category/category.model";
import { 
  deleteCategory, 
  getAllCategories, 
  patchCategory, 
  postCategory 
} from "../../services/category/category.route";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  } | null;

  fetchCategories: (query: GetModelCategory) => Promise<any>;
  addCategory: (data: CategoryApi) => Promise<any>;
  updateCategory: (id: string, data: CategoryApi) => Promise<any>;
  removeCategory: (id: string) => Promise<any>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  isLoading: false,
  pagination: null,

  fetchCategories: async (query: GetModelCategory) => {
    set({ isLoading: true });
    try {
      const response = await getAllCategories(query);
      set({ 
        categories: response?.data || [],
        pagination: response?.pagination || null
      });
      return response;
    } catch (error) {
      console.error("Fetch categories failed", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  addCategory: async (data: CategoryApi) => {
    set({ isLoading: true });
    try {
      const response = await postCategory(data);
      return response;
    } catch (error) {
      console.error("Add category failed", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (id: string, data: CategoryApi) => {
    set({ isLoading: true });
    try {
      const response = await patchCategory(id, data);
      return response;
    } catch (error) {
      console.error("Update category failed", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeCategory: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((c) => c.id !== id)
      }));
      return response;
    } catch (error) {
      console.error("Delete category failed", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
