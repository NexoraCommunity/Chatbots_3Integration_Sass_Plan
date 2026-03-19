"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { RajaOngkirConfig } from "@/src/model/integration/contentIntegration.model";

export default function RajaOngkirDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const { getById, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();

  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (id) {
      getById(id).catch((err) => {
        console.error("Failed to fetch RajaOngkir detail:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const config = currentContentIntegration?.configJson as RajaOngkirConfig;

  if (isLoading && !config) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
        <Icon icon="solar:shield-warning-bold-duotone" width={64} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 poppins-bold">Configuration Not Found</h2>
        <p className="text-gray-500 mt-2 poppins-medium">The RajaOngkir configuration you're looking for doesn't exist.</p>
        <Button variant="primary" onClick={() => router.back()} className="mt-6">Go Back</Button>
      </div>
    );
  }

  const tabs = [
    { id: "details", label: "Details", icon: "solar:info-circle-bold-duotone" },
    { id: "regional", label: "Regional", icon: "solar:map-point-bold-duotone" },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 max-w-7xl mx-auto w-full p-4 sm:p-8 bg-white rounded-[24px] shadow-sm border border-gray-100 mb-20 mt-4">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between gap-4">
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
              <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">RajaOngkir Details</h1>
            </div>
          </div>
        <Button
          variant="secondary"
          className="h-10 px-4 sm:px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest bg-white"
          onClick={() => router.push(`/integration/shipping/rajaongkir/${id}/edit`)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Shipping Identity */}
              <Cards>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon icon="solar:delivery-bold-duotone" className="text-primary" />
                    Shipping identity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Integration Name</p>
                      <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 shadow-inner">{config.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Provider</p>
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 font-black text-primary text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 shadow-inner">
                        <Icon icon="solar:box-bold-duotone" width={16} />
                        {config.provider}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Cards>

              {/* API Key */}
              <Cards>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon icon="solar:key-minimalistic-bold-duotone" className="text-primary" />
                    API Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-0">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">API Key</p>
                    <div className="relative group">
                      <p className="text-xs font-mono font-bold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-24 shadow-inner min-h-[56px] flex items-center">
                        {showApiKey ? config.apiKey : "••••••••••••••••••••••••••••••••"}
                      </p>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
                        <button 
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-primary shadow-sm"
                        >
                          <Icon icon={showApiKey ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={18} />
                        </button>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(config.apiKey);
                            addToast("API Key copied to clipboard", "success");
                          }}
                          className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-primary shadow-sm"
                        >
                          <Icon icon="solar:copy-bold-duotone" width={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Cards>
            </div>
          )}

          {activeTab === "regional" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:map-point-bold-duotone" className="text-primary" />
                  Regional Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                 <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Available Couriers</p>
                    <div className="flex flex-wrap gap-2">
                      {(config.courier || "").split(":").map(c => c.trim()).filter(Boolean).map(c => (
                        <span key={c} className="px-4 py-2 rounded-xl bg-white text-[10px] font-black uppercase text-gray-700 border border-gray-100 shadow-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Origin Address</p>
                      <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 shadow-inner">{config.origin}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                      <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 shadow-inner">
                        {currentContentIntegration?.createdAt ? new Date(currentContentIntegration.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-8">
          {/* Status Card */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                  <Icon icon="solar:check-circle-bold-duotone" width={22} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400">Integration status</h4>
                  <p className="text-lg font-black uppercase tracking-tight text-white line-height-none mt-0.5">ACTIVE</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                  <Icon icon="solar:refresh-bold-duotone" width={22} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-400">Rate Calculation</h4>
                  <p className="text-lg font-black uppercase tracking-tight text-white line-height-none mt-0.5">REAL-TIME</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10">
              <p className="text-[10px] text-gray-400 leading-relaxed font-bold italic uppercase tracking-wider">
                "Your shipping integration is active and calculating rates in real-time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
