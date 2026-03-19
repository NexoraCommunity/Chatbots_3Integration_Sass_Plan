"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { XenditConfig } from "@/src/model/integration/contentIntegration.model";

export default function XenditDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getById, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();
  const [showServerKey, setShowServerKey] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      getById(id).catch((err) => {
        console.error("Failed to fetch xendit detail:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const config = currentContentIntegration?.configJson as XenditConfig;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard`, "success");
  };

  if (isLoading && !currentContentIntegration) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentContentIntegration && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <p className="text-gray-500">Configuration not found</p>
        <Button label="Go Back" onClick={() => router.back()} variant="secondary" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "solar:info-circle-bold-duotone" },
    { id: "configuration", label: "Configuration", icon: "solar:settings-minimalistic-bold-duotone" },
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
             <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Xendit Configuration</h1>
           </div>
         </div>
        <Button
          variant="secondary"
          className="h-10 px-4 sm:px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest"
          onClick={() => router.push(`/integration/payment-gateway/xendit/${id}/edit`)}
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
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
                  <Icon icon="solar:wallet-bold-duotone" className="text-primary" />
                  Gateway Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Integration Name</p>
                    <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{config?.name || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                    <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      {currentContentIntegration?.createdAt ? new Date(currentContentIntegration.createdAt).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "configuration" && (
            <div className="space-y-6">
              {/* API Credentials */}
              <Cards>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon icon="solar:key-minimalistic-bold-duotone" className="text-primary" />
                    API Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Server Key</p>
                      <div className="relative group">
                        <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">
                          {showServerKey ? config?.serverKey : "••••••••••••••••••••••••••••"}
                        </p>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <button 
                            onClick={() => setShowServerKey(!showServerKey)}
                            className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400 hover:text-primary"
                          >
                            <Icon icon={showServerKey ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={18} />
                          </button>
                          <button 
                            onClick={() => handleCopy(config?.serverKey || "", "Server Key")}
                            className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400 hover:text-primary"
                          >
                            <Icon icon="solar:copy-bold-duotone" width={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Webhook Token</p>
                      <div className="relative group">
                        <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">{config?.webhookToken || "N/A"}</p>
                        <button 
                          onClick={() => handleCopy(config?.webhookToken || "", "Webhook Token")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400 hover:text-primary"
                        >
                          <Icon icon="solar:copy-bold-duotone" width={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Cards>

              {/* Webhook Configuration */}
              <Cards>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon icon="solar:earth-bold-duotone" className="text-primary" />
                    Webhook Endpoint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Webhook URL</p>
                     <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                       <span className="text-xs font-mono font-semibold text-primary">
                         {config?.webhookVerif 
                           ? `${typeof window !== "undefined" ? window.location.origin : ""}/api-backend/webhook/${config.webhookVerif}`
                           : "Not Generated"}
                       </span>
                       <button 
                         onClick={() => {
                            if (config?.webhookVerif) {
                              const fullUrl = `${window.location.origin}/api-backend/webhook/${config.webhookVerif}`;
                              navigator.clipboard.writeText(fullUrl);
                              addToast("Webhook URL copied to clipboard", "success");
                            }
                         }}
                         className="text-gray-400 hover:text-primary transition-colors"
                       >
                         <Icon icon="solar:copy-bold-duotone" width={18} />
                       </button>
                     </div>
                     <p className="text-[10px] text-muted-foreground italic ml-1 mt-2">
                        Configure this URL in your Xendit Dashboard (Settings {' > '} Callbacks).
                     </p>
                  </div>
                </CardContent>
              </Cards>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Status & Environment Card */}
          <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-xl text-white">
                  <Icon icon="solar:check-read-bold-duotone" width={20} />
                </div>
                <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider">Status</h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">Active</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-indigo-500/10">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-xl text-white">
                  <Icon icon="solar:box-bold-duotone" width={20} />
                </div>
                <h4 className="font-bold text-blue-600 text-sm uppercase tracking-wider">Environment</h4>
              </div>
              <div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 rounded-lg">
                  Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
