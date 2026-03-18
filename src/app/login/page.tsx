"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useRouter } from "next/navigation";
import { SwitchTabs } from "@/src/components/SwitchTabs";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { LoginProps, OtpCodeProps } from "@/src/model/authentication.model";
import { useAuthStore } from "@/src/store/auth.store";
import OtpModal from "@/src/components/ui/modal/VerificationOtp";
import { GoogleOauth } from "@/src/services/api-auth/authentication.route";
import { ForgotPasswordModal } from "@/src/components/ui/modal/ForgotPasswordModal";
import { ChangeForgotPasswordModal } from "@/src/components/ui/modal/ChangeForgotPasswordModal";
import { cn } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const { login, otpCode, verifPasswordOtp, forgotPassword, user } = useAuthStore();
  const [error, setError] = useState("");
  const [openOtp, setOpenOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [datalogin, setDatalogin] = useState<LoginProps>({ email: '', password: '' });

  const [otpLogin, setOtpLogin] = useState<string[]>(new Array(6).fill(""));
  const [otpForgotPassword, setOtpForgotPassword] = useState<string[]>(new Array(6).fill(""));

  const [forgotPasswordModal, setForgotPasswordModal] = useState({ otp: false, verif: false, update: false });
  const [dataForgotPassword, setDataForgotPassword] = useState({ id: '', email: '' });
  const [changeForgotPassword, setChangeForgotPassword] = useState({ id: '', email: '', codeOTP: '', password: "" });

  const handleClickGoogle = async () => {
    await GoogleOauth();
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(datalogin);
      if (response) {
        setOpenOtp(true);
      }
    } catch (error: any) {
      setError(error.error || "Login failed. Please check your credentials.");
    }
  };

  const handleOnSubmitOtp = async (e: React.FormEvent<HTMLFormElement>, Otp: string) => {
    e.preventDefault();
    try {
      const otp: OtpCodeProps = {
        email: datalogin.email,
        codeOTP: Otp,
      };
      const response = await otpCode(otp);
      if (response) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleOnSubmitSendOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await verifPasswordOtp(dataForgotPassword);
      if (response) {
        setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: true });
        setDataForgotPassword({ ...dataForgotPassword, id: user?.id || '' });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmitOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>, Otp: string) => {
    e.preventDefault();
    try {
      setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: false, update: true });
      setChangeForgotPassword({ ...changeForgotPassword, codeOTP: Otp, id: user?.id || '' });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleOnSubmitVerifForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(changeForgotPassword);
      if (response) {
        setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: true });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#F8F9FB] poppins-regular flex-col lg:flex-row shadow-inner">
      <OtpModal
        open={openOtp} onClose={() => setOpenOtp(false)}
        otp={otpLogin} setOtp={setOtpLogin}
        handleSubmit={handleOnSubmitOtp}
      />

      <OtpModal
        open={forgotPasswordModal.otp}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, otp: false })}
        handleSubmit={handleSubmitOtpForgotPassword}
        otp={otpForgotPassword}
        setOtp={setOtpForgotPassword}
      />

      <ForgotPasswordModal
        open={forgotPasswordModal.verif}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, verif: false })}
        handleSubmit={handleOnSubmitSendOtpForgotPassword}
        dataForgotPassword={dataForgotPassword}
        setDataForgotPassword={setDataForgotPassword}
      />

      <ChangeForgotPasswordModal
        open={forgotPasswordModal.update}
        handleSubmit={handleOnSubmitVerifForgotPassword}
        dataChangeForgotPassword={changeForgotPassword}
        setDataChangeForgotPassword={setChangeForgotPassword}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, update: false })}
      />

      {/* Left side: Content & Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center py-12 px-6 lg:p-20 order-2 lg:order-1">
        <div className="w-full max-w-[480px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3 poppins-bold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground poppins-regular">
              Access your dashboard and manage your AI agents.
            </p>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
            <div className="flex justify-center mb-8">
              <SwitchTabs
                active="login"
                onChange={(tab) => router.push(`/${tab}`)}
              />
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs flex items-center gap-2">
                <Icon icon="lucide:alert-circle" width={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon icon="lucide:mail" width={20} />
                  </div>
                  <Input
                    placeholder="name@company.com"
                    type="email"
                    variant="secondary"
                    className="pl-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                    onChange={(e) => setDatalogin({ ...datalogin, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordModal({ ...forgotPasswordModal, verif: true })}
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon icon="lucide:lock" width={20} />
                  </div>
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    variant="secondary"
                    className="pl-12 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                    onChange={(e) => setDatalogin({ ...datalogin, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} width={20} />
                  </button>
                </div>
              </div>

              <Button
                label="Sign In"
                variant="primary"
                fullWidth
                className="h-12 rounded-xl font-bold poppins-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all active:scale-[0.98]"
              />
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px grow bg-border"></div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Or continue with</span>
              <div className="h-px grow bg-border"></div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleClickGoogle}
                className="w-full h-12 border border-border shadow-xs rounded-xl flex items-center justify-center gap-3 hover:bg-secondary/50 transition-all active:scale-[0.98] font-medium text-foreground poppins-medium"
              >
                <Icon icon="logos:google-icon" width={18} />
                Sign in with Google
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-muted-foreground poppins-regular">
            Don't have an account? <button onClick={() => router.push('/register')} className="text-primary font-bold hover:underline">Sign up for free</button>
          </p>
        </div>
      </div>

      {/* Right side: Visual */}
      <div className="hidden lg:block lg:w-1/2 p-6 h-screen sticky top-0 order-1 lg:order-2">
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Image
            src={"/images/authentication.jpg"}
            alt="Authentication Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-bold poppins-bold mb-4 drop-shadow-md">
              Level up your customer support with AI.
            </h2>
            <p className="text-lg opacity-90 poppins-medium max-w-lg mb-4">
              Join thousands of businesses automating their workflow using NexoBot's advanced multi-platform integrations.
            </p>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("h-1 rounded-full transition-all", i === 1 ? "w-8 bg-white" : "w-2 bg-white/40")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;