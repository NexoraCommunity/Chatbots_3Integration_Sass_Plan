"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useBusinessInfoStore } from "@/src/store/information_business/business.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { uploadImage } from "@/src/services/upload/upload.route";
import { getFullImageUrl } from "@/lib/utils";

export default function BusinessInformation() {
  const { businessInfo, isLoading, fetchBusinessInfo, updateBusinessInfo } = useBusinessInfoStore();
  const { addToast } = useToastStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bussinessName: "",
    address: "",
    phone: "",
    email: "",
    npwp: "",
    bussinessLogo: "",
  });

  useEffect(() => {
    fetchBusinessInfo();
  }, [fetchBusinessInfo]);

  useEffect(() => {
    if (businessInfo) {
      setFormData({
        bussinessName: businessInfo.bussinessName || "",
        address: businessInfo.address || "",
        phone: businessInfo.phone || "",
        email: businessInfo.email || "",
        npwp: businessInfo.npwp || "",
        bussinessLogo: businessInfo.bussinessLogo || "",
      });
      setPreviewLogo(null);
    }
  }, [businessInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: basic size check
    if (file.size > 2 * 1024 * 1024) {
      addToast("File terlalu besar (maks 2MB)", "error");
      return;
    }

    try {
      setIsUploading(true);
      // Immediate local preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewLogo(previewUrl);

      const res = await uploadImage(file);
      if (res.status === "success") {
        const imagePath = (res.data as any).data || res.data;
        setFormData((prev) => ({ ...prev, bussinessLogo: imagePath }));
        addToast("Logo berhasil diunggah", "success");
      }
    } catch (error) {
      addToast("Gagal mengunggah logo", "error");
    } finally {
      setIsUploading(false);
    }
  };


  const handleSave = async () => {
    try {
      await updateBusinessInfo(formData);
      addToast("Berhasil update informasi bisnis", "success");
    } catch (err: any) {
      addToast("Gagal update informasi bisnis", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-slate-800 poppins-semibold">Informasi Bisnis</h2>

      <div className="flex items-center gap-4">
        <div
          onClick={handleLogoClick}
          className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-teal-500/30 transition-all relative group"
        >
          {isUploading ? (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Icon icon="lucide:loader-2" className="animate-spin text-white" width={24} />
            </div>
          ) : null}
          {previewLogo || formData.bussinessLogo ? (
            <img src={previewLogo || getFullImageUrl(formData.bussinessLogo)} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <Icon icon="mdi:store" width="40" className="text-slate-400" />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
            <Icon icon="lucide:camera" width={20} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-800">
            {formData.bussinessName && formData.bussinessName !== "My Business" ? formData.bussinessName : "Nama Bisnis Baru"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Nama Bisnis</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="bussinessName"
              value={formData.bussinessName}
              onChange={handleChange}
              placeholder="Masukkan nama bisnis"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 text-slate-800 transition-all"
            />
            <Icon icon="lucide:edit-3" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Alamat</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat bisnis"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 text-slate-800 transition-all"
            />
            <Icon icon="lucide:edit-3" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 poppins-medium">Email Bisnis</label>
            <div className="relative flex items-center group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email bisnis"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 text-slate-800 transition-all"
              />
              <Icon icon="lucide:mail" className="absolute right-4 text-slate-400" width={18} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 poppins-medium">Telepon</label>
            <div className="relative flex items-center group">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nomor telepon bisnis"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 text-slate-800 transition-all"
              />
              <Icon icon="lucide:phone" className="absolute right-4 text-slate-400" width={18} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">NPWP (Opsional)</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              placeholder="Masukkan NPWP"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 text-slate-800 transition-all"
            />
            <Icon icon="lucide:file-text" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#2DD4BF] hover:bg-[#14B8A6] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-teal-500/20 active:scale-95 flex items-center gap-2"
          >
            {isLoading ? (
              <Icon icon="lucide:loader-2" className="animate-spin" width={18} />
            ) : (
              <Icon icon="lucide:save" width={18} />
            )}
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
