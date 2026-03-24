"use client";
import React from "react";
import { Icon } from "@iconify/react";

const TransactionPage = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
          <Icon icon="solar:card-2-bold" width={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground">Overview of all payments and financial records.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="font-bold">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="solar:filter-bold" width={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="solar:download-minimalistic-bold" width={18} />
            </button>
          </div>
        </div>
        <div className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
            <Icon icon="solar:wad-of-money-bold" width={40} className="text-emerald-200" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ready to process?</h3>
            <p className="text-sm text-gray-500 max-w-sm px-10">Connect your payment gateway to start accepting payments and viewing transaction history.</p>
          </div>
          <button className="mt-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold shadow-xl shadow-emerald-500/20">
            Set Up Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
