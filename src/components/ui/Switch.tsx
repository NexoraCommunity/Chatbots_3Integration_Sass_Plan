"use client";
import * as React from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Switch = ({ checked = false, onCheckedChange, disabled = false, className = "" }: SwitchProps) => {
  const [internalChecked, setInternalChecked] = React.useState(checked);

  React.useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const next = !internalChecked;
    onCheckedChange?.(next);
  };

  return (
    <div
      onClick={toggle}
      className={`
        relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200
        ${internalChecked ? "bg-primary" : "bg-gray-200"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <motion.div
        animate={{ x: internalChecked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </div>
  );
};

export { Switch };
