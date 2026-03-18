"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionMenu } from "@/src/components/ActionMenu";
import { useRouter } from "next/navigation";


const Page = () => {
  const router = useRouter();

  // Mock data for website configurations
  const websiteConfigs = [
    {
      id: 1,
      name: "Main E-commerce",
      domain: "https://shop.nexora.com",
      image: "https://api.iconify.design/logos:nextjs-icon.svg",
      createdAt: "2024-03-18",
    },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 poppins-bold flex items-center gap-3">
              Website
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {websiteConfigs.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push("/integration/platform-chat/website/add")}
              className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width={20} />
              Tambahkan Konfigurasi
            </Button>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Website Name</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Domain</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Created At</TableHead>
                  <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {websiteConfigs.map((config) => (
                  <TableRow key={config.id} className="group hover:bg-gray-50/50 transition-colors duration-200 border-gray-100">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                          <img src={config.image} alt={config.name} className="w-6 h-6" />
                        </div>
                        <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">{config.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-sm font-medium text-[#01D2B3] hover:underline cursor-pointer poppins-semibold">
                        {config.domain}
                      </span>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-sm text-gray-500 poppins-medium">{config.createdAt}</span>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <ActionMenu baseUrl="/integration/platform-chat/website" id={config.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;