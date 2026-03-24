"use client";

import { Icon } from "@iconify/react";
import { Button } from "./Button";

export const SubscriptionRequired = () => {
  return (
    <div className="flex grow items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500 bg-white/50 backdrop-blur-sm rounded-[32px] border border-white/40 shadow-xl shadow-gray-200/20 m-4">
      <div className="flex flex-col items-center p-8 md:p-12">
        <div className="bg-amber-50 p-6 rounded-full mb-8 relative group">
          <div className="absolute inset-0 bg-amber-200/20 rounded-full animate-ping group-hover:animate-none" />
          <Icon icon="solar:crown-bold-duotone" width={80} className="text-amber-500 relative z-10" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 poppins-bold mb-4 tracking-tight">
          Subscription Required
        </h3>

        <p className="text-gray-500 max-w-md mb-10 poppins-medium leading-relaxed text-sm md:text-base">
          You don't have an active subscription yet. Subscribe now to unlock all premium features, manage your products, and use our advanced chatbot integrations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            variant="primary"
            moveTo="/subscription"
            className="h-14 px-12 font-bold shadow-2xl shadow-primary/30 text-base rounded-2xl group transition-all"
          >
            <span>Choose a Plan</span>
            <Icon icon="solar:alt-arrow-right-bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </div>
  );
};
