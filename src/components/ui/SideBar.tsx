"use client";
import { SideBarItems } from "./SideBarItems";
import { SubSideBarItems } from "./subSideBarItems";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ViewProfileModal } from "./modal/ViewProfileModal";
import { cn, getFullImageUrl } from "@/lib/utils";
import { useSidebarStore } from "@/src/store/ui/sidebar.store";
import { useAuthStore } from "@/src/store/authentication/auth.store";

const botMenu = [
  {
    label: "Agent",
    icon: <Icon icon="mingcute:edit-2-fill" width="16" height="16" />,
    href: "/agent",
  },
  {
    label: "Bot Builder",
    icon: <Icon icon="tdesign:system-setting" width="16" height="16" />,
    href: "/bot-builder",
  },
  {
    label: "Integration",
    icon: (
      <Icon
        icon="material-symbols:integration-instructions"
        width="16"
        height="16"
      />
    ),
    href: "/integration/activation",
  },
];

const salesMenu = [
  {
    label: "Product Manager",
    icon: <Icon icon="ix:product" width="16" height="16" />,
    href: "/product-manager",
  },
  {
    label: "Sales Monitoring",
    icon: <Icon icon="grommet-icons:shop" width="16" height="16" />,
    href: "/sales-monitoring",
  },
  {
    label: "Deals",
    icon: <Icon icon="solar:reorder-bold" width="16" height="16" />,
    href: "/deals",
  },
  {
    label: "Customer",
    icon: <Icon icon="famicons:people" width="16" height="16" />,
    href: "/customer/kontak",
  },

];

const mainMenu = [
  {
    label: "Dashboard",
    icon: <Icon icon="mage:dashboard-plus-fill" width="16" height="16" />,
    href: "/dashboard",
  },
  {
    label: "Notification",
    icon: <Icon icon="iconamoon:notification-fill" width="16" height="16" />,
    href: "/notification",
  },
];

const integrationSubMenu = [
  { labelSub: "Activation", subHref: "/integration/activation" },
  { labelSub: "Platform Chat", subHref: "/integration/platform-chat" },
  { labelSub: "Payment Gateway", subHref: "/integration/payment-gateway" },
  { labelSub: "Shipping", subHref: "/integration/shipping" },
];

const customerSubMenu = [
  { labelSub: "Kontak", subHref: "/customer/kontak" },
  { labelSub: "Support", subHref: "/customer/support" },
];

const salesMonitoringSubMenu = [
  { labelSub: "Order", subHref: "/sales-monitoring/order" },
  { labelSub: "Transaction", subHref: "/sales-monitoring/transaction" },
];

