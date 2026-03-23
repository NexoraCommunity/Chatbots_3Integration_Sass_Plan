"use client";

import React, { useEffect, useState, useMemo } from "react";
import BaseModal from "./BaseModal";
import { Button } from "../Button";
import { Icon } from "@iconify/react";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { Badge } from "../Badge";

interface BotSetupModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (contentIntegrationId: string) => void;
  botType: string;
  botName?: string;
  userId: string;
}

export const BotSetupModal = ({
  open,
  onClose,
  onConfirm,
  botType,
  botName,
  userId,
}: BotSetupModalProps) => {
  const { userIntegrations, getAllIntegration } = useUserIntegrationStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (open && userId) {
      getAllIntegration(userId).catch(err => {
        console.error("Failed to fetch integrations:", err);
      });
    }
  }, [open, userId, getAllIntegration]);

  // Use useMemo for filtering to be more efficient and avoid unnecessary re-renders
  const availableConfigs = useMemo(() => {
    if (!userIntegrations || !Array.isArray(userIntegrations)) return [];

    // 1. Filter relevant user integrations
    const relevantProviders = userIntegrations.filter((ui) => {
      const type = (ui.type || "").toLowerCase();
      const name = (ui.name || "").toLowerCase();
      const provider = (ui.provider || "").toLowerCase();

      if (type === "chatplatform" || type === "chat") return true;

      const keywords = ["botfather", "telegram", "whatsapp", "baileys", "waba"];
      return keywords.some(k => name.includes(k) || provider.includes(k));
    });

    // 2. Extract and filter content integrations
    return relevantProviders.flatMap((ui) =>
      (ui.contentIntegrations || []).map(ci => ({
        ...ci,
        parentName: ui.name,
        displayName: ci.configJson?.botName || ci.configJson?.name || ci.name || `${ui.name} Config (${ci.id.slice(0, 4)})`
      }))
    ).filter(config => {
      const configType = (config.type || "").toLowerCase();
      const botTypeLower = botType.toLowerCase();

      if (botTypeLower === "botfather" || botTypeLower === "telegram") {
        return configType.includes("telegram") || configType.includes("botfather") ||
          config.parentName?.toLowerCase().includes("telegram") ||
          config.parentName?.toLowerCase().includes("botfather");
      }
      return true;
    });
  }, [userIntegrations, botType]);

  const handleConfirm = () => {
    if (selectedId) {
      onConfirm(selectedId);
      onClose();
    }
  };

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Icon icon="solar:settings-bold-duotone" width={32} />
          </div>
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            {botName ? `Setup ${botName}` : "Setup Bot Configuration"}
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed px-4">
            Select {botType === 'botFather' ? 'Telegram' : 'Integration'} configuration to activate this assistant.
          </p>
        </div>

        <div className="space-y-4 max-h-[350px] overflow-y-auto px-1 py-1">
          {availableConfigs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {availableConfigs.map((config) => (
                <div
                  key={config.id}
                  onClick={() => setSelectedId(config.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${selectedId === config.id
                    ? "bg-primary/5 border-primary shadow-sm ring-1 ring-primary/10"
                    : "bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200"
                    }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] uppercase font-black tracking-widest ${selectedId === config.id ? 'text-primary' : 'text-gray-400'}`}>
                      {config.parentName}
                    </span>
                    <span className="text-sm font-bold text-gray-900 mt-0.5 truncate">
                      {config.displayName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {config.isUsed && (
                      <Badge variant="secondary" className="text-[8px] bg-gray-200 text-gray-500 font-black px-1.5 h-4 uppercase tracking-tighter">
                        In Use
                      </Badge>
                    )}
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedId === config.id ? 'border-primary bg-primary text-white scale-110' : 'border-gray-300'
                      }`}>
                      {selectedId === config.id && <Icon icon="mdi:check" width={12} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
              <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
                <Icon icon="solar:shield-warning-bold-duotone" width={24} />
              </div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No Integrations Found</p>
              <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Please create a connected integration for this platform first.
              </p>
              <Button
                variant="secondary"
                label="Manage Integrations"
                moveTo="/integrations"
                className="mt-6 h-10 px-6 rounded-xl font-bold text-[10px] uppercase tracking-wider"
              />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            label="Cancel"
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
          />
          <Button
            variant="primary"
            label="Confirm Setup"
            onClick={handleConfirm}
            disabled={!selectedId}
            className="flex-[2] h-12 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
          />
        </div>
      </div>
    </BaseModal>
  );
};
