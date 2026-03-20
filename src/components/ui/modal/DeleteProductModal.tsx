"use client";
import BaseModal from "./BaseModal";
import { Button } from "@/src/components/ui/Button";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  isLoading,
}: DeleteProductModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <p className="text-2xl text-red-500 text-center font-semibold">Hapus?</p>
      <p className="text-lg my-5 text-center px-4">
        Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
      </p>
      <div className="flex gap-2.5 justify-center mt-6">
        <Button
          label="Batal"
          variant="secondary"
          onClick={onClose}
          className="w-full h-12 rounded-xl text-gray-500 font-bold"
        />
        <Button
          label={isLoading ? "Menghapus..." : "Hapus"}
          variant="primary"
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 border-none text-white font-bold shadow-lg shadow-red-200"
        />
      </div>
    </BaseModal>
  );
}

