"use client";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useRouter } from "next/navigation";
import { SwitchTabs } from "@/src/components/SwitchTabs";
import { Icon } from "@iconify/react";
import { RegisterProps } from "@/src/model/authentication/authentication.model";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [error, setError] = useState("");
  const [dataRegister, setDataRegister] = useState<RegisterProps>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataRegister.password !== dataRegister.repeatPassword) {
      setError("Password dan Repeat Password Tidak Sama!!");
      return;
    }

    try {
      const response = await register(dataRegister);
      if (response) {
        router.push("/login");
      }
    } catch (error: any) {
      setError(error.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[#F8F9FB] poppins-regular flex-col lg:flex-row shadow-inner">
      {/* Left side: Content & Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center items-center py-12 px-6 lg:p-20 order-2 lg:order-1">
        <div className="w-full max-w-[520px]">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-[#1A1A1A] mb-3 poppins-bold tracking-tight">
              Create Account
            </h1>
            <p className="text-muted-foreground poppins-regular">
              Start automating your workflow with NexoBot today.
            </p>
          </div>

          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
            <div className="flex justify-center mb-8">
              <SwitchTabs
                active="register"
                onChange={(tab) => router.push(`/${tab}`)}
              />
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs flex items-center gap-2">
                <Icon icon="lucide:alert-circle" width={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A] ml-1">First Name</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Icon icon="lucide:user" width={20} />
                    </div>
                    <Input
                      placeholder="John"
                      type="text"
                      variant="secondary"
                      className="pl-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                      onChange={(e) => setDataRegister({ ...dataRegister, firstName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Last Name</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Icon icon="lucide:user" width={20} />
                    </div>
                    <Input
                      placeholder="Doe"
                      type="text"
                      variant="secondary"
                      className="pl-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                      onChange={(e) => setDataRegister({ ...dataRegister, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

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
                    onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon icon="lucide:lock" width={20} />
                  </div>
                  <Input
                    placeholder="Create a password"
                    type={showPassword ? "text" : "password"}
                    variant="secondary"
                    className="pl-12 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                    onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })}
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Icon icon="lucide:shield-check" width={20} />
                  </div>
                  <Input
                    placeholder="Repeat your password"
                    type={showRepeatPassword ? "text" : "password"}
                    variant="secondary"
                    className="pl-12 pr-12 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all poppins-regular"
                    onChange={(e) => setDataRegister({ ...dataRegister, repeatPassword: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon icon={showRepeatPassword ? "lucide:eye-off" : "lucide:eye"} width={20} />
                  </button>
                </div>
              </div>

              <Button
                label={isLoading ? "Creating..." : "Create Account"}
                variant="primary"
                type="submit"
                fullWidth
                disabled={isLoading}
                className="h-12 rounded-xl font-bold poppins-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all active:scale-[0.98] mt-2"
              />
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px grow bg-border"></div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Or Register with</span>
              <div className="h-px grow bg-border"></div>
            </div>

            <div className="mt-6">
              <button
                className="w-full h-12 border border-border shadow-xs rounded-xl flex items-center justify-center gap-3 hover:bg-secondary/50 transition-all active:scale-[0.98] font-medium text-foreground poppins-medium"
              >
                <Icon icon="logos:google-icon" width={18} />
                Sign up with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground poppins-regular">
            Already have an account? <button onClick={() => router.push('/login')} className="text-primary font-bold hover:underline">Sign in</button>
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
            <h3 className="text-4xl font-bold poppins-bold mb-4 drop-shadow-md">
              Start your journey today.
            </h3>
            <p className="text-lg opacity-90 poppins-medium max-w-lg mb-4">
              Unlock the power of AI-driven customer service and scale your business globally with NexoBot.
            </p>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("h-1 rounded-full transition-all", i === 2 ? "w-8 bg-white" : "w-2 bg-white/40")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
