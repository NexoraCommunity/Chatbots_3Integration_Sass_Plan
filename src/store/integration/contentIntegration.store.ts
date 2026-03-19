import { create } from "zustand";
import {
  ContentIntegration,
  ContentIntegrationConfig,
} from "../../model/integration/contentIntegration.model";
import {
  deleteContentIntegration,
  getContentIntegrationById,
  patchContentIntegration,
  postContentIntegration,
} from "../../services/integration/contentIntegration.route";

interface ContentIntegrationState {
  currentContentIntegration: ContentIntegration | null;
  isLoading: boolean;
  error: string | null;

  getById: (id: string) => Promise<any>;
  create: (type: string, config: ContentIntegrationConfig, userIntegrationId?: string) => Promise<any>;
  update: (id: string, type: string, config: ContentIntegrationConfig) => Promise<any>;
  remove: (id: string) => Promise<any>;
}

const parseErrorMessage = (err: any): string => {
  if (typeof err === "string") {
    try {
      const parsed = JSON.parse(err);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].message || "Validation error occurred";
      }
    } catch (e) {
      return err;
    }
  }
  if (err?.error && typeof err.error === "string") {
    try {
      const parsed = JSON.parse(err.error);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed[0].message || "Validation error occurred";
      }
    } catch (e) {
       return err.error;
    }
  }
  return err?.message || "An unexpected error occurred";
};

export const useContentIntegrationStore = create<ContentIntegrationState>()(
  (set) => ({
    currentContentIntegration: null,
    isLoading: false,
    error: null,

    getById: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await getContentIntegrationById(id);
        set({ currentContentIntegration: response.data });
        return response;
      } catch (err: any) {
        const msg = parseErrorMessage(err);
        set({ error: msg });
        throw new Error(msg);
      } finally {
        set({ isLoading: false });
      }
    },

    create: async (type: string, config: ContentIntegrationConfig, userIntegrationId?: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await postContentIntegration({
          type,
          configJson: config,
          userIntegrationId,
        });
        return response;
      } catch (err: any) {
        const msg = parseErrorMessage(err);
        set({ error: msg });
        throw new Error(msg);
      } finally {
        set({ isLoading: false });
      }
    },

    update: async (id: string, type: string, config: ContentIntegrationConfig) => {
      set({ isLoading: true, error: null });
      try {
        const response = await patchContentIntegration(id, {
          type,
          configJson: config,
        });
        set({ currentContentIntegration: response.data });
        return response;
      } catch (err: any) {
        const msg = parseErrorMessage(err);
        set({ error: msg });
        throw new Error(msg);
      } finally {
        set({ isLoading: false });
      }
    },

    remove: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await deleteContentIntegration(id);
        set({ currentContentIntegration: null });
        return response;
      } catch (err: any) {
        const msg = parseErrorMessage(err);
        set({ error: msg });
        throw new Error(msg);
      } finally {
        set({ isLoading: false });
      }
    },
  })
);
