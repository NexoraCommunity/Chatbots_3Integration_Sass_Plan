"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Icon } from "@iconify/react";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";

const tabs = [
  { id: "midtrans", label: "Midtrans", path: "/integration/payment-gateway/midtrans" },
  { id: "xendit", label: "Xendit", path: "/integration/payment-gateway/xendit" },
];

const PaymentTabs = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userIntegrations } = useUserIntegrationStore();

  const isTabEnabled = (tabId: string) => {
    return userIntegrations.some(
      (i) => i.name.toLowerCase() === tabId.toLowerCase() && i.isconnected
    );
  };

  return (
    <div className="flex gap-8 border-b border-gray-100 mb-6">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.path);
        const enabled = isTabEnabled(tab.id);

        return (
          <button
            key={tab.id}
            onClick={() => enabled && router.push(tab.path)}
            disabled={!enabled}
            className={cn(
              "relative pb-4 text-sm font-medium transition-all duration-200 poppins-medium flex items-center gap-2",
              isActive ? "text-[#01D2B3]" : "text-gray-400 hover:text-gray-600",
              !enabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {tab.label}
            {!enabled && <Icon icon="lucide:lock" width={14} className="text-gray-300" />}
            {isActive && (
              <motion.div
                layoutId="paymentActiveTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#01D2B3] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PaymentTabs;
