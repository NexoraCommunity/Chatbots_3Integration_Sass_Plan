"use client";
import { useState } from "react";
import BaseModal from "./BaseModal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";

interface AddWhatsappNumberModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddLlmIntegrationModal({
  open,
  onClose,
}: AddWhatsappNumberModalProps) {
  const [aiModel, setAiModel] = useState("");
  return (
    <BaseModal open={open} onClose={onClose}>
      <p className="text-lg mb-4">Tambahkan LLM Integration</p>
      <div className="space-y-4">
          <Input placeholder="Tambahkan Token" variant="secondary" className="rounded-lg"/>
          <Input placeholder="Nama Bot" variant="secondary" className="rounded-lg"/>
        <div className="ai-model-selection ">
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            className="w-full p-5 border rounded-lg text-center"
          >
            <option value="">Pilih LLM</option>
            <option value="admin">GPT</option>
            <option value="user">Grok</option>
          </select>
        </div>
        <div className="ai-model-selection ">
          <select className="w-full p-5 border rounded-lg text-center">
            <option value="">Pilih Model LLM</option>
            <option value="hehe">GPT</option>
            <option value="haha">Grok</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="custom"
            className="p-1.5 w-28 rounded-lg bg-gray-300 text-sm"
            label="Kembali"
            onClick={onClose}
          />
          <Button
            variant="custom"
            className="p-1.5 w-28 rounded-lg bg-emerald-300 text-sm"
            label="Simpan"
          />
        </div>
      </div>
    </BaseModal>
  );
}
