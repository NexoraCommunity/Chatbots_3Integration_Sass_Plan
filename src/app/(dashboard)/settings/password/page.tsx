"use client";
import React, { useState } from "react";
import { useUserStore } from "@/src/store/authentication/user.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useToastStore } from "@/src/store/ui/toast.store";
import OtpModal from "@/src/components/ui/modal/VerificationOtp";
import { ForgotPasswordModal } from "@/src/components/ui/modal/ForgotPasswordModal";
import { ChangeForgotPasswordModal } from "@/src/components/ui/modal/ChangeForgotPasswordModal";

export default function PasswordSettings() {
  const { changePassword, isLoading, currentUser } = useUserStore();
  const { verifPasswordOtp, forgotPassword } = useAuthStore();
  const { addToast } = useToastStore();
  const [passData, setPassData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Forgot password flow state
  const [forgotPasswordModal, setForgotPasswordModal] = useState({ otp: false, verif: false, update: false });
  const [dataForgotPassword, setDataForgotPassword] = useState({ id: '', email: currentUser?.email || '' });
  const [changeForgotPasswordData, setChangeForgotPasswordData] = useState({ id: '', email: '', codeOTP: '', password: '' });
  const [otpForgotPassword, setOtpForgotPassword] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      addToast("Password baru tidak cocok", "error");
      return;
    }
    const success = await changePassword({
      oldPassword: passData.oldPassword,
      newPassword: passData.newPassword,
      email: currentUser?.email,
    });
    if (success) {
      addToast("Password berhasil diubah!", "success");
      setPassData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  // Forgot password handlers (same flow as login page)
  const handleOpenForgotPassword = () => {
    setDataForgotPassword({ id: '', email: currentUser?.email || '' });
    setForgotPasswordModal({ otp: false, verif: true, update: false });
  };

  const handleOnSubmitSendOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await verifPasswordOtp(dataForgotPassword);
      if (response) {
        setForgotPasswordModal({ verif: false, otp: true, update: false });
        addToast("OTP telah dikirim ke email", "success");
      }
    } catch (error: any) {
      addToast(error.message || error.error || "Gagal mengirim OTP", "error");
    }
  };

  const handleSubmitOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>, Otp: string) => {
    e.preventDefault();
    try {
      setForgotPasswordModal({ verif: false, otp: false, update: true });
      setChangeForgotPasswordData({ ...changeForgotPasswordData, codeOTP: Otp, email: dataForgotPassword.email });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleOnSubmitVerifForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(changeForgotPasswordData);
      if (response) {
        setForgotPasswordModal({ otp: false, verif: false, update: false });
        addToast("Password berhasil diubah!", "success");
      }
    } catch (error: any) {
      addToast(error.message || error.error || "Gagal mengubah password", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold text-slate-800 poppins-semibold">Ubah Password</h2>

      {/* Forgot password modals */}
      <ForgotPasswordModal
        open={forgotPasswordModal.verif}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, verif: false })}
        handleSubmit={handleOnSubmitSendOtpForgotPassword}
        dataForgotPassword={dataForgotPassword}
        setDataForgotPassword={setDataForgotPassword}
      />

      <OtpModal
        open={forgotPasswordModal.otp}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, otp: false })}
        handleSubmit={handleSubmitOtpForgotPassword}
        otp={otpForgotPassword}
        setOtp={setOtpForgotPassword}
      />

      <ChangeForgotPasswordModal
        open={forgotPasswordModal.update}
        handleSubmit={handleOnSubmitVerifForgotPassword}
        dataChangeForgotPassword={changeForgotPasswordData}
        setDataChangeForgotPassword={setChangeForgotPasswordData}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, update: false })}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Password Saat ini *</label>
          <input
            type="password"
            name="oldPassword"
            value={passData.oldPassword}
            onChange={handleChange}
            placeholder="..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Password Baru *</label>
          <input
            type="password"
            name="newPassword"
            value={passData.newPassword}
            onChange={handleChange}
            placeholder="..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700 poppins-medium">Konfirmasi Password Baru *</label>
          <input
            type="password"
            name="confirmPassword"
            value={passData.confirmPassword}
            onChange={handleChange}
            placeholder="..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
          />
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleOpenForgotPassword}
            className="text-sm text-[#2DD4BF] hover:text-[#14B8A6] font-medium transition-colors"
          >
            Lupa Password ?
          </button>
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
