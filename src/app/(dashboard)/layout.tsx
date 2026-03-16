"use client";
import { Icon } from "@iconify/react";
import { SearchBar } from "@/src/components/ui/SearchBar";
import SideBar from "@/src/components/ui/SideBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { getCurrentUser } = useAuthStore();
  const [isChecking, setIsChecking] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await getCurrentUser();
        if (data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [getCurrentUser]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <div className="flex grow">
      <div className="w-71.25 h-auto">
        <SideBar />
      </div>
      <div className="flex-1 flex flex-col h-screen px-6">
        <div className="flex bg-white justify-between items-center rounded-lg shadow px-3 sticky top-0 z-50">
          <div className="flex items-center w-full">
            <Icon icon="material-symbols:search" width={26} height={26} />
            <SearchBar variant="default" className="w-full ml-2" />
          </div>
          {/* credit */}
          <div className="credit flex items-center gap-2 w-[15%] border-l-2 border-[#E0E0E0] pl-4">
            <Icon
              icon="bxs:coin-stack"
              width={30}
              className="text-yellow-500"
            />
            <div className="text-sm font-medium">
              <p>Credit</p>
              <p className="text-green-500">970rb</p>
            </div>
          </div>
        </div>

        <div className="my-6 grow">{children}</div>
      </div>
    </div>
  );
}
