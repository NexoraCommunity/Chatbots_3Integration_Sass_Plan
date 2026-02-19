"use client";
import BaseModal from "./BaseModal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

interface AddWhatsappNumberModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddWhatsappNumberModal({ open, onClose }: AddWhatsappNumberModalProps) {
  return (
   <BaseModal open={open} onClose={onClose}>
      <p className="text-lg mb-4">Tambahkan Nomor WhatsApp</p>
      <div className="space-y-4">
        <Input placeholder="Tambahkan Token" variant="secondary"/>
        <Input placeholder="Nama Bot" variant="secondary"/>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-gray-300 text-sm" label="Kembali" onClick={onClose} />
          <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-emerald-300 text-sm" label="Simpan" />
        </div>
      </div>
    </BaseModal>
  );
}
