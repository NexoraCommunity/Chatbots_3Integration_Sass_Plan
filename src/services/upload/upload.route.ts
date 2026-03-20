import { apiFetch } from "@/src/lib/api";
import { UploadResponse } from "../../model/upload/upload.model";

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetch(`/api-backend/api/upload/image`, {
    method: "POST",
    body: formData,
  });

  return { status: "success", data: response };
};


export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetch(`/api-backend/api/upload/file`, {
    method: "POST",
    body: formData,
  });

  return { status: "success", data: response };
};
