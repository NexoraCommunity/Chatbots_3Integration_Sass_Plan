"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useUserStore } from "@/src/store/authentication/user.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import { uploadImage } from "@/src/services/upload/upload.route";
import { getFullImageUrl } from "@/lib/utils";

export default function GeneralInformation() {
  const { currentUser, updateProfile, isLoading } = useUserStore();
  const { addToast } = useToastStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewPicture, setPreviewPicture] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser?.id) {
      const success = await updateProfile(currentUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      });
      if (success) addToast("Profil berhasil diperbarui!", "success");
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.id) return;

    if (file.size > 2 * 1024 * 1024) {
      addToast("File terlalu besar (maks 2MB)", "error");
      return;
    }

    try {
      setIsUploading(true);
      const previewUrl = URL.createObjectURL(file);
      setPreviewPicture(previewUrl);

      const res = await uploadImage(file);
      if (res.status === "success") {
        const imagePath = (res.data as any).data || res.data;
        const success = await updateProfile(currentUser.id, {
          ...formData,
          picture: imagePath
        });
        if (success) {
          addToast("Foto profil berhasil diperbarui", "success");
          setPreviewPicture(null);
        }
      }
    } catch (error) {
      addToast("Gagal mengunggah foto profil", "error");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-slate-800 poppins-semibold">Informasi Personal</h2>

      <div className="flex items-center gap-4">
        <div
          onClick={handlePictureClick}
          className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden cursor-pointer hover:ring-2 hover:ring-teal-500/30 transition-all relative group"
        >
          {isUploading ? (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Icon icon="lucide:loader-2" className="animate-spin text-white" width={24} />
            </div>
          ) : null}
          {(previewPicture || currentUser?.picture) ? (
            <img src={previewPicture || getFullImageUrl(currentUser?.picture || "")} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Icon icon="mdi:account-circle" width="60" className="text-slate-400" />
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
          onChange={handlePictureChange}
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-800">
            {currentUser?.firstName} {currentUser?.lastName || ""}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Nama Depan</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
            />
            <Icon icon="lucide:edit-3" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Nama Belakang</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
            />
            <Icon icon="lucide:edit-3" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">No Hp</label>
          <div className="relative flex items-center group">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
            />
            <Icon icon="lucide:edit-3" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Email</label>
          <div
            className="relative flex items-center group cursor-not-allowed"
            onClick={() => addToast("Email tidak dapat diubah", "info")}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 focus:outline-none pr-10 cursor-not-allowed pointer-events-none"
            />
            <Icon icon="lucide:lock" className="absolute right-4 text-slate-400" width={18} />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-[#2DD4BF] hover:bg-[#14B8A6] text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-teal-500/20 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}