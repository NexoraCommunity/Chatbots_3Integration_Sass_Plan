"use client";
import { useEffect, use, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";

export default function EditTelegramBot({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToast } = useToastStore();
  const { currentContentIntegration, getById, update, isLoading } = useContentIntegrationStore();
  const { getAllIntegration } = useUserIntegrationStore();
  const { user } = useAuthStore();

  const [botName, setBotName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    getById(id);
  }, [id, getById]);

  useEffect(() => {
    if (currentContentIntegration) {
      const config = currentContentIntegration.configJson as any;
      setBotName(config?.botName || "");
      setAccessToken(config?.accessToken || "");
    }
  }, [currentContentIntegration]);

  const handleUpdate = async () => {
    if (!botName || !accessToken) {
      addToast("Please fill in all fields", "warning");
      return;
    }

    try {
      await update(id, "chatPlatform", {
        provider: "botFather",
        botName,
        accessToken,
      });
      addToast("Changes saved successfully!", "success");
      if (user?.id) {
        getAllIntegration(user.id);
      }
      router.back();
    } catch (error: any) {
      console.error("Failed to update bot:", error);
      addToast(error.message || "Failed to update botFather config", "error");
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: "solar:user-id-bold-duotone" },
    { id: "credentials", label: "Credentials", icon: "solar:key-bold-duotone" },
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
           <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Edit Telegram Bot</h1>
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
                  <Icon icon="solar:document-text-bold-duotone" className="text-primary" />
                  Bot Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Bot Name</label>
                  <Input
                    placeholder="Bot Name"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground italic ml-1">Friendly name for your reference.</p>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "credentials" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:key-bold-duotone" className="text-primary" />
                  Access Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Bot Token (API Key)</label>
                  <Input
                    placeholder="Access Token"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                  />
                  <p className="text-[10px] text-muted-foreground italic ml-1">Required for API communication.</p>
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
                <Icon icon="solar:info-circle-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider">Need Help?</h4>
            </div>
            <p className="text-xs text-indigo-500/70 leading-relaxed font-medium">
              If you lost your token, you can always retrieve it or rotate it by contacting <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer" className="underline font-bold">@BotFather</a> on Telegram.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-7xl p-2 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="hidden sm:flex items-center gap-3 ml-4">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="logos:telegram" width={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900 uppercase">Update Integration</span>
              <span className="text-[10px] text-muted-foreground font-bold italic truncate max-w-[150px]">ID: {id}</span>
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
