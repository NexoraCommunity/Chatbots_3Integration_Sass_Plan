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
      {pathname.includes("/bot-builder/add-bot") || 
       pathname.includes("/bot-builder/edit-bot") || 
       pathname.includes("/bot-builder/detail-bot") ? (
        <></>
      ) : (
        <div className="flex gap-4 items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold poppins-bold text-foreground">Bot Builder</h1>
          </div>
          <div className="flex gap-4 w-auto sm:w-auto">
            <Button
              label="Add New Bot"
              moveTo="/bot-builder/add-bot"
              variant="primary"
              icon={<Icon icon="solar:add-circle-bold-duotone" width={20} />}
              iconPosition="left"
              hideLabelOnMobile={true}
              className="h-10 w-10 sm:h-auto sm:w-auto p-0 sm:px-6 flex items-center justify-center sm:gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all rounded-[14px] sm:rounded-2xl"
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
