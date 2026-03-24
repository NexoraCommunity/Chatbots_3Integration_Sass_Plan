"use client";

import React, { useEffect } from "react";
import { socketService } from "@/src/lib/socket";
import { useSocketStore } from "@/src/store/socket/useSocketStore";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useUserStore } from "@/src/store/authentication/user.store";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { setConnected, setSocket, updateAgentStatus } = useSocketStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const socket = socketService.connect();
    setSocket(socket);

    const onConnect = () => {
      setConnected(true);
      if (user?.id) {
        console.log("🔌 [SocketProvider] Joining user room:", user.id);
        socket.emit("joinUser", { userId: user.id });
        console.log("🔌 [SocketProvider] Joining token room:", user.id);
        socket.emit("joinTokenRoom", { userId: user.id });
      } else {
        console.warn("🔌 [SocketProvider] No User ID found, skipping joinUser/TokenRoom");
      }
    };

    const onDisconnect = () => {
      setConnected(false);
      console.log("🔌 [SocketProvider] Disconnected");
    };

    const onError = (error: any) => {
      console.error("🔌 [SocketProvider] Connection Error:", error);
    };

    const onAgentStatus = (payload: any) => {
      if (payload.userAgentId) {
        updateAgentStatus(payload.userAgentId, {
          status: payload.status,
          reason: payload.reason
        });
      }
    };

    const onTokenUpdate = (payload: any) => {
      if (payload && typeof payload.tokenRemain === "number") {
        useUserStore.getState().updateTokenBalance(payload.tokenRemain);
        useAuthStore.getState().updateTokenBalance(payload.tokenRemain);
      } else {
        const { fetchTokenBalance } = useUserStore.getState();
        fetchTokenBalance();
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);
    socket.on("agent-status", onAgentStatus);
    socket.on("token-update", onTokenUpdate);



    if (socket.connected && user?.id) {
      socket.emit("joinUser", { userId: user.id });
      socket.emit("joinTokenRoom", { userId: user.id });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.off("agent-status", onAgentStatus);
      socket.off("token-update", onTokenUpdate);
    };
  }, [setConnected, setSocket, updateAgentStatus, user?.id]);

  return <>{children}</>;
};
