import { create } from "zustand";
import { uploadImage, uploadFile } from "../../services/upload/upload.route";
import { UploadResponse } from "../../model/upload/upload.model";

interface UploadState {
  isLoading: boolean;
  error: string | null;
  uploadedUrl: string | null;

  uploadImage: (file: File) => Promise<UploadResponse>;
  uploadFile: (file: File) => Promise<UploadResponse>;
  resetUpload: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  isLoading: false,
  error: null,
  uploadedUrl: null,

  uploadImage: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const response = await uploadImage(file);
      set({ uploadedUrl: response.data });
      return response;
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  uploadFile: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const response = await uploadFile(file);
      set({ uploadedUrl: response.data });
      return response;
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  resetUpload: () => set({ uploadedUrl: null, error: null, isLoading: false }),
}));
