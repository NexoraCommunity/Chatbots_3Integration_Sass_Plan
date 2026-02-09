'use client'
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
  const [isChecking, setIsChecking] = useState(false)

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
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);


  return (
    <div className="flex grow">
      <div className="w-71.25 h-auto">
        <SideBar />
      </div>
      <div className="flex-1 p-6">
        <div className="flex bg-white justify-between items-center rounded-lg shadow px-3">
          <div className="flex items-center">
            <Icon icon="material-symbols:search" width={26} height={26} />
            <SearchBar variant="default" />
          </div>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
