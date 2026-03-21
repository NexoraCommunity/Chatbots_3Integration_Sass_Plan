"use client";

import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

export default function PromptingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grow flex flex-col space-y-6">
      {pathname === "/agent" && (
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-bold poppins-bold text-foreground sm:mb-2 text-nowrap">Agent Management</h1>
          </div>

          <div className="flex gap-4 w-auto">
            <Button
              label="Add New Agent"
              hideLabelOnMobile
              moveTo="/agent/add-agent"
              variant="primary"
              icon={<Icon icon="solar:add-circle-bold-duotone" width={20} />}
              iconPosition="left"
              className="w-11 h-11 sm:w-auto sm:h-auto gap-2 px-0 sm:px-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
