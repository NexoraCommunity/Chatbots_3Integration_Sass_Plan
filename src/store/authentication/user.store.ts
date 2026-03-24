import { create } from "zustand";
import { GetCurrentUser } from "../../model/authentication/user.model";
import { UserService } from "../../services/api-auth/user.route";
import { useAuthStore } from "./auth.store";

interface UserState {
  currentUser: GetCurrentUser | null;
  isLoading: boolean;
  error: string | null;

  fetchCurrentUser: () => Promise<void>;
  updateProfile: (id: string, data: Partial<GetCurrentUser>) => Promise<boolean>;
  changePassword: (data: any) => Promise<boolean>;
  updateTokenBalance: (newBalance: number) => void;
  fetchTokenBalance: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await UserService.getCurrentUser();
      if (response && response.data) {
        set({ currentUser: response.data, isLoading: false });
      } else {
        set({ error: "Failed to fetch user data", isLoading: false });
      }
    } catch (err: any) {
      set({ error: err.message || "An error occurred", isLoading: false });
    }
  },

  updateProfile: async (id: string, data: Partial<GetCurrentUser>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await UserService.updateUser(id, data);
      if (response && response.data) {
        set({ currentUser: response.data, isLoading: false });
        // Sync with AuthStore
        useAuthStore.getState().getCurrentUser(); 
        return true;
      }
      set({ error: "Failed to update profile", isLoading: false });
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to update profile", isLoading: false });
      return false;
    }
  },

  changePassword: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      await UserService.changePassword(data);
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Failed to change password", isLoading: false });
      return false;
    }
  },

  updateTokenBalance: (newBalance: number) => {
    set((state) => {
      if (!state.currentUser || !state.currentUser.userSubcription) return state;
      const subs = [...state.currentUser.userSubcription];
      if (subs.length > 0) {
        subs[0] = { ...subs[0], tokenRemain: newBalance };
        return { currentUser: { ...state.currentUser, userSubcription: subs } };
      }
      return state;
    });
  },

  fetchTokenBalance: async () => {
    try {
      const response = await UserService.getTokenBalance();
      if (response && response.data !== undefined) {
        useUserStore.getState().updateTokenBalance(response.data);
        useAuthStore.getState().updateTokenBalance(response.data);
      }
    } catch (err: any) {
      console.error("Failed to fetch token balance", err);
    }
  },
}));
