"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { useRouter } from "next/navigation";
import { getFullImageUrl } from "@/lib/utils";

interface ViewProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ViewProfileModal({ open, onClose }: ViewProfileModalProps) {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback redirect if API fails
      onClose();
      router.push("/login");
    }
  };

  if (!open) return null;
  return (
    <>
      <div className="relative z-tinggi w-[266px] mb-1 rounded-lg p-4 bg-white shadow border border-[#E0E0E0]">
        <div className="flex items-center w-full gap-3.75 bg-[#EFEFEF] px-4 py-2 rounded-lg">
          <span className="Profile rounded-full bg-black w-10 h-10 flex justify-center items-center overflow-hidden">
            {user?.picture ? (
              <img src={getFullImageUrl(user.picture)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Icon
                icon="mdi:account-circle"
                width="32"
                height="32"
                className="text-white"
              />
            )}
          </span>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user?.firstName || "User"} {user?.lastName || ""}</p>
            <p className="text-xs text-[#A3A3A3]">{user?.userSubcription?.[0]?.subcribtion?.name || "Free"}</p>
          </div>
        </div>
        <div className="flex flex-col border-t-2 mt-1 p-4 gap-4 text-[#655E5E]">
          <div className="flex gap-4 cursor-pointer hover:text-primary transition-colors">
            <Icon icon="streamline:star-2" width="20" height="20" />
            <p className="text-sm">Tingkatkan Paket</p>
          </div>
          <Link href="/settings" className="flex gap-4 cursor-pointer hover:text-primary transition-colors" onClick={onClose}>
            <Icon
              icon="icon-park-outline:setting-config"
              width="20"
              height="20"
            />
            <p className="text-sm">Setting</p>
          </Link>
        </div>
        <div className="flex flex-col border-t-2 mt-1 px-4 pt-4 gap-4 text-[#655E5E]">
          <div className="flex gap-4 cursor-pointer hover:text-primary transition-colors">
            <Icon icon="solar:help-line-duotone" width="20" height="20" />
            <p className="text-sm">Bantuan</p>
          </div>
          <div
            className="flex gap-4 cursor-pointer hover:text-primary transition-colors"
            onClick={handleLogout}
          >
            <Icon icon="mdi:logout" width="20" height="20" />
            <p className="text-sm">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}
