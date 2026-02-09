"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "default" | "custom";
  moveTo?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "mid";
  className?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  variant = "primary",
  moveTo,
  fullWidth,
  icon,
  iconPosition,
  onClick,
  className,
}: ButtonProps) => {
  const router = useRouter();

  const baseStyles =
    "text-lg flex justify-center items-center transition active:scale-95 cursor-pointer";

  const variants = {
    primary: "bg-[#27C5FF] p-3 text-white rounded-xl",
    secondary: "bg-gray-300 text-[#655E5E] rounded-xl",
    default: "p-3 rounded-full rounded-full bg-[#01D2B3]",
    custom: "",
  };

  const handleMoveTo = () => {
    if (onClick) return onClick();
    if (moveTo) router.push(moveTo);
  };

  return (
    <button
      onClick={handleMoveTo}
      className={`
    relative
    ${baseStyles}
    ${variants[variant]}
    ${fullWidth ? "w-full" : ""}
    ${className ?? ""}
  `}
    >
      {/* LEFT */}
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}

      {/* LABEL */}
      <span className={iconPosition === "mid" ? "opacity-0" : ""}>{label}</span>

      {/* MID */}
      {icon && iconPosition === "mid" && (
        <span className="absolute inset-0 flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* RIGHT */}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export { Button };
