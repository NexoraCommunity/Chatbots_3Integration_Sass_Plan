"use client";
import BaseModal from "./BaseModal";
import { Button } from "@/src/components/ui/Button";

export function DeleteProductModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <p className="text-2xl text-red-500 text-center font-semibold">Hapus?</p>
      <p className="text-lg my-5 text-center">
        Apakah Anda yakin ingin menghapus produk ini?
      </p>
      <div className="flex gap-2.5 justify-center">
        <Button
          label="Batal"
          variant="custom"
          onClick={onClose}
          className="w-full border border-[#767373] p-3 rounded-lg text-[#655E5E]"
        />
        <Button
          label="Hapus"
          variant="custom"
          onClick={onClose}
          className="w-full bg-red-500 p-3 rounded-lg text-white"
        />
      </div>
    </BaseModal>
  );
}