interface SideBarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Page
const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  const activePath = usePathname();
  const { user } = useAuthStore();
  const [openIntegration, setOpenIntregation] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openSalesMonitoring, setOpenSalesMonitoring] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileContainerRef.current && !profileContainerRef.current.contains(event.target as Node)) {
        setOpenProfile(false);
      }
    };
    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openProfile]);

  const { isShrunk, toggleShrunk, setShrunk } = useSidebarStore();

  useEffect(() => {
    if (activePath === "/customer/kontak") {
      setShrunk(true);
    } else {
      setShrunk(false);
    }
  }, [activePath, setShrunk]);

  useEffect(() => {
    setOpenIntregation(activePath.startsWith("/integration"));
    setOpenCustomer(activePath.startsWith("/customer"));
    setOpenSalesMonitoring(activePath.startsWith("/sales-monitoring"));
  }, [activePath]);

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-[60] flex flex-col h-screen bg-sidebar border-r border-sidebar-border shadow-lg transform transition-all duration-300 ease-in-out",
        isShrunk ? "w-24" : "w-72",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className={cn(
          "flex items-center justify-between py-10 mb-2 transition-all duration-300 relative",
          isShrunk ? "px-0 justify-center" : "px-6"
        )}>
          <div className={cn(
            "flex items-center transition-all duration-300",
            isShrunk ? "gap-0" : "gap-3"
          )}>
            <div className="bg-primary/10 p-2.5 rounded-2xl text-primary ring-4 ring-primary/5 shrink-0">
              <Icon icon="mingcute:robot-fill" width="32" height="32" />
            </div>
            <div className={cn(
              "flex flex-col overflow-hidden transition-all duration-300",
              isShrunk ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
            )}>
              <h2 className="font-bold text-xl tracking-tight text-foreground leading-none whitespace-nowrap">HiChet</h2>
            </div>
          </div>

          {/* Manual Toggle Button (Desktop) */}
          <button
            onClick={toggleShrunk}
            className={cn(
              "hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-sidebar-border rounded-full p-1.5 shadow-sm text-muted-foreground hover:text-primary transition-all z-10",
              isShrunk && "rotate-180"
            )}
          >
            <Icon icon="lucide:chevron-left" width={14} height={14} />
          </button>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon icon="lucide:x" width={24} height={24} />
          </button>
        </div>
        <div className={cn(
          "grow overflow-y-auto scrollbar-hide transition-all duration-300",
          isShrunk ? "px-3" : "px-6"
        )}>
          <div className="mb-6">
            <div className={cn(
              "transition-all duration-300 flex items-center mb-2",
              isShrunk ? "justify-center px-0" : "px-4"
            )}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex">
                <span>M</span>
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  isShrunk ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                )}>ain Menu</span>
              </h3>
            </div>
            {mainMenu.map((item) => (
              <SideBarItems
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
                active={activePath.includes(item.href)}
                isShrunk={isShrunk}
              />
            ))}
          </div>
          {/* Sales Menu */}
          <div className="mb-6">
            <div className={cn(
              "transition-all duration-300 flex items-center mb-2 mt-4",
              isShrunk ? "justify-center px-0" : "px-4"
            )}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex">
                <span>B</span>
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  isShrunk ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                )}>ot Menu</span>
              </h3>
            </div>
            {botMenu.map((item) => {
              if (item.label === "Integration") {
                return (
                  <div key={item.href}>
                    <SideBarItems
                      label={item.label}
                      href={item.href}
                      icon={item.icon}
                      toggle
                      active={openIntegration}
                      isOpen={openIntegration}
                      isShrunk={isShrunk}
                      onToggle={() => {
                        setOpenIntregation((prev) => !prev);
                      }}
                    />
                    {openIntegration && !isShrunk && (
                      <div className="ml-9 pl-7 border-l-2 border-sidebar-border/50 flex flex-col gap-4 my-2">
                        {integrationSubMenu.map((sub) => {
                          return (
                            <SubSideBarItems
                              key={sub.subHref}
                              labelSub={sub.labelSub}
                              subHref={sub.subHref}
                              active={activePath.includes(sub.subHref)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <SideBarItems
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  active={activePath.startsWith(item.href)}
                  isShrunk={isShrunk}
                />
              );
            })}
          </div>
          {/* Main Menu */}
          <div className="mb-6">
            <div className={cn(
              "transition-all duration-300 flex items-center mb-2 mt-4",
              isShrunk ? "justify-center px-0" : "px-4"
            )}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex">
                <span>S</span>
                <span className={cn(
                  "whitespace-nowrap overflow-hidden transition-all duration-300",
                  isShrunk ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                )}>ales Menu</span>
              </h3>
            </div>
            {salesMenu.map((item) => {
              if (item.label === "Customer") {
                return (
                  <div key={item.href}>
                    <SideBarItems
                      label={item.label}
                      href={item.href}
                      icon={item.icon}
                      toggle
                      active={openCustomer}
                      isOpen={openCustomer}
                      isShrunk={isShrunk}
                      onToggle={() => {
                        setOpenCustomer((prev) => !prev);
                      }}
                    />
                    {openCustomer && !isShrunk && (
                      <div className="ml-9 pl-7 border-l-2 border-sidebar-border/50 flex flex-col gap-4 my-2">
                        {customerSubMenu.map((sub) => {
                          return (
                            <SubSideBarItems
                              key={sub.subHref}
                              labelSub={sub.labelSub}
                              subHref={sub.subHref}
                              active={activePath.includes(sub.subHref)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              if (item.label === "Sales Monitoring") {
                return (
                  <div key={item.href}>
                    <SideBarItems
                      label={item.label}
                      href={item.href}
                      icon={item.icon}
                      toggle
                      active={openSalesMonitoring}
                      isOpen={openSalesMonitoring}
                      isShrunk={isShrunk}
                      onToggle={() => {
                        setOpenSalesMonitoring((prev) => !prev);
                      }}
                    />
                    {openSalesMonitoring && !isShrunk && (
                      <div className="ml-9 pl-7 border-l-2 border-sidebar-border/50 flex flex-col gap-4 my-2">
                        {salesMonitoringSubMenu.map((sub) => {
                          return (
                            <SubSideBarItems
                              key={sub.subHref}
                              labelSub={sub.labelSub}
                              subHref={sub.subHref}
                              active={activePath.includes(sub.subHref)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <SideBarItems
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  icon={item.icon}
                  active={activePath.startsWith(item.href)}
                  isShrunk={isShrunk}
                />
              );
            })}
          </div>
        </div>

        {/* profile */}
        <div ref={profileContainerRef} className={cn(
          "p-6 mt-auto border-t border-sidebar-border bg-sidebar/50 backdrop-blur-sm transition-all duration-300",
          isShrunk && "px-3 items-center flex flex-col"
        )}>
          {/* modal rendered relative to the sidebar container */}
          {openProfile && (
            <div className={cn(
              "absolute bottom-20 z-[70] animate-in fade-in zoom-in-95 duration-200",
              isShrunk ? "left-12 ml-6" : "left-0 w-full flex justify-center items-center"
            )}>
              <ViewProfileModal
                open={openProfile}
                onClose={() => setOpenProfile(false)}
              />
            </div>
          )}

          <div
            className={cn(
              "flex items-center p-2 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all duration-300 w-full",
              isShrunk ? "justify-center px-0 gap-0" : "gap-3"
            )}
            onClick={handleOpenProfile}
          >
            <div className="relative shrink-0">
              <div className="rounded-full bg-primary/20 w-10 h-10 flex justify-center items-center overflow-hidden border border-primary/10">
                {user?.picture ? (
                  <img src={getFullImageUrl(user.picture)} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Icon
                    icon="mdi:account-circle"
                    width="32"
                    height="32"
                    className="text-primary"
                  />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className={cn(
              "flex flex-col min-w-0 overflow-hidden transition-all duration-300",
              isShrunk ? "max-w-0 opacity-0" : "max-w-[150px] flex-1 opacity-100"
            )}>
              <p className="text-sm font-semibold truncate">{user?.firstName || "User"} {user?.lastName || ""}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.userSubcription?.[0]?.subcribtion?.name || "Free Plan"}</p>
            </div>
          </div>

          <button className={cn(
            "mt-4 flex items-center justify-center bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20",
            isShrunk ? "w-12 h-12 p-0 gap-0" : "w-full px-4 py-3 gap-2"
          )}>
            <Icon icon="solar:star-fall-bold" width={20} height={20} className="shrink-0" />
            <span className={cn(
              "whitespace-nowrap overflow-hidden transition-all duration-300",
              isShrunk ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
            )}>Upgrade Plan</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
