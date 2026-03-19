import {
  LoginProps,
  OtpCodeProps,
  PostCurrentUser,
  RegisterProps,
  UpdatePassworduser,
  VerifPassword,
} from "@/src/model/authentication/authentication.model";

export const Register = async (data: RegisterProps) => {
  try {
    const response = await fetch(`/api-backend/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const Login = async (data: LoginProps) => {
  try {
    const response = await fetch(`/api-backend/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const otpCode = async (data: OtpCodeProps) => {
  try {
    const response = await fetch(`/api-backend/auth/otp-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await fetch(`/api-backend/auth/logout`, {
      method: "POST",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
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
  try {
    const response = await fetch(`/api-backend/api/user`, {
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

export const updateUser = async (req: PostCurrentUser) => {
  const { id, ...user } = req;
  try {
    const response = await fetch(`/api-backend/api/user/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const verifPasswordOtp = async (req: VerifPassword) => {
  const { id, ...user } = req;
  try {
    const response = await fetch(`/api-backend/api/user/sendOtp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (req: UpdatePassworduser) => {
  const { id, ...user } = req;
  try {
    const response = await fetch(`/api-backend/api/user/forgotpassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) throw result;
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const GoogleOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};

export const FacebookOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};
