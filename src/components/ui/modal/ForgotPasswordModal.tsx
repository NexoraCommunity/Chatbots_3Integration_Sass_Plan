"use client";

import BaseModal from "./BaseModal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { VerifPassword } from "@/src/model/authentication/authentication.model";

interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setDataForgotPassword: (data: VerifPassword) => void;
    dataForgotPassword: VerifPassword;
}

export function ForgotPasswordModal({ open, onClose, handleSubmit, setDataForgotPassword, dataForgotPassword }: ForgotPasswordModalProps) {
    return (
        <BaseModal open={open} onClose={onClose}>
            <p className="text-lg mb-4">Lupa Password?</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input placeholder="Masukan Email Address" variant="secondary" onChange={(e) => setDataForgotPassword({ ...dataForgotPassword, email: e.target.value })} required />

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-gray-300 text-sm" label="Kembali" onClick={onClose} />
                    <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-emerald-300 text-sm" label="Kirim" />
                </div>
            </form>
        </BaseModal>
    );
}
