"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/src/store/authentication/user.store";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { fetchCurrentUser } = useUserStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const tabs = [
    {
      href: "/settings",
      label: "Informasi Personal",
      icon: "mdi:account",
      description: "ubah informasi disini",
    },
    {
      href: "/settings/password",
      label: "Password",
      icon: "mdi:eye",
      description: "ubah informasi disini",
    },
    {
      href: "/settings/business",
      label: "Informasi Bisnis",
      icon: "mdi:store",
      description: "ubah informasi disini",
    },
  ];

  // On mobile: if user is on the root /settings path, show the navigation list
  // If user navigated to a sub-page, show the content with a back button
  const isRootSettings = pathname === "/settings";
  const isSubPage = pathname !== "/settings";

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full max-w-6xl mx-auto border border-gray-100 min-h-[600px]">
      {/* Header: Back button + Title — hidden on mobile sub-pages */}
      <div className={cn(
        "items-center gap-4",
        isSubPage ? "hidden md:flex" : "flex"
      )}>
        <Link
          href="/dashboard"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-slate-200"
        >
          <Icon icon="solar:alt-arrow-left-bold" width={20} className="text-slate-600" />
        </Link>
        <h1 className="text-2xl poppins-bold text-foreground leading-none">Settings</h1>
      </div>

      {/* Tabs + Content row */}
      <div className="flex flex-col md:flex-row gap-8 flex-1">
      {/* Sidebar Tabs - always visible on desktop, only on root /settings on mobile */}
      <div className={cn(
        "w-full md:w-80 shrink-0 flex-col gap-2",
        // On mobile: show sidebar only when on root settings or when it's the exact /settings page
        isSubPage ? "hidden md:flex" : "flex"
      )}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 text-left border",
                isActive 
                  ? "bg-[#F8F9FA] border-transparent shadow-sm" 
                  : "bg-transparent border-transparent hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "shrink-0 flex items-center justify-center transition-colors duration-300",
                isActive ? "text-[#2DD4BF]" : "text-slate-500"
              )}>
                <Icon icon={tab.icon} width="24" height="24" />
              </div>
              <div className="flex flex-col flex-1">
                <span className={cn(
                  "font-semibold text-[15px] poppins-semibold transition-colors duration-300",
                  isActive ? "text-slate-800" : "text-slate-600"
                )}>
                  {tab.label}
                </span>
                <span className="text-xs text-slate-400 poppins-regular">
                  {tab.description}
                </span>
              </div>
              {/* Chevron for mobile */}
              <Icon icon="mdi:chevron-right" width="20" height="20" className="text-slate-400 md:hidden" />
            </Link>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 lg:pl-8 lg:border-l lg:border-slate-100",
        // On mobile: hide content when on root /settings (show nav list instead)
        // Show content when on sub-pages
        isRootSettings ? "hidden md:block" : "block"
      )}>
        {/* Mobile back button */}
        {isSubPage && (
          <div className="md:hidden mb-4">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              <Icon icon="mdi:arrow-left" width="20" height="20" />
              <span>Kembali</span>
            </Link>
          </div>
        )}
        {children}
      </div>
    </div>
    </div>
  );
}
