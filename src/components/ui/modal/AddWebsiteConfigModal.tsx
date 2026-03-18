"use client";
import BaseModal from "./BaseModal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

interface AddWebsiteConfigModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddWebsiteConfigModal({ open, onClose }: AddWebsiteConfigModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <p className="text-lg mb-4 poppins-semibold">Tambahkan Konfigurasi Website</p>
      <div className="space-y-4">
        <Input placeholder="Nama Website" variant="secondary" />
        <Input placeholder="Domain (e.g. https://example.com)" variant="secondary" />
        <Input placeholder="URL Image (Optional)" variant="secondary" />

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-gray-300 text-sm poppins-medium" label="Kembali" onClick={onClose} />
          <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-[#01D2B3] text-white text-sm poppins-medium" label="Simpan" />
        </div>
      </div>
    </BaseModal>
  );
}
