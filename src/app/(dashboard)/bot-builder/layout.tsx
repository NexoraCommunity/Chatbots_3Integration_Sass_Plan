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
    <div className="grow flex flex-col h-full">
      {pathname === "/bot-builder/add-bot" ? (
        <></>
      ) : (
        <div className="flex gap-4 items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold poppins-bold text-foreground mb-2">Bot Builder</h1>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              label="Add New Bot"
              moveTo="/bot-builder/add-bot"
              variant="primary"
              icon={<Icon icon="solar:add-circle-bold-duotone" width={20} />}
              iconPosition="left"
              className="w-full sm:w-auto gap-2 px-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
