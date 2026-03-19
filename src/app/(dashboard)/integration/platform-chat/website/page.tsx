"use client";
import React from "react";
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
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const { userIntegrations, getAllIntegration } = useUserIntegrationStore();
  const { remove } = useContentIntegrationStore();

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const websiteIntegration = userIntegrations.find(
    (i) => i.name.toLowerCase() === "website"
  );

  const websiteConfigs = websiteIntegration?.contentIntegrations || [];

  const handleDeleteClick = (id: string | number) => {
    setItemToDelete(String(id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await remove(itemToDelete);
      addToast("Configuration deleted successfully", "success");
      setDeleteModalOpen(false);
      setItemToDelete(null);
      if (user?.id) {
        await getAllIntegration(user.id);
      }
    } catch (error: any) {
      console.error("Failed to delete website config:", error);
      addToast(error.message || "Failed to delete website config", "error");
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
              Website
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {websiteConfigs.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push(`/integration/platform-chat/website/add?userIntegrationId=${websiteIntegration?.id}`)}
              className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width={20} />
              Tambahkan Konfigurasi
            </Button>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            {websiteConfigs.length > 0 ? (
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
                  <AnimatePresence mode="popLayout">
                    {websiteConfigs.map((config: ContentIntegration) => (
                      <motion.tr
                        key={config.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100"
                      >
                        <TableCell className="py-6 px-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden">
                              {(config.configJson as any)?.img ? (
                                <Image
                                  src={(config.configJson as any).img.startsWith('http') ? (config.configJson as any).img : `/api-backend/${(config.configJson as any).img.startsWith('/') ? (config.configJson as any).img.substring(1) : (config.configJson as any).img}`}
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Icon icon="logos:nextjs-icon" width={16} />
                              )}
                            </div>
                            <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">
                              {(config.configJson as any)?.botName || "No Name"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-sm font-medium text-[#01D2B3] hover:underline cursor-pointer poppins-semibold">
                            {config.configJson?.domain || "No Domain"}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-sm text-gray-500 poppins-medium">
                            {new Date(config.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 px-8 text-right">
                          <ActionMenu
                            baseUrl="/integration/platform-chat/website"
                            id={config.id}
                            onDelete={() => handleDeleteClick(config.id)}
                          />
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            ) : (
              <EmptyIntegration
                icon="solar:global-bold-duotone"
                message="No website connected yet"
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
        title="Delete Configuration?"
        description="Are you sure you want to delete this website configuration?"
      />
    </div>
  );
};

export default Page;