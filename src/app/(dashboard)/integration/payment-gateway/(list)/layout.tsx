"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import PaymentTabs from "../../../../../components/PaymentTabs";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { Icon } from "@iconify/react";

export default function PaymentGatewayListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { userIntegrations, isLoading } = useUserIntegrationStore();

  const tabs = useMemo(() => [
    { id: "midtrans", path: "/integration/payment-gateway/midtrans" },
    { id: "xendit", path: "/integration/payment-gateway/xendit" },
  ], []);

  useEffect(() => {
    if (isLoading || userIntegrations.length === 0) return;

    const activeIntegrations = userIntegrations.filter(
      (i) => i.type === "paymentGateway" && i.isconnected
    );

    if (activeIntegrations.length === 0) {
      router.push("/integration/activation");
      return;
    }

    const currentTab = tabs.find(tab => pathname.startsWith(tab.path));
    const isCurrentActive = currentTab && activeIntegrations.some(i => i.name.toLowerCase() === currentTab.id.toLowerCase());

    if (pathname === "/integration/payment-gateway" || !isCurrentActive) {
      const firstActiveTab = tabs.find(tab => 
        activeIntegrations.some(i => i.name.toLowerCase() === tab.id.toLowerCase())
      );
      
      if (firstActiveTab && pathname !== firstActiveTab.path) {
        router.push(firstActiveTab.path);
      } else if (!firstActiveTab) {
        router.push("/integration/activation");
      }
    }
  }, [userIntegrations, isLoading, router, pathname, tabs]);

  const isAnyEnabled = userIntegrations.some(
    (i) => i.type === "paymentGateway" && i.isconnected
  );

  if (isLoading || userIntegrations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white rounded-[24px]">
        <Icon icon="lucide:loader-2" width={40} className="animate-spin text-primary mb-4" />
        <p className="text-muted-foreground poppins-medium">Verifying Access...</p>
      </div>
    );
  }

  if (!isAnyEnabled) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-0">
        <h1 className="text-xl sm:text-3xl font-bold poppins-bold text-foreground mb-4 sm:mb-6">Payment Gateway</h1>
        <PaymentTabs />
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
