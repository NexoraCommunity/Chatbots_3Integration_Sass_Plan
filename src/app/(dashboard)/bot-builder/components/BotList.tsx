"use client";

import { useState } from "react";
import { Cards, CardTitle } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { DropdownMenuActions } from "@/src/components/ui/DropdownMenu";
import { Switch } from "@/src/components/ui/Switch";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

const BotList = () => {
  const [selectedBotId, setSelectedBotId] = useState<number | null>(1); // Default to first bot for demo

  const bots = [
    {
      id: 1,
      name: "Nexus Support",
      status: "active",
      accent: "primary",
      integration: "logos:whatsapp-icon",
    },
    {
      id: 2,
      name: "Sales Pro",
      status: "active",
      accent: "info",
      integration: "logos:telegram",
    },
    {
      id: 3,
      name: "Marketing Bot",
      status: "inactive",
      accent: "secondary",
      integration: null,
    },
  ];

  const allLogs: Record<number, { id: number; user: string; action: string; target: string; time: string }[]> = {
    1: [
      { id: 1, user: "Alice", action: "modified prompt", target: "Nexus Support", time: "12m ago" },
      { id: 2, user: "System", action: "restarted", target: "Nexus Support", time: "1h ago" },
      { id: 3, user: "Bob", action: "updated knowledge base", target: "Nexus Support", time: "3h ago" },
    ],
    2: [
      { id: 4, user: "System", action: "deployed", target: "Sales Pro", time: "1h ago" },
      { id: 5, user: "Charlie", action: "updated lead rules", target: "Sales Pro", time: "4h ago" },
    ],
    3: [
      { id: 6, user: "System", action: "paused", target: "Marketing Bot", time: "1d ago" },
    ],
  };

  const selectedBot = bots.find((b) => b.id === selectedBotId);
  const currentLogs = selectedBotId ? allLogs[selectedBotId] || [] : [];

  return (
    <div className="flex flex-col lg:flex-row gap-8 mt-6">
      {/* Neo-Premium Bot Grid */}
      <div className="flex-[3] mb-4">
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
              <div className="absolute top-6 right-6">
                <DropdownMenuActions />
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
                    <CardTitle className="text-base font-bold truncate max-w-full">{bot.name}</CardTitle>
                  </div>
                </div>

                {/* Integration Section - Single Restricted */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Integration</span>
                  <div className="flex items-center gap-3">
                    {bot.integration ? (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-100/50 shadow-sm transition-all duration-300 group-hover:bg-white">
                        <Icon icon={bot.integration} width={18} />
                        <span className="text-[10px] font-bold text-gray-600">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-dashed border-gray-200 text-gray-300 hover:border-primary/50 hover:bg-primary/[0.02] hover:text-primary transition-all duration-300">
                        <Icon icon="solar:link-bold-duotone" width={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Link Account</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-3">
                    <Badge variant={bot.status === "active" ? "success" : "secondary"} showDot>
                      {bot.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Power</span>
                    <div className="scale-90 origin-right" onClick={(e) => e.stopPropagation()}>
                      <Switch checked={bot.status === "active"} />
                    </div>
                  </div>
                </div>
              </div>
            </Cards>
          ))}

          {/* New Bot Creation Card */}
          <Cards className="flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-gray-50/50 border-2 border-dashed border-gray-100 hover:border-primary/30 hover:bg-primary/[0.01] transition-all duration-500 group cursor-pointer h-full min-h-[240px]">
            <div className="size-16 rounded-full bg-white flex items-center justify-center text-gray-300 group-hover:text-primary shadow-sm group-hover:shadow-md transition-all duration-500 mb-5">
              <Icon icon="solar:add-circle-bold-duotone" width={36} />
            </div>
            <p className="text-xs font-black text-gray-400 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">New Assistant</p>
          </Cards>
        </div>
      </div>

      {/* Styled Activity Log (Bot Specific) */}
      <div className="flex-1 min-w-[320px]">
        <Cards className="rounded-[2.5rem] bg-white border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 h-full sticky top-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                <Icon icon="solar:bill-list-bold-duotone" width={22} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">Assistant Logs</h4>
                <p className="text-[10px] font-bold text-primary truncate max-w-[120px]">
                  {selectedBot?.name || "Select a bot"}
                </p>
              </div>
            </div>
          </div>

          {!selectedBotId ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon icon="solar:file-text-line-duotone" width={48} className="text-gray-200 mb-4" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Bot Selected</p>
              <p className="text-[10px] text-gray-300 mt-1">Select an assistant to view its activity</p>
            </div>
          ) : (
            <div className="space-y-8 relative">
              <div className="absolute left-1.5 top-2 bottom-2 w-[1.5px] bg-gray-50" />
              {currentLogs.length > 0 ? (
                currentLogs.map((log) => (
                  <div key={log.id} className="relative pl-7 group">
                    <div className="absolute left-0 top-1.5 size-3 rounded-full bg-white border-2 border-gray-200 group-hover:border-primary transition-colors z-10" />
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-gray-800 tracking-tight">
                          <span className="text-primary">{log.target}</span> {log.action}
                        </p>
                        <span className="text-[10px] font-medium text-gray-300">{log.time}</span>
                      </div>
                      <p className="text-[11px] font-medium text-gray-400">by {log.user}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-xs font-medium">No recent logs found.</div>
              )}
            </div>
          )}

          {selectedBotId && (
            <div className="mt-12">
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
    </div>
  );
};

export { BotList };
