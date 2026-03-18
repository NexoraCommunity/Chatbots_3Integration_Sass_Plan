"use client";

import BaseModal from "./BaseModal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { FormEvent } from "react";
import { UpdatePassworduser } from "@/src/model/authentication/authentication.model";

interface ChangeForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    dataChangeForgotPassword: UpdatePassworduser;
    setDataChangeForgotPassword: (data: UpdatePassworduser) => void;
}

export function ChangeForgotPasswordModal({ open, onClose, handleSubmit, dataChangeForgotPassword, setDataChangeForgotPassword }: ChangeForgotPasswordModalProps) {
    return (
        <BaseModal open={open} onClose={onClose}>
            <p className="text-lg mb-4">Lupa Password?</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <Input placeholder="Masukan Password Baru" variant="secondary" onChange={(e) => setDataChangeForgotPassword({ ...dataChangeForgotPassword, password: e.target.value })} />

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-gray-300 text-sm" label="Kembali" onClick={onClose} />
                    <Button variant="custom" className="p-1.5 w-28 rounded-lg bg-emerald-300 text-sm" label="Kirim" />
                </div>
            </form>
        </BaseModal>
    );
}
