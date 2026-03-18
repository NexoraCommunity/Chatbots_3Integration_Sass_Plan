import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "outline" | "secondary" | "primary" | "info" | "error";
  className?: string;
  showDot?: boolean;
}

const Badge = ({ children, variant = "outline", className = "", showDot = false }: BadgeProps) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    error: "bg-rose-50 text-rose-600 border-rose-100",
    outline: "bg-transparent text-muted-foreground border-border",
    secondary: "bg-gray-100 text-gray-600 border-gray-200",
    info: "bg-blue-50 text-blue-600 border-blue-100",
  };

  const dotColors = {
    primary: "bg-primary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-rose-500",
    outline: "bg-gray-400",
    secondary: "bg-gray-400",
    info: "bg-blue-500",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-xs
        ${variants[variant]}
        ${className}
      `}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5">
          {variant === "success" && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotColors[variant]}`}></span>
        </span>
      )}
      {children}
    </span>
  );
};

export { Badge };
