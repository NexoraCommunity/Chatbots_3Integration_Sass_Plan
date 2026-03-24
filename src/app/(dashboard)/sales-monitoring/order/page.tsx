"use client";
import React from "react";
import { Icon } from "@iconify/react";

const OrderPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
          <Icon icon="solar:cart-large-bold" width={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-muted-foreground">Manage and track your customer orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white rounded-3xl border border-border shadow-sm animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-32 bg-gray-100 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-50 rounded"></div>
          </div>
        ))}
      </div>

      <div className="p-12 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-4">
        <div className="p-6 bg-white rounded-full shadow-xl">
          <Icon icon="solar:box-minimalistic-broken" width={48} className="text-gray-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
          <p className="text-sm text-gray-500 max-w-xs">Your orders will appear here once customers start purchasing from your bot.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">
          Sync Orders
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
