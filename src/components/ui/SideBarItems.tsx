"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SideBarItemsProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  href?: string;
  toggle?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  isShrunk?: boolean;
}

const MotionLink = motion(Link);

const SideBarItems = ({
  label,
  icon,
  active,
  href,
  toggle,
  isOpen,
  onToggle,
  isShrunk,
}: SideBarItemsProps) => {
  const isActiveNow = active;

  const baseClass = `
    flex items-center justify-between my-2 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 font-medium group
    ${isActiveNow
      ? "bg-primary/10 text-primary shadow-xs"
      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }
  `;

  // ITEM DROPDOWN
  if (toggle) {
    return (
      <MotionLink
        transition={{ type: "keyframes", stiffness: 200, duration: 0.2 }}
        className={baseClass}
        href={href}
        onClick={() => {
          if (toggle) onToggle?.();
        }}
      >
        <div className={cn(
          "flex items-center gap-3 flex-1 select-none",
          isShrunk ? "justify-center ml-0" : "ml-4"
        )}>
          {icon}
          {!isShrunk && <span>{label}</span>}
        </div>
        {!isShrunk && toggle && (
          <div className="mr-1">
            <Icon
              icon="lucide:chevron-down"
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        )}
      </MotionLink>
    );
  }

  // NORMAL LINK ITEM
  return (
    <MotionLink
      transition={{ type: "keyframes", duration: 0.2 }}
      href={href || "#"}
      className={baseClass}
    >
      <div className={cn(
        "flex items-center gap-3 flex-1 select-none",
        isShrunk ? "justify-center ml-0" : "ml-4"
      )}>
        {icon}
        {!isShrunk && <span>{label}</span>}
      </div>
    </MotionLink>
  );
};

export { SideBarItems };
