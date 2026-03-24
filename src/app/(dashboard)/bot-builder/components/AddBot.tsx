"use client";

import { useEffect, useState, useMemo } from "react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Badge } from "@/src/components/ui/Badge";
import { useUserAgentStore } from "@/src/store/userAgent/userAgent.store";
import { useBotStore } from "@/src/store/bot/bot.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useRouter } from "next/navigation";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { Bot } from "@/src/model/bot/bot.model";

interface BotFormProps {
  initialData?: Bot;
  isEdit?: boolean;
}

const AddBot = ({ initialData, isEdit = false }: BotFormProps) => {
  const router = useRouter();
  const { userAgents, fetchUserAgents } = useUserAgentStore();
  const { addBot, updateBot, isLoading: isCreating } = useBotStore();
  const { user } = useAuthStore();
  const { userIntegrations, getAllIntegration } = useUserIntegrationStore();
  const { addToast } = useToastStore();

  const getInitialPlatformId = (backendType?: string) => {
    if (!backendType) return "waba";
    if (backendType.toLowerCase().includes("botfather") || backendType.toLowerCase().includes("telegram")) return "telegram";
    if (backendType.toLowerCase().includes("website") || backendType.toLowerCase().includes("web")) return "web";
    if (backendType.toLowerCase().includes("baileys")) return "baileys";
    return "waba";
  };

  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(initialData?.agentId || null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>(getInitialPlatformId(initialData?.type));
  const [selectedContentId, setSelectedContentId] = useState<string | null>(initialData?.contentIntegrationId || null);
  const [botName, setBotName] = useState(initialData?.botName || "");

  useEffect(() => {
    if (user?.id) {
      fetchUserAgents({ page: "1", limit: "100", userId: user.id });
      getAllIntegration(user.id);
    }
  }, [fetchUserAgents, getAllIntegration, user?.id]);

  const platforms = [
    { id: "waba", name: "WhatsApp Business", icon: "logos:whatsapp-icon", backendType: "waba", color: "text-emerald-500", route: "/integration/platform-chat/whatsapp-bussiness" },
    { id: "baileys", name: "WhatsApp (Baileys)", icon: "logos:whatsapp-icon", backendType: "baileys", color: "text-emerald-600", route: "/integration/platform-chat/baileys" },
    { id: "telegram", name: "Bot Father", icon: "logos:telegram", backendType: "botFather", color: "text-sky-500", route: "/integration/platform-chat/botFather" },
    { id: "web", name: "Web Chat", icon: "akar-icons:globe", color: "text-amber-500", backendType: "website", route: "/integration/platform-chat/website" },
  ];

  const getIsConnected = (platformId: string) => {
    if (platformId === "web") return true;
    const platform = platforms.find(p => p.id === platformId);
    if (!platform) return false;

    return userIntegrations.some(ui => {
      const type = (ui.type || "").toLowerCase();
      const isConnected = !!ui.isconnected;
      if (!isConnected) return false;

      const botType = platform.backendType.toLowerCase();
      const uiName = (ui.name || "").toLowerCase();
      const uiProvider = (ui.provider || "").toLowerCase();

      if (botType === "botfather" || botType === "telegram") {
        return uiName.includes("telegram") || uiName.includes("botfather") || uiProvider.includes("telegram") || uiProvider.includes("botfather");
      }
      if (botType === "waba") {
        return uiName.includes("waba") || uiProvider.includes("waba");
      }
      if (botType === "baileys") {
        return uiName.includes("baileys") || uiProvider.includes("baileys");
      }
      return false;
    });
  };

  const filteredConfigs = useMemo(() => {
    if (!userIntegrations || !Array.isArray(userIntegrations)) return [];

    const platform = platforms.find(p => p.id === selectedPlatform);
    if (!platform) return [];

    const botType = platform.backendType;

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
      (ui.contentIntegrations || [])
        .filter(ci => !ci.isUsed)
        .map(ci => ({
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

      if (botTypeLower === "baileys" || botTypeLower === "waba") {
        return configType.includes("whatsapp") || configType.includes("baileys") || configType.includes("waba") ||
          config.parentName?.toLowerCase().includes("whatsapp") ||
          config.parentName?.toLowerCase().includes("baileys") ||
          config.parentName?.toLowerCase().includes("waba");
      }

      if (botTypeLower === "website") {
        return configType.includes("website") || config.parentName?.toLowerCase().includes("website");
      }

      return true;
    });
  }, [userIntegrations, selectedPlatform]);

  useEffect(() => {
    if (isEdit && getInitialPlatformId(initialData?.type) === selectedPlatform) {
      setSelectedContentId(initialData?.contentIntegrationId || null);
    } else {
      setSelectedContentId(null);
    }
  }, [selectedPlatform, isEdit, initialData]);

  const handleCreate = async () => {
    if (!botName || !selectedAgentId || !user?.id) {
      alert("Please fill all required fields");
      return;
    }

    const platform = platforms.find(p => p.id === selectedPlatform);

    try {
      if (isEdit && initialData?.id) {
        await updateBot(initialData.id, {
          id: initialData.id,
          userId: user.id,
          agentId: selectedAgentId,
          botName: botName,
          type: platform?.backendType || "website",
          integrationId: selectedContentId || null,
        });
        addToast("Bot updated successfully!", "success");
      } else {
        await addBot({
          userId: user.id,
          agentId: selectedAgentId,
          botName: botName,
          type: platform?.backendType || "website",
          contentIntegrationId: selectedContentId || undefined,
        });
        addToast("Bot created successfully!", "success");
      }

      router.push("/bot-builder");
    } catch (error: any) {
      console.error(isEdit ? "Failed to update bot" : "Failed to create bot", error);
      addToast(error.message || (isEdit ? "Failed to update bot" : "Failed to create bot"), "error");
    }
  };


  return (
    <div className="flex flex-col space-y-8 w-full max-w-full bg-[#FAFAFA]">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 ">
        <Button
          variant="secondary"
          moveTo="/bot-builder"
          label=""
          icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
          iconPosition="left"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
        />
        <div>
          <h1 className="text-2xl poppins-bold text-foreground leading-none">{isEdit ? "Edit Bot" : "Create New Bot"}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Section */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:document-text-bold-duotone" className="text-primary" />
                Bot Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Bot Name</label>
                <Input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="Enter Bot Name"
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                />
              </div>
            </CardContent>
          </Cards>

          {/* Agent Knowledge Section */}
          <Cards>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Icon icon="fluent:brain-circuit-24-filled" className="text-primary" />
                Select Agent Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAgents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${selectedAgentId === agent.id
                      ? 'bg-primary/5 border-primary/30 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedAgentId === agent.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                        <Icon icon="solar:user-bold-duotone" width={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-sm truncate ${selectedAgentId === agent.id ? 'text-primary' : 'text-gray-900'}`}>{agent.name}</p>
                          <Badge variant={selectedAgentId === agent.id ? "primary" : "secondary"} className="text-[8px] py-0 px-1.5 h-4 uppercase font-black tracking-widest leading-none">
                            {agent.vectorStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Checkbox checked={selectedAgentId === agent.id} readOnly className="pointer-events-none ml-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Cards>

          {/* Configuration Selection */}
          {selectedPlatform !== "baileys" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:settings-bold-duotone" className="text-primary" />
                  Integration Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {filteredConfigs.length > 0 ? (
                  <>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed mb-2">
                      Select a configuration to use with this platform.
                    </p>
                    <div className="relative">
                      <select
                        value={selectedContentId || ""}
                        onChange={(e) => setSelectedContentId(e.target.value)}
                        disabled={isEdit}
                        className={`w-full appearance-none bg-gray-50/50 border border-gray-100 hover:border-gray-200 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-2xl h-14 px-4 pr-12 text-sm font-bold transition-all ${isEdit ? 'text-gray-400 cursor-not-allowed opacity-70' : 'text-gray-900 cursor-pointer'}`}
                      >
                        <option value="" disabled className="text-gray-400">Select a configuration...</option>
                        {filteredConfigs.map((config) => (
                          <option key={config.id} value={config.id} className="font-semibold text-gray-900">
                            {config.parentName} - {config.displayName}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <Icon icon="solar:round-alt-arrow-down-bold-duotone" width={20} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-3 px-4 flex items-center justify-between gap-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center shrink-0">
                        <Icon icon="solar:shield-warning-bold-duotone" width={16} />
                      </div>
                      <div className="flex flex-col text-left">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">No Config Found</p>
                        <p className="text-[9px] text-gray-400 mt-1 max-w-[200px] leading-relaxed font-bold italic truncate">
                          Setup <span className="text-primary">{platforms.find(p => p.id === selectedPlatform)?.name}</span> first.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      label="Add Config"
                      moveTo={platforms.find(p => p.id === selectedPlatform)?.route || "/integrations"}
                      className="h-8 px-4 rounded-lg font-bold text-[9px] uppercase tracking-wider bg-white border-gray-100 shadow-sm shrink-0"
                    />
                  </div>
                )}
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-8">
          {/* Platform Selection */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:share-circle-bold-duotone" className="text-primary" />
                Connection Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-1 gap-3">
                {platforms.map((platform) => {
                  const isConnected = getIsConnected(platform.id);
                  return (
                    <div
                      key={platform.id}
                      onClick={() => !isEdit && isConnected && setSelectedPlatform(platform.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${!isConnected || (isEdit && selectedPlatform !== platform.id)
                        ? 'bg-gray-50/30 border-gray-100 opacity-60 cursor-not-allowed grayscale'
                        : selectedPlatform === platform.id
                          ? `bg-white border-primary shadow-md ring-1 ring-primary/10 ${isEdit ? 'cursor-default' : 'cursor-pointer'}`
                          : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white cursor-pointer'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-50">
                          <Icon icon={platform.icon} width={24} className={platform.color} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-bold ${selectedPlatform === platform.id ? 'text-primary' : 'text-gray-700'}`}>
                            {platform.name}
                          </span>
                          {!isConnected && (
                            <span className="text-[10px] font-bold text-gray-400 italic">Not Activated</span>
                          )}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${!isConnected
                        ? 'border-gray-200 bg-gray-100'
                        : selectedPlatform === platform.id
                          ? 'border-primary bg-primary text-white scale-110'
                          : 'border-gray-200'
                        }`}>
                        {selectedPlatform === platform.id && isConnected && <Icon icon="mdi:check" width={12} />}
                        {!isConnected && <Icon icon="solar:lock-bold" width={10} className="text-gray-300" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Cards>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-4 md:px-0 mt-auto transition-all duration-300">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/90 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="flex items-center gap-4 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-inner border border-primary/20">
              {selectedAgentId ? "1" : "0"}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-sm font-black text-gray-900 tracking-tight uppercase">Selection Ready</span>
              <span className="text-[10px] text-gray-400 font-bold italic">{isEdit ? "Update your assistant" : "Deploy your assistant"}</span>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              moveTo="/bot-builder"
              className="flex-1 sm:flex-none px-8 sm:px-10 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-gray-100 h-auto"
            />
            <Button
              variant="primary"
              label={isCreating ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Changes" : "Create")}
              onClick={handleCreate}
              disabled={isCreating || !selectedAgentId || !botName}
              className="flex-[2] sm:flex-none px-10 sm:px-12 py-3 disabled:opacity-50 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddBot };
