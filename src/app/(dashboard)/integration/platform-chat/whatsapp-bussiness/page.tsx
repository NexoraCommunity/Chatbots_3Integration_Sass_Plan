"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionMenu } from "@/src/components/ActionMenu";

const Page = () => {

  // Mock data for connected numbers
  const connectedNumbers = [
    {
      id: 1,
      number: "08xx-xxxx-xxxx",
      status: "Terhubung",
      copywriting: "Kelola pesan otomatis dan interaksi pelanggan melalui nomor ini.",
      createdAt: "2024-03-18"
    },
  ];

  return (
    <div className="flex flex-col h-full relative pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1"
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 poppins-bold flex items-center gap-3">
              Nomor Terhubung
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {connectedNumbers.length}
              </span>
            </h2>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[200px]">Nomor</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[120px]">Status</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Description</TableHead>
                  <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[120px]">Created At</TableHead>
                  <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectedNumbers.map((item) => (
                  <TableRow key={item.id} className="group hover:bg-gray-50/50 transition-colors duration-200 border-gray-100">
                    <TableCell className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#E6FAF7] flex items-center justify-center text-[#01D2B3] border border-[#01D2B3]/10">
                          <Icon icon="logos:whatsapp-icon" width={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">{item.number}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] border border-[#DCFCE7] rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest poppins-bold">
                          {item.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <p className="text-sm text-gray-500 poppins-medium line-clamp-1 max-w-[300px]">
                        {item.copywriting}
                      </p>
                    </TableCell>
                    <TableCell className="py-6 px-6">
                      <span className="text-sm text-gray-500 poppins-medium">{item.createdAt}</span>
                    </TableCell>
                    <TableCell className="py-6 px-8 text-right">
                      <ActionMenu baseUrl="/integration/platform-chat/whatsapp-bussiness" id={item.id} onlyDetail />
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
