"use client";
import React from "react";
import PlatformTabs from "@/src/components/PlatformTabs";

export default function PlatformChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
      <div className="px-8 pt-8 pb-0">
        <h1 className="text-3xl font-bold poppins-bold text-foreground mb-6">Platform Chat</h1>
        <PlatformTabs />
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
}
