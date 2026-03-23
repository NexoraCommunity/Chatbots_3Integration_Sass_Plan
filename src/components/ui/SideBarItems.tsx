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
          "flex items-center flex-1 select-none transition-all duration-300",
          isShrunk ? "justify-center ml-0 gap-0" : "ml-4 gap-3"
        )}>
          <div className="shrink-0">{icon}</div>
          <span className={cn(
            "whitespace-nowrap overflow-hidden transition-all duration-300",
            isShrunk ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
          )}>
            {label}
          </span>
        </div>
        {toggle && (
          <div className={cn(
            "transition-all duration-300 overflow-hidden flex items-center justify-center shrink-0",
            isShrunk ? "max-w-0 opacity-0 mr-0" : "max-w-[20px] opacity-100 mr-1"
          )}>
            <Icon
              icon="lucide:chevron-down"
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-300",
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
        "flex items-center flex-1 select-none transition-all duration-300",
        isShrunk ? "justify-center ml-0 gap-0" : "ml-4 gap-3"
      )}>
        <div className="shrink-0">{icon}</div>
        <span className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-300",
          isShrunk ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
        )}>
          {label}
        </span>
      </div>
    </MotionLink>
  );
};

export { SideBarItems };
