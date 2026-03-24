"use client";

import BaseModal from "./BaseModal";
import { Icon } from "@iconify/react";
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl mx-4">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Icon icon="heroicons:x-mark-20-solid" className="text-2xl" />
                    </button>

                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center">
                            <Icon icon="solar:lock-password-bold-duotone" className="text-4xl text-[#2DD4BF]" />
                        </div>
                    </div>

                    <h2 className="mb-2 text-xl font-semibold text-slate-800 text-center poppins-semibold">
                        Lupa Password?
                    </h2>
                    <p className="mb-6 text-sm text-slate-400 text-center poppins-regular">
                        Masukkan email untuk menerima kode OTP
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-slate-700 poppins-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Masukan email address"
                                value={dataForgotPassword.email}
                                onChange={(e) => setDataForgotPassword({ ...dataForgotPassword, email: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF] transition-all poppins-regular"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 poppins-medium"
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-[#2DD4BF] hover:bg-[#14B8A6] text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-teal-500/20 active:scale-95 poppins-medium"
                            >
                                Kirim OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    );
}
