"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ActionMenu } from "@/src/components/ActionMenu";
import { DeleteConfirmationModal } from "@/src/components/ui/modal/DeleteConfirmationModal";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { ContentIntegration } from "@/src/model/integration/userIntegration.model";
import { EmptyIntegration } from "@/src/components/EmptyIntegration";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";

const Page = () => {
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const { userIntegrations, getAllIntegration } = useUserIntegrationStore();
  const { remove } = useContentIntegrationStore();

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const whatsappIntegration = userIntegrations.find(
    (i) => i.name.toLowerCase() === "whatsapp bussiness"
  );

  const connectedNumbers = whatsappIntegration?.contentIntegrations || [];

  const handleDeleteClick = (id: string | number) => {
    setItemToDelete(String(id));
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await remove(itemToDelete);
      addToast("Number deleted successfully", "success");
      setDeleteModalOpen(false);
      setItemToDelete(null);
      if (user?.id) {
        await getAllIntegration(user.id);
      }
    } catch (error: any) {
      console.error("Failed to delete whatsapp config:", error);
      addToast(error.message || "Failed to delete whatsapp config", "error");
    } finally {
      setIsDeleting(false);
    }
  };


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
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 poppins-bold flex items-center gap-3">
              Nomor Terhubung
              <span className="inline-flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-100 poppins-medium">
                {connectedNumbers.length}
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {connectedNumbers.length > 0 ? (
              <>
                {/* Desktop View - Table */}
                <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
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
                      {connectedNumbers.map((item: ContentIntegration) => (
                        <TableRow key={item.id} className="group hover:bg-gray-50/50 transition-colors duration-200 border-gray-100">
                          <TableCell className="py-6 px-8">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#E6FAF7] flex items-center justify-center text-[#01D2B3] border border-[#01D2B3]/10">
                                <Icon icon="logos:whatsapp-icon" width={20} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-base font-bold text-gray-900 poppins-bold tracking-tight">
                                  {item.configJson?.number || "No Number"}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-6 px-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] border border-[#DCFCE7] rounded-full">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest poppins-bold">
                                {item.isUsed ? "Active" : "Connected"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-6 px-6">
                            <p className="text-sm text-gray-500 poppins-medium line-clamp-1 max-w-[300px]">
                              {item.configJson?.description || "No description provided."}
                            </p>
                          </TableCell>
                          <TableCell className="py-6 px-6">
                            <span className="text-sm text-gray-500 poppins-medium">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell className="py-6 px-8 text-right">
                            <ActionMenu
                              baseUrl="/integration/platform-chat/whatsapp-bussiness"
                              id={item.id}
                              onDelete={() => handleDeleteClick(item.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile & Tablet View - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                  <AnimatePresence mode="popLayout">
                    {connectedNumbers.map((item: ContentIntegration) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-all group relative"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-[#E6FAF7] flex items-center justify-center text-[#01D2B3] border border-[#01D2B3]/10 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                              <Icon icon="logos:whatsapp-icon" width={24} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-base font-black text-gray-900 poppins-bold truncate">
                                {item.configJson?.number || "No Number"}
                              </span>
                              <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
                                  {item.isUsed ? "Active" : "Connected"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="relative z-10 shrink-0">
                            <ActionMenu
                              baseUrl="/integration/platform-chat/whatsapp-bussiness"
                              id={item.id}
                              onDelete={() => handleDeleteClick(item.id)}
                            />
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</p>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed italic bg-gray-50/50 p-3 rounded-xl border border-gray-100 line-clamp-2">
                              {item.configJson?.description || "No description provided."}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-4">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Provider</span>
                              <span className="text-[10px] font-black text-gray-700 uppercase">WhatsApp API</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Connected On</span>
                              <span className="text-xs font-bold text-gray-600 italic">
                                {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
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
                icon="hugeicons:whatsapp-business"
                message="No number connected yet"
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
        title="Delete Number?"
        description="Are you sure you want to delete this WhatsApp number?"
      />
    </div>
  );
};

export default Page;
