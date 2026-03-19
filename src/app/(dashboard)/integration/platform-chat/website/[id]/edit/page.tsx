"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import Image from "next/image";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useUploadStore } from "@/src/store/upload/upload.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { WebsiteConfig } from "@/src/model/integration/contentIntegration.model";

export default function EditWebsite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const { getById, update, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();
  const { uploadImage, isLoading: isUploading } = useUploadStore();
  const { getAllIntegration } = useUserIntegrationStore();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    botName: "",
    domain: "",
    img: "",
  });
  const [activeTab, setActiveTab] = useState("general");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        if (res.data) {
          const config = res.data.configJson as WebsiteConfig;
          setFormData({
            botName: config.botName || "",
            domain: config.domain || "",
            img: config.img || "",
          });
        }
      }).catch((err) => {
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImage(file);
        setFormData({ ...formData, img: response.data });
        addToast("Image updated successfully", "success");
      } catch (error: any) {
        addToast(error.message || "Failed to upload image", "error");
      }
    }
  };

  const handleUpdate = async () => {
    if (!formData.botName || !formData.domain) {
      addToast("Please fill in required fields (Name & Domain)", "warning");
      return;
    }

    try {
      await update(id, "chatPlatform", {
        provider: "website",
        botName: formData.botName,
        domain: formData.domain,
        img: formData.img,
      });

      addToast("Website configuration updated successfully!", "success");
      if (user?.id) {
        await getAllIntegration(user.id);
      }
      router.back();
    } catch (error: any) {
      console.error("Failed to update website config:", error);
      addToast(error.message || "Failed to update configuration", "error");
    }
  };

  if (isLoading && !formData.botName) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General", icon: "solar:settings-minimalistic-bold-duotone" },
    { id: "appearance", label: "Appearance", icon: "solar:palet-bold-duotone" },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 bg-white max-w-7xl mx-auto w-full p-4 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 pb-24 sm:pb-8">
      {/* Header with Back Button */}
       <div className="flex items-center gap-4 mt-4">
         <Button
           variant="secondary"
           onClick={() => router.back()}
           label=""
           iconPosition="mid"
           className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
           icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
         />
         <div className="flex-1 min-w-0">
           <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Edit Website Config</h1>
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
                  <Icon icon="solar:globus-bold-duotone" className="text-primary" />
                  Website Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Website Name</label>
                    <Input
                      placeholder="e.g. My Online Store"
                      variant="secondary"
                      className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                      value={formData.botName}
                      onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Domain URL</label>
                    <Input
                      placeholder="https://example.com"
                      variant="secondary"
                      className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "appearance" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:camera-add-bold-duotone" className="text-primary" />
                  Widget Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  {/* Image Upload Block */}
                  <div className="space-y-2 shrink-0">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Profile Image</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-32 h-32 rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 relative overflow-hidden group shadow-inner"
                    >
                      {formData.img ? (
                        <>
                          <Image
                            src={formData.img.startsWith('http') ? formData.img : `/api-backend/${formData.img.startsWith('/') ? formData.img.substring(1) : formData.img}`}
                            alt="Preview"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Icon icon="solar:upload-bold" width={24} />
                          </div>
                        </>
                      ) : (
                        <>
                          <Icon icon="solar:camera-add-bold-duotone" width={32} className="text-gray-300 group-hover:text-primary transition-colors" />
                          <span className="text-[10px] font-bold text-gray-400 group-hover:text-primary transition-colors uppercase">Upload</span>
                        </>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="flex-1 pt-6">
                    <p className="text-xs font-medium text-gray-500 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                      Customize your website chat identity. This image will appear at the top of the chat window for all your customers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 p-2 rounded-xl text-white">
                <Icon icon="solar:lightbulb-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-indigo-600 text-sm uppercase tracking-wider">Note</h4>
            </div>
            <p className="text-xs text-indigo-600/70 leading-relaxed font-medium">
              Updating your domain may require you to re-verify your SSL certificate depending on your hosting provider.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-7xl p-2 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="hidden sm:flex items-center gap-3 ml-4">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:code-bold-duotone" width={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-900 uppercase">Update Website</span>
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
              disabled={isLoading || isUploading}
              className="h-10 sm:h-12 px-6 sm:px-10 rounded-xl sm:rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
