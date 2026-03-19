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

  const [activeTab, setActiveTab] = useState("general");
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
        webhookVerif: (currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif,
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

  const tabs = [
    { id: "general", label: "General", icon: "solar:user-id-bold-duotone" },
    { id: "credentials", label: "Credentials", icon: "solar:key-bold-duotone" },
    { id: "webhook", label: "Webhook", icon: "solar:earth-bold-duotone" },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 bg-white max-w-7xl mx-auto w-full p-4 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 pb-24 sm:pb-8">
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
         <div className="flex-1 min-w-0">
           <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Edit Midtrans</h1>
         </div>
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
          {activeTab === "general" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:card-2-bold-duotone" className="text-primary" />
                  Integration Identity
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
                  <p className="text-[10px] text-muted-foreground italic ml-1">Update the name of your integration.</p>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "credentials" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:key-bold-duotone" className="text-primary" />
                  API Credentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
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
              </CardContent>
            </Cards>
          )}

          {activeTab === "webhook" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:earth-bold-duotone" className="text-primary" />
                  Webhook Endpoint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Webhook URL</label>
                  <div className="relative group">
                     <Input
                       value={
                         (currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif
                           ? `${typeof window !== "undefined" ? window.location.origin : ""}/api-backend/webhook/${(currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif}`
                           : ""
                       }
                       readOnly
                       variant="secondary"
                       className="bg-gray-100/50 border-gray-100 cursor-not-allowed select-all h-14 text-xs font-mono text-muted-foreground pr-12"
                     />
                     <button 
                       onClick={() => {
                         const token = (currentContentIntegration?.configJson as MidtransConfig)?.webhookVerif;
                         if (token) {
                           const fullUrl = `${window.location.origin}/api-backend/webhook/${token}`;
                           navigator.clipboard.writeText(fullUrl);
                           addToast("Webhook URL copied to clipboard", "success");
                         }
                       }}
                       className="absolute right-3 top-1/2 -translate-y-1/2"
                     >
                       <Icon icon="solar:copy-bold-duotone" className="text-gray-400 group-hover:text-primary transition-colors cursor-pointer" width={20} />
                     </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium italic ml-1">Ensure this URL is configured in your Midtrans Dashboard (Settings {' > '} Webhook).</p>
                </div>
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-6 sm:space-y-8">
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
        <div className="mx-auto max-w-7xl p-2 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="hidden sm:flex items-center gap-3 ml-4">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:wallet-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900 uppercase">Midtrans Gateway</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Config ID: {id}</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto p-2 sm:p-0">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => router.back()}
              className="h-10 sm:h-12 px-4 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none"
            />
            <Button
              variant="primary"
              label={isLoading ? "Saving..." : "Save Changes"}
              onClick={handleUpdate}
              disabled={isLoading}
              className="h-10 sm:h-12 px-6 sm:px-10 rounded-xl sm:rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
