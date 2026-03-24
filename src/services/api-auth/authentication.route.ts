import {
  LoginProps,
  OtpCodeProps,
  PostCurrentUser,
  RegisterProps,
  VerifPassword,
} from "@/src/model/authentication/authentication.model";
import { apiFetch } from "@/src/lib/api";

export const Register = async (data: RegisterProps) => {
  return apiFetch(`/api-backend/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const Login = async (data: LoginProps) => {
  return apiFetch(`/api-backend/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const otpCode = async (data: OtpCodeProps) => {
  return apiFetch(`/api-backend/auth/otp-verification`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logOut = async () => {
  return apiFetch(`/api-backend/auth/logout`, {
    method: "POST",
  });
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`/api-backend/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  return apiFetch(`/api-backend/api/user`, {
    method: "GET",
  });
};

export const updateUser = async (req: PostCurrentUser) => {
  const { id, ...user } = req;
  return apiFetch(`/api-backend/api/user/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};

export const verifPasswordOtp = async (req: VerifPassword) => {
  const { id, ...user } = req;
  return apiFetch(`/api-backend/api/user/sendOtp`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};


export const GoogleOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};

export const FacebookOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};
