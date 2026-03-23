import { create } from "zustand";
import { Socket } from "socket.io-client";

interface SocketState {
  isConnected: boolean;
  socket: Socket | null;
  messages: any[];
  agentStatuses: Record<string, { status: 'READY' | 'FAILED' | 'PROCESSING', reason?: string }>;
  currentBotRoom: string | null;
  setConnected: (connected: boolean) => void;
  setSocket: (socket: Socket | null) => void;
  addMessage: (message: any) => void;
  clearMessages: () => void;
  updateAgentStatus: (userAgentId: string, status: any) => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  isConnected: false,
  socket: null,
  messages: [],
  agentStatuses: {},
  currentBotRoom: null,
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
  joinRoom: (room: string) => {
    const { socket } = get();
    if (socket) {
      console.log("🔌 [Socket] Joining room:", room);
      socket.emit("joinRoom", { room });
      set({ currentBotRoom: room });
    }
  },
  leaveRoom: (room: string) => {
    const { socket } = get();
    if (socket) {
      console.log("🔌 [Socket] Leaving room:", room);
      socket.emit("leaveRoom", { room });
      set({ currentBotRoom: null });
    }
  },
}));
