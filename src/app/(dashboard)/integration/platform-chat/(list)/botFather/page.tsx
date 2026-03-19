"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionMenu } from "@/src/components/ActionMenu";
import { useRouter } from "next/navigation";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { EmptyIntegration } from "@/src/components/EmptyIntegration";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { ContentIntegration } from "@/src/model/integration/userIntegration.model";

import { DeleteConfirmationModal } from "@/src/components/ui/modal/DeleteConfirmationModal";

const Page = () => {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const { userIntegrations, getAllIntegration } = useUserIntegrationStore();
  const { remove } = useContentIntegrationStore();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const botFatherIntegration = userIntegrations.find(
    (i) => i.name.toLowerCase() === "botfather"
  );

  const telegramBots = botFatherIntegration?.contentIntegrations || [];

  const handleDeleteClick = (id: string | number) => {
    setItemToDelete(String(id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await remove(itemToDelete);
      addToast("Bot deleted successfully", "success");
      setDeleteModalOpen(false);
      setItemToDelete(null);
      if (user?.id) {
        await getAllIntegration(user.id);
      }
    } catch (error: any) {
      console.error("Failed to delete bot:", error);
      addToast(error.message || "Failed to delete bot", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 poppins-bold flex items-center gap-3">
              Bot Father
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {telegramBots.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push(`/integration/platform-chat/botFather/add?userIntegrationId=${botFatherIntegration?.id}`)}
              className="h-10 sm:h-12 px-4 sm:px-8 rounded-xl sm:rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2 w-auto"
            >
              <Icon icon="solar:add-circle-bold" width={20} />
              <span className="hidden sm:inline">Tambahkan Konfigurasi</span>
            </Button>
          </div>

          <div className="space-y-4">
            {telegramBots.length > 0 ? (
              <>
                {/* Desktop View - Table */}
                <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto overflow-y-visible">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow className="hover:bg-transparent border-gray-100">
                          <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[250px] min-w-[200px]">Nama Bot</TableHead>
                          <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[300px] min-w-[200px]">Access Token</TableHead>
                          <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold min-w-[120px]">Created At</TableHead>
                          <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[80px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <AnimatePresence mode="popLayout">
                          {telegramBots.map((bot: ContentIntegration) => (
                            <motion.tr
                              key={bot.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="group hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100"
                            >
                              <TableCell className="py-6 px-8">
                                <div className="flex items-center gap-4 min-w-0">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50 shrink-0">
                                    <Icon icon="logos:telegram" width={24} />
                                  </div>
                                  <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight truncate">
                                    {bot.configJson?.botName || "No Name"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="py-6 px-6">
                                <code className="text-sm text-gray-500 poppins-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                  {bot.configJson?.accessToken ? `${bot.configJson.accessToken.slice(0, 10)}...${bot.configJson.accessToken.slice(-5)}` : "No API Key"}
                                </code>
                              </TableCell>
                              <TableCell className="py-6 px-6">
                                <span className="text-sm text-gray-500 poppins-medium whitespace-nowrap">
                                  {new Date(bot.createdAt).toLocaleDateString()}
                                </span>
                              </TableCell>
                              <TableCell className="py-6 px-8 text-right">
                                <ActionMenu
                                  baseUrl="/integration/platform-chat/botFather"
                                  id={bot.id}
                                  onDelete={() => handleDeleteClick(bot.id)}
                                />
                              </TableCell>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Mobile & Tablet View - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                  <AnimatePresence mode="popLayout">
                    {telegramBots.map((bot: ContentIntegration) => (
                      <motion.div
                        key={bot.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all group relative"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                              <Icon icon="logos:telegram" width={28} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-base font-black text-gray-900 poppins-bold truncate">
                                {bot.configJson?.botName || "No Name"}
                              </span>
                            </div>
                          </div>

                          <div className="relative z-10 shrink-0">
                            <ActionMenu
                              baseUrl="/integration/platform-chat/botFather"
                              id={bot.id}
                              onDelete={() => handleDeleteClick(bot.id)}
                            />
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Token</p>
                            <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                              <code className="text-xs text-gray-600 font-mono font-bold truncate">
                                {bot.configJson?.accessToken ? `${bot.configJson.accessToken.slice(0, 15)}...${bot.configJson.accessToken.slice(-10)}` : "No API Key"}
                              </code>
                              <Icon icon="solar:lock-bold-duotone" width={14} className="text-gray-300 ml-2 shrink-0" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50 shadow-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Added On</span>
                              <span className="text-xs font-bold text-gray-600 italic">
                                {new Date(bot.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <EmptyIntegration
                icon="mdi:telegram"
                message="No botFather configuration connected yet"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Delete Bot?"
        description="Are you sure you want to delete this BotFather configuration?"
      />
    </div>
  );
};

export default Page;
