import React from "react";
import { Icon } from "@iconify/react";
import { Cards, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Cards";
import { UserIntegration } from "@/src/model/integration/userIntegration.model";

interface AgentIntegrationsProps {
  isPaymentEnabled: boolean;
  paymentIntegrationId: string;
  paymentContentId: string;
  paymentIntegrations: UserIntegration[];
  selectedPaymentIntegration: UserIntegration | undefined;
  readOnly?: boolean;
  onPaymentToggle?: (enabled: boolean) => void;
  onPaymentIntegrationChange?: (value: string) => void;
  onPaymentContentChange?: (value: string) => void;
  isShippingEnabled: boolean;
  shippingIntegrationId: string;
  shippingContentId: string;
  shippingIntegrations: UserIntegration[];
  selectedShippingIntegration: UserIntegration | undefined;
  onShippingToggle?: (enabled: boolean) => void;
  onShippingIntegrationChange?: (value: string) => void;
  onShippingContentChange?: (value: string) => void;
}

const AgentIntegrations = React.memo(({
  isPaymentEnabled,
  paymentIntegrationId,
  paymentContentId,
  paymentIntegrations,
  selectedPaymentIntegration,
  readOnly = false,
  onPaymentToggle,
  onPaymentIntegrationChange,
  onPaymentContentChange,
  isShippingEnabled,
  shippingIntegrationId,
  shippingContentId,
  shippingIntegrations,
  selectedShippingIntegration,
  onShippingToggle,
  onShippingIntegrationChange,
  onShippingContentChange,
}: AgentIntegrationsProps) => {
  return (
    <div className="space-y-8 sticky top-8">
      {/* Payment Gateway Card */}
      <Cards className={!isPaymentEnabled ? "opacity-60 transition-opacity" : ""}>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-50/50 bg-gray-50/30">
          <div className="flex items-center gap-4">
            {!readOnly && (
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={isPaymentEnabled}
                  onChange={(e) => onPaymentToggle?.(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-inner" />
              </label>
            )}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isPaymentEnabled ? "bg-orange-500/10 text-orange-500" : "bg-gray-100 text-gray-400"}`}>
              <Icon icon="solar:card-2-bold-duotone" width={24} />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl poppins-bold text-gray-900">Payment Gateway</CardTitle>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium italic">Automate payment verification</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-8 space-y-6">
          {isPaymentEnabled ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-900 ml-1">Select Provider</label>
                <div className="relative group">
                  <select
                    value={paymentIntegrationId}
                    onChange={(e) => onPaymentIntegrationChange?.(e.target.value)}
                    disabled={readOnly}
                    className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-base font-medium transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none appearance-none ${readOnly ? "cursor-default opacity-80" : "cursor-pointer group-hover:border-orange-500/50"}`}
                  >
                    <option value="">Choose a connected provider...</option>
                    {paymentIntegrations.length > 0 ? (
                      paymentIntegrations.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No providers connected</option>
                    )}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                    <Icon icon="solar:alt-arrow-down-bold" width={20} />
                  </div>
                </div>
              </div>

              {paymentIntegrationId && (
                <div className="space-y-3 animate-in fade-in zoom-in duration-300">
                  <label className="text-sm font-black text-gray-900 ml-1">Configuration</label>
                  <div className="relative group">
                    <select
                      value={paymentContentId}
                      onChange={(e) => onPaymentContentChange?.(e.target.value)}
                      disabled={readOnly}
                      className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-base font-medium transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none appearance-none ${readOnly ? "cursor-default opacity-80" : "cursor-pointer group-hover:border-orange-500/50"}`}
                    >
                      <option value="">Select configuration...</option>
                      {selectedPaymentIntegration?.contentIntegrations?.filter((c: any) => !c.isUsed).length ? (
                        selectedPaymentIntegration.contentIntegrations
                          .filter((content: any) => !content.isUsed)
                          .map((content: any) => (
                            <option key={content.id} value={content.id}>
                              {content.configJson?.name || content.name || `Config ${content.id.slice(0, 4)}`}
                            </option>
                          ))
                      ) : (
                        <option disabled>No configurations found</option>
                      )}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                      <Icon icon="solar:alt-arrow-down-bold" width={20} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center opacity-40">
              <Icon icon="solar:settings-minimalistic-line-duotone" width={40} className="text-gray-400 mb-2" />
              <p className="text-xs font-bold text-gray-500 italic">Enable payment verification to select configuration</p>
            </div>
          )}
        </CardContent>
      </Cards>

      {/* Shipping Card */}
      <Cards className={!isShippingEnabled ? "opacity-60 transition-opacity" : ""}>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-50/50 bg-gray-50/30">
          <div className="flex items-center gap-4">
            {!readOnly && (
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={isShippingEnabled}
                  onChange={(e) => onShippingToggle?.(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 shadow-inner" />
              </label>
            )}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isShippingEnabled ? "bg-green-500/10 text-green-500" : "bg-gray-100 text-gray-400"}`}>
              <Icon icon="solar:delivery-bold-duotone" width={24} />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl poppins-bold text-gray-900">Shipping (Ongkir)</CardTitle>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium italic">Enable delivery cost calculation</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 sm:p-8 space-y-6">
          {isShippingEnabled ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <label className="text-sm font-black text-gray-900 ml-1">Select Provider</label>
                <div className="relative group">
                  <select
                    value={shippingIntegrationId}
                    onChange={(e) => onShippingIntegrationChange?.(e.target.value)}
                    disabled={readOnly}
                    className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-base font-medium transition-all focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none appearance-none ${readOnly ? "cursor-default opacity-80" : "cursor-pointer group-hover:border-green-500/50"}`}
                  >
                    <option value="">Choose a connected provider...</option>
                    {shippingIntegrations.length > 0 ? (
                      shippingIntegrations.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No providers connected</option>
                    )}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-green-500 transition-colors">
                    <Icon icon="solar:alt-arrow-down-bold" width={20} />
                  </div>
                </div>
              </div>

              {shippingIntegrationId && (
                <div className="space-y-3 animate-in fade-in zoom-in duration-300">
                  <label className="text-sm font-black text-gray-900 ml-1">Configuration</label>
                  <div className="relative group">
                    <select
                      value={shippingContentId}
                      onChange={(e) => onShippingContentChange?.(e.target.value)}
                      disabled={readOnly}
                      className={`w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-base font-medium transition-all focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none appearance-none ${readOnly ? "cursor-default opacity-80" : "cursor-pointer group-hover:border-green-500/50"}`}
                    >
                      <option value="">Select configuration...</option>
                      {selectedShippingIntegration?.contentIntegrations?.filter((c: any) => !c.isUsed).length ? (
                        selectedShippingIntegration.contentIntegrations
                          .filter((content: any) => !content.isUsed)
                          .map((content: any) => (
                            <option key={content.id} value={content.id}>
                              {content.configJson?.name || content.name || `Config ${content.id.slice(0, 4)}`}
                            </option>
                          ))
                      ) : (
                        <option disabled>No configurations found</option>
                      )}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-green-500 transition-colors">
                      <Icon icon="solar:alt-arrow-down-bold" width={20} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-center opacity-40">
              <Icon icon="solar:settings-minimalistic-line-duotone" width={40} className="text-gray-400 mb-2" />
              <p className="text-xs font-bold text-gray-500 italic">Enable shipping checker to select configuration</p>
            </div>
          )}
        </CardContent>
      </Cards>
    </div>
  );
});

export default AgentIntegrations;
