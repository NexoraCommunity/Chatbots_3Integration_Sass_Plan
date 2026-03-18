"use client";
import React from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";

export default function EditWebsite({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const handleUpdate = () => {
    // Logic to update website config
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
          <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Edit Website Config</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Configuration */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:globus-bold-duotone" className="text-primary" />
                Website Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Website Name</label>
                <Input
                  defaultValue="My Online Store"
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Domain URL</label>
                <Input
                  defaultValue="https://myshop.com"
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                />
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Quick Info / Pro Tip */}
          <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500 p-2 rounded-xl text-white">
                <Icon icon="solar:lightbulb-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-amber-600 text-sm uppercase tracking-wider">Note</h4>
            </div>
            <p className="text-xs text-amber-600/70 leading-relaxed font-medium">
              Updating your domain may require you to re-verify your SSL certificate depending on your hosting provider.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:code-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase">Update Website</span>
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
