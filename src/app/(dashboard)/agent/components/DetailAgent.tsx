"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button";
import { useProductStore } from "@/src/store/product/product.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useUserAgentStore } from "@/src/store/userAgent/userAgent.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { OtherContentApi } from "@/src/model/userAgent/userAgent.model";

// Modular Components
import AgentIdentity from "./form/AgentIdentity";
import AgentPrompt from "./form/AgentPrompt";
import AgentOtherContent from "./form/AgentOtherContent";
import AgentProducts from "./form/AgentProducts";
import AgentIntegrations from "./form/AgentIntegrations";

const DetailAgent = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;

  const { user } = useAuthStore();
  const { fetchUserAgentById, currentUserAgent, isLoading: isAgentLoading } = useUserAgentStore();
  const { products, isLoading: isProductsLoading, fetchProducts } = useProductStore();
  const {
    userIntegrations,
    getAllIntegration
  } = useUserIntegrationStore();

  const [uploadedFileName, setUploadedFileName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
    agent: "customer-service",
    filePath: "",
    otherContents: [] as OtherContentApi[],
  });

  const [selectedProducts, setSelectedProducts] = useState(new Set<string>());

  // Integration State
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [paymentIntegrationId, setPaymentIntegrationId] = useState("");
  const [paymentContentId, setPaymentContentId] = useState("");

  const [isShippingEnabled, setIsShippingEnabled] = useState(false);
  const [shippingIntegrationId, setShippingIntegrationId] = useState("");
  const [shippingContentId, setShippingContentId] = useState("");

  // Initial Fetch
  useEffect(() => {
    if (user?.id && agentId) {
      fetchProducts({ userId: user.id, page: "1", limit: "100" });
      getAllIntegration(user.id);
      fetchUserAgentById(agentId);
    }
  }, [user?.id, agentId, fetchProducts, getAllIntegration, fetchUserAgentById]);

  // Sync Form Data with fetched Agent
  useEffect(() => {
    if (currentUserAgent && currentUserAgent.id === agentId) {
      setFormData({
        name: currentUserAgent.name || "",
        prompt: currentUserAgent.prompt || "",
        agent: currentUserAgent.agent || "customer-service",
        filePath: currentUserAgent.filePath || "",
        otherContents: currentUserAgent.otherContents || [],
      });

      if (currentUserAgent.productIds) {
        setSelectedProducts(new Set(currentUserAgent.productIds));
      }

      setIsPaymentEnabled(!!currentUserAgent.paymentAutomation);
      if (currentUserAgent.paymentContentIntegrationId) {
        setPaymentContentId(currentUserAgent.paymentContentIntegrationId);
        // Find which integration this content belongs to
        const integration = userIntegrations.find(ui =>
          ui.contentIntegrations?.some((ci: any) => ci.id === currentUserAgent.paymentContentIntegrationId)
        );
        if (integration) setPaymentIntegrationId(integration.id);
      }

      setIsShippingEnabled(!!currentUserAgent.ongkirChecker);
      if (currentUserAgent.ongkirContentIntegrationId) {
        setShippingContentId(currentUserAgent.ongkirContentIntegrationId);
        // Find which integration this content belongs to
        const integration = userIntegrations.find(ui =>
          ui.contentIntegrations?.some((ci: any) => ci.id === currentUserAgent.ongkirContentIntegrationId)
        );
        if (integration) setShippingIntegrationId(integration.id);
      }

      if (currentUserAgent.filePath) {
        const parts = currentUserAgent.filePath.split('/');
        setUploadedFileName(parts[parts.length - 1]);
      }
    }
  }, [currentUserAgent, agentId, userIntegrations]);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.isActive &&
      (p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [products, searchQuery]);

  const paymentIntegrations = useMemo(() =>
    userIntegrations.filter(i => i.type === "paymentGateway" && i.isconnected),
    [userIntegrations]
  );

  const shippingIntegrations = useMemo(() =>
    userIntegrations.filter(i => i.type === "shipping" && i.isconnected),
    [userIntegrations]
  );

  const selectedPaymentIntegration = useMemo(() =>
    paymentIntegrations.find(i => i.id === paymentIntegrationId),
    [paymentIntegrations, paymentIntegrationId]
  );

  const selectedShippingIntegration = useMemo(() =>
    shippingIntegrations.find(i => i.id === shippingIntegrationId),
    [shippingIntegrations, shippingIntegrationId]
  );

  if (isAgentLoading && !formData.name) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-primary font-black uppercase tracking-widest text-sm">Loading Agent Details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-full mx-auto w-full pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            moveTo="/agent"
            label=""
            icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
            iconPosition="left"
            className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
          />
          <div>
            <h1 className="text-2xl poppins-bold text-foreground leading-none">Agent Details</h1>
          </div>
        </div>
        <Button
          variant="primary"
          moveTo={`/agent/edit/${agentId}`}
          label="Edit Agent"
          icon={<Icon icon="solar:pen-bold" width={18} />}
          className="px-6 rounded-2xl font-black shadow-lg shadow-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AgentIdentity
            name={formData.name}
            agent={formData.agent}
            filePath={formData.filePath}
            uploadedFileName={uploadedFileName}
            isUploading={false}
            readOnly={true}
          />

          <AgentPrompt
            prompt={formData.prompt}
            readOnly={true}
          />

          <AgentOtherContent
            otherContents={formData.otherContents}
            isUploading={false}
            readOnly={true}
          />

          <AgentProducts
            selectedProducts={selectedProducts}
            filteredProducts={filteredProducts}
            searchQuery={searchQuery}
            isLoading={isProductsLoading}
            onSearchChange={setSearchQuery}
            readOnly={true}
          />
        </div>

        <div className="lg:col-span-1">
          <AgentIntegrations
            isPaymentEnabled={isPaymentEnabled}
            paymentIntegrationId={paymentIntegrationId}
            paymentContentId={paymentContentId}
            paymentIntegrations={paymentIntegrations}
            selectedPaymentIntegration={selectedPaymentIntegration}
            isShippingEnabled={isShippingEnabled}
            shippingIntegrationId={shippingIntegrationId}
            shippingContentId={shippingContentId}
            shippingIntegrations={shippingIntegrations}
            selectedShippingIntegration={selectedShippingIntegration}
            readOnly={true}
          />
        </div>
      </div>


    </div>
  );
};

export { DetailAgent };
