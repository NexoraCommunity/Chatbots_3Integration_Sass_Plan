import axiosInstance from "@/src/lib/axios";
import {
  GetCurrentUser,
  PostCurrentUser,
  WebResponse,
  UpdatePassworduser,
  VerificationRequest,
  ChangePasswordRequest,
} from "../../model/authentication/user.model";

export class UserService {
  static async getCurrentUser(): Promise<WebResponse<GetCurrentUser>> {
    const response = await axiosInstance.get("/api-backend/api/user");
    return response.data;
  }

  static async getTokenBalance(): Promise<WebResponse<number>> {
    const response = await axiosInstance.get("/api-backend/api/user/token-balance");
    return response.data;
  }

  static async updateUser(
    userId: string,
    body: Partial<PostCurrentUser>
  ): Promise<WebResponse<GetCurrentUser>> {
    const response = await axiosInstance.patch(`/api-backend/api/user/${userId}`, body);
    return response.data;
  }

  static async updatePassword(body: UpdatePassworduser): Promise<any> {
    const response = await axiosInstance.post("/api-backend/user/forgotPassword", body);
    return response.data;
  }

  static async sendOtp(body: VerificationRequest): Promise<any> {
    const response = await axiosInstance.post("/api-backend/user/sendOtp", body);
    return response.data;
  }

  static async changePassword(body: ChangePasswordRequest): Promise<any> {
    const response = await axiosInstance.post("/api-backend/api/user/changePassword", body);
    return response.data;
  }

  static async deleteUser(userId: string): Promise<WebResponse<boolean>> {
    const response = await axiosInstance.delete(`/api-backend/api/admin/user/${userId}`);
    return response.data;
  }
}
