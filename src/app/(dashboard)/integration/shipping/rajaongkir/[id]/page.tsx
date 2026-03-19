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

  return (
    <div className="flex flex-col space-y-8 max-w-5xl mx-auto w-full px-4 sm:px-0 bg-[#FAFAFA] mb-20 mt-4">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            label=""
            iconPosition="mid"
            className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
            icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
          />
          <div>
            <h1 className="text-2xl poppins-bold text-gray-900 leading-none">RajaOngkir Details</h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="h-10 px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest"
          onClick={() => router.push(`/integration/shipping/rajaongkir/${id}/edit`)}
        >
          <Icon icon="solar:pen-new-square-bold-duotone" width={18} />
          Edit Config
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
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
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{config.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Provider</p>
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 font-bold text-indigo-600 text-xs uppercase tracking-widest flex items-center gap-2">
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
                  <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">
                    {showApiKey ? config.apiKey : "••••••••••••••••••••••••••••••••"}
                  </p>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400 hover:text-primary"
                    >
                      <Icon icon={showApiKey ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={18} />
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(config.apiKey);
                        addToast("API Key copied to clipboard", "success");
                      }}
                      className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors text-gray-400 hover:text-primary"
                    >
                      <Icon icon="solar:copy-bold-duotone" width={18} />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* Currieries */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:map-point-bold-duotone" className="text-primary" />
                Regional settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
               <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Available Couriers</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(config.courier || "").split(":").map(c => c.trim()).filter(Boolean).map(c => (
                      <span key={c} className="px-3 py-1.5 rounded-lg bg-gray-100 text-[10px] font-black uppercase text-gray-600 border border-gray-200 shadow-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Origin Address</p>
                    <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{config.origin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                    <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      {currentContentIntegration?.createdAt ? new Date(currentContentIntegration.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Status Card */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/30">
                <Icon icon="solar:check-read-bold-duotone" width={22} />
              </div>
              <h4 className="font-black text-xs uppercase tracking-widest">Integration Status</h4>
            </div>
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">ACTIVE</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-bold italic">
                "Your shipping integration is active and calculating rates in real-time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
