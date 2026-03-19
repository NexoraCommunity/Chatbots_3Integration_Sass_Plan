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
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
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

  const xenditIntegration = userIntegrations.find(
    (i) => i.name.toLowerCase() === "xendit"
  );

  const xenditConfigs = xenditIntegration?.contentIntegrations || [];

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
      console.error("Failed to delete configuration:", error);
      addToast(error.message || "Failed to delete configuration", "error");
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
              Xendit
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {xenditConfigs.length}
              </span>
            </h2>

            <Button
              variant="primary"
              onClick={() => router.push(`/integration/payment-gateway/xendit/add?userIntegrationId=${xenditIntegration?.id}`)}
              className="h-12 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" width={20} />
              Tambahkan Konfigurasi
            </Button>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
            {xenditConfigs.length > 0 ? (
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="hover:bg-transparent border-gray-100">
                    <TableHead className="py-5 px-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Name</TableHead>
                    <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Webhook URL</TableHead>
                    <TableHead className="py-5 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold">Created At</TableHead>
                    <TableHead className="py-5 px-8 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest poppins-bold w-[120px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {xenditConfigs.map((config: ContentIntegration) => (
                      <motion.tr
                        key={config.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 last:border-0"
                      >
                        <TableCell className="py-6 px-8">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100/50">
                              <Icon icon="lucide:zap" width={16} />
                            </div>
                            <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">
                              {config.configJson?.name || "No Name"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-sm text-gray-500 poppins-medium truncate max-w-[200px]" title={config.configJson?.webhookUrl}>
                            {config.configJson?.webhookUrl || "No Webhook"}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 px-6">
                          <span className="text-sm text-gray-500 poppins-medium">
                            {new Date(config.createdAt).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell className="py-6 px-8 text-right">
                          <ActionMenu
                            baseUrl="/integration/payment-gateway/xendit"
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
              <div className="flex flex-col items-center justify-center py-10 px-8 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                  <Icon icon="solar:shield-warning-bold-duotone" width={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 poppins-bold mb-2">Belum ada konfigurasi</h3>
                <p className="text-gray-500 poppins-medium max-w-sm">
                  u dont have any configuration please add
                </p>
              </div>
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
        description="Are you sure you want to delete this Xendit configuration?"
      />
    </div>
  );
};

export default Page;
