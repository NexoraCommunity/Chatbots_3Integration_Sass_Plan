"use client";
import { Input } from "@/src/components/ui/Input";
import { SearchBar } from "@/src/components/ui/SearchBar";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Button } from "@/src/components/ui/Button";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { useState } from "react";

const AddAgent = () => {
  const [selectedProducts, setSelectedProducts] = useState(new Set([1, 2, 3]));
  const [isPaymentEnabled, setIsPaymentEnabled] = useState(false);
  const [isShippingEnabled, setIsShippingEnabled] = useState(false);

  const toggleProduct = (id: number) => {
    const newSet = new Set(selectedProducts);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedProducts(newSet);
  };

  const products = [
    { id: 1, name: "Sapu Ijuk Super", ref: "SPU-001" },
    { id: 2, name: "Pel Lantai Microfiber", ref: "PEL-002" },
    { id: 3, name: "Ember Plastik 10L", ref: "EMB-003" },
    { id: 4, name: "Sikat Cuci Baju", ref: "SKT-004" },
    { id: 5, name: "Kemoceng Bulu Ayam", ref: "KMC-005" },
    { id: 6, name: "Pembersih Kaca", ref: "PBK-006" },
  ];

  return (
    <div className="flex flex-col space-y-8  max-w-5xl mx-auto w-full px-4 sm:px-0">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          moveTo="/agent"
          label=""
          iconPosition="mid"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
        />
        <div>
          <h1 className="text-2xl poppins-bold text-foreground leading-none">Create New Agent</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Knowledge */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:document-text-bold-duotone" className="text-primary" />
                Identity & Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Agent Name</label>
                  <Input placeholder="e.g. Friendly Sales Assistant" variant="secondary" className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Upload Reference Data</label>
                  <Input type="file" placeholder="Upload file" variant="secondary" className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-12 pt-2.5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">System Instructions (Prompt)</label>
                <textarea
                  className="w-full h-48 p-4 text-sm bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/30 outline-none transition-all resize-none text-foreground"
                  placeholder="Tell your agent how to behave, what tone to use, and what its goals are..."
                ></textarea>
              </div>
            </CardContent>
          </Cards>

          {/* Product Knowledge */}
          <Cards>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Icon icon="solar:box-bold-duotone" className="text-primary" />
                Select Products Knowledge
              </CardTitle>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors w-fit">
                <Icon icon="solar:check-read-bold" />
                Select All
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-4 sm:p-6">
              <div className="relative group">
                <Icon icon="lucide:search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <SearchBar
                  placeholder="Filter products..."
                  className="w-full pl-12 pr-4 h-12 bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white outline-none transition-all"
                  variant="miniDefault"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleProduct(item.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${selectedProducts.has(item.id)
                      ? 'bg-primary/5 border-primary/30'
                      : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedProducts.has(item.id) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                        <Icon icon="solar:archive-bold-duotone" width={24} />
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${selectedProducts.has(item.id) ? 'text-primary' : 'text-gray-900'}`}>{item.name}</p>
                        <p className="text-[10px] text-muted-foreground font-bold font-mono mt-0.5">{item.ref}</p>
                      </div>
                    </div>
                    <Checkbox checked={selectedProducts.has(item.id)} readOnly className="peer-checked:scale-110 pointer-events-none" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Payment Gateway Card */}
          <Cards className={`transition-all duration-300 ${isPaymentEnabled ? "ring-2 ring-primary/20" : "opacity-75"}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Icon icon="solar:card-2-bold-duotone" className="text-primary" />
                Payment Gateway
              </CardTitle>
              <div
                onClick={() => setIsPaymentEnabled(!isPaymentEnabled)}
                className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${isPaymentEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isPaymentEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </CardHeader>
            <CardContent className={`space-y-6 transition-all duration-300 overflow-hidden ${isPaymentEnabled ? 'max-h-[500px] opacity-100 pt-6' : 'max-h-0 opacity-0 py-0'}`}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Payment Provider</label>
                  <div className="relative group">
                    <select className="w-full appearance-none h-12 px-4 text-sm font-semibold bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all text-foreground cursor-pointer">
                      <option value="midtrans">Midtrans</option>
                      <option value="xendit">Xendit</option>
                    </select>
                    <Icon icon="solar:alt-arrow-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Gateway Configuration</label>
                  <div className="relative group">
                    <select className="w-full appearance-none h-12 px-4 text-sm font-semibold bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all text-foreground cursor-pointer">
                      {[1, 2, 3, 4, 5].map(i => (
                        <option key={i} value={`config-${i}`}>Config Profile {i}</option>
                      ))}
                    </select>
                    <Icon icon="solar:alt-arrow-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary pointer-events-none" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* Shipping Card */}
          <Cards className={`transition-all duration-300 ${isShippingEnabled ? "ring-2 ring-primary/20" : "opacity-75"}`}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Icon icon="solar:delivery-bold-duotone" className="text-primary" />
                Shipping Select
              </CardTitle>
              <div
                onClick={() => setIsShippingEnabled(!isShippingEnabled)}
                className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${isShippingEnabled ? 'bg-primary' : 'bg-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isShippingEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </CardHeader>
            <CardContent className={`space-y-6 transition-all duration-300 overflow-hidden ${isShippingEnabled ? 'max-h-[500px] opacity-100 pt-6' : 'max-h-0 opacity-0 py-0'}`}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Shipping Provider</label>
                  <div className="relative group">
                    <select className="w-full appearance-none h-12 px-4 text-sm font-semibold bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all text-foreground cursor-pointer">
                      <option value="rajaongkir">Raja Ongkir</option>
                    </select>
                    <Icon icon="solar:alt-arrow-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Shipping Configuration</label>
                  <div className="relative group">
                    <select className="w-full appearance-none h-12 px-4 text-sm font-semibold bg-gray-50/50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary/30 outline-none transition-all text-foreground cursor-pointer">
                      {[1, 2, 3, 4, 5].map(i => (
                        <option key={i} value={`shipping-config-${i}`}>Shipping Config {i}</option>
                      ))}
                    </select>
                    <Icon icon="solar:alt-arrow-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary pointer-events-none" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Cards>

          {/* Quick Info */}
          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <Icon icon="solar:info-circle-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-primary text-sm">Pro Tip</h4>
            </div>
            <p className="text-xs text-primary/70 leading-relaxed font-medium">
              Payment and shipping configurations are optional. Toggle them on if you need your agent to handle transactions or shipping status.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4 mt-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center font-black">
              {selectedProducts.size}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900">Products Selected</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Knowledge base coverage</span>
            </div>
          </div>
          <div className="flex gap-4 w-fit sm:w-auto">
            <Button variant="secondary" label="Discard" className="px-6 sm:px-8 rounded-2xl font-bold text-sm sm:text-base" />
            <Button variant="primary" label="Create Agent" className="px-8 sm:px-10 rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all text-sm sm:text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddAgent };
