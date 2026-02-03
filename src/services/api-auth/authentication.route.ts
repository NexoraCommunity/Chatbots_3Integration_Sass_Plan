import axios from "axios";
import {
  LoginProps,
  OtpCodeProps,
  RegisterProps,
} from "@/src/model/authentication.model";
const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

export const Register = async (data: RegisterProps) => {
  try {
    const response = await axios.post(`${endpoint}/auth/register`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const Login = async (data: LoginProps) => {
  try {
    const response = await axios.post(`${endpoint}/auth/login`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const otpCode = async (data: OtpCodeProps) => {
  try {
    const response = await axios.post(
      `${endpoint}/auth/otp-verification`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logOut = async () => {
  try {
    const response = await axios.post(`${endpoint}/auth/logout`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.get(`${endpoint}/auth/refresh`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GoogleOauth = async () => {
  window.location.href = `${endpoint}/auth/google/login`;
};

export const FacebookOauth = async () => {
  window.location.href = `${endpoint}/auth/google/login`;
};
