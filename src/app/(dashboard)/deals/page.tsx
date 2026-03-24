"use client";
import React from "react";
import { Icon } from "@iconify/react";

const DealsPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600">
          <Icon icon="solar:ticket-sale-bold" width={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Deals</h1>
          <p className="text-sm text-muted-foreground">Manage your promotions, discounts, and custom deals.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <Icon icon="solar:sale-broken" width={40} className="text-blue-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Start your first deal</h3>
            <p className="text-sm text-gray-500 max-w-sm px-10">Create limited-time offers or special discounts to attract more customers to your store.</p>
          </div>
          <button className="mt-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-95">
            Create Deal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-border shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
            <Icon icon="solar:point-on-map-bold" width={24} />
          </div>
          <div>
            <h4 className="font-bold">Automated Discounts</h4>
            <p className="text-xs text-secondary-foreground/60">Apply discounts to specific collections.</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-3xl border border-border shadow-sm flex items-center gap-4">
          <div className="bg-orange-50 p-4 rounded-xl text-orange-600">
            <Icon icon="solar:tag-horizontal-bold" width={24} />
          </div>
          <div>
            <h4 className="font-bold">Voucher Codes</h4>
            <p className="text-xs text-secondary-foreground/60">Generate custom codes for customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
