// "use client";

// import { Button } from "@/src/components/ui/Button";
// import { Icon } from "@iconify/react";
// import { usePathname } from "next/navigation";

// export default function PromptingLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   return (
//     <div>
//       <div className="buttonOption flex gap-4">
//         <Button
//           label="Bot List"
//           moveTo="/bot-builder"
//           variant={pathname === "/bot-builder" ? "primary" : "secondary"}
//           icon={<Icon icon="tdesign:system-setting" width={20} />}
//           iconPosition="left"
//           className="gap-2.5 px-9"
//         />
//         <Button
//           label="Add Bot"
//           moveTo="/bot-builder/add-bot"
//           variant={
//             pathname === "/bot-builder/add-bot" ? "primary" : "secondary"
//           }
//           icon={<Icon icon="mdi:plus" width={20} />}
//           iconPosition="left"
//           className="gap-2.5 px-9"
//         />
//       </div>
//       {children}
//     </div>
//   );
// }
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
                <p className="text-4xl text-[#655E5E] font-semibold">Bot Builder</p>
                <div className="flex gap-4">
                  <Button
                    label="Bot List"
                    moveTo="/bot-builder"
                    variant={
                      pathname === "/bot-builder" ? "primary" : "secondary"
                    }
                    icon={<Icon icon="tdesign:system-setting" width={20} />}
                    iconPosition="left"
                    className="gap-2.5 px-9"
                  />
                  <Button
                    label="Add Bot"
                    moveTo="/bot-builder/add-bot"
                    variant={
                      pathname === "/bot-builder/add-bot"
                        ? "primary"
                        : "secondary"
                    }
                    icon={<Icon icon="mdi:plus" width={20} />}
                    iconPosition="left"
                    className="gap-2.5 px-9"
                  />
                </div>
          </div>
      )}
      {children}
    </div>
  );
}
