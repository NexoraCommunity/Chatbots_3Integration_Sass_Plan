"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useToastStore, ToastType } from "@/src/store/ui/toast.store";

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const iconMap: Record<ToastType, string> = {
  success: "solar:check-circle-bold-duotone",
  error: "solar:danger-circle-bold-duotone",
  info: "solar:info-circle-bold-duotone",
  warning: "solar:shield-warning-bold-duotone",
};

const colorMap: Record<ToastType, string> = {
  success: "text-green-500 bg-green-50 border-green-100",
  error: "text-red-500 bg-red-50 border-red-100",
  info: "text-blue-500 bg-blue-50 border-blue-100",
  warning: "text-amber-500 bg-amber-50 border-amber-100",
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[9999] flex flex-col gap-3 pointer-events-none items-center md:items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`pointer-events-auto w-full md:min-w-[320px] md:max-w-md p-4 rounded-2xl border shadow-xl flex items-center gap-4 ${colorMap[toast.type]}`}
          >
            <div className="flex-shrink-0">
              <Icon icon={iconMap[toast.type]} width={22} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest leading-none">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <Icon icon="solar:close-circle-bold" width={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
