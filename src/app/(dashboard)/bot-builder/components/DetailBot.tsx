"use client";

import { useBotStore } from "@/src/store/bot/bot.store";
import { useUserAgentStore } from "@/src/store/userAgent/userAgent.store";
import { useSocketStore } from "@/src/store/socket/useSocketStore";
import { useToastStore } from "@/src/store/ui/toast.store";
import { Icon } from "@iconify/react";
import { Cards } from "@/src/components/ui/Cards";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Bot, BotLog } from "@/src/model/bot/bot.model";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/authentication/auth.store";

interface DetailBotProps {
  currentBot: Bot;
}

const platforms = [
  { id: "waba", name: "WhatsApp Business", icon: "logos:whatsapp-icon", backendType: "waba", color: "text-emerald-500", route: "/integration/platform-chat/whatsapp-bussiness" },
  { id: "baileys", name: "WhatsApp (Baileys)", icon: "logos:whatsapp-icon", backendType: "baileys", color: "text-emerald-600", route: "/integration/platform-chat/baileys" },
  { id: "telegram", name: "Bot Father", icon: "logos:telegram", backendType: "botFather", color: "text-sky-500", route: "/integration/platform-chat/botFather" },
  { id: "web", name: "Web Chat", icon: "akar-icons:globe", color: "text-amber-500", backendType: "website", route: "/integration/platform-chat/website" },
];

