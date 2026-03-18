import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary" | "default" | "custom" | "miniDefault";
  icon?: string;
}

const Input = ({
  placeholder,
  variant = "primary",
  className,
  ...props
}: InputProps) => {
  const variants = {
    primary:
      "text-gray-500 rounded-xl border border-gray-[#646464] focus:outline-none focus:border-none focus:ring-1 focus:ring-[#01D2B3] p-5 h-15",
    secondary: "text-gray-500 rounded-lg border border-[#646464] focus:outline-none focus:border-none focus:ring-1 focus:ring-[#01D2B3] p-4 h-12",
    default: "focus:outline-none focus:border-none h-15",
    miniDefault: "focus:outline-none focus:border-none",
    custom: "",
  };

  return (
    <input
      {...props}
      placeholder={placeholder}
      className={`${variants[variant]} w-full ${className ?? ""}`}
    />
  );
};

export { Input };
