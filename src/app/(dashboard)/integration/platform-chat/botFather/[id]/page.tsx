"use client";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { use, useEffect, useState } from "react";

export default function TelegramDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { currentContentIntegration, getById, isLoading } = useContentIntegrationStore();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentContentIntegration) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-gray-500">Bot not found</p>
        <Button variant="secondary" onClick={() => router.back()} label="Go Back" />
      </div>
    );
  }

  const config = currentContentIntegration.configJson as any;

  const details = {
    name: config?.botName || "No Name",
    apiKey: config?.accessToken || "No API Key",
    createdAt: new Date(currentContentIntegration.createdAt).toLocaleDateString(),
    status: currentContentIntegration.isUsed ? "Active" : "Inactive",
    type: "Telegram Bot"
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "solar:info-circle-bold-duotone" },
    { id: "credentials", label: "Credentials", icon: "solar:key-bold-duotone" },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full p-4 sm:p-8 bg-white rounded-[24px] shadow-sm border border-gray-100">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            label=""
            iconPosition="mid"
            className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
            icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
          />
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Telegram Bot Details</h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="h-10 px-4 sm:px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest"
          onClick={() => router.push(`/integration/platform-chat/botFather/${id}/edit`)}
        >
          <Icon icon="solar:pen-new-square-bold-duotone" width={18} />
          <span className="hidden sm:inline">Edit Config</span>
        </Button>
      </div>

      {/* Local Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-2xl w-fit border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-gray-900"
              }`}
          >
            <Icon icon={tab.icon} width={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "overview" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:user-circle-bold-duotone" className="text-primary" />
                  Bot Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Bot Name</p>
                      <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                      <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.createdAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "credentials" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:key-bold-duotone" className="text-primary" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">API Token</p>
                    <div className="relative group">
                      <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">
                        {details.apiKey}
                      </p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(details.apiKey);
                          // We don't have addToast here, but it's fine for now as it was already there as a button
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary"
                      >
                        <Icon icon="solar:copy-bold-duotone" width={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-8">
          {/* Status Card */}
          <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-xl text-white">
                <Icon icon="solar:shield-check-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider">Bot Status</h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Active & Operational</p>
            </div>
            <p className="text-xs text-indigo-600/70 leading-relaxed font-medium">
              This bot is currently connected to Telegram and responding to messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
