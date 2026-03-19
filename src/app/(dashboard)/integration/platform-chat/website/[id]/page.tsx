"use client";
import React, { useEffect } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import Image from "next/image";
import { useToastStore } from "@/src/store/ui/toast.store";
import { WebsiteConfig } from "@/src/model/integration/contentIntegration.model";

export default function WebsiteDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const { getById, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();

  useEffect(() => {
    if (id) {
      getById(id).catch((err) => {
        console.error("Failed to fetch website detail:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const config = currentContentIntegration?.configJson as WebsiteConfig;

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
        <p className="text-gray-500 mt-2 poppins-medium">The website configuration you're looking for doesn't exist.</p>
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
            <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Website Configuration</h1>
          </div>
        </div>
        <Button
          variant="secondary"
          className="h-10 px-6 rounded-xl poppins-bold flex items-center gap-2 border-gray-100 hover:bg-white hover:shadow-md transition-all font-bold text-xs uppercase tracking-widest"
          onClick={() => router.push(`/integration/platform-chat/website/${id}/edit`)}
        >
          <Icon icon="solar:pen-new-square-bold-duotone" width={18} />
          Edit Config
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Website Identity */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:globus-bold-duotone" className="text-primary" />
                Website Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm shrink-0">
                  {config.img ? (
                    <Image
                      src={config.img.startsWith('http') ? config.img : `/api-backend/${config.img.startsWith('/') ? config.img.substring(1) : config.img}`}
                      alt={config.botName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon icon="solar:code-bold-duotone" width={32} className="text-gray-300" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Site Name</p>
                  <p className="text-base font-bold text-gray-900">{config.botName}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Domain URL</p>
                <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <span className="text-sm font-semibold text-primary">{config.domain}</span>
                  <a href={config.domain} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                    <Icon icon="solar:link-bold-duotone" width={18} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* Integration Details */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:info-circle-bold-duotone" className="text-primary" />
                System Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Registration Date</p>
                  <p className="text-sm font-semibold text-gray-900 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    {currentContentIntegration?.createdAt ? new Date(currentContentIntegration.createdAt).toLocaleDateString() : "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Status</p>
                  <div className="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified & Active
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
              <h4 className="font-black text-xs uppercase tracking-widest">Verification Status</h4>
            </div>
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-sm font-black text-emerald-400 uppercase tracking-widest">VERIFIED</p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-bold italic">
                "Your website is verified and ready to be used as a knowledge base for your AI agents."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
