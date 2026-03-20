import { create } from "zustand";
import {
  ChangeUserAgent,
  GetModelUserAgent,
  PostUserAgent,
  UserAgentApi,
} from "../../model/userAgent/userAgent.model";
import {
  deleteUserAgent,
  getAdminUserAgents,
  getAllUserAgents,
  getUserAgentById,
  patchUserAgent,
  postUserAgent,
} from "../../services/userAgent/userAgent.route";

interface UserAgentState {
  userAgents: UserAgentApi[];
  adminUserAgents: UserAgentApi[];
  currentUserAgent: UserAgentApi | null;
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  fetchUserAgents: (query: GetModelUserAgent) => Promise<any>;
  fetchAdminUserAgents: (query: GetModelUserAgent) => Promise<any>;
  fetchUserAgentById: (id: string) => Promise<any>;
  addUserAgent: (data: PostUserAgent) => Promise<any>;
  updateUserAgent: (id: string, data: ChangeUserAgent) => Promise<any>;
  removeUserAgent: (id: string) => Promise<any>;
}

export const useUserAgentStore = create<UserAgentState>()((set) => ({
  userAgents: [],
  adminUserAgents: [],
  currentUserAgent: null,
  isLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },

  fetchUserAgents: async (query: GetModelUserAgent) => {
    set({ isLoading: true });
    try {
      const response = await getAllUserAgents(query);

      const paginationData = response.pagination;
      const rawUserAgents = Array.isArray(response.data) ? response.data : [];

      // Normalize vectoreStatus typo from backend
      const userAgents = rawUserAgents.map((agent: any) => ({
        ...agent,
        vectorStatus: agent.vectorStatus || agent.vectoreStatus || "UNKNOWN"
      }));

      set({
        userAgents: userAgents,
        pagination: {
          page: Number(paginationData?.page || query.page || 1),
          pageSize: Number(paginationData?.pageSize || query.limit || 10),
          totalItems: Number(paginationData?.totalItems || userAgents.length || 0),
          totalPages: Number(paginationData?.totalPages || (userAgents.length > 0 ? 1 : 0)),
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching user agents");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAdminUserAgents: async (query: GetModelUserAgent) => {
    set({ isLoading: true });
    try {
      const response = await getAdminUserAgents(query);

      const paginationData = response.pagination;
      const userAgents = Array.isArray(response.data) ? response.data : [];

      set({
        adminUserAgents: userAgents,
        pagination: {
          page: Number(paginationData?.page || query.page || 1),
          pageSize: Number(paginationData?.pageSize || query.limit || 10),
          totalItems: Number(paginationData?.totalItems || userAgents.length || 0),
          totalPages: Number(paginationData?.totalPages || (userAgents.length > 0 ? 1 : 0)),
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching admin user agents");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserAgentById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await getUserAgentById(id);
      set({ currentUserAgent: response.data as any });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching user agent details");
    } finally {
      set({ isLoading: false });
    }
  },

  addUserAgent: async (data: PostUserAgent) => {
    set({ isLoading: true });
    try {
      const response = await postUserAgent(data);
      return response;
    } catch (error: any) {
      const serverMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      console.error("Agent creation failed:", error.response?.data || error);
      throw new Error(serverMessage || "An error occurred while adding user agent");
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserAgent: async (id: string, data: ChangeUserAgent) => {
    set({ isLoading: true });
    try {
      const response = await patchUserAgent(id, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while updating user agent");
    } finally {
      set({ isLoading: false });
    }
  },

  removeUserAgent: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await deleteUserAgent(id);
      set((state) => ({
        userAgents: state.userAgents.filter((a) => a.id !== id),
        adminUserAgents: state.adminUserAgents.filter((a) => a.id !== id),
      }));
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while deleting user agent");
    } finally {
      set({ isLoading: false });
    }
  },
}));
