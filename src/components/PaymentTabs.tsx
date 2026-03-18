"use client";
import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "midtrans", label: "Midtrans", path: "/integration/payment-gateway/midtrans" },
  { id: "xendit", label: "Xendit", path: "/integration/payment-gateway/xendit" },
];

const PaymentTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-8 border-b border-gray-100">
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.path);
        return (
          <button
            key={tab.id}
            onClick={() => router.push(tab.path)}
            className={cn(
              "relative pb-4 text-sm font-medium transition-colors duration-200 poppins-medium",
              isActive ? "text-[#01D2B3]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {tab.label}
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
