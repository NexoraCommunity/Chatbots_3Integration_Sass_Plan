"use client";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useRouter } from "next/navigation";
import { SwitchTabs } from "@/src/components/SwitchTabs";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
import { LoginProps, OtpCodeProps } from "@/src/model/authentication.model";
import { useAuthStore } from "@/src/store/auth.store";
import OtpModal from "@/src/components/ui/modal/VerificationOtp";
import { GoogleOauth } from "@/src/services/api-auth/authentication.route";
import { ForgotPasswordModal } from "@/src/components/ui/modal/ForgotPasswordModal";
import { ChangeForgotPasswordModal } from "@/src/components/ui/modal/ChangeForgotPasswordModal";

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
    await GoogleOauth()
  }


  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await login(datalogin);
      if (response) {
        setOpenOtp(true)
      }

    } catch (error: any) {
      setError(error.error)
    }
  }

  const handleOnSubmitOtp = async (e: React.FormEvent<HTMLFormElement>, Otp: string) => {
    e.preventDefault();
    try {
      const otp: OtpCodeProps = {
        email: datalogin.email,
        codeOTP: Otp
      }
      const response = await otpCode(otp);
      if (response) {
        router.push("/dashboard")
        console.log(response)
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  const handleOnSubmitSendOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await verifPasswordOtp(dataForgotPassword);
      if (response) {
        setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: true })
        setDataForgotPassword({ ...dataForgotPassword, id: user?.id || '' })
      }

    } catch (error: any) {
      console.log(error)
    }
  }
  const handleSubmitOtpForgotPassword = async (e: React.FormEvent<HTMLFormElement>, Otp: string) => {
    e.preventDefault();
    try {
      setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: false, update: true })
      setChangeForgotPassword({ ...changeForgotPassword, codeOTP: Otp, id: user?.id || '' })
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleOnSubmitVerifForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(changeForgotPassword);
      if (response) {
        setForgotPasswordModal({ ...forgotPasswordModal, verif: false, otp: true })
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-full h-screen items-center overflow-hidden">
      <OtpModal
        open={openOtp} onClose={() => setOpenOtp(false)}
        otp={otpLogin} setOtp={setOtpLogin}
        handleSubmit={handleOnSubmitOtp} />

      <OtpModal
        open={forgotPasswordModal.otp}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, otp: false })}
        handleSubmit={handleSubmitOtpForgotPassword}
        otp={otpForgotPassword}
        setOtp={setOtpForgotPassword} />

      <ForgotPasswordModal open={forgotPasswordModal.verif}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, verif: false })}
        handleSubmit={handleOnSubmitSendOtpForgotPassword}
        dataForgotPassword={dataForgotPassword}
        setDataForgotPassword={setDataForgotPassword} />

      <ChangeForgotPasswordModal
        open={forgotPasswordModal.update}
        handleSubmit={handleOnSubmitVerifForgotPassword}
        dataChangeForgotPassword={changeForgotPassword}
        setDataChangeForgotPassword={setChangeForgotPassword}
        onClose={() => setForgotPasswordModal({ ...forgotPasswordModal, update: false })} />
      {/* left side */}
      <div className="flex flex-col items-center w-1/2 p-20">
        <h3 className="text-[#525252] text-4xl font-bold my-5">
          Welcome Back!!
        </h3>

        <div className="w-full h-1/2 flex flex-col justify-center items-center gap-5">
          <SwitchTabs
            active="login"
            onChange={(tab) => {
              router.push(`/${tab}`);
            }}
          />
          <p className="text-red-500 text-xs">{error}</p>

          {/* form */}
          <form action="" onSubmit={handleOnSubmit}>
            <div className="w-100 h-auto font-medium flex flex-col justify-center items-center gap-2 p-5 bg-[#F4FFFD] border rounded-xl border-[#DBD5D5] text-[#575555]">
              <div className="w-full">
                <p className="text-sm ml-2 mb-1.5 ">Email Address</p>
                <Input
                  placeholder="Masukan Email address"
                  type="email"
                  onChange={(e) => setDatalogin({ ...datalogin, email: e.target.value })}
                  variant="secondary"
                  required
                />
              </div>
              <div className="w-full relative">
                <p className="text-sm ml-2 mb-1.5">Password</p>
                <Input
                  placeholder="Masukan Password"
                  type={showPassword ? "text" : "password"}
                  variant="secondary"
                  onChange={(e) => setDatalogin({ ...datalogin, password: e.target.value })}

                />
                <div className="absolute right-0 flex items-center justify-center h-12 bottom-0">

                  <Icon
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    onClick={() => setShowPassword(!showPassword)}
                    width={25}
                    className="mr-5 text-[#575555] cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-2 text-[#01D2B3] text-sm  cursor-pointer">
                <p onClick={() => setForgotPasswordModal({ ...forgotPasswordModal, verif: true })}>Lupa Password?</p>
              </div>
            </div>
            <div className="mt-5">
              <Button label="Continue" variant="primary" fullWidth />
            </div>
          </form>

          {/* Another Login */}
          <div className="flex flex-col items-center gap-3">
            <p className="flex items-center gap-2 text-xs font-medium text-black w-full">
              <span className="w-34 border-t border-black"></span>
              or continue with
              <span className="w-34 border-t border-black"></span>
            </p>

            <div className="flex gap-5">
              <div className="w-10 h-10 border border-gray-300 rounded-full flex justify-center items-center cursor-pointer">
                <Icon
                  onClick={handleClickGoogle}
                  icon="material-icon-theme:google"
                  width="20"
                  height="20"
                />
              </div>
              {/* <div className="w-10 h-10 text-xl text-white bg-[#1877F2] rounded-full flex justify-center items-center cursor-pointer">
                <Icon 
                onClick={handleClickFb} 
                icon="bxl:facebook" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="w-1/2 h-screen bg-[#01D2B3] p-5">
        <div className="foto w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src={"/images/authentication.jpg"}
            alt="Login Image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;