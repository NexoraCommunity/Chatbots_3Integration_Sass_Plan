"use client";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";

export default function EditXendit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const handleUpdate = () => {
    // Logic to update xendit config
    router.back();
  };

  return (
    <div className="flex flex-col space-y-8  bg-[#FAFAFA] max-w-5xl mx-auto w-full">
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
          <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Edit Xendit</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Configuration */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:card-highlight-bold-duotone" className="text-primary" />
                Gateway Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Integration Name</label>
                <Input
                  defaultValue="Xendit Primary"
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Server Key</label>
                  <Input
                    defaultValue="xnd_development_xxxx"
                    type="password"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Webhook Key</label>
                  <Input
                    defaultValue="verification_token_xxxx"
                    variant="secondary"
                    className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Read-only Webhook URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Webhook URL</label>
                <div className="relative group">
                  <Input
                    defaultValue="https://api.website.com/webhook/xendit"
                    readOnly
                    variant="secondary"
                    className="bg-gray-100/50 border-gray-100 cursor-not-allowed select-all h-14 text-xs font-mono text-muted-foreground pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Icon icon="solar:copy-bold-duotone" className="text-gray-400 group-hover:text-primary transition-colors cursor-pointer" width={20} />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium italic ml-1">Copy this URL to your Xendit Dashboard callbacks.</p>
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Quick Info / Pro Tip */}
          <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-xl text-white">
                <Icon icon="solar:tuning-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-blue-600 text-sm uppercase tracking-wider">Callback Setup</h4>
            </div>
            <p className="text-xs text-blue-600/70 leading-relaxed font-medium">
              Don't forget to set the Webhook URL in your Xendit Dashboard settings to receive real-time payment notifications.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:card-2-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase">Xendit Gateway</span>
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
              label="Save Changes"
              onClick={handleUpdate}
              className="px-10 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
