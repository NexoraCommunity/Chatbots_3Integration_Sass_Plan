import axios from "axios";
import {
    PostUserIntegration,
    UserIntegration,
} from "../../model/integration/userIntegration.model";

export const getUserIntegration = async (
    userId: string
): Promise<UserIntegration[]> => {
    try {
        const response = await axios.get<UserIntegration[]>(
            `/api-backend/api/userIntegration`,
            {
                params: { userId },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        throw error?.response.data;
    }
};

export const postUserIntegration = async (
    req: PostUserIntegration
): Promise<any> => {
    try {
        const response = await axios.post(
            `/api-backend/api/userIntegration`,
            req,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        throw error?.response.data;
    }
};