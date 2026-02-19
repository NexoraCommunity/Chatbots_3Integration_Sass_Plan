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
    <div>
      {pathname === "/agent/test-agent" ? (
        <></>
      ) : (
        <>
          <div className="flex gap-4 items-center justify-between">
            {pathname !== "/agent/add-agent" ? (
              <>
                <p className="text-4xl text-[#655E5E] font-semibold">Agent</p>
                <div className="flex gap-4">
                  <Button
                    label="Agent List"
                    moveTo="/agent"
                    variant={pathname === "/agent" ? "primary" : "secondary"}
                    icon={<Icon icon="mingcute:edit-2-fill" width={20} />}
                    iconPosition="left"
                    className="gap-2.5 px-9"
                  />
                  <Button
                    label="Add Prompt"
                    moveTo="/agent/add-agent"
                    variant={
                      pathname === "/agent/add-agent" ? "primary" : "secondary"
                    }
                    icon={<Icon icon="mdi:plus" width={20} />}
                    iconPosition="left"
                    className="gap-2.5 px-9"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      {children}
    </div>
  );
}
