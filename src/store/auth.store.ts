import { create } from "zustand";
import type {
  LoginProps,
  OtpCodeProps,
  User,
} from "@/src/model/authentication.model";
import {
  Login,
  logOut,
  otpCode,
  refreshToken,
} from "../services/api-auth/authentication.route";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (req: LoginProps) => Promise<void | unknown>;
  otpCode: (req: OtpCodeProps) => Promise<void>;
  logout: () => void;
  refreshToken: (refreshToken: string) => Promise<void>;
  forgotPassword: () => Promise<void>;
  verifPasswordOtp: () => Promise<void>;
  updateUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  errorMessage: "",

  login: async (req: LoginProps) => {
    set({ isLoading: true });
    try {
      const data = await Login(req);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: false,
      });
    } catch (error) {
      return error;
    } finally {
      set({ isLoading: false });
    }
  },
  otpCode: async (req: OtpCodeProps) => {
    set({ isLoading: true });
    try {
      const data = await otpCode(req);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    await logOut();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  refreshToken: async () => {
    await refreshToken();
  },
  forgotPassword: async () => {},
  verifPasswordOtp: async () => {},
  updateUser: async () => {},
}));
