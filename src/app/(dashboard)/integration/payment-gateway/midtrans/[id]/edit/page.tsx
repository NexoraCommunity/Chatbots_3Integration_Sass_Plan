"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { MidtransConfig } from "@/src/model/integration/contentIntegration.model";

export default function EditMidtrans({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();
  const { getById, update, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const { getAllIntegration } = useUserIntegrationStore();

  const [formData, setFormData] = useState({
    name: "",
    clientKey: "",
    serverKey: "",
  });

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        const config = res.data.configJson as MidtransConfig;
        setFormData({
          name: config.name || "",
          clientKey: config.clientKey || "",
          serverKey: config.serverKey || "",
        });
      }).catch((err) => {
        console.error("Failed to fetch midtrans detail for edit:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const handleUpdate = async () => {
    if (!formData.name || !formData.clientKey || !formData.serverKey) {
      addToast("Please fill in all fields", "error");
      return;
    }

    try {
      await update(id, "midtrans", {
        provider: "midtrans",
        name: formData.name,
        clientKey: formData.clientKey,
        serverKey: formData.serverKey,
        webhookVerif: (currentContentIntegration?.configJson as MidtransConfig).webhookVerif || "",
      });

      addToast("Configuration updated successfully", "success");
      if (user?.id) {
        await getAllIntegration(user.id);
      }
      router.push("/integration/payment-gateway/midtrans");
    } catch (error: any) {
      console.error("Failed to update midtrans config:", error);
      addToast(error.message || "Failed to update configuration", "error");
    }
  };

  if (isLoading && !formData.name) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 bg-[#FAFAFA] max-w-5xl mx-auto w-full">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 px-4 sm:px-0">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          label=""
          iconPosition="mid"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
        />
        <div>
          <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Edit Midtrans</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Configuration */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:card-2-bold-duotone" className="text-primary" />
                Gateway Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Integration Name</label>
                <Input
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Client Key</label>
                  <Input
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                    value={formData.clientKey}
                    onChange={(e) => setFormData({ ...formData, clientKey: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Server Key</label>
                  <Input
                    type="password"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                    value={formData.serverKey}
                    onChange={(e) => setFormData({ ...formData, serverKey: e.target.value })}
                  />
                </div>
              </div>

              {/* Read-only Webhook URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Webhook URL</label>
                <div className="relative group">
                  <Input
                    value={(currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif || ""}
                    readOnly
                    variant="secondary"
                    className="bg-gray-100/50 border-gray-100 cursor-not-allowed select-all h-14 text-xs font-mono text-muted-foreground pr-12"
                  />
                  <button 
                    onClick={() => {
                      const url = (currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif;
                      if (url) {
                        navigator.clipboard.writeText(url);
                        addToast("Webhook URL copied to clipboard", "success");
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Icon icon="solar:copy-bold-duotone" className="text-gray-400 group-hover:text-primary transition-colors cursor-pointer" width={20} />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium italic ml-1">Generated automatically and used for transaction updates.</p>
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Quick Info / Pro Tip */}
          <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-xl text-white">
                <Icon icon="solar:shield-keyhole-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider">Security</h4>
            </div>
            <p className="text-xs text-indigo-600/70 leading-relaxed font-medium">
              Updating your server key will immediately affect pending transactions. Ensure the new keys are active in your Midtrans dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:wallet-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase">Midtrans Gateway</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Config ID: {id}</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => router.back()}
              className="px-8 rounded-2xl font-bold text-sm bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none"
            />
            <Button
              variant="primary"
              label={isLoading ? "Saving..." : "Save Changes"}
              onClick={handleUpdate}
              disabled={isLoading}
              className="px-10 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
