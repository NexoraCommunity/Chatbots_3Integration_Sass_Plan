"use client";
import React from "react";
import { Icon } from "@iconify/react";

interface EmptyIntegrationProps {
  icon?: string;
  message?: string;
}

export function EmptyIntegration({
  icon = "solar:shield-warning-bold-duotone",
  message = "No configuration found yet"
}: EmptyIntegrationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-gray-300">
        <Icon icon={icon} width={32} />
      </div>
      <p className="text-gray-400 font-medium poppins-medium text-center">{message}</p>
    </div>
  );
}
