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

  return (
    <div className="flex flex-col space-y-8 bg-[#FAFAFA] max-w-5xl mx-auto w-full">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 px-4 sm:px-0">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          label=""
          iconPosition="mid"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
        />
        <div>
          <h1 className="text-2xl poppins-bold text-gray-900 leading-none">Edit RajaOngkir</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity & Configuration */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:box-bold-duotone" className="text-primary" />
                Shipping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
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

              {/* Courier Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Available Couriers</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {COURIERS.map((courier) => (
                    <label key={courier} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${selectedCouriers.includes(courier) ? "bg-primary/5 border-primary shadow-sm" : "bg-white border-gray-100 hover:border-gray-200"}`}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCouriers.includes(courier)}
                        onChange={() => {
                          setIsInitialLoad(false);
                          toggleCourier(courier);
                        }}
                      />
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${selectedCouriers.includes(courier) ? "bg-primary text-white" : "border-2 border-gray-200"}`}>
                        {selectedCouriers.includes(courier) && <Icon icon="lucide:check" width={14} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-bold uppercase text-gray-700">{courier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Origin Address</label>

                {/* Current Origin Display */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                  <div className="bg-gray-200 p-2 rounded-lg text-gray-500">
                    <Icon icon="solar:map-point-bold" width={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Origin</span>
                    <span className="text-xs font-bold text-gray-700">{(currentContentIntegration?.configJson as RajaOngkirConfig)?.origin || "Not set"}</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-[10px] font-bold text-blue-600 italic">
                  Change origin address by selecting from the dropdowns below (optional)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Province</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border"
                      value={selectedProvinceId}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="">Select Province</option>
                      {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">City / Regency</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border disabled:opacity-50"
                      value={selectedCityId}
                      onChange={(e) => handleCityChange(e.target.value)}
                      disabled={!selectedProvinceId || isLoadingAddress}
                    >
                      <option value="">Select City</option>
                      {regencies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">District (Kecamatan)</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border disabled:opacity-50"
                      value={selectedDistrictId}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={!selectedCityId || isLoadingAddress}
                    >
                      <option value="">Select District</option>
                      {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Village (Kelurahan)</label>
                    <select
                      className="w-full h-14 rounded-xl border-gray-100 bg-gray-50/50 px-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none border disabled:opacity-50"
                      value={selectedVillageId}
                      onChange={(e) => handleVillageChange(e.target.value)}
                      disabled={!selectedDistrictId || isLoadingAddress}
                    >
                      <option value="">Select Village</option>
                      {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Quick Info / Pro Tip */}
          <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-xl text-white">
                <Icon icon="solar:delivery-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-orange-600 text-sm uppercase tracking-wider">Logistics</h4>
            </div>
            <p className="text-xs text-orange-600/70 leading-relaxed font-medium">
              Updating your RajaOngkir details may affect current live shipping calculations. Ensure your API Key is valid and active.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              <Icon icon="solar:delivery-bold-duotone" width={24} />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase">RajaOngkir</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Config ID: {id}</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => router.back()}
              className="px-8 rounded-2xl font-bold text-sm bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none"
            />
            <Button
              variant="primary"
              label={isLoading ? "Saving..." : "Save Changes"}
              onClick={handleUpdate}
              disabled={isLoading || isLoadingAddress}
              className="px-10 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
