"use client";
import { Icon } from "@iconify/react";
import { SearchBar } from "@/src/components/ui/SearchBar";
import SideBar from "@/src/components/ui/SideBar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authentication/auth.store";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/src/store/ui/sidebar.store";
import { useUserIntegrationStore } from "@/src/store/integration/userIntegration.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { getCurrentUser, refreshToken } = useAuthStore();
  const [isChecking, setIsChecking] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { userIntegrations, getAllIntegration, isLoading: isIntegrationsLoading } = useUserIntegrationStore();
  const { user } = useAuthStore();



  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await getCurrentUser();
        if (data) {
          setIsAuthenticated(true);
        } else {
          const refreshData = await refreshToken();
          setIsAuthenticated(!!refreshData);
        }
      } catch (error) {
        try {
          const data = await refreshToken();
          if (!data) {
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch (refreshError) {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [getCurrentUser, refreshToken]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated && user?.id && userIntegrations.length === 0 && !isIntegrationsLoading) {
      getAllIntegration(user.id).catch((err) => {
        console.error("DashboardLayout: Failed to fetch integrations", err);
      });
    }
  }, [isAuthenticated, user?.id, userIntegrations.length, isIntegrationsLoading, getAllIntegration]);

  const { isShrunk } = useSidebarStore();
  const pathname = usePathname();
  const isKontak = pathname === "/customer/kontak";

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#F8F9FA]">
        <div className="flex flex-col items-center gap-4">
          <Icon icon="lucide:loader-2" width={48} className="animate-spin text-primary" />
          <p className="text-muted-foreground poppins-medium animate-pulse">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex grow h-screen overflow-hidden">
      <div className={cn(
        "hidden lg:block flex-shrink-0 transition-all duration-300",
        isShrunk ? "w-24" : "w-72"
      )}>
        <SideBar />
      </div>

      {/* Mobile SideBar */}
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
        <header className="sticky top-0 z-50 w-full px-4 md:px-12 pt-4 md:pt-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[20px] md:rounded-[24px] shadow-xl shadow-gray-200/20 h-16 md:h-20 px-4 md:px-8 flex justify-between items-center transition-all duration-300 mb-4 md:mb-8">
            <div className="flex items-center gap-3 md:gap-6 w-full max-w-2xl group">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 bg-white text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl border border-gray-100 shadow-sm transition-all"
              >
                <Icon icon="lucide:menu" width={20} height={20} />
              </button>
              <div className="flex items-center w-full rounded-xl px-2 md:px-5 border border-transparent focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-lg focus-within:shadow-primary/5 transition-all duration-300">
                <Icon icon="lucide:search" className="text-slate-400 group-focus-within:text-primary transition-colors duration-300 min-w-[18px]" width={18} height={18} />
                <SearchBar variant="default" className="w-full ml-2 md:ml-3 bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 poppins-medium h-12 md:h-15" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Credits */}
              <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-slate-100/50 rounded-xl border border-transparent group cursor-pointer hover:bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
                <div className="bg-amber-100/50 p-2 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <Icon
                    icon="solar:wallet-money-bold-duotone"
                    width={20}
                    className="text-amber-600"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400 poppins-bold">Credits</span>
                  <span className="text-sm font-bold text-slate-900 poppins-bold">970,000</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={cn(
          "flex-1 px-4 md:px-12 py-2",
          isKontak ? "overflow-hidden flex flex-col pb-6 md:pb-8 pt-0" : "overflow-y-auto scrollbar-hide pb-8 md:pb-10 pt-0"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
