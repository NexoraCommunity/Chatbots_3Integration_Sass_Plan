import React from "react";
import { Icon } from "@iconify/react";
import { Cards, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Cards";

interface AgentPromptProps {
  prompt: string;
  readOnly?: boolean;
  onPromptChange?: (value: string) => void;
}

const AgentPrompt = React.memo(({
  prompt,
  readOnly = false, // Keep readOnly prop and its default value
  onPromptChange,
}: AgentPromptProps) => {
  return (
    <Cards>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-50/50 bg-gray-50/30">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
          <Icon icon="solar:pen-new-square-bold-duotone" width={28} />
        </div>
        <div>
          <CardTitle className="text-xl poppins-bold text-gray-900">System Prompt</CardTitle>
          <p className="text-sm text-muted-foreground font-medium italic">Define how your agent should behave and respond</p>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-8">
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange?.(e.target.value)}
            readOnly={readOnly} // Apply readOnly prop
            placeholder="Example: You are a helpful customer service assistant for Toko Kami. Be polite, professional, and always try to assist the customer with their inquiries about our products..."
            className={`w-full min-h-[300px] p-4 sm:p-6 rounded-2xl border-2 border-gray-50 bg-white text-gray-900 text-base font-medium placeholder:text-gray-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none shadow-sm group-hover:border-gray-100 ${readOnly ? "bg-gray-50/50" : ""}`} // Apply readOnly styling
          />
        </div>
      </CardContent>
    </Cards>
  );
});

export default AgentPrompt;
