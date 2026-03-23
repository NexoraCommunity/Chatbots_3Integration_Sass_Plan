"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cards, CardTitle } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { ActionMenu } from "@/src/components/ActionMenu";
import { Switch } from "@/src/components/ui/Switch";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { useBotStore } from "@/src/store/bot/bot.store";
import { useSocketStore } from "@/src/store/socket/useSocketStore";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { BotSetupModal } from "@/src/components/ui/modal/BotSetupModal";
import { useToastStore } from "@/src/store/ui/toast.store";
import BaseModal from "@/src/components/ui/modal/BaseModal";
import { DeleteConfirmationModal } from "@/src/components/ui/modal/DeleteConfirmationModal";

const BotList = () => {
  const { bots, fetchBots, toggleBotStatus, removeBot, isLoading, logs, addLog, updateBotConnectionStatus } = useBotStore();
  const { socket, joinRoom, leaveRoom, currentBotRoom } = useSocketStore();
  const { user } = useAuthStore();
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [botToSetup, setBotToSetup] = useState<any>(null);
  const { addToast } = useToastStore();
  const router = useRouter();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [botToDeleteId, setBotToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchBots({ page: "1", limit: "10", userId: user.id });
    }
  }, [fetchBots, user?.id]);

  // Join/leave bot room when selectedBotId changes
  useEffect(() => {
    if (!socket) return;

    // Leave previous room if any
    if (currentBotRoom) {
      leaveRoom(currentBotRoom);
    }

    // Join new room if a bot is selected
    if (selectedBotId) {
      joinRoom(`bot:${selectedBotId}`);
    }

    // Leave room on unmount
    return () => {
      if (selectedBotId) {
        leaveRoom(`bot:${selectedBotId}`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, selectedBotId]);

  // Listen to bot logs event
  useEffect(() => {
    if (!socket) return;

    const onBotLog = (data: any) => {
      console.log("🔌 [BotList] Received bot log (bot):", data);

      const botId = data.botId || selectedBotId || "";

      // Handle log object directly
      if (data.log) {
        addLog(botId, data.log);
      } else if (data.message) {
        // Handle plain message as a log entry
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

    return () => {
      socket.off("bot", onBotLog);
    };
  }, [socket, selectedBotId, addLog]);

  // Listen to bot connection status event
  useEffect(() => {
    if (!socket) return;

    const onBotConnection = (data: any) => {
      console.log("🔌 [BotList] Received bot connection update (botConnection):", data);

      const botId = data.botId || selectedBotId || "";

      // Show toast for connection status changes
      if (data.message) {
        const message = data.message.toLowerCase();
        const shouldShowToast =
          message.includes("connected") ||
          message.includes("disconnected") ||
          message.includes("scan") ||
          message.includes("connecting");

        if (shouldShowToast) {
          const toastType = ["success", "error", "info", "warning"].includes(data.type) ? data.type : "info";
          addToast(data.message, toastType);
        }
      }

      // Handle QR code display
      if (data.qrCode) {
        setQrCode(data.qrCode);
        setIsQRModalOpen(true);
      }

      // Update bot active status based on connection
      if (botId) {
        if (data.isActive !== undefined) {
          updateBotConnectionStatus(botId, data.isActive);
        } else if (data.status) {
          const status = data.status.toLowerCase();
          if (status === "connected") {
            updateBotConnectionStatus(botId, true);
            setIsQRModalOpen(false);
            setQrCode(null);
          } else if (status === "disconnected") {
            updateBotConnectionStatus(botId, false);
          }
        }
      }

      // Also add connection events as log entries
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

    return () => {
      socket.off("botConnection", onBotConnection);
    };
  }, [socket, selectedBotId, addToast, addLog, updateBotConnectionStatus]);

  const handleToggleStatus = async (bot: any) => {
    if (!bot.isActive) {
      // Starting the bot - handle setup
      if (bot.type === "botFather" && !bot.contentIntegrationId) {
        setBotToSetup(bot);
        setIsSetupModalOpen(true);
        return;
      }
    }

    try {
      await toggleBotStatus(
        {
          botId: bot.id,
          type: bot.type,
          agentId: bot.agentId,
          contentIntegrationId: bot.contentIntegrationId || undefined,
        },
        bot.isActive
      );
    } catch (error) {
      console.error("Failed to toggle bot status", error);
    }
  };

  const handleSetupConfirm = async (contentIntegrationId: string) => {
    if (!botToSetup) return;

    try {
      await toggleBotStatus(
        {
          botId: botToSetup.id,
          type: botToSetup.type,
          agentId: botToSetup.agentId,
          contentIntegrationId: contentIntegrationId,
        },
        false
      );
      setIsSetupModalOpen(false);
      setBotToSetup(null);
    } catch (error) {
      console.error("Failed to start bot with config", error);
    }
  };

  const handleDeleteBot = (id: string) => {
    setBotToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!botToDeleteId) return;

    setIsDeleting(true);
    try {
      await removeBot(botToDeleteId);
      addToast("Bot deleted successfully", "success");
      if (selectedBotId === botToDeleteId) setSelectedBotId(null);
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      console.error("Failed to delete bot:", error);
      addToast(error.message || "Failed to delete bot", "error");
    } finally {
      setIsDeleting(false);
      setBotToDeleteId(null);
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "baileys": return "logos:whatsapp-icon";
      case "botFather": return "logos:telegram";
      case "website": return "akar-icons:globe";
      default: return null;
    }
  };

  const selectedBot = bots.find((b) => b.id === selectedBotId);
  const currentLogs = selectedBotId ? logs[selectedBotId] || [] : [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-6">
      {/* Neo-Premium Bot Grid */}
      <div className="flex-[3] mb-4">
        {isLoading && bots.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Icon icon="eos-icons:loading" width={48} className="text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {bots.map((bot) => (
              <Cards
                key={bot.id}
                onClick={() => setSelectedBotId(bot.id)}
                className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-visible group cursor-pointer flex flex-col h-full
                  ${selectedBotId === bot.id
                    ? "bg-primary/[0.02] border-primary shadow-[0_20px_40px_rgb(0,0,0,0.08)] -translate-y-2"
                    : "bg-white border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1.5"
                  }`}
              >
                <div className="absolute top-6 right-6 z-20">
                  <ActionMenu
                    baseUrl="/bot-builder"
                    id={bot.id}
                    detailUrl={`/bot-builder/detail-bot/${bot.id}`}
                    editUrl={`/bot-builder/edit-bot/${bot.id}`}
                    onDelete={() => handleDeleteBot(bot.id)}
                  />
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-16 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-inner shrink-0
                      ${selectedBotId === bot.id
                          ? "bg-primary text-white scale-110"
                          : "bg-gray-50 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
                        }`}
                    >
                      <Icon icon="fluent:bot-24-filled" width={32} />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <CardTitle className="text-base font-bold truncate max-w-full">{bot.botName}</CardTitle>
                    </div>
                  </div>

                  {/* Integration Section - Single Restricted */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Integration</span>
                    <div className="flex items-center gap-3">
                      {bot.type ? (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-100/50 shadow-sm transition-all duration-300 group-hover:bg-white text-muted-foreground">
                          <Icon icon={getIntegrationIcon(bot.type) || "solar:link-bold-duotone"} width={18} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{bot.type}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-dashed border-gray-200 text-gray-300 hover:border-primary/50 hover:bg-primary/[0.02] hover:text-primary transition-all duration-300">
                          <Icon icon="solar:link-bold-duotone" width={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">No Connection</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-3">
                      <Badge variant={bot.isActive ? "success" : "secondary"} showDot>
                        {bot.isActive ? "active" : "inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Power</span>
                      <div className="scale-90 origin-right" onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(bot);
                      }}>
                        <Switch checked={bot.isActive} />
                      </div>
                    </div>
                  </div>
                </div>
              </Cards>
            ))}

            {/* New Bot Creation Card */}
            <Cards
              moveTo="/bot-builder/add-bot"
              className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-gray-50/50 border-2 border-dashed border-gray-100 hover:border-primary/30 hover:bg-primary/[0.01] transition-all duration-500 group cursor-pointer h-full min-h-[240px]">
              <div className="size-16 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:text-primary shadow-sm group-hover:shadow-md transition-all duration-500 mb-5">
                <Icon icon="solar:add-circle-bold-duotone" width={36} />
              </div>
              <p className="text-xs font-black text-gray-400 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">New Assistant</p>
            </Cards>
          </div>
        )}
      </div>

      {/* Styled Activity Log (Bot Specific) */}
      <div className="hidden lg:flex flex-col flex-1 min-w-[320px] h-[calc(100vh-240px)] sticky top-6">
        <Cards className="rounded-[2.5rem] bg-white border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 shrink-0">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Icon icon="solar:bill-list-bold-duotone" width={22} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">Assistant Logs</h4>
                <p className="text-[10px] font-bold text-primary truncate max-w-[120px]">
                  {selectedBot?.botName || "Select a bot"}
                </p>
              </div>
            </div>
          </div>

          {!selectedBotId ? (
            <div className="flex flex-col items-center justify-center py-12 text-center flex-1">
              <Icon icon="solar:file-text-line-duotone" width={48} className="text-gray-200 mb-4" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Bot Selected</p>
              <p className="text-[10px] text-gray-300 mt-1">Select an assistant to view its activity</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
              <div className="space-y-8 relative">
                <div className="absolute left-1.5 top-2 bottom-2 w-[1.5px] bg-gray-50" />
                {currentLogs.length > 0 ? (
                  currentLogs.map((log: any) => (
                    <div key={log.id} className="relative pl-7 group">
                      <div className="absolute left-0 top-1.5 size-3 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary transition-colors z-10" />
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <p className="text-xs font-bold text-gray-800 tracking-tight">
                            {log.action}
                          </p>
                          <span className="text-[10px] font-medium text-gray-300">{log.time}</span>
                        </div>
                        <p className="text-[11px] font-medium text-gray-400">by {log.user}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-400 text-xs font-medium">No recent logs found. Logs are streamed via socket.</div>
                )}
              </div>
            </div>
          )}

          {selectedBotId && (
            <div className="mt-8 shrink-0">
              <Button
                label="Full Archive"
                variant="secondary"
                className="w-full h-12 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest border-gray-100 hover:bg-gray-50 transition-colors"
                icon={<Icon icon="solar:round-alt-arrow-right-bold-duotone" width={16} />}
                iconPosition="right"
              />
            </div>
          )}
        </Cards>
      </div>
      {user?.id && (
        <BotSetupModal
          open={isSetupModalOpen}
          onClose={() => setIsSetupModalOpen(false)}
          onConfirm={handleSetupConfirm}
          botType={botToSetup?.type || ""}
          botName={botToSetup?.botName}
          userId={user.id}
        />
      )}

      {/* QR Code Modal for Baileys */}
      <BaseModal
        open={isQRModalOpen}
        onClose={() => {
          setIsQRModalOpen(false);
          setQrCode(null);
        }}
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner border-4 border-white">
            <Icon icon="logos:whatsapp-icon" width={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Connect WhatsApp</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
              Scan this QR code with your WhatsApp to activate the bot.
            </p>
          </div>

          {qrCode && (
            <div className="bg-white p-4 rounded-[2rem] border-2 border-gray-50 shadow-inner inline-block mx-auto">
              <img
                src={qrCode.startsWith('data:') ? qrCode : `data:image/png;base64,${qrCode}`}
                alt="WhatsApp QR Code"
                className="w-64 h-64 object-contain rounded-2xl"
              />
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="secondary"
              label="Close"
              onClick={() => {
                setIsQRModalOpen(false);
                setQrCode(null);
              }}
              className="w-full h-12 rounded-2xl font-bold text-gray-400 border-none hover:bg-gray-50"
            />
          </div>
        </div>
      </BaseModal>

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Bot"
        description="Are you sure you want to delete this bot? This action cannot be undone."
      />
    </div>
  );
};

export { BotList };
