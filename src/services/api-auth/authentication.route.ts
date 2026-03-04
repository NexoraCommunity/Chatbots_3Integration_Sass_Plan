import axios from "axios";
import {
  LoginProps,
  OtpCodeProps,
  PostCurrentUser,
  RegisterProps,
  UpdatePassworduser,
  VerifPassword,
} from "@/src/model/authentication.model";

export const Register = async (data: RegisterProps) => {
  try {
    const response = await axios.post(`/api-backend/auth/register`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const Login = async (data: LoginProps) => {
  try {
    const response = await axios.post(`/api-backend/auth/login`, data);
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const otpCode = async (data: OtpCodeProps) => {
  try {
    const response = await axios.post(
      `/api-backend/auth/otp-verification`,
      data,
    );
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const logOut = async () => {
  try {
    const response = await axios.post(`/api-backend/auth/logout`);
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.get(`/api-backend/auth/refresh`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`/api-backend/api/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUser = async (req: PostCurrentUser) => {
  const { id, ...user } = req;
  try {
    const response = await axios.patch(`/api-backend/api/user/${id}`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
export const verifPasswordOtp = async (req: VerifPassword) => {
  const { id, ...user } = req;
  try {
    const response = await axios.post(`/api-backend/api/user/sendOtp`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
export const forgotPassword = async (req: UpdatePassworduser) => {
  const { id, ...user } = req;
  try {
    const response = await axios.post(`/api-backend/api/user/forgotpassword`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const GoogleOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};

export const FacebookOauth = async () => {
  window.location.href = `/api-backend/auth/google/login`;
};
