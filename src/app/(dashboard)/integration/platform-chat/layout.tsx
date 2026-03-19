"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { Icon } from "@iconify/react";

export default function PlatformChatLogicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { userIntegrations, isLoading } = useUserIntegrationStore();

  const tabs = useMemo(() => [
    { id: "whatsapp bussiness", path: "/integration/platform-chat/whatsapp-bussiness" },
    { id: "botFather", path: "/integration/platform-chat/botFather" },
    { id: "website", path: "/integration/platform-chat/website" },
  ], []);

  useEffect(() => {
    if (isLoading || userIntegrations.length === 0) return;

    const activeIntegrations = userIntegrations.filter(
      (i) => i.type === "chatPlatform" && i.isconnected
    );

    if (activeIntegrations.length === 0) {
      router.push("/integration/activation");
      return;
    }

    const currentTab = tabs.find(tab => pathname.startsWith(tab.path));
    const isCurrentActive = currentTab && activeIntegrations.some(i => i.name.toLowerCase() === currentTab.id.toLowerCase());

    if (pathname === "/integration/platform-chat" || !isCurrentActive) {
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
    (i) => i.type === "chatPlatform" && i.isconnected
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

  return <>{children}</>;
}
