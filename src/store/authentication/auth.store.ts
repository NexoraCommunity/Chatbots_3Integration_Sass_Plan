import { create } from "zustand";
import type {
  LoginProps,
  OtpCodeProps,
  PostCurrentUser,
  RegisterProps,
  UpdatePassworduser,
  User,
  VerifPassword,
} from "@/src/model/authentication/authentication.model";
import {
  getCurrentUser,
  Login,
  logOut,
  otpCode,
  refreshToken,
  Register,
  updateUser,
} from "../../services/api-auth/authentication.route";
import { UserService } from "../../services/api-auth/user.route";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (req: LoginProps) => Promise<any>;
  register: (req: RegisterProps) => Promise<any>;
  otpCode: (req: OtpCodeProps) => Promise<any>;
  logout: () => void;
  refreshToken: () => Promise<any>;
  forgotPassword: (req: UpdatePassworduser) => Promise<any>;
  verifPasswordOtp: (req: VerifPassword) => Promise<any>;
  updateUser: (req: PostCurrentUser) => Promise<any>;
  getCurrentUser: () => Promise<any>;
  updateTokenBalance: (newBalance: number) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (req: LoginProps) => {
    set({ isLoading: true });
    try {
      const data = await Login(req);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  register: async (req: RegisterProps) => {
    set({ isLoading: true });
    try {
      const data = await Register(req);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  otpCode: async (req: OtpCodeProps) => {
    set({ isLoading: true });
    try {
      const data = await otpCode(req);
      set({
        isAuthenticated: true,
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      const data = await logOut();
      set({
        user: null,
        isAuthenticated: false,
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const data = await refreshToken();
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const data = await getCurrentUser();
      set({
        user: data.data,
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  forgotPassword: async (req: UpdatePassworduser) => {
    set({ isLoading: true });
    try {
      const data = await UserService.updatePassword(req);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  verifPasswordOtp: async (req: VerifPassword) => {
    set({ isLoading: true });
    try {
      const data = await UserService.sendOtp(req as any);
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (req: PostCurrentUser) => {
    set({ isLoading: true });
    try {
      const data = await updateUser(req);
      set({
        user: data.data,
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateTokenBalance: (newBalance: number) => {
    set((state) => {
      if (!state.user || !state.user.userSubcription) return state;
      const subs = [...state.user.userSubcription];
      if (subs.length > 0) {
        subs[0] = { ...subs[0], tokenRemain: newBalance };
        return { user: { ...state.user, userSubcription: subs } };
      }
      return state;
    });
  },
}));
