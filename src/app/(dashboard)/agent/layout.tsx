"use client";

import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/src/components/ui/SearchBar";

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
        <div className="buttonOption flex gap-4 justify-between bg-white rounded-lg py-4 px-4">
          <>
            <div className="flex gap-4 items-center">
              {pathname !== "/agent/add-agent" ? (
                <>
                  <SearchBar
                    placeholder="Search Products..."
                    className="w-80 border p-3 rounded-lg"
                    variant="miniDefault"
                  />
                  <Button
                    label="Filter"
                    variant="custom"
                    icon={<Icon icon="mdi:filter" width={20} />}
                    iconPosition="left"
                    className="flex gap-2.5 items-center justify-center text-[16px] text-gray-500 rounded-lg border-2 border-[#575555] hover:border-[#01D2B3] p-3"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
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
        </div>
      )}
      {children}
    </div>
  );
}
