import { create } from "zustand";
import { Bot, BotApi, changeBot, GetModelbot, postBot, startBot } from "../../model/bot/bot.model";
import {
  addNewBot,
  deleteBot,
  editBot,
  getAdminBots,
  getBots,
  getBotById
} from "../../services/bot/bot.route";
import { useSocketStore } from "../socket/useSocketStore";
import { BotLog } from "../../model/bot/bot.model";

interface BotState {
  bots: Bot[];
  adminBots: Bot[];
  currentBot: Bot | null;
  isLoading: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };

  fetchBots: (query: GetModelbot) => Promise<any>;
  fetchAdminBots: (query: GetModelbot) => Promise<any>;
  fetchBotById: (id: string) => Promise<any>;
  addBot: (data: postBot) => Promise<any>;
  updateBot: (id: string, data: changeBot) => Promise<any>;
  removeBot: (id: string) => Promise<any>;
  toggleBotStatus: (req: startBot, currentStatus: boolean) => Promise<any>;
  updateBotConnectionStatus: (botId: string, isActive: boolean) => void;
  
  logs: Record<string, BotLog[]>;
  addLog: (botId: string, log: BotLog) => void;
  clearLogs: (botId: string) => void;
}

export const useBotStore = create<BotState>()((set, get) => ({
  bots: [],
  adminBots: [],
  currentBot: null,
  isLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
  logs: {},

  fetchBots: async (query: GetModelbot) => {
    set({ isLoading: true });
    try {
      const response = await getBots(query);
      const paginationData = response.pagination;
      const bots = Array.isArray(response.data) ? response.data : [];

      set({
        bots,
        pagination: {
          page: Number(paginationData?.page || query.page || 1),
          pageSize: Number(paginationData?.pageSize || query.limit || 10),
          totalItems: Number(paginationData?.totalItems || bots.length || 0),
          totalPages: Number(paginationData?.totalPages || (bots.length > 0 ? 1 : 0)),
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching bots");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAdminBots: async (query: GetModelbot) => {
    set({ isLoading: true });
    try {
      const response = await getAdminBots(query);
      const paginationData = response.pagination;
      const adminBots = Array.isArray(response.data) ? response.data : [];

      set({
        adminBots,
        pagination: {
          page: Number(paginationData?.page || query.page || 1),
          pageSize: Number(paginationData?.pageSize || query.limit || 10),
          totalItems: Number(paginationData?.totalItems || adminBots.length || 0),
          totalPages: Number(paginationData?.totalPages || (adminBots.length > 0 ? 1 : 0)),
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching admin bots");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchBotById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await getBotById(id);
      set({ currentBot: response.data as any });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while fetching bot details");
    } finally {
      set({ isLoading: false });
    }
  },

  addBot: async (data: postBot) => {
    set({ isLoading: true });
    try {
      const response = await addNewBot(data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while adding bot");
    } finally {
      set({ isLoading: false });
    }
  },

  updateBot: async (id: string, data: changeBot) => {
    set({ isLoading: true });
    try {
      const response = await editBot(id, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while updating bot");
    } finally {
      set({ isLoading: false });
    }
  },

  removeBot: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await deleteBot(id);
      set((state) => ({
        bots: state.bots.filter((b) => b.id !== id),
        adminBots: state.adminBots.filter((b) => b.id !== id),
      }));
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "An error occurred while deleting bot");
    } finally {
      set({ isLoading: false });
    }
  },

  toggleBotStatus: async (req: startBot, currentStatus: boolean) => {
    const socket = useSocketStore.getState().socket;
    if (!socket) throw new Error("Socket not connected");

    const eventName = currentStatus ? "disableBot" : "startBot";

    const payload = req.type === "baileys"
      ? { botId: req.botId, type: req.type, agentId: req.agentId }
      : req;

    socket.emit(eventName, payload);

    set((state) => ({
      bots: state.bots.map((b) =>
        b.id === req.botId ? { ...b, isActive: !currentStatus } : b
      )
    }));
  },

  updateBotConnectionStatus: (botId: string, isActive: boolean) => {
    set((state) => ({
      bots: state.bots.map((b) =>
        b.id === botId ? { ...b, isActive } : b
      )
    }));
  },

  addLog: (botId: string, log: BotLog) => {
    set((state) => {
      const botLogs = state.logs[botId] || [];
      return {
        logs: {
          ...state.logs,
          [botId]: [log, ...botLogs].slice(0, 50), // Keep last 50 logs
        },
      };
    });
  },

  clearLogs: (botId: string) => {
    set((state) => ({
      logs: {
        ...state.logs,
        [botId]: [],
      },
    }));
  },
}));
