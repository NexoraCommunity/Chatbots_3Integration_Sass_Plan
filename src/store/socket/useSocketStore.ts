import { create } from "zustand";
import { Socket } from "socket.io-client";

interface SocketState {
  isConnected: boolean;
  socket: Socket | null;
  messages: any[];
  agentStatuses: Record<string, { status: 'READY' | 'FAILED' | 'PROCESSING', reason?: string }>;
  setConnected: (connected: boolean) => void;
  setSocket: (socket: Socket | null) => void;
  addMessage: (message: any) => void;
  clearMessages: () => void;
  updateAgentStatus: (userAgentId: string, status: any) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  isConnected: false,
  socket: null,
  messages: [],
  agentStatuses: {},
  setConnected: (connected) => set({ isConnected: connected }),
  setSocket: (socket) => set({ socket }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  updateAgentStatus: (userAgentId, status) => set((state) => ({
    agentStatuses: {
      ...state.agentStatuses,
      [userAgentId]: status
    }
  })),
}));
