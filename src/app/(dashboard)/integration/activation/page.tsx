"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/src/components/ui/Button";
import { Cards, CardContent } from "@/src/components/ui/Cards";
import { Badge } from "@/src/components/ui/Badge";
import { Icon } from "@iconify/react";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { UserIntegration } from "@/src/model/integration/userIntegration.model";
import { cn } from "@/lib/utils";


const IconMap = ({ name, className }: { name: string; className?: string }) => {
  const lowerName = name.toLowerCase();
  const iconConfig: Record<string, { icon: string; bg: string; color: string }> = {
    "whatsapp bussiness": { icon: "hugeicons:whatsapp-business", bg: "bg-emerald-500/10", color: "text-emerald-600" },
    "baileys": { icon: "mdi:whatsapp", bg: "bg-green-500/10", color: "text-green-600" },
    "botfather": { icon: "mdi:telegram", bg: "bg-blue-500/10", color: "text-blue-600" },
    "website": { icon: "akar-icons:globe", bg: "bg-amber-500/10", color: "text-amber-600" },
    "xendit": { icon: "simple-icons:xendit", bg: "bg-orange-500/10", color: "text-orange-600" },
    "midtrans": { icon: "solar:dollar-bold", bg: "bg-blue-800/10", color: "text-blue-800" },
    "rajaongkir": { icon: "gridicons:shipping", bg: "bg-red-500/10", color: "text-red-600" },
    "jnt": { icon: "material-symbols:local-shipping", bg: "bg-red-600/10", color: "text-red-700" },
  };

  const config = iconConfig[lowerName] ||
    Object.entries(iconConfig).find(([key]) => lowerName.includes(key))?.[1] ||
    { icon: "lucide:component", bg: "bg-gray-100", color: "text-gray-400" };

  return (
    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110", config.bg, config.color, className)}>
      <Icon icon={config.icon} width={30} height={30} />
    </div>
  );
};

const IntegrationCard = ({
  integration,
  onToggle,
  isLoading
}: {
  integration: UserIntegration;
  onToggle: (integration: UserIntegration, checked: boolean) => void;
  isLoading: boolean;
}) => {
  return (
    <Cards className="group relative border-none bg-white p-1 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <IconMap name={integration.name} />
          <Badge variant="outline" className={cn("transition-opacity", integration.isconnected ? "border-primary text-primary opacity-100" : "opacity-0 group-hover:opacity-100")}>
            {integration.isconnected ? "Active" : "Available"}
          </Badge>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold poppins-semibold mb-2 group-hover:text-primary transition-colors">
            {integration.name}
          </h3>
          <p className="text-sm text-muted-foreground poppins-regular leading-relaxed line-clamp-2">
            {integration.description || `Connect your ${integration.name} account to sync data and automate your workflow with ease.`}
          </p>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-border/50">
          <Button
            variant={integration.isconnected ? "secondary" : "primary"}
            label={isLoading ? "Processing..." : integration.isconnected ? "Activated" : "Activate"}
            onClick={() => onToggle(integration, !integration.isconnected)}
            disabled={isLoading}
            className="rounded-xl px-6 h-10 font-semibold poppins-medium shadow-sm active:scale-95 transition-all"
          />
        </div>
      </CardContent>
    </Cards>
  );
};

const IntegrationSection = ({
  title,
  integrations,
  icon,
  onToggle,
  loadingId
}: {
  title: string;
  integrations: UserIntegration[];
  icon: string;
  onToggle: (integration: UserIntegration, checked: boolean) => void;
  loadingId: string | null;
}) => {
  if (integrations.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary border border-border/30">
          <Icon icon={icon} width={22} />
        </div>
        <h2 className="text-2xl font-bold poppins-semibold text-foreground/80">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {integrations.map((item) => (
          <IntegrationCard
            key={item.id}
            integration={item}
            onToggle={onToggle}
            isLoading={loadingId === item.id}
          />
        ))}
      </div>
    </section>
  );
};


const Page = () => {
  const { getAllIntegration, toggleUserIntegration, userIntegrations, isLoading } = useUserIntegrationStore();
  const { user } = useAuthStore();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchIntegrations = async () => {
    if (!user?.id) return;
    try {
      setFetchError(null);
      await getAllIntegration(user.id);
    } catch (err: any) {
      console.error("Failed to fetch integrations", err);
      setFetchError("Unable to load integrations. Please try again.");
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, [user?.id, getAllIntegration]);

  const handleToggle = async (integration: UserIntegration, checked: boolean) => {
    if (!user?.id) {
      console.error("User not found. Please log in again.");
      return;
    }

    try {
      setLoadingId(integration.id);
      await toggleUserIntegration(integration.id, checked);
      console.log(`${integration.name} ${checked ? "activated" : "deactivated"} successfully!`);
    } catch (error: any) {
      console.error(error?.message || `Failed to update ${integration.name}`);
    } finally {
      setLoadingId(null);
    }
  };

  const categories = useMemo(() => [
    { title: "Chat Platforms", type: "chatPlatform", icon: "lucide:message-square" },
    { title: "Payment Gateways", type: "paymentGateway", icon: "lucide:credit-card" },
    { title: "Shipping & Logistics", type: "shipping", icon: "lucide:truck" },
  ], []);

  if (isLoading && userIntegrations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Icon icon="lucide:loader-2" width={40} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto pt-4 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold poppins-bold text-foreground mb-2">Integrations</h1>
        <p className="text-muted-foreground poppins-regular max-w-2xl">
          Expand your ecosystem by connecting third-party services. Seamlessly manage chats, payments, and shipping.
        </p>
      </div>

      <div className="space-y-4">
        {fetchError ? (
          <div className="text-center py-20 bg-red-50/50 rounded-3xl border border-dashed border-red-200">
            <Icon icon="solar:shield-warning-bold-duotone" className="mx-auto mb-4 text-red-300" width={48} />
            <h3 className="text-xl font-semibold mb-2 text-red-900">Oops! Connection Issue</h3>
            <p className="text-red-600 mb-6 max-w-md mx-auto">{fetchError}</p>
            <Button
              variant="ghost"
              label="Retry Fetching"
              onClick={fetchIntegrations}
              className="bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl px-8 h-12"
            />
          </div>
        ) : (
          <>
            {categories.map((category) => (
              <IntegrationSection
                key={category.type}
                title={category.title}
                icon={category.icon}
                integrations={userIntegrations.filter((i: any) => i.type === category.type)}
                onToggle={handleToggle}
                loadingId={loadingId}
              />
            ))}

            {!isLoading && userIntegrations.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border/60">
                <Icon icon="lucide:layers" className="mx-auto mb-4 text-muted-foreground/40" width={48} />
                <h3 className="text-xl font-semibold mb-1">No Integrations Found</h3>
                <p className="text-muted-foreground">We couldn't find any available integrations for your account.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
