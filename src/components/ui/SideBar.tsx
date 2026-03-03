"use client";
import { SideBarItems } from "./SideBarItems";
import { SubSideBarItems } from "./subSideBarItems";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ViewProfileModal } from "./modal/ViewProfileModal";

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
  {
    label: "AI & Analytic",
    icon: <Icon icon="ri:file-ai-fill" width="16" height="16" />,
    href: "/ai-analytic",
  },
];

const salesMenu = [
  {
    label: "Product Manager",
    icon: <Icon icon="ix:product" width="16" height="16" />,
    href: "/product-manager",
  },
  {
    label: "Sales Menu",
    icon: (
      <Icon
        icon="material-symbols:payment-arrow-down-outline-rounded"
        width="16"
        height="16"
      />
    ),
    href: "/payment",
  },
  {
    label: "Sales Monitoring",
    icon: <Icon icon="grommet-icons:shop" width="16" height="16" />,
    href: "/sales-monitoring",
  },
  {
    label: "Customer",
    icon: <Icon icon="famicons:people" width="16" height="16" />,
    href: "/customer",
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
  { labelSub: "Whatsapp", subHref: "/integration/whatsapp" },
  { labelSub: "Telegram", subHref: "/integration/telegram" },
  { labelSub: "Website", subHref: "/integration/website" },
];

// Page
const SideBar = () => {
  const activePath = usePathname();
  const [openIntegration, setOpenIntregation] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    setOpenIntregation(activePath.startsWith("/integration"));
  }, [activePath]);

  const handleOpenProfile = () => {
    setOpenProfile(!openProfile);
  };

  return (
    <div className="fixed flex flex-col h-screen w-69 bg-linear-to-b from-[#FFFFFF] to-[#F6F6F6]">
      <div className="ml-9 flex items-center gap-4 text-[#01D2B3] m-5">
        <Icon icon="mingcute:robot-fill" width="30" height="30" />
        <h2 className="font-semibold text-2xl">Nexchatbot</h2>
      </div>
      <div className="grow px-5 overflow-y-auto scrollbar-hide">
        <div>
          <h3 className="font-semibold ml-4 text-[#6862624D]">Main Menu</h3>
          {mainMenu.map((item) => (
            <SideBarItems
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              active={activePath.includes(item.href)}
            />
          ))}
        </div>
        {/* Sales Menu */}
        <div>
          <h3 className="font-semibold ml-4 text-[#6862624D]">Bot Menu</h3>
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
                    onToggle={() => {
                      setOpenIntregation((prev) => !prev);
                    }}
                  />
                  {openIntegration && (
                    <div className="ml-8 flex flex-col gap-3.5">
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
              />
            );
          })}
        </div>
        {/* Main Menu */}
        <div>
          <h3 className="font-semibold ml-4 text-[#6862624D]">Sales Menu</h3>
          {salesMenu.map((item) => {
            return (
              <SideBarItems
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
                active={activePath.startsWith(item.href)}
              />
            );
          })}
        </div>
      </div>

      {/* modal */}
      {openProfile && (
        <div className="absolute bottom-18 w-full flex justify-center items-center">
          <ViewProfileModal
            open={openProfile}
            onClose={() => setOpenProfile(false)}
          />
        </div>
      )}
      {/* profile */}
      <div className="sticky bottom-0 left-0 w-full flex justify-between items-center h-20 border-t-2 px-3.75 bg-white">
        <div
          className="flex items-center w-full gap-3.75"
          onClick={() => handleOpenProfile()}
        >
          <span className="Profile rounded-full bg-black w-10 h-10 flex justify-center items-center">
            <Icon
              icon="mdi:account-circle"
              width="32"
              height="32"
              className="text-white"
            />
          </span>
          <div className="flex flex-col">
            <p className="text-sm font-medium">Bayu Skak</p>
            <p className="text-xs text-[#A3A3A3]">Free(gamodal)</p>
          </div>
        </div>
        <p className="text-sm text-[#767373] px-2 py-1 border border-[#767373] rounded-lg">
          Upgrade
        </p>
      </div>
    </div>
  );
};

export default SideBar;
