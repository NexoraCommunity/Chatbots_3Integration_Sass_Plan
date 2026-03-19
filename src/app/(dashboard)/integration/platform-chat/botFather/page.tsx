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
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 poppins-bold flex items-center gap-3">
              Bot Father
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {telegramBots.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push(`/integration/platform-chat/botFather/add?userIntegrationId=${botFatherIntegration?.id}`)}
              className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width={20} />
              Tambahkan Token
            </Button>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            {telegramBots.length > 0 ? (
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="hover:bg-transparent border-gray-100">
                    <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[250px]">Nama Bot</TableHead>
                    <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[300px]">Access Token</TableHead>
                    <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Created At</TableHead>
                    <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[100px]">Action</TableHead>
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
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
                              <Icon icon="logos:telegram" width={24} />
                            </div>
                            <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">
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
                          <span className="text-sm text-gray-500 poppins-medium">
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
