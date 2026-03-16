import React from "react";
import { Cards } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button";
import { PaginationDemo } from "@/src/components/ui/Pagination";

const AgentList = () => {
  return (
    <div className="flex flex-col mt-6 justify-between h-full">
      <div className="agent-list grid gap-6 grid-cols-3">
        <Cards>
          <div className="headerAgentCard flex justify-between py-3 px-3.5 items-center">
            <p className="text-[16px] font-normal">Customer Services</p>
            <Icon icon="mingcute:more-2-line" width={24} />
          </div>
          <div className="AgentCardDescription p-2.5 mx-3.5 bg-gray-200 rounded-lg">
            <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
            praesentium pariatur molestias cum assumenda quis voluptate ex
            asperiores consectetur adipisci.</p>
          </div>
          <div className="agentAction flex justify-end py-3 px-3.5 items-center">
            <Button
              moveTo="/agent/test-agent"
              label="Test"
              variant="custom"
              className="px-7 py-2 bg-[#A4F5A6] rounded-lg text-xs"
            />
          </div>
        </Cards>
      </div>
      <div className="my-4">
      <PaginationDemo />
      </div>
    </div>
  );
};

export { AgentList };
