"use client";

import React, { forwardRef, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "default" | "custom" | "ghost";
  moveTo?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "mid";
  size?: "sm" | "md" | "lg";
  hideLabelOnMobile?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      children,
      variant = "primary",
      moveTo,
      fullWidth,
      icon,
      iconPosition,
      onClick,
      className,
      disabled,
      type = "button",
      size = "md",
      hideLabelOnMobile,
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    const baseStyles =
      "flex justify-center items-center transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "p-3 text-lg",
      lg: "p-4 text-xl",
    };

    const variants = {
      primary: "bg-[#27C5FF] text-white rounded-xl",
      secondary: "bg-gray-300 text-[#655E5E] rounded-xl",
      default: "rounded-full bg-[#01D2B3]",
      custom: "",
      ghost: "bg-transparent hover:bg-gray-50 text-gray-400 rounded-lg",
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
      if (moveTo && !onClick) router.push(moveTo);
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={handleClick}
        className={`
          relative
          ${baseStyles}
          ${sizeStyles[size]}
          ${variants[variant]}
          ${fullWidth ? "w-full" : ""}
          ${className ?? ""}
        `}
        {...props}
      >
        {/* LEFT */}
        {icon && iconPosition === "left" && (
          <span className={hideLabelOnMobile ? "sm:mr-2" : "mr-2"}>{icon}</span>
        )}

        {/* CONTENT (LABEL or CHILDREN) */}
        <div className={`flex items-center gap-2 ${iconPosition === "mid" ? "opacity-0" : ""} ${hideLabelOnMobile ? "hidden sm:flex" : ""}`}>
          {children || <span>{label}</span>}
        </div>

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
  }
);

Button.displayName = "Button";

export { Button };
