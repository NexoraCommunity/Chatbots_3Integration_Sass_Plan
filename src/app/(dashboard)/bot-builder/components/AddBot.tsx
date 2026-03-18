"use client";

import { useState } from "react";
import { Cards, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Cards";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Badge } from "@/src/components/ui/Badge";

const AddBot = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("whatsapp");
  const [botName, setBotName] = useState("");

  const agents = [
    {
      id: 1,
      name: "Customer Service",
      model: "Claude 3.5 Sonnet",
      status: "Verified",
      description: "Optimized for support and complex reasoning.",
    },
    {
      id: 2,
      name: "Sales Assistant",
      model: "GPT-4o",
      status: "Fast",
      description: "Swift responses and lead capture expertise.",
    },
    {
      id: 3,
      name: "Marketing Specialist",
      model: "Gemini 1.5 Pro",
      status: "Creative",
      description: "Creative copy and multi-modal understanding.",
    },
  ];

  const platforms = [
    { id: "whatsapp", name: "WhatsApp", icon: "logos:whatsapp-icon" },
    { id: "telegram", name: "Telegram", icon: "logos:telegram" },
    { id: "web", name: "Web Chat", icon: "akar-icons:globe", color: "text-amber-500" },
  ];

  const handleCreate = () => {
    // Logic for creating the bot
    console.log("Creating bot:", { botName, selectedAgentId, selectedPlatform });
  };

  return (
    <div className="flex flex-col space-y-8 max-w-5xl mx-auto w-full px-4 sm:px-0 min-h-screen bg-[#FAFAFA]">
      {/* Header with Back Button - Replicating Agent Style */}
      <div className="flex items-center gap-4 px-4 sm:px-0">
        <Button
          variant="secondary"
          moveTo="/bot-builder"
          label=""
          iconPosition="mid"
          className="w-10 h-10 p-0 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 border border-gray-100 shadow-sm"
          icon={<Icon icon="solar:alt-arrow-left-bold" width={20} />}
        />
        <div>
          <h1 className="text-2xl poppins-bold text-foreground leading-none">Create New Bot</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Identity Section - Replicating Card Style */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:document-text-bold-duotone" className="text-primary" />
                Bot Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider ml-1">Nama Bot</label>
                <Input
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  placeholder="Masukkan Nama Bot"
                  variant="secondary"
                  className="bg-gray-50/50 border-gray-100 focus:bg-white transition-all h-14 text-sm font-semibold"
                />
              </div>
            </CardContent>
          </Cards>

          {/* Agent Knowledge Section - Replicating Agent Style Selection */}
          <Cards>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Icon icon="fluent:brain-circuit-24-filled" className="text-primary" />
                Select Agent Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${selectedAgentId === agent.id
                      ? 'bg-primary/5 border-primary/30 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-primary/20 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${selectedAgentId === agent.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                        }`}>
                        <Icon icon="solar:user-bold-duotone" width={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-sm truncate ${selectedAgentId === agent.id ? 'text-primary' : 'text-gray-900'}`}>{agent.name}</p>
                          <Badge variant={selectedAgentId === agent.id ? "primary" : "secondary"} className="text-[8px] py-0 px-1.5 h-4 uppercase font-black tracking-widest leading-none">
                            {agent.status}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold mt-0.5 uppercase tracking-tighter">{agent.model}</p>
                      </div>
                    </div>
                    <Checkbox checked={selectedAgentId === agent.id} readOnly className="pointer-events-none ml-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Cards>
        </div>

        <div className="space-y-8">
          {/* Platform Selection Card - Replicating Shipping/Payment Card Pattern */}
          <Cards>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon icon="solar:share-circle-bold-duotone" className="text-primary" />
                Connection Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-1 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${selectedPlatform === platform.id
                      ? 'bg-white border-primary shadow-md ring-1 ring-primary/10'
                      : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-50">
                        <Icon icon={platform.icon} width={24} className={platform.color} />
                      </div>
                      <span className={`text-xs font-black uppercase tracking-widest ${selectedPlatform === platform.id ? 'text-primary' : 'text-gray-500'}`}>
                        {platform.name}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlatform === platform.id ? 'border-primary bg-primary text-white scale-110' : 'border-gray-200'}`}>
                      {selectedPlatform === platform.id && <Icon icon="mdi:check" width={12} />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Cards>

          {/* Quick Info - Replicating Agent Style */}
          <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-white">
                <Icon icon="solar:info-circle-bold-duotone" width={20} />
              </div>
              <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Pro Tip</h4>
            </div>
            <p className="text-xs text-primary/70 leading-relaxed font-medium">
              Each bot can only connect to one platform at a time. Select your primary communication channel carefully.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer - Replicating Agent Style Exactly */}
      <div className="sticky bottom-0 w-full z-50 px-0 sm:px-4 mt-auto">
        <div className="mx-auto max-w-5xl p-4 sm:p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 sm:ml-4 w-full sm:w-auto justify-center sm:justify-start">
            <div className="bg-primary/10 text-primary w-11 h-11 rounded-2xl flex items-center justify-center font-black shadow-inner">
              {selectedAgentId ? "1" : "0"}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-xs font-black text-gray-900 uppercase">Agent Selected</span>
              <span className="text-[10px] text-muted-foreground font-bold italic">Ready for deployment</span>
            </div>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="secondary"
              label="Cancel"
              moveTo="/bot-builder"
              className="px-8 rounded-2xl font-bold text-sm bg-gray-50 border-gray-100 hover:bg-gray-100 flex-1 sm:flex-none"
            />
            <Button
              variant="primary"
              label="Create Bot"
              onClick={handleCreate}
              className="px-10 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex-1 sm:flex-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddBot };
