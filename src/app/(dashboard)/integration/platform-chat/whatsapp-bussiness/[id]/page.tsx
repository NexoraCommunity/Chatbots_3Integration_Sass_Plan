"use client";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";

export default function WhatsAppDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const details = {
    number: "08xx-xxxx-xxxx",
    status: "Terhubung",
    copywriting: "Kelola pesan otomatis dan interaksi pelanggan melalui nomor ini.",
    createdAt: "2024-03-18",
    environment: "Production",
    apiLimit: "1000/day"
  };

  return (
    <div className="flex flex-col space-y-8 max-w-5xl mx-auto w-full px-4 sm:px-0 bg-[#FAFAFA]">
      {/* Header with Back Button */}
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
          <h1 className="text-2xl poppins-bold text-gray-900 leading-none">WhatsApp Detail</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Connection Settings */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:phone-calling-bold-duotone" className="text-primary" />
                Connection Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Phone Number</p>
                  <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100 group">
                    <span className="text-sm font-semibold text-gray-900">{details.number}</span>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Icon icon="solar:copy-bold-duotone" width={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</p>
                  <p className="text-sm font-medium text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                    {details.copywriting}
                  </p>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* System Info */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:info-circle-bold-duotone" className="text-primary" />
                System Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Created At</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.createdAt}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">API Limit</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">{details.apiLimit}</p>
                </div>
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Status & Environment Card */}
          <div className="p-8 rounded-[2.5rem] bg-gray-900 text-white space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                  <Icon icon="solar:check-circle-bold-duotone" width={22} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400">Connection status</h4>
                  <p className="text-lg font-black uppercase tracking-tight text-white line-height-none mt-0.5">{details.status}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2.5 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                  <Icon icon="solar:box-bold-duotone" width={22} />
                </div>
                <div>
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-400">Environment</h4>
                  <p className="text-lg font-black uppercase tracking-tight text-white line-height-none mt-0.5">{details.environment}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 relative z-10">
              <p className="text-[10px] text-gray-400 leading-relaxed font-bold italic uppercase tracking-wider">
                "Your WhatsApp Business connection is active and optimized for high-volume customer interactions."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
