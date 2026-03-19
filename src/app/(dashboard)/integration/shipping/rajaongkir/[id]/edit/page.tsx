"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { useRouter }
  from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/src/components/ui/Input";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { useContentIntegrationStore } from "@/src/store/integration/contentIntegration.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";
import { useAddressStore } from "@/src/store/external/address.store";
import { RajaOngkirConfig } from "@/src/model/integration/contentIntegration.model";

const COURIERS = [
  "jne", "sicepat", "ide", "sap", "jnt", "ninja", "tiki", "lion", "anteraja",
  "pos", "ncs", "rex", "rpx", "sentral", "star", "wahana", "dse"
];


export default function EditRajaOngkir({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);

  const { getById, update, currentContentIntegration, isLoading } = useContentIntegrationStore();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const { getAllIntegration } = useUserIntegrationStore();

  const [formData, setFormData] = useState({
    name: "",
    apiKey: "",
  });
  const [activeTab, setActiveTab] = useState("general");

  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [selectedVillageId, setSelectedVillageId] = useState("");

  const {
    provinces, regencies, districts, villages, isLoading: isLoadingAddress,
    fetchProvinces, fetchRegencies, fetchDistricts, fetchVillages,
    resetRegencies, resetDistricts, resetVillages
  } = useAddressStore();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  useEffect(() => {
    if (id) {
      getById(id).then((res) => {
        const config = res.data.configJson as RajaOngkirConfig;
        setFormData({
          name: config.name || "",
          apiKey: config.apiKey || "",
        });
        setSelectedCouriers(config.courier ? config.courier.split(":") : []);
      }).catch((err) => {
        console.error("Failed to fetch RajaOngkir detail for edit:", err);
        addToast(err.message || "Failed to fetch details", "error");
      });
    }
  }, [id, getById, addToast]);

  const handleProvinceChange = (id: string) => {
    setIsInitialLoad(false);
    setSelectedProvinceId(id);
    setSelectedCityId("");
    setSelectedDistrictId("");
    setSelectedVillageId("");
    resetRegencies();
    if (id) fetchRegencies(id);
  };

  const handleCityChange = (id: string) => {
    setIsInitialLoad(false);
    setSelectedCityId(id);
    setSelectedDistrictId("");
    setSelectedVillageId("");
    resetDistricts();
    if (id) fetchDistricts(id);
  };

  const handleDistrictChange = (id: string) => {
    setIsInitialLoad(false);
    setSelectedDistrictId(id);
    setSelectedVillageId("");
    resetVillages();
    if (id) fetchVillages(id);
  };

  const handleVillageChange = (id: string) => {
    setIsInitialLoad(false);
    setSelectedVillageId(id);
  };

  const toggleCourier = (courier: string) => {
    setSelectedCouriers(prev =>
      prev.includes(courier)
        ? prev.filter(c => c !== courier)
        : [...prev, courier]
    );
  };

  const handleUpdate = async () => {
    if (!formData.name || !formData.apiKey || selectedCouriers.length === 0) {
      addToast("Please fill in required fields", "error");
      return;
    }

    let originString = (currentContentIntegration?.configJson as RajaOngkirConfig).origin;

    // If a new village is selected, update the origin string
    if (selectedVillageId) {
      const provinceName = provinces.find(p => p.id === selectedProvinceId)?.name || "";
      const cityName = regencies.find(c => c.id === selectedCityId)?.name || "";
      const districtName = districts.find(d => d.id === selectedDistrictId)?.name || "";
      const villageName = villages.find(v => v.id === selectedVillageId)?.name || "";
      originString = `${provinceName}, ${cityName}, ${districtName}, ${villageName}`;
    }

    try {
      await update(id, "rajaOngkir", {
        provider: "rajaOngkir",
        name: formData.name,
        apiKey: formData.apiKey,
        courier: selectedCouriers.join(":"),
        origin: originString,
      });

      addToast("Configuration updated successfully", "success");
      if (user?.id) {
        await getAllIntegration(user.id);
      }
      router.push("/integration/shipping/rajaongkir");
    } catch (error: any) {
      console.error("Failed to update RajaOngkir config:", error);
      addToast(error.message || "Failed to update configuration", "error");
    }
  };

  if (isLoading && !formData.name) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General", icon: "solar:settings-minimalistic-bold-duotone" },
    { id: "couriers", label: "Couriers", icon: "solar:delivery-bold-duotone" },
    { id: "origin", label: "Origin Address", icon: "solar:map-point-bold-duotone" },
  ];

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 bg-white max-w-7xl mx-auto w-full p-4 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 pb-24 sm:pb-8">
      {/* Header with Back Button */}
       <div className="flex items-center gap-4 mt-4">
         <Button
           variant="secondary"
           onClick={() => router.back()}
           label=""
           iconPosition="mid"
           className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
           icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
         />
         <div className="flex-1 min-w-0">
           <h1 className="text-xl sm:text-2xl poppins-bold text-gray-900 leading-none truncate">Edit RajaOngkir</h1>
         </div>
       </div>

      {/* Local Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/50 p-1 rounded-2xl w-fit border border-gray-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-gray-900"
            }`}
          >
            <Icon icon={tab.icon} width={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "general" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:box-bold-duotone" className="text-primary" />
                  Integration Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Integration Name</label>
                    <Input
                      variant="secondary"
                      placeholder="e.g. RajaOngkir Default"
                      className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">API Key</label>
                    <Input
                      variant="secondary"
                      placeholder="Masukkan API Key RajaOngkir"
                      className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "couriers" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:delivery-bold-duotone" className="text-primary" />
                  Available Couriers
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {COURIERS.map((courier) => (
                    <label key={courier} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer shadow-sm ${selectedCouriers.includes(courier) ? "bg-primary/5 border-primary shadow-primary/10" : "bg-white border-gray-100 hover:border-gray-200"}`}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCouriers.includes(courier)}
                        onChange={() => {
                          setIsInitialLoad(false);
                          toggleCourier(courier);
                        }}
                      />
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${selectedCouriers.includes(courier) ? "bg-primary text-white" : "border-2 border-gray-100 bg-gray-50"}`}>
                        {selectedCouriers.includes(courier) && <Icon icon="lucide:check" width={14} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-black uppercase text-gray-700 tracking-tight">{courier}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Cards>
          )}

          {activeTab === "origin" && (
            <Cards>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon icon="solar:map-point-bold-duotone" className="text-primary" />
                  Origin Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                {/* Current Origin Display */}
                <div className="p-4 rounded-[1.5rem] bg-indigo-50 border border-indigo-100 flex items-center gap-4">
                  <div className="bg-indigo-500 p-3 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                    <Icon icon="solar:map-point-bold" width={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Current Origin</span>
                    <span className="text-sm font-bold text-indigo-900">{(currentContentIntegration?.configJson as RajaOngkirConfig)?.origin || "Not set"}</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl text-[10px] font-bold text-amber-600 italic text-center">
                  Change origin address by selecting from the dropdowns below (optional)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Province</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border shadow-inner"
                      value={selectedProvinceId}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="">Select Province</option>
                      {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">City / Regency</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border shadow-inner disabled:opacity-50"
                      value={selectedCityId}
                      onChange={(e) => handleCityChange(e.target.value)}
                      disabled={!selectedProvinceId || isLoadingAddress}
                    >
                      <option value="">Select City</option>
                      {regencies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">District</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border shadow-inner disabled:opacity-50"
                      value={selectedDistrictId}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!selectedCityId || isLoadingAddress}
                    >
                      <option value="">Select District</option>
                      {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Village</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border shadow-inner disabled:opacity-50"
                      value={selectedVillageId}
                      onChange={(e) => handleVillageChange(e.target.value)}
                      disabled={!selectedDistrictId || isLoadingAddress}
                    >
                      <option value="">Select Village</option>
                      {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                  </div>
                </div>
                {isLoadingAddress && (
                  <div className="flex items-center gap-3 text-xs font-bold text-primary animate-pulse ml-1">
                    <Icon icon="solar:refresh-bold" className="animate-spin" width={14} />
                    Loading address data...
                  </div>
                )}
              </CardContent>
            </Cards>
          )}
        </div>

        <div className="space-y-6 sm:space-y-8 text-left">
          <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl text-white">
                <Icon icon="solar:delivery-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-orange-600 text-sm uppercase tracking-wider">Note</h4>
            </div>
            <p className="text-xs text-orange-600/70 leading-relaxed font-medium">
              Updating your RajaOngkir details may affect current live shipping calculations. Ensure your API Key is valid and active.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-7xl p-2 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="hidden sm:flex items-center gap-3 ml-4">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:delivery-bold-duotone" width={20} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-gray-900 uppercase">Update RajaOngkir</span>
              <span className="text-[10px] text-muted-foreground font-bold italic truncate max-w-[150px]">ID: {id}</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto p-2 sm:p-0">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => router.back()}
              className="h-10 sm:h-12 px-4 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none"
            />
            <Button
              variant="primary"
              label={isLoading ? "Saving..." : "Save Changes"}
              onClick={handleUpdate}
              disabled={isLoading || isLoadingAddress}
              className="h-10 sm:h-12 px-6 sm:px-10 rounded-xl sm:rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
