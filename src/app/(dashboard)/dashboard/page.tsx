import { Switch } from "@/components/ui/switch";
import BarChartDashboard from "@/src/components/ui/BarChart";
import { Checkbox } from "@/src/components/ui/Checkbox";
import GaugeChart from "@/src/components/ui/GaugeChart";
import { Icon } from "@iconify/react";
import React from "react";

const page = () => {
  return (
    <div>
      {/* Statistik */}
      <div className="grid grid-cols-4 gap-5 text-[#655E5E]">
        <div className="flex flex-col justify-between rounded-lg w-full h-50 bg-white shadow p-5 hover:bg-linear-to-r from-[#61EFDA] to-[#98FFF0] cursor-pointer">
          <div className="flex gap-4 items-center">
            <span className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">
              <Icon icon="fluent:bot-24-filled" width={20} />
            </span>
            <p>Total Bot Aktif</p>
          </div>
          <p className="text-[40px]">10 Bot</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg w-full h-50 bg-white shadow p-5 hover:bg-linear-to-r from-[#61EFDA] to-[#98FFF0] cursor-pointer">
          <div className="flex gap-4 items-center">
            <span className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">
              <Icon
                icon="material-symbols:interactive-space"
                width={20}
                className="bg-white rounded-xl"
              />
            </span>
            <p>Total Agent</p>
          </div>
          <p className="text-[40px]">5 Agent</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg w-full h-50 bg-white shadow p-5 hover:bg-linear-to-r from-[#61EFDA] to-[#98FFF0] cursor-pointer">
          <div className="flex gap-4 items-center">
            <span className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">
              <Icon
                icon="tabler:message-filled"
                width={20}
                className="bg-white rounded-xl"
              />
            </span>
            <p>Total Pesan</p>
          </div>
          <p className="text-[40px]">250 Pesan</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg w-full h-50 bg-white shadow p-5 hover:bg-linear-to-r from-[#61EFDA] to-[#98FFF0] cursor-pointer">
          <div className="flex gap-4 items-center">
            <span className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">
              <Icon
                icon="streamline-ultimate:monetization-touch-coin-bold"
                width={20}
                className="bg-white rounded-xl"
              />
            </span>
            <p>Penggunaan Token</p>
          </div>
          <p className="text-[40px]">970 Token</p>
        </div>
      </div>

      {/* Bagian Chart */}
      <div className="w-full h-100 rounded-lg shadow my-5">
        <BarChartDashboard />
      </div>
      {/* Bagian bawah */}
      <div className="grid grid-cols-3 gap-5 text-[#655E5E]">
        <div className="rounded-lg w-full h-auto bg-white shadow p-5">
          <p className="w-40 mb-3">Integration Platform Connected</p>
          <div className="flex h-20 justify-between px-5 items-center border-4 border-[#CCCCCC] hover:border-[#A4F5A6] rounded-lg mb-3 cursor-pointer">
            <div className="wa flex gap-5 items-center">
              <Icon icon="logos:whatsapp-icon" width={40} />
              <div className="flex flex-col">
                <p className="text-lg">Baileys</p>
                <p className="text-sm text-[#A4A4A4]">Aktif</p>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="flex h-20 justify-between px-5 items-center border-4 border-[#CCCCCC] hover:border-[#A4F5A6] rounded-lg mb-3 cursor-pointer">
            <div className="wa flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                <Icon icon="mdi:telegram" width={28} height={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-lg">Bot Father</p>
                <p className="text-sm text-[#A4A4A4]">Nonaktif</p>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="flex h-20 justify-between px-5 items-center border-4 border-[#CCCCCC] hover:border-[#A4F5A6] rounded-lg mb-3 cursor-pointer">
            <div className="wa flex gap-5 items-center">
              <Icon icon="logos:whatsapp-icon" width={40} />
              <div className="flex flex-col">
                <p className="text-lg">Whatsapp Bussiness</p>
                <p className="text-sm text-[#A4A4A4]">Nonaktif</p>
              </div>
            </div>
            <Checkbox />
          </div>
          <div className="flex h-20 justify-between px-5 items-center border-4 border-[#CCCCCC] hover:border-[#A4F5A6] rounded-lg mb-3 cursor-pointer">
            <div className="wa flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
                <Icon icon="akar-icons:globe" width={28} height={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-lg">Website</p>
                <p className="text-sm text-[#A4A4A4]">Nonaktif</p>
              </div>
            </div>
            <Checkbox />
          </div>
        </div>

        <div className="rounded-lg w-full h-auto bg-white shadow p-5">
          <p>Kestabilan Token</p>
          <div className="flex flex-col items-center justify-center mt-9">
            <GaugeChart value={2000} />
          </div>
          <div className="flex flex-col items-center justify-around mt-9 gap-4">
            <div className="grid grid-cols-2 w-full items-center gap-16">
              <p className="text-xl">optimal</p>
              <p className="text-xl text-green-500">2000 Token</p>
            </div>
            <div className="grid grid-cols-2 w-full items-center gap-16">
              <p className="text-xl">stabil</p>
              <p className="text-xl text-green-400">2000 Token</p>
            </div>
            <div className="grid grid-cols-2 w-full items-center gap-16">
              <p className="text-xl">menipis</p>
              <p className="text-xl text-red-400">2000 Token</p>
            </div>
            <div className="grid grid-cols-2 w-full items-center gap-16">
              <p className="text-xl">kritis</p>
              <p className="text-xl text-red-500">2000 Token</p>
            </div>
          </div>
        </div>

        {/* Product */}
        <div className="rounded-lg w-full h-auto bg-white shadow p-5">
          <p className="w-40 mb-9">Active Product</p>
          <div className="flex flex-col gap-6">
          <div className="active-product flex gap-6.25 items-center justify-between">
            <div className="flex gap-6.25 items-center justify-between">
              <div className="gambar-product flex items-center justify-center border rounded-lg w-12.5 h-12.5 bg-[#cccccc]"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu</p>
                <p className="text-xs">ID : SPU-0001</p>
              </div>
            </div>
                <Switch size="lg" />
          </div>
          <div className="active-product flex gap-6.25 items-center justify-between">
            <div className="flex gap-6.25 items-center justify-between">
              <div className="gambar-product flex items-center justify-center border rounded-lg w-12.5 h-12.5 bg-[#cccccc]"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu</p>
                <p className="text-xs">ID : SPU-0001</p>
              </div>
            </div>
                <Switch size="lg" />
          </div>
          <div className="active-product flex gap-6.25 items-center justify-between">
            <div className="flex gap-6.25 items-center justify-between">
              <div className="gambar-product flex items-center justify-center border rounded-lg w-12.5 h-12.5 bg-[#cccccc]"></div>
              <div className="flex flex-col justify-center">
                <p>Sapu</p>
                <p className="text-xs">ID : SPU-0001</p>
              </div>
            </div>
                <Switch size="lg" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