export const DetailBot = ({ currentBot }: DetailBotProps) => {
  const router = useRouter();
  const { userAgents, fetchUserAgents } = useUserAgentStore();
  const { user } = useAuthStore();
  const { logs, addLog, updateBotConnectionStatus } = useBotStore();
  const { socket, joinRoom, leaveRoom, currentBotRoom } = useSocketStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (user?.id) {
      fetchUserAgents({ page: "1", limit: "100", userId: user.id });
    }
  }, [fetchUserAgents, user?.id]);

  useEffect(() => {
    if (!socket || !currentBot?.id) return;

    if (currentBotRoom) {
      leaveRoom(currentBotRoom);
    }
    joinRoom(`bot:${currentBot.id}`);

    return () => {
      leaveRoom(`bot:${currentBot.id}`);
    };
  }, [socket, currentBot?.id]);

  useEffect(() => {
    if (!socket) return;
    const onBotLog = (data: any) => {
      const botId = data.botId || currentBot.id;
      if (data.log) {
        addLog(botId, data.log);
      } else if (data.message) {
        addLog(botId, {
          id: Math.random().toString(36).substring(2, 9),
          botId: botId,
          target: data.type || "System",
          action: data.message,
          user: "Bot",
          time: new Date().toLocaleTimeString(),
          type: "info"
        });
      }
    };
    socket.on("bot", onBotLog);
    return () => { socket.off("bot", onBotLog); };
  }, [socket, currentBot.id, addLog]);

  useEffect(() => {
    if (!socket) return;
    const onBotConnection = (data: any) => {
      const botId = data.botId || currentBot.id;
      if (data.message) {
        const message = data.message.toLowerCase();
        if (message.includes("connected") || message.includes("disconnected") || message.includes("scan") || message.includes("connecting")) {
          const toastType = ["success", "error", "info", "warning"].includes(data.type) ? data.type : "info";
          addToast(data.message, toastType);
        }
      }
      if (botId) {
        if (data.isActive !== undefined) {
          updateBotConnectionStatus(botId, data.isActive);
        } else if (data.status) {
          const status = data.status.toLowerCase();
          if (status === "connected") updateBotConnectionStatus(botId, true);
          else if (status === "disconnected") updateBotConnectionStatus(botId, false);
        }
      }
      if (data.message) {
        addLog(botId, {
          id: Math.random().toString(36).substring(2, 9),
          botId: botId,
          target: "Connection",
          action: data.message,
          user: "System",
          time: new Date().toLocaleTimeString(),
          type: data.type || "info"
        });
      }
    };
    socket.on("botConnection", onBotConnection);
    return () => { socket.off("botConnection", onBotConnection); };
  }, [socket, currentBot.id, addToast, addLog, updateBotConnectionStatus]);

  const platformInfo = platforms.find(p => p.backendType.toLowerCase() === currentBot.type.toLowerCase()) ||
    platforms.find(p => p.id === "web");

  const agentInfo = userAgents.find(a => a.id === currentBot.agentId);
  const currentLogs = logs[currentBot.id] || [];

  return (
    <div className="flex flex-col space-y-6 md:space-y-8 min-h-screen animate-in fade-in duration-500 w-full pb-20">
      {/* Header with Back & Edit Button */}
      <div className="flex items-center justify-between mt-6 px-4 md:px-0 gap-2">
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            label=""
            iconPosition="mid"
            className="size-10 sm:size-11 p-0 rounded-2xl flex items-center justify-center hover:bg-white hover:shadow-md transition-all shrink-0 border border-gray-100 shadow-xs"
            icon={<Icon icon="solar:alt-arrow-left-bold" width={22} />}
          />
          <div className="min-w-0">
            <h1 className="text-lg md:text-2xl poppins-bold text-foreground leading-none truncate">Bot Details</h1>
          </div>
        </div>
        <Button
          variant="primary"
          moveTo={`/bot-builder/edit-bot/${currentBot.id}`}
          label="Edit Bot"
          icon={<Icon icon="solar:pen-new-square-bold-duotone" width={20} />}
          iconPosition="left"
          hideLabelOnMobile={true}
          className="h-10 w-10 sm:h-11 sm:w-auto p-0 sm:px-6 flex items-center justify-center font-bold shadow-lg shadow-primary/20 rounded-[14px] sm:rounded-2xl whitespace-nowrap shrink-0"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Core Info */}
          <Cards className="overflow-hidden border-none shadow-xl shadow-gray-100/50">
            <div className="h-2 bg-primary w-full" />
            <div className="p-8 space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="size-48 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-inner relative">
                  <Icon icon={platformInfo?.icon || "solar:robot-bold-duotone"} className={`size-20 ${platformInfo?.color || "text-gray-200"}`} />
                </div>
                <div className="flex-1 space-y-6">
                  <div className="space-y-1">
                    <Badge variant="primary" className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase tracking-widest px-3">
                      {platformInfo?.name || currentBot.type}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl poppins-bold text-gray-900 tracking-tight leading-tight">{currentBot.botName}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Agent Knowledge</p>
                      <p className="text-sm md:text-md font-bold text-gray-900">{agentInfo?.name || "Loading..."}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bot ID</p>
                      <p className="text-sm md:text-md font-bold text-gray-900 truncate">{currentBot.id}</p>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Created At</p>
                      <p className="text-sm md:text-md font-bold text-primary truncate">
                        {new Date(currentBot.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-8">
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Icon icon="solar:notes-bold-duotone" className="text-primary" />
                  Integration Info
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {currentBot.contentIntegrationId ? `Connected to configuration ID: ${currentBot.contentIntegrationId}` : "No specific detailed configuration connected to this bot."}
                </p>
              </div>
            </div>
          </Cards>

          {/* Activity Logs */}
          <Cards className="rounded-[2.5rem] bg-white border-none shadow-xl shadow-gray-100/50 p-8 flex-1 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Icon icon="solar:bill-list-bold-duotone" width={22} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">Live Logs</h4>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">Real-time bot activity</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div className="space-y-8 relative">
                <div className="absolute left-1.5 top-2 bottom-2 w-[1.5px] bg-gray-50" />
                {currentLogs.length > 0 ? (
                  currentLogs.map((log: BotLog) => (
                    <div key={log.id} className="relative pl-7 group">
                      <div className={`absolute left-0 top-1.5 size-3 rounded-full border-2 transition-colors z-10 bg-white
                        ${log.type === 'error' ? 'border-rose-400 group-hover:border-rose-500'
                          : log.type === 'success' ? 'border-emerald-400 group-hover:border-emerald-500'
                            : log.type === 'warning' ? 'border-amber-400 group-hover:border-amber-500'
                              : 'border-primary group-hover:border-primary'}
                      `} />
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <p className="text-xs font-bold text-gray-800 tracking-tight leading-snug">
                            {log.action}
                          </p>
                          <span className="text-[10px] font-medium text-gray-300 ml-4 shrink-0">{log.time}</span>
                        </div>
                        <p className="text-[11px] font-medium text-gray-400">by {log.user}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Icon icon="solar:history-linear" width={32} className="text-gray-200 mb-3" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No Logs Yet</p>
                    <p className="text-gray-400 text-[10px] mt-1 italic">Waiting for activity...</p>
                  </div>
                )}
              </div>
            </div>
          </Cards>
        </div>

        <div className="space-y-8 h-full flex flex-col">
          {/* Specifications/Metrics Card */}
          <Cards className="border-none shadow-xl shadow-gray-100/50 overflow-hidden shrink-0">
            <div className="p-1.5 bg-primary/10 rounded-full w-fit mx-auto mt-8 mb-4">
              <div className="bg-primary p-3 rounded-full text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:transmission-bold-duotone" width={24} />
              </div>
            </div>
            <div className="text-center px-6 pb-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">Bot Health</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tighter">Current Deployment Metrics</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Status</p>
                  <p className={`text-xs font-black mt-1 uppercase ${currentBot.isActive ? 'text-primary' : 'text-rose-500'}`}>
                    {currentBot.isActive ? 'Active' : 'Offline'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Type</p>
                  <p className="text-xs font-black text-gray-900 mt-1 uppercase">{currentBot.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 col-span-2">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.1em]">Knowledge Base</p>
                  <p className={`text-xs font-black mt-1 uppercase ${agentInfo?.vectorStatus === "completed" ? "text-emerald-500" : "text-amber-500"}`}>
                    {agentInfo?.vectorStatus || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </Cards>

          {/* Support/Quick Actions */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-6 relative overflow-hidden shadow-2xl shadow-gray-200">
            <Icon icon="solar:chat-round-dots-bold-duotone" className="absolute -bottom-6 -right-6 size-32 text-white/5" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:lightbulb-bold-duotone" width={22} />
              </div>
              <h4 className="font-black text-xs uppercase tracking-widest">Bot Tip</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-bold relative z-10">
              "Check your agent's knowledge base regularly to ensure the bot provides accurate information to users."
            </p>
            <button className="w-full h-12 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10" onClick={() => router.push(`/agent/edit-agent/${currentBot.agentId}`)}>
              View Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
