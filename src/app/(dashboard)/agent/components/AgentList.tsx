import React from "react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Icon } from "@iconify/react";
import { Button } from "@/src/components/ui/Button";
import { PaginationDemo } from "@/src/components/ui/Pagination";

const AgentList = () => {
  const agents = [
    {
      id: 1,
      name: "Customer Support Pro",
      description: "Optimized for handling customer inquiries, returns, and common FAQ with a helpful, friendly tone.",
    },
    {
      id: 2,
      name: "Sales Closer",
      description: "Dedicated to driving conversions, explaining product benefits, and guiding users through the checkout process.",
    },
    {
      id: 3,
      name: "Technical Assistant",
      description: "Expert in troubleshooting, explaining technical specifications, and helping with product installations.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-[calc(100vh-220px)] space-y-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Cards key={agent.id} className="group hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon icon="solar:robot-bold-duotone" width={24} height={24} />
                </div>
                <CardTitle className="text-base font-bold truncate max-w-[150px]">{agent.name}</CardTitle>
              </div>
              <button className="text-muted-foreground hover:text-foreground p-1 transition-colors">
                <Icon icon="solar:menu-dots-bold" width={20} />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="min-h-[60px]">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 font-medium">
                  {agent.description}
                </p>
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-gray-50">
                <Button
                  moveTo="/agent/test-agent"
                  label="Test Agent"
                  variant="primary"
                  className="px-4 py-2 text-[10px] h-auto gap-1.5 font-bold uppercase tracking-wider"
                  icon={<Icon icon="solar:play-circle-bold" width={14} />}
                  iconPosition="left"
                />
              </div>
            </CardContent>
          </Cards>
        ))}
      </div>

      <div className="mt-auto sticky bottom-0 bg-[#F8F9FA]/80 backdrop-blur-sm flex justify-center pt-4 border-t border-gray-100 mb-2">
        <PaginationDemo />
      </div>
    </div>
  );
};

export { AgentList };
