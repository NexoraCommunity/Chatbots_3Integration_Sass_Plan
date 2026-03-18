"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionMenu } from "@/src/components/ActionMenu";
import { useRouter } from "next/navigation";
import { AddXenditModal } from "@/src/components/ui/modal/AddXenditModal";

const Page = () => {
  const router = useRouter();

  const xenditConfigs = [
    {
      id: 1,
      name: "Secondary Integration",
      serverKey: "xnd_development_XX...XXXX",
      webhookKey: "wh_XX...XXXX",
      webhookUrl: "https://api.nexora.com/webhook/xendit",
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
              Xendit
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {xenditConfigs.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push("/integration/payment-gateway/xendit/add")}
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
                  <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Name</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Server Key</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Webhook Key</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Webhook URL</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Created At</TableHead>
                  <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[120px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {xenditConfigs.map((config) => (
                  <TableRow key={config.id} className="group hover:bg-gray-50/50 transition-colors duration-200 border-gray-100">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
                          <Icon icon="lucide:zap" width={16} />
                        </div>
                        <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">{config.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <code className="text-xs text-gray-500 poppins-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {config.serverKey}
                      </code>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <code className="text-xs text-gray-500 poppins-medium bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        {config.webhookKey}
                      </code>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-sm text-gray-500 poppins-medium truncate max-w-[200px]" title={config.webhookUrl}>
                        {config.webhookUrl}
                      </span>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-sm text-gray-500 poppins-medium">{config.createdAt}</span>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <ActionMenu baseUrl="/integration/payment-gateway/xendit" id={config.id} />
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
