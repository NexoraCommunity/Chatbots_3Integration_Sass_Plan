"use client";
import React from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = "Delete Item?",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-red-500" width={32} />
        </div>
        <h3 className="text-xl font-bold poppins-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 max-w-[260px] leading-relaxed mb-8 text-sm">
          {description}
        </p>
        <div className="flex w-full gap-3">
          <Button
            label="Cancel"
            variant="secondary"
            fullWidth
            onClick={onClose}
            className="rounded-2xl py-3 text-sm font-bold poppins-bold"
          />
          <Button
            label={isLoading ? "Deleting..." : "Delete"}
            variant="custom"
            fullWidth
            disabled={isLoading}
            onClick={onConfirm}
            className="bg-red-500 text-white rounded-2xl py-3 text-sm font-bold poppins-bold hover:bg-red-600 shadow-xl shadow-red-100 transition-all font-black"
          />
        </div>
      </div>
    </BaseModal>
  );
}
