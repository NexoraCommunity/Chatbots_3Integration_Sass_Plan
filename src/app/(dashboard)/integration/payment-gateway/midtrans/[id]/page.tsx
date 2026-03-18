"use client";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";

export default function MidtransDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const details = {
    name: "Main Integration",
    clientKey: "Mid-client-XXXXX",
    serverKey: "Mid-server-XXXXX",
    webhookUrl: "https://api.nexora.com/webhook/midtrans",
    createdAt: "2024-03-18",
    status: "Active",
    environment: "Production"
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
          onClick={() => router.push(`${id}/edit`)}
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
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.createdAt}</p>
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
                    <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">{details.clientKey}</p>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary">
                      <Icon icon="solar:copy-bold-duotone" width={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Server Key</p>
                  <div className="relative group">
                    <p className="text-xs font-mono font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100 break-all pr-12">••••••••••••••••••••••••••••</p>
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200/50 rounded-lg transition-colors group-hover:text-primary">
                      <Icon icon="solar:eye-bold-duotone" width={18} />
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
                Webhook endpoint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Webhook URL</p>
                <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs font-mono font-semibold text-primary">{details.webhookUrl}</span>
                  <button className="text-gray-400 hover:text-primary transition-colors">
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
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">{details.status}</p>
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
                  {details.environment}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
