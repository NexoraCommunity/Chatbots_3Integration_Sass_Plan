import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || "http://localhost:8080";

class SocketService {
  private static instance: SocketService;
  public socket: Socket | null = null;

  private constructor() { }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    if (this.socket) return this.socket;

    this.socket = io(ENDPOINT, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect", () => {
      console.log("🔌 Connected to Socket.io server:", ENDPOINT);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("🔌 Disconnected from Socket.io server:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.log("🔌 Socket.io Connection Error:", error.message);
    });

    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = SocketService.getInstance();
