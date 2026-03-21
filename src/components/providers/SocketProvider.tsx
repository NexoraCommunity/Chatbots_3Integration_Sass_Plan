"use client";

import React, { useEffect } from "react";
import { socketService } from "@/src/lib/socket";
import { useSocketStore } from "@/src/store/socket/useSocketStore";
import { useAuthStore } from "@/src/store/authentication/auth.store";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setConnected, setSocket, updateAgentStatus } = useSocketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const socket = socketService.connect();
    setSocket(socket);

    const onConnect = () => {
      setConnected(true);
      console.log("🔌 [SocketProvider] Connected");
      if (user?.id) {
        socket.emit("joinUser", { userId: user.id });
      }
    };

    const onDisconnect = () => {
      setConnected(false);
      console.log("🔌 [SocketProvider] Disconnected");
    };

    const onError = (error: any) => {
      console.error("🔌 [SocketProvider] Error:", error);
    };

    const onAgentStatus = (payload: any) => {
      if (payload.userAgentId) {
        updateAgentStatus(payload.userAgentId, {
          status: payload.status,
          reason: payload.reason
        });
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);
    socket.on("agent-status", onAgentStatus);

    if (socket.connected && user?.id) {
      socket.emit("joinUser", { userId: user.id });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.off("agent-status", onAgentStatus);
    };
  }, [setConnected, setSocket, updateAgentStatus, user?.id]);

  return <>{children}</>;
};
