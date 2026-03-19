"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { MidtransConfig } from "@/src/model/integration/contentIntegration.model";

export default function MidtransDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const { getById, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();
  const [showServerKey, setShowServerKey] = useState(false);

  useEffect(() => {
    if (id) {
      getById(id).catch((err) => {
        console.error("Failed to fetch midtrans detail:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentContentIntegration) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Icon icon="solar:shield-warning-bold-duotone" width={64} className="text-gray-300" />
        <h2 className="text-xl font-bold text-gray-900 poppins-bold">Configuration not found</h2>
        <Button variant="secondary" onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const config = currentContentIntegration.configJson as MidtransConfig;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard`, "success");
  };

  return (
    <div className="flex flex-col space-y-8 max-w-5xl mx-auto w-full px-4 sm:px-0 bg-[#FAFAFA]">
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
            <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Midtrans Configuration</h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="h-10 px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest"
          onClick={() => router.push(`/integration/payment-gateway/midtrans/${id}/edit`)}
        >
          <Icon icon="solar:pen-new-square-bold-duotone" width={18} />
          Edit Config
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Configuration */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:wallet-bold-duotone" className="text-primary" />
                Gateway identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Integration Name</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{config.name || "No Name"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    {new Date(currentContentIntegration.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Cards>

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
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Client Key</p>
                  <div className="relative group">
                    <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">{config.clientKey}</p>
                    <button 
                      onClick={() => handleCopy(config.clientKey, "Client Key")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary"
                    >
                      <Icon icon="solar:copy-bold-duotone" width={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Server Key</p>
                  <div className="relative group">
                    <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">
                      {showServerKey ? config.serverKey : "••••••••••••••••••••••••••••"}
                    </p>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <button 
                        onClick={() => setShowServerKey(!showServerKey)}
                        className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary"
                      >
                        <Icon icon={showServerKey ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} width={18} />
                      </button>
                      <button 
                        onClick={() => handleCopy(config.serverKey, "Server Key")}
                        className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary"
                      >
                        <Icon icon="solar:copy-bold-duotone" width={18} />
                      </button>
                    </div>
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
                Webhook endpoint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Webhook URL</p>
                <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs font-mono font-semibold text-primary">{config.webhookVerif || "Automatically generated"}</span>
                  <button 
                    onClick={() => config.webhookVerif && handleCopy(config.webhookVerif, "Webhook URL")}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <Icon icon="solar:copy-bold-duotone" width={18} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Cards>
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
                <div className="bg-amber-500 p-2 rounded-xl text-white">
                  <Icon icon="solar:box-bold-duotone" width={20} />
                </div>
                <h4 className="font-bold text-amber-600 text-sm uppercase tracking-wider">Environment</h4>
              </div>
              <div>
                <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-widest border border-amber-500/20 rounded-lg">
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
