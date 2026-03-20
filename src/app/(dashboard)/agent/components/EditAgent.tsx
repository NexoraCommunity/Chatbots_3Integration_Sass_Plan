"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button";
import { useProductStore } from "@/src/store/product/product.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useUserAgentStore } from "@/src/store/userAgent/userAgent.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { uploadFile, uploadImage } from "@/src/services/upload/upload.route";
import { OtherContentApi } from "@/src/model/userAgent/userAgent.model";

// Modular Components
import AgentIdentity from "./form/AgentIdentity";
import AgentPrompt from "./form/AgentPrompt";
import AgentOtherContent from "./form/AgentOtherContent";
import AgentProducts from "./form/AgentProducts";
import AgentIntegrations from "./form/AgentIntegrations";

const EditAgent = () => {
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;

  const { user } = useAuthStore();
  const { addToast } = useToastStore();
  const { fetchUserAgentById, updateUserAgent, currentUserAgent, isLoading: isAgentLoading } = useUserAgentStore();
  const { products, isLoading: isProductsLoading, fetchProducts } = useProductStore();
  const {
    userIntegrations,
    getAllIntegration
  } = useUserIntegrationStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    userIntegrations.filter(i => i.type === "paymentGateway" && !!i.isconnected),
    [userIntegrations]
  );

  const shippingIntegrations = useMemo(() =>
    userIntegrations.filter(i => i.type === "shipping" && !!i.isconnected),
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

  // Auto-select first integration if none selected (for new state, but for edit we might already have one)
  useEffect(() => {
    if (isPaymentEnabled && paymentIntegrations.length > 0 && !paymentIntegrationId) {
      setPaymentIntegrationId(paymentIntegrations[0].id);
    }
  }, [isPaymentEnabled, paymentIntegrations, paymentIntegrationId]);

  useEffect(() => {
    if (isShippingEnabled && shippingIntegrations.length > 0 && !shippingIntegrationId) {
      setShippingIntegrationId(shippingIntegrations[0].id);
    }
  }, [isShippingEnabled, shippingIntegrations, shippingIntegrationId]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        setUploadedFileName(file.name);
        const response = await uploadFile(file);
        setFormData(prev => ({ ...prev, filePath: response.data }));
        addToast("Reference file updated", "success");
      } catch (error: any) {
        setUploadedFileName("");
        addToast(error.message || "Failed to upload file", "error");
      } finally {
        setIsUploading(false);
      }
    }
  }, [addToast]);

  const toggleProduct = useCallback((id: string) => {
    setSelectedProducts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedProducts(prev => {
      if (prev.size === filteredProducts.length) {
        return new Set();
      } else {
        return new Set(filteredProducts.map(p => p.id));
      }
    });
  }, [filteredProducts]);

  const addOtherContent = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      otherContents: [...prev.otherContents, { name: "", text: "", image: null }]
    }));
  }, []);

  const removeOtherContent = useCallback((index: number) => {
    setFormData(prev => {
      if (prev.otherContents[index].name === "Greeting") return prev;
      return {
        ...prev,
        otherContents: prev.otherContents.filter((_, i) => i !== index)
      };
    });
  }, []);

  const updateOtherContent = useCallback((index: number, field: keyof OtherContentApi, value: any) => {
    setFormData(prev => ({
      ...prev,
      otherContents: prev.otherContents.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  }, []);

  const handleOtherContentImageUpload = useCallback(async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        const response = await uploadImage(file);
        updateOtherContent(index, 'image', response.data);
        addToast("Image uploaded successfully", "success");
      } catch (error: any) {
        addToast(error.message || "Failed to upload image", "error");
      } finally {
        setIsUploading(false);
      }
    }
  }, [addToast, updateOtherContent]);

  const handleUpdateAgent = async () => {
    if (!user?.id || !agentId) return;
    if (!formData.name) {
      addToast("Agent name is required", "error");
      return;
    }

    setIsSaving(true);
    try {
      await updateUserAgent(agentId, {
        id: agentId,
        userId: user.id,
        name: formData.name,
        agent: formData.agent || "customer-service",
        prompt: formData.prompt || null,
        filePath: formData.filePath || "",
        productIds: Array.from(selectedProducts),
        otherContents: formData.otherContents,
        paymentAutomation: isPaymentEnabled,
        paymentContentIntegrationId: isPaymentEnabled ? paymentContentId : null,
        ongkirChecker: isShippingEnabled,
        ongkirContentIntegrationId: isShippingEnabled ? shippingContentId : null,
      });

      addToast("Agent updated successfully!", "success");
      router.push("/agent");
    } catch (error: any) {
      addToast(error.message || "Failed to update agent", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNameChange = useCallback((val: string) => setFormData(prev => ({ ...prev, name: val })), []);
  const handleAgentChange = useCallback((val: string) => setFormData(prev => ({ ...prev, agent: val })), []);
  const handleRemoveFile = useCallback(() => setFormData(prev => ({ ...prev, filePath: "" })), []);
  const handlePromptChange = useCallback((val: string) => setFormData(prev => ({ ...prev, prompt: val })), []);
  const handlePaymentToggle = useCallback(() => setIsPaymentEnabled(prev => !prev), []);
  const handleShippingToggle = useCallback(() => setIsShippingEnabled(prev => !prev), []);

  if (isAgentLoading && !formData.name) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-primary font-black uppercase tracking-widest text-sm">Loading Agent Configuration...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-full mx-auto w-full pb-32 lg:pb-8">
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
          <h1 className="text-2xl poppins-bold text-foreground leading-none">Edit Agent</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AgentIdentity
            name={formData.name}
            agent={formData.agent}
            filePath={formData.filePath}
            uploadedFileName={uploadedFileName}
            isUploading={isUploading}
            onNameChange={handleNameChange}
            onAgentChange={handleAgentChange}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
          />

          <AgentPrompt
            prompt={formData.prompt}
            onPromptChange={handlePromptChange}
          />

          <AgentOtherContent
            otherContents={formData.otherContents}
            isUploading={isUploading}
            onAdd={addOtherContent}
            onRemove={removeOtherContent}
            onUpdate={updateOtherContent}
            onImageUpload={handleOtherContentImageUpload}
          />

          <AgentProducts
            selectedProducts={selectedProducts}
            filteredProducts={filteredProducts}
            searchQuery={searchQuery}
            isLoading={isProductsLoading}
            onSearchChange={setSearchQuery}
            onToggleProduct={toggleProduct}
            onToggleAll={toggleSelectAll}
          />
        </div>

        <div className="lg:col-span-1">
          <AgentIntegrations
            isPaymentEnabled={isPaymentEnabled}
            paymentIntegrationId={paymentIntegrationId}
            paymentContentId={paymentContentId}
            paymentIntegrations={paymentIntegrations}
            selectedPaymentIntegration={selectedPaymentIntegration}
            onPaymentToggle={handlePaymentToggle}
            onPaymentIntegrationChange={setPaymentIntegrationId}
            onPaymentContentChange={setPaymentContentId}
            isShippingEnabled={isShippingEnabled}
            shippingIntegrationId={shippingIntegrationId}
            shippingContentId={shippingContentId}
            shippingIntegrations={shippingIntegrations}
            selectedShippingIntegration={selectedShippingIntegration}
            onShippingToggle={handleShippingToggle}
            onShippingIntegrationChange={setShippingIntegrationId}
            onShippingContentChange={setShippingContentId}
          />
        </div>
      </div>

      {/* Premium Floating Footer (Mobile/Tablet) */}
      <div className="fixed bottom-6 left-4 right-4 z-50 lg:hidden">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 space-y-4 border border-white/50 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981] font-black text-sm shadow-inner border border-[#10b981]/20">
              {selectedProducts.size}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-gray-900 tracking-tight leading-none">Products Selected</span>
              <span className="text-[10px] text-gray-400 font-black italic mt-1">Knowledge coverage</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/agent")}
              className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-[1rem] font-bold text-[10px] transition-all active:scale-95 border border-gray-100 uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateAgent}
              disabled={isSaving}
              className="flex-1 py-3 bg-[#10b981] hover:bg-[#0da371] text-white disabled:opacity-50 rounded-[1rem] font-bold text-[10px] shadow-lg shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              {isSaving ? (
                <Icon icon="solar:spinner-bold" className="animate-spin" width={14} />
              ) : (
                "Update Agent"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Refined Desktop Footer (Hidden on mobile) */}
      <div className="hidden lg:block sticky bottom-6 w-full z-40 mt-12 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="p-4 bg-white/90 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] flex items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 ml-4">
              <div className="bg-[#10b981]/10 text-[#10b981] w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border border-[#10b981]/20">
                {selectedProducts.size}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900">Products Selected</span>
                <span className="text-[10px] text-gray-400 font-bold italic">Knowledge base coverage</span>
              </div>
            </div>
            <div className="flex gap-3 mr-2">
              <button
                onClick={() => router.push("/agent")}
                className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 border border-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAgent}
                disabled={isSaving}
                className="px-10 py-3 bg-[#10b981] hover:bg-[#0da371] text-white disabled:opacity-50 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2"
              >
                {isSaving ? "Updating..." : "Update Agent"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditAgent };
