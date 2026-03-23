"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBotStore } from "@/src/store/bot/bot.store";
import { Icon } from "@iconify/react";
import { DetailBot } from "../../components/DetailBot";

const DetailBotPage = () => {
  const { id } = useParams();
  const { currentBot, fetchBotById, isLoading } = useBotStore();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBotById(id as string).then(() => setIsDataLoaded(true));
    }
  }, [id, fetchBotById]);

  if (isLoading || !isDataLoaded) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20 grayscale opacity-50">
        <Icon icon="solar:robot-bold-duotone" width={48} className="animate-pulse text-primary" />
        <p className="mt-4 font-bold text-gray-400 uppercase tracking-widest text-xs">Loading bot details...</p>
      </div>
    );
  }

  if (!currentBot) {
    return (
      <div className="h-full flex flex-col items-center justify-center py-20">
        <Icon icon="solar:shield-warning-bold-duotone" width={48} className="text-gray-300" />
        <p className="mt-4 font-bold text-gray-500">Bot not found</p>
      </div>
    );
  }

  return (
    <DetailBot currentBot={currentBot} />
  );
};

export default DetailBotPage;
